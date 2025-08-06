import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: false,
  searchQuery: '',
  isSidebar: true
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    ToggleSidebar: (state, action) => {
        state.isSidebar = !state.isSidebar
    }
  }
});

export const { toggleDarkMode, setSearchQuery, ToggleSidebar } = uiSlice.actions;
export default uiSlice.reducer;