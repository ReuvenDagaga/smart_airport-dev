import { createSlice } from '@reduxjs/toolkit';
import loginSoldier from '../actions/loginSoldier';
import registerSoldier from '../actions/registerSoldier';
import Soldier from '../../../../types/Soldier';

export interface CurrentSoldierState {
  soldier: Soldier | null;
  loading: boolean;
  error: string | null;
  token: string | null;
}

const initialState: CurrentSoldierState = {
  soldier: null,
  loading: false,
  error: null,
  token: null,
};

const currentSoldierSlice = createSlice({
  name: 'currentSoldier',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginSoldier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginSoldier.fulfilled, (state, action) => {
        state.loading = false;
        state.soldier = action.payload.soldier;
        state.token = action.payload.token;
      })
      .addCase(loginSoldier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(registerSoldier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerSoldier.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        
        
      })
      .addCase(registerSoldier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
    })
  },
});

export default currentSoldierSlice.reducer;
