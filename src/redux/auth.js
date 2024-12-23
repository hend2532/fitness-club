const initialState = {
  isAuthenticated: sessionStorage.getItem("user") ? true : false,
  user: sessionStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
};

  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case "LOGIN":
        sessionStorage.setItem("user", JSON.stringify(action.payload));
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload,
        };

      case "LOGOUT":
        sessionStorage.removeItem("user");
        return initialState;
        case "UPDATE_PROFILE":
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };  
      default:
        return state;
    }
  };
  
  export default authReducer;
  