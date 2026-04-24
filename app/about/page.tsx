import Image from "next/image";
import { Target, Eye, Award, Users, BookOpen, Globe } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To make quality education accessible to everyone, anywhere in the world, empowering learners to achieve their goals.",
    },
    {
      icon: Eye,
      title: "Our Vision",
      description:
        "To become the world's most trusted learning platform, transforming lives through education and skill development.",
    },
    {
      icon: Award,
      title: "Our Values",
      description:
        "Excellence, innovation, accessibility, and continuous improvement drive everything we do.",
    },
  ];

  const stats = [
    { icon: Users, value: "50,000+", label: "Active Learners" },
    { icon: BookOpen, value: "500+", label: "Quality Courses" },
    { icon: Award, value: "200+", label: "Expert Instructors" },
    { icon: Globe, value: "100+", label: "Countries Reached" },
  ];

  const team = [
    {
      name: "John Anderson",
      role: "Founder & CEO",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop",
      bio: "Former education technology executive with 15+ years of experience.",
    },
    {
      name: "Sarah Mitchell",
      role: "Head of Education",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop",
      bio: "PhD in Education, passionate about innovative learning methods.",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop",
      bio: "Tech leader focused on building scalable, user-friendly platforms.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About CourseHub
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            We&apos;re on a mission to transform lives through accessible,
            high-quality online education
          </p>
        </div>
      </div>

      {/* Story Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  CourseHub was founded in 2020 with a simple yet powerful
                  vision: to make quality education accessible to everyone,
                  regardless of their location or background.
                </p>
                <p>
                  What started as a small platform with just a handful of
                  courses has grown into a thriving community of learners and
                  instructors from around the world. Today, we offer hundreds of
                  courses across multiple disciplines, from technology and
                  business to creative arts and personal development.
                </p>
                <p>
                  Our commitment to excellence, innovation, and accessibility
                  has helped thousands of students achieve their learning goals
                  and advance their careers. We believe that education is the
                  key to unlocking human potential, and we&apos;re dedicated to
                  providing the tools and resources needed for success.
                </p>
              </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop"
                alt="Students learning"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Drives Us
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our core principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
                  <value.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-primary-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Leadership
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experienced professionals dedicated to your success
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="card overflow-hidden group">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <div className="text-primary-600 font-medium mb-3">
                    {member.role}
                  </div>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students already learning on CourseHub
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/items"
              className="btn-primary bg-white text-primary-700 hover:bg-primary-50"
            >
              Browse Courses
            </a>
            <a
              href="/register"
              className="btn-secondary border-white text-blue-700 hover:bg-white/10"
            >
              Sign Up Free
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
