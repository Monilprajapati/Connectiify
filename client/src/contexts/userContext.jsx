import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [channels, setChannels] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [token, setToken] = useState(() => {
    const token = localStorage.getItem("token");
    return token;
  });
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );


  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
        channels,
        setChannels,
        open,
        setOpen,
        Loading,
        setLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(
      "useUserContext must be within a UserContextProvider. Make sure the component is wrapped in UserContextProvider"
    );
  }
  return context;
};

export { useUserContext, UserContextProvider };
