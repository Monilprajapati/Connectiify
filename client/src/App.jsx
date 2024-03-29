import React, { useEffect } from "react";
import CustomRoutes from "./routes/routes";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkAuthStatus } from "./app/slices/authSlice";
import Navbar from "./components/Navbar";
import { UserContextProvider } from "./contexts/userContext";
import { PostContextProvider } from "./contexts/postContext";
import { ChatContextProvider } from "./contexts/chatContext";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  useEffect(() => {
    dispatch(checkAuthStatus({ dispatch, navigate }));
  }, []);

  const isLoading = useSelector((state) => state.authReducer.isLoading);

  return (
    <>
      {isLoading ? (
        <div className="w-screen h-screen flex justify-center items-center">

        </div>
      ) : (
        <>
          <UserContextProvider>
            <PostContextProvider>
              <ChatContextProvider>
                <Navbar />
                <CustomRoutes />
              </ChatContextProvider>
            </PostContextProvider>
          </UserContextProvider>
        </>
      )}
    </>
  );
};

export default App;
