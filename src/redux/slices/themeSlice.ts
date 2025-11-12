import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ThemeMode = 'light' | 'dark';

interface ThemeState {
  mode: ThemeMode;
  isInitialized: boolean;
}

const initialState: ThemeState = {
  mode: 'light',
  isInitialized: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
    },
    initializeTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      state.isInitialized = true;
    },
    resetTheme: (state) => {
      state.mode = 'light';
      state.isInitialized = true;
    },
  },
});

export const { toggleTheme, setTheme, initializeTheme, resetTheme } = themeSlice.actions;
export default themeSlice.reducer;
