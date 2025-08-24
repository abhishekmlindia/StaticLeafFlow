import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  companyTypeList: [],
  companyList: [],
  countryList: [],
  programList: [],
  currencyList: []
};

const masterDataSlice = createSlice({
  name: "masterData",
  initialState,
  reducers: {
    getCompanyTypeList: (state, action) => {
      state.companyTypeList = action.payload;
    },
    getCompanyList: (state, action) => {
      state.companyList = action.payload;
    },
    getCountryList: (state, action) => {
      state.countryList = action.payload;
    },
    getProgramList: (state, action) => {
      state.programList = action.payload;
    },
    getCurrencyList: (state, action) => {
      state.currencyList = action.payload;
    }
  },
});

export const { getCompanyTypeList } = masterDataSlice.actions;
export const { getCompanyList } = masterDataSlice.actions;
export const { getCountryList } = masterDataSlice.actions;
export const { getProgramList } = masterDataSlice.actions;
export const { getCurrencyList } = masterDataSlice.actions;

export default masterDataSlice.reducer;