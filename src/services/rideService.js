import API from "./api";

/* ---------------------------
   Create Ride
--------------------------- */
export const createRide = async (rideData) => {
  try {
    const response = await API.post("/rides", rideData);

    return {
      success: true,
      data: response.data,
      message: "Ride created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to create ride",
    };
  }
};

/* ---------------------------
   Search Rides
--------------------------- */
export const searchRides = async (queryParams) => {
  try {
    const response = await API.get("/rides/search", {
      params: queryParams,
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to search rides",
    };
  }
};

/* ---------------------------
   Get Ride Details
--------------------------- */
export const getRideDetails = async (rideId) => {
  try {
    const response = await API.get(`/rides/${rideId}`);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to fetch ride details",
    };
  }
};

/* ---------------------------
   Join Ride
--------------------------- */
export const joinRide = async (rideId) => {
  try {
    const response = await API.post(`/rides/${rideId}/join`);

    return {
      success: true,
      data: response.data,
      message: "Successfully joined ride",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Unable to join ride",
    };
  }
};

/* ---------------------------
   Cancel Ride
--------------------------- */
export const cancelRide = async (rideId) => {
  try {
    const response = await API.delete(`/rides/${rideId}`);

    return {
      success: true,
      data: response.data,
      message: "Ride cancelled successfully",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to cancel ride",
    };
  }
};