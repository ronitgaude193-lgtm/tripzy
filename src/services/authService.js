import API from "./api";

/* -------------------------
   Register User
------------------------- */
export const registerUser = async (data) => {
  try {
    const response = await API.post("/auth/register", data);

    return {
      success: true,
      data: response.data,
      message: "Registration successful",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Registration failed. Please try again.",
    };
  }
};

/* -------------------------
   Login User
------------------------- */
export const loginUser = async (data) => {
  try {
    const response = await API.post("/auth/login", data);

    const { token, user } = response.data;

    // store token
    localStorage.setItem("token", token);

    return {
      success: true,
      data: { user, token },
      message: "Login successful",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Invalid email or password",
    };
  }
};

/* -------------------------
   Logout User
------------------------- */
export const logoutUser = () => {
  try {
    localStorage.removeItem("token");

    return {
      success: true,
      message: "Logout successful",
    };
  } catch  {
    return {
      success: false,
      message: "Logout failed",
    };
  }
};