import React from "react";
import cf from "../assets/cf.png"
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)] overflow-hidden gap-6 md:gap-10 -mb-40 w-full items-center justify-center">
      <div className="px-10 flex flex-col gap-6 mt-10">
        <h1 className="text-4xl font-lato font-semibold capitalize text-center">
          Welcome to the Connectiify
        </h1>
        <p className="text-lg font-plusSans capitalize text-center px-10">
        Connectiify is a secure web platform where college students can anonymously connect, share experiences, seek advice, and engage in discussions with peers from the same institution.
        </p>
        <div className="buttons mt-2 md:mt-5 font-medium flex gap-4 items-center justify-center">
            <Link to="/login" className="btn-dark">
                Login
            </Link>
            <Link to="/register" className="btn-light">
                Register
            </Link>
        </div>
      </div>
        <img src={cf} alt="cf" className=" md:w-2/3 lg:w-1/2" />
    </div>
  );
};

export default Dashboard;
