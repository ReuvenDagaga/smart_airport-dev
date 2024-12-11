import { createSlice } from '@reduxjs/toolkit';
import Plane from '../../../../types/Plane';
import getAllPlanes from '../actions/getAllPlanes';
import updatePlane from '../actions/updatePlane';

export interface PlanesState {
  planes: Plane[];
  loading: boolean;
  error: string | null;
}

const initialState: PlanesState = {
  planes: [],
  loading: false,
  error: null,
};

const planesSlice = createSlice({
  name: 'planes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPlanes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPlanes.fulfilled, (state, action) => {
        state.loading = false;
        state.planes = action.payload;
      })
      .addCase(getAllPlanes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(updatePlane.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePlane.fulfilled, (state, action) => {
        state.loading = false;
        const index: number = state.planes.findIndex((plane) => plane.id === action.payload.id);
        if (index !== -1) {
          state.planes[index] = action.payload;
        }
      })
      .addCase(updatePlane.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// export const { setPlains } = plainsSlice.actions;
export default planesSlice.reducer;
