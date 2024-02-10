import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
const PostContext = createContext();

const PostContextProvider = ({ children }) => {
    const [posts, setPosts]= useState([])


  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

const usePostContext = () => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error(
      "useUserContext must be within a UserContextProvider. Make sure the component is wrapped in UserContextProvider"
    );
  }
  return context;
};

export { usePostContext, PostContextProvider };
