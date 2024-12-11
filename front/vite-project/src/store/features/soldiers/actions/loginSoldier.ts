import { createAsyncThunk } from '@reduxjs/toolkit';
import Soldier from '../../../../types/Soldier';
import axios from 'axios';

export interface LoginResponse {
  token: string;
  role: 'commander' | 'technician' | 'controller' | 'armorer';
  soldier: Soldier;
}

const BASE_URL: string = 'http://localhost:5000';

const loginSoldier = createAsyncThunk('soldiers/login', async (soldier: Partial<Soldier>, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/soldiers/login`, soldier);
    if (response === undefined) {
      throw new Error('Cannot login');
    }

    const responseData: LoginResponse = response.data;

    return responseData;
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'An error happened');
  }
});

export default loginSoldier;
