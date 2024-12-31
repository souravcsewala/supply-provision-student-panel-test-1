import React from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';

const EnrolledCourses = () => {
  const navigate = useNavigate();

  // Static hardcoded courses data
  const enrolledCourses = [
    {
      _id: "1",
      title: "Introduction to React",
      image: "react-course.jpg",
      description: "Learn the basics of React, including components, state, and props.",
    },
    {
      _id: "2",
      title: "Advanced JavaScript",
      image: "javascript-course.jpg",
      description: "Deep dive into advanced JavaScript concepts and patterns.",
    },
    {
      _id: "3",
      title: "Web Development Bootcamp",
      image: "webdev-course.jpg",
      description: "A complete guide to modern web development.",
    },
  ];

  return (
    <div className="text-center bg-slate-50 dark:bg-custum-black-body text-custom-orange dark:text-white  min-h-screen w-full p-6">
       <Helmet>
                      <title>enrolledCourses</title>
                    </Helmet>
      <h1 className="text-2xl font-semibold mb-8">Your Enrolled Courses</h1>
      <div className="courses-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {enrolledCourses.length > 0 ? (
          enrolledCourses.map((course) => (
            <div
              key={course._id}
              className="course-card  p-4 border rounded-lg shadow-md bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600"
            >
              <h3 className="text-lg font-bold mb-3">{course.title}</h3>
              <img
                src={course.image || "default-course-image.jpg"}
                alt={course.title}
                className="w-full h-32 object-cover rounded mb-4"
              />
              <p className="text-sm text-gray-700 dark:text-slate-300 mb-4">
                {course.description}
              </p>
              <button
                onClick={() => navigate(`/verified-student/dashboard/course/class/${course._id}`)}
                className="w-full py-2 bg-custom-orange dark:bg-custum-active-dark text-white rounded-lg hover:bg-orange-600 dark:hover:bg-custum-hover-dark transition"
              >
                Go To Your Course
              </button>
            </div>
          ))
        ) : (
          <p className="text-lg">You have not enrolled in any courses yet.</p>
        )}
      </div>
    </div>
  );
};

export default EnrolledCourses;
