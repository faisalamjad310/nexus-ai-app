import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModelsState {
  searchQuery: string;
  activeFilter: string;
  activeLab: string;
  priceRange: number;
  minRating: string;
}

const initialState: ModelsState = {
  searchQuery: '',
  activeFilter: 'all',
  activeLab: 'all',
  priceRange: 100,
  minRating: 'any',
};

const modelsSlice = createSlice({
  name: 'models',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setActiveFilter(state, action: PayloadAction<string>) {
      state.activeFilter = action.payload;
    },
    setActiveLab(state, action: PayloadAction<string>) {
      state.activeLab = action.payload;
    },
    setPriceRange(state, action: PayloadAction<number>) {
      state.priceRange = action.payload;
    },
    setMinRating(state, action: PayloadAction<string>) {
      state.minRating = action.payload;
    },
    clearLabFilter(state) {
      state.activeLab = 'all';
    },
  },
});

export const { setSearchQuery, setActiveFilter, setActiveLab, setPriceRange, setMinRating, clearLabFilter } = modelsSlice.actions;
export default modelsSlice.reducer;
