import { createAsyncThunk } from '@reduxjs/toolkit';
import Plane from '../../../../types/Plane';
import axios from 'axios';

const BASE_URL: string = 'http://localhost:5000';

const getAllPlains = createAsyncThunk('plains/getall', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/planes/planes`);
    if (response === undefined) {
      throw new Error('Cannot get planes from server');
    }
    const responseData: Plane[] = response.data;

    return responseData;
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'An error happened');
  }
});

export default getAllPlains;
