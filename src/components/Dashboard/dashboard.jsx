import React from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import StaticProfileImage  from "../../assets/staticprofileimage.jpg"

const Dashboard = () => {
  const { fullName, phone, email, profileimage, role, Buycourses } = useSelector(
    (state) => state.auth
  );

  return (
    <div className="w-[89%] mx-auto flex bg-custom-peach dark:bg-slate-700 p-6 rounded-xl shadow-lg text-custom-brown dark:text-white">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <div className="max-w-md sm:max-w-lg md:max-w-xl lg:max-w-4xl mx-auto p-6 rounded-lg flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6">
        <img
          src={profileimage || StaticProfileImage}
          alt="Student"
          className="rounded-full w-24 h-24 lg:w-32 lg:h-32 border-4 border-white shadow-md"
        />
        <div className="text-center lg:text-left">
          <h2 className="text-2xl lg:text-4xl font-bold mb-1">Welcome, {fullName}</h2>
        </div>
      </div>

      <div className="mt-6 space-y-4 text-center lg:text-left w-full lg:w-2/3 mx-auto">
        <p className="text-2xl font-medium dark:font-bold italic text-custom-brown dark:text-slate-300">
          Student Profile
        </p>
        <div className="bg-custom-orange dark:bg-slate-500 bg-opacity-20 p-3 rounded-md">
          <p className="text-lg font-bold">
            <strong>Name:</strong> {fullName}
          </p>
        </div>
        <div className="bg-custom-orange dark:bg-slate-500 bg-opacity-20 p-3 rounded-md">
          <p className="text-lg font-bold">
            <strong>Email:</strong> {email}
          </p>
        </div>
        <div className="bg-custom-orange dark:bg-slate-500 bg-opacity-20 p-3 rounded-md">
          <p className="text-lg font-bold">
            <strong>Phone:</strong> {phone}
          </p>
        </div>
        <div className="bg-custom-orange dark:bg-slate-500 bg-opacity-20 p-3 rounded-md">
          <p className="text-lg font-bold">
            <strong>Role:</strong> {role}
          </p>
        </div>
        <div className="bg-custom-orange dark:bg-slate-500 bg-opacity-20 p-3 rounded-md">
          <p className="text-lg font-bold">
            <strong>Enrolled Courses:</strong> {Buycourses.length > 0 ? Buycourses.join(", ") : "None"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
