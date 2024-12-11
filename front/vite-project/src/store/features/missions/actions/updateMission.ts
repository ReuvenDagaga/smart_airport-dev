import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Mission from '../../../../types/Mission';

const BASE_URL: string = 'http://localhost:5000';

interface requestData {
  id: string;
  status: 'pending' | 'completed';
}

interface ResponseData {
  message: string;
  mission: Mission;
}

const updateMission = createAsyncThunk('missions/updateOne', async (requestData: requestData, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${BASE_URL}/missions/updateMissionStatus/${requestData.id}`, requestData.status);
    if (response === undefined) {
      throw new Error('Cannot update mission');
    }
    const responseData: ResponseData = response.data;
    return responseData;
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'An error happened');
  }
});

export default updateMission;
