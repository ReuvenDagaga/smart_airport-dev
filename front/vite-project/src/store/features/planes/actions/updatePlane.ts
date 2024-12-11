import { createAsyncThunk } from '@reduxjs/toolkit';
import Plane from '../../../../types/Plane';
import axios from 'axios';

const BASE_URL: string = 'http://localhost:5000';

const updatePlain = createAsyncThunk('plains/updateOne', async (updatedPlane: Plane, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${BASE_URL}/planes/planes/${updatedPlane.id}`, updatedPlane);
    if (response === undefined) {
      throw new Error('Cannot update plain');
    }
    const responseData: Plane = response.data;
    return responseData;
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'An error happened');
  }
});

export default updatePlain;
