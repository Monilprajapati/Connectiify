import React, { useState } from "react";
import InputBox from "../components/InputBox";
import { Link } from "react-router-dom";
import AnimationWrapper from "../common/AnimationWrapper";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import authUser from "../services/authServices";
import { setIsAuthenticated, checkAuthStatus } from "../app/slices/authSlice";
import { useDispatch } from "react-redux";

const UserAuthForm = ({ type }) => {
  const [formData, setFormData] = useState({
    role: "user",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const userAuth = async (serverRoute, formData) => {
    if (serverRoute === "login") {
      try {
        const data = await authUser(serverRoute, formData);
        const response = data;
        console.log("Login : ", data);
        toast.success(response.message, {
          duration: 900,
        });
        setTimeout(() => {
          localStorage.setItem("token", response.data.token);
          dispatch(setIsAuthenticated(true));
          dispatch(checkAuthStatus({ dispatch, navigate }));
        }, 900);
      } catch (error) {
        console.log("Error : ", error);
        if (error.response.data.message == "User is not verified") {
          toast.error(error.response.data.message);
          localStorage.setItem("token", error.response.data.data);
          setTimeout(() => {
            navigate("/verify");
          }, 900);
        } else {
          toast.error(error.response.data.message, {
            duration: 900,
          });
        }
      }
    } else {
      try {
        const response = await authUser(serverRoute, formData);
        toast.success(response.message, {
          duration: 900,
        });
        console.log("Data : ", response.data.token);
        localStorage.setItem("token", response.data.token);
        setTimeout(() => {
          navigate("/verify");
        }, 900);
      } catch (error) {
        let { response } = error;
        response = response.data;
        toast.error(response.message, {
          duration: 900,
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let serverRoute = type === "login" ? "login" : "register";

    const { email, password } = formData;
    if (!email.length) {
      return toast.error("Email is required");
    }
    if (!emailRegex.test(email)) {
      return toast.error("Email is not valid");
    }
    if (!password.length) {
      return toast.error("Password is required");
    }
    if (!passwordRegex.test(password)) {
      return toast.error(
        "Password must be between 6 to 20 characters and contain at least one numeric digit, one uppercase and one lowercase letter"
      );
    }
    if (type === "register") {
      if (!formData.confirmPassword.length) {
        return toast.error("Confirm Password is required");
      }
      if (formData.confirmPassword !== formData.password) {
        return toast.error("Password and Confirm Password must be same");
      }
    }
    if (password.length && email.length) {
      userAuth(serverRoute, formData);
    }
  };

  const handleTestCredentials = () => {
    setFormData({
      ...formData,
      email: "monilprajapati30@gmail.com",
      password: "123@Abc"
    });
  };

  return (
    <AnimationWrapper keyValue={type}>
      <section className="h-cover flex flex-col items-center justify-center">
        <Toaster />
        <form
          className="max-h-[400px] min-w-[350px] md:min-w-[400px]"
          onSubmit={handleSubmit}
        >
          <h1 className="text-4xl font-lato capitalize text-center mb-24">
            {type === "login" ? "Welcome back" : "Create an account"}
          </h1>
          {/* <div className="mb-4">{type === "register" ? <RoleDropdown /> : null}</div> */}
          <InputBox
            name="email"
            type="email"
            id="email"
            value={formData.email}
            placeholder="Email"
            icon="email"
            handleChange={handleChange}
          />
          <InputBox
            name="password"
            type="password"
            id="password"
            value={formData.password}
            placeholder="Password"
            icon="password"
            handleChange={handleChange}
          />
          {type === "register" ? (
            <InputBox
              name="confirmPassword"
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              placeholder="Confirm Password"
              icon="password"
              handleChange={handleChange}
            />
          ) : null}
          <button className="btn-dark mt-11 center" onClick={handleSubmit}>
            {type}
          </button>

          {type === "login" && (
            <button 
              type="button"
              className="btn-light mt-4 center"
              onClick={handleTestCredentials}
            >
              Use Test Credentials
            </button>
          )}

          <p className="mt-14 text-dark-grey text-xl text-center">
            {type === "login" ? (
              <>
                Don't have an account?
                <Link
                  to="/register"
                  className="underline text-black text-xl ml-1"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                Already have an account?
                <Link to="/login" className="underline text-black text-xl ml-1">
                  Login
                </Link>
              </>
            )}
          </p>
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default UserAuthForm;
