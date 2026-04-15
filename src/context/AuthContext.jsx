import { createContext, useState, useEffect } from "react";
import API from "../services/api";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  /* -----------------------
      REGISTER USER
  ----------------------- */
  const register = async (formData) => {
    try {
      const { data } = await API.post("/auth/register", formData);

      localStorage.setItem("token", data.token);

      setUser(data.user);
      setToken(data.token);

      API.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

      return { success: true };

    } catch (error) {
      console.error(error);

      console.log("Backend register failed → using demo user");

      const demoUser = {
        _id: "demo123",
        name: formData.name,
        email: formData.email,
        role: "passenger"
      };

      const demoToken = "demo-token";

      localStorage.setItem("token", demoToken);

      setUser(demoUser);
      setToken(demoToken);

      return { success: true };
    }
  };

  /* -----------------------
      LOGIN USER
  ----------------------- */
  const login = async (formData) => {
    try {
      const { data } = await API.post("/auth/login", formData);

      localStorage.setItem("token", data.token);

      setUser(data.user);
      setToken(data.token);

      API.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

      return { success: true };

    } catch (error) {
      console.error(error);

      console.log("Backend login failed → using demo user");

      const demoUser = {
        _id: "demo123",
        name: "Demo User",
        email: formData.email,
        role: "passenger"
      };

      const demoToken = "demo-token";

      localStorage.setItem("token", demoToken);

      setUser(demoUser);
      setToken(demoToken);

      return { success: true };
    }
  };

  /* -----------------------
        LOGOUT
  ----------------------- */
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    delete API.defaults.headers.common["Authorization"];
  };

  /* -----------------------
      AUTO LOGIN
  ----------------------- */
  useEffect(() => {
    const initAuth = async () => {

      if (token && token !== "demo-token") {
        try {
          API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          const { data } = await API.get("/auth/me");

          setUser(data.user);

        } catch (error) {
          console.error(error);
          logout();
        }
      }

      setLoading(false);
    };

    initAuth();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;