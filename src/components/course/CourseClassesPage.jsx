import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useParams } from "react-router-dom";

const CourseClassesPage = () => {
  const { courseId } = useParams(); 
  const [pastClasses, setPastClasses] = useState([]);
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`/courses/${courseId}/classes`, {
          headers: {
            'x-auth-token': accessToken, 
          },
        });
        const { pastClasses, upcomingClasses } = response.data;

       
        const filteredUpcomingClasses = upcomingClasses.filter(
          (cls) => new Date(cls.date) >= new Date()
        );

        setPastClasses(pastClasses);
        setUpcomingClasses(filteredUpcomingClasses);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch classes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [courseId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="text-center p-6 bg-slate-50 dark:bg-custum-black-body text-custom-orange dark:text-white min-h-screen">
      <Helmet>
        <title>Course Classes</title>
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
                  href={cls.classJoinLink}
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
                className="class-card flex flex-col md:flex-row p-4 border rounded mb-6 bg-white dark:bg-slate-800 shadow-sm"
              >
                <div className="details md:w-1/2 pr-4">
                  <h3 className="font-semibold text-lg">{cls.title}</h3>
                  <p>{cls.description}</p>
                  <p>
                    <strong>Date:</strong> {new Date(cls.date).toLocaleString()}
                  </p>
                  {cls.NotesUrl && (
                    <a
                      href={cls.NotesUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600"
                    >
                      View Notes
                    </a>
                  )}
                </div>
                {cls.RecordVideoUrl && (
                  <div className="video md:w-1/2">
                    <ReactPlayer
                      url={cls.RecordVideoUrl}
                      controls
                      width="100%"
                      height="350px"
                      className="rounded"
                    />
                  </div>
                )}
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
