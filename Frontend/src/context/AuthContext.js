import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("userInfo");

    if (user) {
      setUserInfo(JSON.parse(user));
    }
  }, []);

  const login = (userData) => {
    setUserInfo(userData);

    localStorage.setItem(
      "userInfo",
      JSON.stringify(userData)
    );
  };

  const logout = () => {
    setUserInfo(null);

    localStorage.removeItem("userInfo");
  };

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};