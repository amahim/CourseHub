import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  Users,
  Clock,
  Award,
  CheckCircle,
} from "lucide-react";
import clientPromise from "@/lib/mongodb";

async function getCourse(id: string) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "coursehub");
    const course = await db.collection("courses").findOne({ id });
    // Serialize MongoDB document for Next.js
    return course ? JSON.parse(JSON.stringify(course)) : null;
  } catch {
    return null;
  }
}

async function getRelatedCourses(category: string, currentId: string) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "coursehub");
    const courses = await db
      .collection("courses")
      .find({ category, id: { $ne: currentId } })
      .limit(3)
      .toArray();
    // Serialize MongoDB documents for Next.js
    return JSON.parse(JSON.stringify(courses));
  } catch {
    return [];
  }
}

export default async function ItemDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const course = await getCourse(params.id);

  if (!course) {
    notFound();
  }

  const relatedCourses = await getRelatedCourses(course.category, course.id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12">
        <div className="container-custom">
          <Link
            href="/items"
            className="inline-flex items-center text-primary-100 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Courses
          </Link>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="inline-block bg-primary-500 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                {course.category}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {course.title}
              </h1>
              <p className="text-xl text-primary-100 mb-6">
                {course.shortDescription}
              </p>

              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-primary-200">Rating</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span className="font-semibold">
                    {course.students.toLocaleString()}
                  </span>
                  <span className="text-primary-200">Students</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span className="font-semibold">{course.duration}</span>
                  <span className="text-primary-200">Duration</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span className="font-semibold">{course.level}</span>
                  <span className="text-primary-200">Level</span>
                </div>
              </div>
            </div>

            <div className="card p-6 bg-white text-gray-900 h-fit">
              <div className="text-4xl font-bold text-primary-600 mb-4">
                ${course.price}
              </div>
              <button className="btn-primary w-full mb-4">Enroll Now</button>
              <button className="btn-secondary w-full">Add to Wishlist</button>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold mb-3">This course includes:</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Lifetime access
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Certificate of completion
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    30-day money-back guarantee
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Access on mobile and desktop
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom section-padding">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Course Image */}
            <div className="card overflow-hidden">
              <div className="relative h-96">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Description */}
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Course Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {course.fullDescription}
              </p>
            </div>

            {/* What You'll Learn */}
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                What You&apos;ll Learn
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {course.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Courses */}
            {relatedCourses.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Related Courses
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedCourses.map((relatedCourse) => (
                    <Link
                      href={`/items/${relatedCourse.id}`}
                      key={relatedCourse.id}
                      className="card group"
                    >
                      <div className="relative h-40 overflow-hidden">
                        <Image
                          src={relatedCourse.image}
                          alt={relatedCourse.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                          {relatedCourse.title}
                        </h3>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-primary-600 font-semibold">
                            ${relatedCourse.price}
                          </span>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span>{relatedCourse.rating}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Instructor */}
            <div className="card p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Instructor
              </h3>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {course.instructor[0]}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {course.instructor}
                  </div>
                  <div className="text-sm text-gray-600">Expert Instructor</div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                Industry expert with years of experience teaching and working in{" "}
                {course.category.toLowerCase()}.
              </p>
            </div>

            {/* Course Details */}
            <div className="card p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Course Details
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Level</span>
                  <span className="font-semibold">{course.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-semibold">{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Students</span>
                  <span className="font-semibold">
                    {course.students.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category</span>
                  <span className="font-semibold">{course.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Created</span>
                  <span className="font-semibold">
                    {new Date(course.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Share */}
            <div className="card p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Share Course
              </h3>
              <div className="flex space-x-2">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  Facebook
                </button>
                <button className="flex-1 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors text-sm">
                  Twitter
                </button>
                <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
