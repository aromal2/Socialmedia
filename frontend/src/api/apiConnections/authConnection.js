import baseURL from "../api";

export const signUp = async (values) => {
  try {
    const response = await baseURL.post("/auth/signup", values);
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made, but the server responded with an error status code
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    } else if (error.request) {
      // The request was made, but no response was received
      console.error("No response received. Request:", error.request);
    } else {
      // Something else happened while setting up the request
      console.error("Error:", error.message);
    }
    // Handle the error as needed or rethrow it
    throw error;
  }
};

export const signIn = async (values) => {
  try {
    const response = await baseURL.post("/auth/login", values);
    return response?.data;
  } catch (error) {
    throw new Error(error);
  }
};
