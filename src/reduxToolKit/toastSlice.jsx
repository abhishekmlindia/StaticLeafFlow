import { createSlice } from '@reduxjs/toolkit';

export const toastSlice = createSlice({
  name: 'toast',
  initialState: {
    show: false,
    message: '',
    variant: 'success',
   icon: 'bi bi-check-circle-fill',//Succes icon
   //icon: 'bi bi-x-circle-fill',//Danger icon
   //icon: 'bi bi-exclamation-circle-fill',//Warning icon
  },
  reducers: {
    showToast: (state, action) => {
      state.show = true;
      state.message = action.payload.message;
      state.variant = action.payload.variant || 'success';
    },
    hideToast: (state) => {
      state.show = false;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;

export default toastSlice.reducer;