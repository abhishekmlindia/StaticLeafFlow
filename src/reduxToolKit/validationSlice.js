import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  warningDetails: [],
  errorDetails: [],
};

const validationSlice = createSlice({
  name: 'validationData',
  initialState,
  reducers: {
    getWarningDetails: (state, action) => {
      state.warningDetails = action.payload;
    },
    getErrorDetails: (state, action) => {
      state.errorDetails = action.payload;
    },
    clearValidationData: (state) => {
      state.warningDetails = [];
      state.errorDetails = [];
    }
  },
});

export const { getWarningDetails, getErrorDetails, clearValidationData } = validationSlice.actions;
export default validationSlice.reducer;