import React from "react";
import ReactPlayer from "react-player";
import { Helmet } from "react-helmet";

const CourseClassesPage = () => {
  // Static data for past and upcoming classes
  const pastClasses = [
    {
      _id: "1",
      title: "Introduction to React",
      description: "An overview of React fundamentals.",
      date: "2023-12-20T10:00:00Z",
      notes: "https://example.com/react-notes",
      video: "https://youtu.be/n5eBVMqO-Vw?si=53lhtLrKRMobr1NO",
    },
    {
      _id: "2",
      title: "State and Props",
      description: "Deep dive into state management and props in React.",
      date: "2023-12-15T10:00:00Z",
      notes: "https://example.com/state-props-notes",
      video: "https://www.example.com/state-props-video.mp4",
    },
  ];

  const upcomingClasses = [
    {
      _id: "3",
      title: "React Hooks",
      description: "Understanding useState and useEffect hooks.",
      date: "2024-01-05T14:00:00Z",
      classLink: "https://example.com/join-class",
    },
    {
      _id: "4",
      title: "Advanced React Patterns",
      description: "Learn about Context API and custom hooks.",
      date: "2024-01-12T14:00:00Z",
      classLink: "https://example.com/join-class",
    },
  ];

  return (
    <div className="text-center p-6 bg-slate-50 dark:bg-custum-black-body text-custom-orange dark:text-white min-h-screen">
      <Helmet>
        <title>
        CourseClasses
        </title>
      </Helmet>
      <h1 className="text-2xl font-semibold mb-8">Your Course Classes</h1>
      <div className="classes-container mt-8">
        {/* Upcoming Classes */}
        <div className="upcoming-classes mb-12">
          <h2 className="text-xl font-bold mb-4">Upcoming Classes</h2>
          {upcomingClasses.length > 0 ? (
            upcomingClasses.map((cls) => (
              <div key={cls._id} className="class-card p-4 border rounded mb-4 bg-white dark:bg-slate-800 shadow-sm">
                <h3 className="font-semibold">{cls.title}</h3>
                <p>{cls.description}</p>
                <p>
                  <strong>Date:</strong> {new Date(cls.date).toLocaleString()}
                </p>
                <a
                  href={cls.classLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600"
                >
                  Join Class
                </a>
              </div>
            ))
          ) : (
            <p>No upcoming classes available.</p>
          )}
        </div>

        {/* Past Classes */}
        <div className="past-classes">
          <h2 className="text-xl font-bold mb-4">Past Classes</h2>
          {pastClasses.length > 0 ? (
            pastClasses.map((cls) => (
              <div
                key={cls._id}
                className="class-card flex flex-row md:flex-row p-4 border rounded mb-6 bg-white dark:bg-slate-800 shadow-sm"
              >
                {/* Left Side: Details */}
                <div className="details md:w-1/2 flex flex-col justify-center items-center pr-4 mb-4 md:mb-0">
                  <h3 className="font-semibold text-lg mt-6">{cls.title}</h3>
                  <p className="text-gray-600 dark:text-slate-300 mt-4">{cls.description}</p>
                  <p>
                    <strong>Date:</strong> {new Date(cls.date).toLocaleString()}
                  </p>
                  {cls.notes && (
                    <a
                      href={cls.notes}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 mt-4"
                    >
                      View Notes
                    </a>
                  )}
                </div>
                {/* Right Side: Video */}
                <div className="video md:w-1/2">
                  <ReactPlayer
                    url={cls.video}
                    controls
                    width="100%"
                    height="350px"
                    className="rounded"
                  />
                </div>
              </div>
            ))
          ) : (
            <p>No past classes available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseClassesPage;
