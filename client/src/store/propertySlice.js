import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  properties: [],
  loading: false,
  error: null,
  selectedproperty: null
};

const propertySlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    setProperties: (state, action) => {
      state.properties = action.payload.data || [];
    },
    setSelectedProperty: (state, action) => {
      state.selectedproperty = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { 
  setProperties, 
  setSelectedProperty,
  setLoading, 
  setError 
} = propertySlice.actions;

export default propertySlice.reducer;