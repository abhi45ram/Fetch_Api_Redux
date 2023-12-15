import { configureStore } from '@reduxjs/toolkit';
// import dataReducer from './reducers/dataReducer';
import paginationSlice from './slices/paginationSlice';
import dataReducers from './reducers/dataReducers';

const store = configureStore({
  reducer: {
    data: dataReducers,
    pagination: paginationSlice, 
  },
});

export default store;
