import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  industries: any[];
  statuses: any[];
  intiatives: any[];
}

const initialState: CounterState = {
  industries: [],
  statuses: [],
  intiatives: [],
};

const OrganizationSlice = createSlice({
  name: "insData",
  initialState,
  reducers: {
    handleIndustries: (state, action) => {
      state.industries = action.payload;
    },
    handleSatatuses: (state, action) => {
      state.statuses = action.payload;
    },
    handleIntiative: (state, action) => {
      state.intiatives = action.payload;
    },
  },
});

export const { handleIndustries, handleSatatuses, handleIntiative } =
  OrganizationSlice.actions;

export default OrganizationSlice.reducer;
