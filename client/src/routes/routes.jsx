import React from "react";
import { Route, Routes } from "react-router-dom";
import UserAuthForm from "../pages/UserAuthForm";
import Home from "../pages/Home";
import MyPost from "../pages/MyPost";
import ChatPage from "../pages/ChatPage";
import VerifyEmail from "../pages/VerifyEmail";
import PrivateRoute from "./PrivateRoutes";
import PublicRoute from "./PublicRoutes";
import AlumniConnect from "../pages/AlumniConnect";
export default function CustomRoutes() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/mypost/:userId"
          element={
            <PrivateRoute>
              <MyPost />
            </PrivateRoute>
          }
        />

        <Route
          path="/channel"
          element={
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/alumniconnect"
          element={
            <PrivateRoute>
              <AlumniConnect />
            </PrivateRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <UserAuthForm type="register" />
            </PublicRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <UserAuthForm type="login" />
            </PublicRoute>
          }
        />

        <Route path="/verify" element={<VerifyEmail />} />

        <Route
          path="/forgot-password"
          element={<UserAuthForm type="forgot-password" />}
        />
      </Routes>
    </>
  );
}
