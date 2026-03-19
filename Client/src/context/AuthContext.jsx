import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo")) || null
  );

  // ✅ Login
  const login = (data) => {
    setUserInfo(data);
    toast.success('Log In Succesfully')

    localStorage.setItem("userInfo", JSON.stringify(data));
  };

  // 🚪 Logout
  const logout = () => {
    setUserInfo(null);
    toast.success('Log Out Succesfully')
    localStorage.removeItem("userInfo");
  };

  return (
    <AuthContext.Provider value={{ userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);