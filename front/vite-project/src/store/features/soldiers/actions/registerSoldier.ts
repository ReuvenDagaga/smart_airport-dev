import { createAsyncThunk } from '@reduxjs/toolkit';
import Soldier from '../../../../types/Soldier';
import axios from 'axios';

const BASE_URL: string = 'http://localhost:5000';

const registerSoldier = createAsyncThunk(
  'soldiers/register',
  async (soldier: Partial<Soldier>, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/soldiers/register`, soldier);
      if (response === undefined) {
        throw new Error('Cannot register');
      }

      const responseData: string = response.data;

      return responseData;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'An error happened');
    }
  }
);

export default registerSoldier;
