"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface AuthContextType {
  user: User | null;
  userRole: string | null;
  loading: boolean;
  signup: (
    email: string,
    password: string,
    displayName?: string,
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUserRole = async (uid: string) => {
    try {
      const res = await fetch(`/api/users?uid=${uid}`);
      if (res.ok) {
        const data = await res.json();
        setUserRole(data.user?.role || "user");
      }
    } catch {
      setUserRole("user");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        await fetchUserRole(firebaseUser.uid);
      } else {
        setUserRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const saveUserToMongoDB = async (firebaseUser: User, provider: string) => {
    try {
      await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          provider,
        }),
      });
      await fetchUserRole(firebaseUser.uid);
    } catch {
      // silently fail
    }
  };

  const signup = async (
    email: string,
    password: string,
    displayName?: string,
  ) => {
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      if (displayName) {
        await updateProfile(credential.user, { displayName });
      }
      await saveUserToMongoDB(credential.user, "email");
      toast.success("Account created successfully!");

      // Redirect new users to user dashboard
      router.push("/dashboard/user");
    } catch (error: any) {
      toast.error(error.message || "Failed to create account");
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await saveUserToMongoDB(credential.user, "email");
      toast.success("Logged in successfully!");

      // Redirect to dashboard after login
      const params = new URLSearchParams(window.location.search);
      const redirect = params.get("redirect");
      if (redirect && redirect.startsWith("/")) {
        router.push(redirect);
      } else {
        // Fetch role first then redirect
        const res = await fetch(`/api/users?uid=${credential.user.uid}`);
        if (res.ok) {
          const data = await res.json();
          const role = data.user?.role || "user";
          router.push(
            role === "admin" ? "/dashboard/admin" : "/dashboard/user",
          );
        } else {
          router.push("/dashboard/user");
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to login");
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const credential = await signInWithPopup(auth, provider);
      await saveUserToMongoDB(credential.user, "google");
      toast.success("Logged in with Google!");

      // Redirect to dashboard after login
      const params = new URLSearchParams(window.location.search);
      const redirect = params.get("redirect");
      if (redirect && redirect.startsWith("/")) {
        router.push(redirect);
      } else {
        // Fetch role first then redirect
        const res = await fetch(`/api/users?uid=${credential.user.uid}`);
        if (res.ok) {
          const data = await res.json();
          const role = data.user?.role || "user";
          router.push(
            role === "admin" ? "/dashboard/admin" : "/dashboard/user",
          );
        } else {
          router.push("/dashboard/user");
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to login with Google");
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUserRole(null);
      toast.success("Logged out successfully!");
      router.push("/");
    } catch (error: any) {
      toast.error(error.message || "Failed to logout");
      throw error;
    }
  };

  const refreshUser = async () => {
    if (user) {
      await user.reload();
      setUser({ ...user });
      await fetchUserRole(user.uid);
    }
  };

  const value = {
    user,
    userRole,
    loading,
    signup,
    login,
    loginWithGoogle,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
