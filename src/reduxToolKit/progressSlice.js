import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalFields: 0,
  completedFields: 0,
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    setTotalFields: (state, action) => {
      state.totalFields = action.payload;
    },
    setCompletedFields: (state, action) => {
      state.completedFields = action.payload;
    },
    resetProgress: (state) => {
      state.totalFields = 0;
      state.completedFields = 0;
    },
  },
});

export const { setTotalFields, setCompletedFields, resetProgress } = progressSlice.actions;
export default progressSlice.reducer;
