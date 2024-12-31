import { createSlice } from "@reduxjs/toolkit";

// Load persisted state from localStorage
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("authState");
    return serializedState ? JSON.parse(serializedState) : null;
  } catch (err) {
    console.error("Error loading state from localStorage", err);
    return null;
  }
};

// Initial state
const persistedState = loadFromLocalStorage() || {
  isAuthenticated: false,
  role: "",
  fullName: "",
  email: "",
  id: "",
  accessToken: "",
  Buycourses: [],
  profileimage: null,
  phone: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: persistedState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.role = action.payload.user.role;
      state.fullName = action.payload.user.name;
      state.email = action.payload.user.email;
      state.id = action.payload.user._id;
      state.accessToken = action.payload.token;
      state.Buycourses = action.payload.user.Buycourses;
      state.profileimage = action.payload.user.profileimage.url;
      state.phone = action.payload.user.phone;

      // Save to localStorage
      localStorage.setItem("authState", JSON.stringify(state));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.role = "";
      state.fullName = "";
      state.email = "";
      state.id = "";
      state.accessToken = "";
      state.Buycourses = [];
      state.profileimage = null;
      state.phone = "";

      // Clear localStorage
      localStorage.removeItem("authState");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
