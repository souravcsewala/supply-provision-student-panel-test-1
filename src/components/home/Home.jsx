import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {


 

  return (
    <div className="w-full h-[100vh] flex justify-center items-center bg-custum-hover-dark">
      <div className="flex flex-col justify-center items-center space-y-28">
        <img src="./logo.png" alt="logo" className="w-64"/>
        <h1 className="text-white text-xl uppercase font-bold tracking-widest">Supply Provision student panel</h1>
        <Link to="/student/dashboard" className="border border-orange-500 text-gray-300 uppercase flex items-center justify-center font-medium px-4 py-2 rounded text-xs">
          Go To Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Home;
