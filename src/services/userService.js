import API from "./api";

/* Get user profile */

export const getUserProfile = async () => {
  try {
    const { data } = await API.get("/users/profile");

    return {
      success: true,
      data: data.user
    };

  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to fetch profile"
    };
  }
};

/* Update user profile */

export const updateUserProfile = async (userData) => {
  try {
    const { data } = await API.put("/users/profile", userData);

    return {
      success: true,
      data: data.user
    };

  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to update profile"
    };
  }
};