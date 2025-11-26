import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchProfile = async (accessToken) => {
    
    const { data } = await axios.get(`${baseUrl}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    setUser(data);
  };

  const login = async (credentail) => {
    try {
      const { data } = await axios.post(`${baseUrl}/auth/login`, credentail);
      console.log(data);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      
      
      await fetchProfile(data.accessToken); 
      
      toast.success(`Login successful! Welcome back, ${data.user.name}!`);
      navigate("/"); 
      
    } catch (error) {
      console.error("login:", error);
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    toast.info("Logged out successfully");
    navigate("/login");
  };

  useEffect(() => {
    
    const profile = async (tokenToUse) => {
      try {
        const { data } = await axios.get(`${baseUrl}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${tokenToUse}`,
          },
        });
        console.log(data);
        setUser(data);
      } catch (error) {
        console.log("Profile fetch failed:", error);

        if (error.response?.data.error === "jwt expired") {
          console.log("Access token expired, attempting to refresh...");
          await token();
        } else if (error.response?.status === 401) {
          console.log(
            "Refresh token also invalid or profile access unauthorized. Logging out."
          );
          // 🎯 When refresh token is invalid, ensure user is fully logged out
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          setUser(null);
        }
      }
    };

    
    const token = async () => {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        console.log("No refresh token found. User needs to log in.");
        return;
      }

      try {
        const { data } = await axios.get(`${baseUrl}/auth/refreshtoken`, {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });

        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        console.log("Tokens refreshed successfully. Retrying profile fetch.");
        // The subsequent call to `profile` will set the user state, fixing navigation
        await profile(data.accessToken); 
      } catch (error) {
        console.log("Token refresh failed:", error);
        // 🎯 On refresh failure, ensure tokens are cleared
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser(null);
      }
    };

    const initialAccessToken = localStorage.getItem("accessToken");

    if (initialAccessToken) {
      profile(initialAccessToken);
    } else {
      token();
    }
  }, []);

  const value = { login, user, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};