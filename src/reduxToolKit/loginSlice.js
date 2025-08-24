import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: {},
  microserviceData: [],
  permissionDetails: []
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.userDetails = action.payload;
    },
    getMicroserviceData: (state, action) => {
      state.microserviceData = action.payload;
    },
    getPermission: (state, action) => {
      state.permissionDetails = action.payload;
    }
  },
});

export const { getUser } = loginSlice.actions;
export const { getMicroserviceData } = loginSlice.actions;
export const { getPermission } = loginSlice.actions;

export default loginSlice.reducer;