import { createAsyncThunk } from "@reduxjs/toolkit";
import Mission from "../../../../types/Mission";
import axios from "axios";

const BASE_URL: string = 'http://localhost:5000';

interface responseData {
    mission: Mission
    message: string
  }

const createMission = createAsyncThunk('missions/create', async (mission: Partial<Mission>, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${BASE_URL}/missions/mission`, mission);
        if (response === undefined) {
            throw new Error('Cannot create mission');
        }
        const responseData: responseData = response.data;
        return responseData;
    } catch (error) {
        return rejectWithValue(error instanceof Error ? error.message : 'An error happened');
    }
});

export default createMission;