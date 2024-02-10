import React from "react";
import {  useNavigate } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { VscVerified } from "react-icons/vsc";


const VerifyEmail = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-70px)] flex-wrap">
      <div className="mb-4">
        <VscVerified size={100} className="text-darkGreen" />
      </div>
      <div className="text-center lg:w-[500px] md:w-[400px] w-[300px]">
        <h2 className="md:text-3xl font-bold mb-4 text-xl">
          Verify your email address
        </h2>
        <p className="text-gray-600 ">
          To start using Campus vibez, confirm your email address</p>
      </div>
      <div className="flex space-x-8 flex-wrap items-center lg:w-[500px] md:w-[400px] w-[300px]">
        <button
          onClick={() => {
            navigate("/login");
          }}
          className="flex-1 flex items-center justify-center gap-3  bg-black hover:bg-red-700 text-white font-bold py-3  rounded mt-4"
        >
          <MdOutlineKeyboardBackspace size={20} />
          Login
        </button>
        <button className="flex-1 bg-black hover:bg-red-700 text-white font-bold py-3  rounded mt-4">
          Resend email
        </button>
      </div>
      <button
        className="flex bg-black hover:bg-red-700 text-white font-bold py-3 px-6  rounded mt-4"
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/register");
        }}
      >
        Register using another email
      </button>
    </div>
  );
};

export default VerifyEmail;
