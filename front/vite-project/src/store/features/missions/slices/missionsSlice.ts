import { createSlice } from '@reduxjs/toolkit';
import Mission from '../../../../types/Mission';
import createMission from '../actions/createMission';
import getAllMissions from '../actions/getAllMissions';
import updateMission from '../actions/updateMission';

interface MissionsState {
  missions: Mission[];
  loading: boolean;
  error: string | null;
}

const initialState: MissionsState = {
  missions: [],
  loading: false,
  error: null,
};

const missionsSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createMission.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMission.fulfilled, (state, action) => {
        state.loading = false;
        state.missions.push(action.payload.mission);
      })
      .addCase(createMission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(getAllMissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllMissions.fulfilled, (state, action) => {
        state.loading = false;
        state.missions = action.payload;
      })
      .addCase(getAllMissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(updateMission.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMission.fulfilled, (state, action) => {
        state.loading = false;
        const index: number = state.missions.findIndex((mission) => mission.id === action.payload.mission.id);
        if (index !== -1) {
          state.missions[index] = action.payload.mission;
        }
      })
      .addCase(updateMission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default missionsSlice.reducer;
