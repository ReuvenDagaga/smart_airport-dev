import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Mission from "../../../../types/Mission";


const BASE_URL: string = 'http://localhost:5000';

const getAllMissions = createAsyncThunk('missions/getall', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${BASE_URL}/missions/missions`);
        if (response === undefined) {
            throw new Error('Cannot get missions from server');
        }
        const responseData: Mission[] = response.data['missions'];

        return responseData;
    } catch (error) {
        return rejectWithValue(error instanceof Error ? error.message : 'An error happened');
    }
});


export default getAllMissions;