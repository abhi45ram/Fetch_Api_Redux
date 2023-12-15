import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
} from '../reducers/dataReducers';
// import axiosInstance from '../../axiosInstance';

export const fetchBatteryData = createAsyncThunk(
  'data/fetchData',
  async (_, { dispatch }) => {
    dispatch(fetchDataStart());
    try {
      // const response = await axios.get('https://cors-anywhere.herokuapp.com/https://dev.electorq.com/dummy/battery');
      const response = await axios.get('https://dev.electorq.com/dummy/battery');
      
      console.log(response.data.body);
      dispatch(fetchDataSuccess(response.data.body));
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
  }
);
