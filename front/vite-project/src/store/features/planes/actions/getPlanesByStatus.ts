import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Plane from '../../../../types/Plane';

const BASE_URL: string = 'http://localhost:5000';

const getPlainsByStatus = createAsyncThunk('plains/getByStatus', async (status: string, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/planes/planes/${status}`);
    if (response === undefined) {
      throw new Error('Cannot get planes by status from server');
    }
    const responseData: Plane[] = response.data;
    return responseData;
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'An error happened');
  }
});

export default getPlainsByStatus;
