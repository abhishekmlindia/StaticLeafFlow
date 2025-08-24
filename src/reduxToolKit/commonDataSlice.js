import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dslId: "",
  entryMode: "",
  pslNo: "",
  companyName: "",
};

const commonDataSlice = createSlice({
  name: "commonData",
  initialState,
  reducers: {
    getDslId: (state, action) => {
      state.dslId = action.payload;
    },
    getEntryMode: (state, action) => {
      state.entryMode = action.payload;
    },
    getPslNo: (state, action) => {
      state.pslNo = action.payload;
    },
    getCompanyName: (state, action) => {
      state.companyName = action.payload;
    },
  },
});

export const { getDslId, getEntryMode, getPslNo, getCompanyName } =
  commonDataSlice.actions;

export default commonDataSlice.reducer;
