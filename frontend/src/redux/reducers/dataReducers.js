import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [], 
  loading: false, 
  error: null, 
};

// this slice for managing data-related state using Redux Toolkit
const dataSlice = createSlice({
  name: 'data', 
  initialState, 
  reducers: {
    fetchDataStart(state) {
      state.loading = true; 
      state.error = null; 
    },

    // this Reducer function will handle successful data fetching
    fetchDataSuccess(state, action) {
      state.loading = false; 
      state.data = action.payload; 
    },

    // this Reducer function will handle data fetching failure
    fetchDataFailure(state, action) {
      state.loading = false; 
      state.error = action.payload; 
    },
  },
});

export const {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
} = dataSlice.actions;

export default dataSlice.reducer;
