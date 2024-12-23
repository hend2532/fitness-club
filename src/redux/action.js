export const login = (userData) => {
    return {
      type: "LOGIN",
      payload: userData,
    };
  };

  export const logout = () => {
    return {
      type: "LOGOUT",
    };
  };

  export const updateProfile = (updatedData) => {
    return {
      type: "UPDATE_PROFILE",
      payload: updatedData,
    };
  };
  
 
  