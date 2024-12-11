import { configureStore } from '@reduxjs/toolkit';
import allPlains from './features/planes/slices/planesSlice';
import currentSoldier from './features/soldiers/slices/currentSoldierSlice';
import missions from './features/missions/slices/missionsSlice';

export const store = configureStore({
  reducer: {
    allPlains,
    currentSoldier,
    missions,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
