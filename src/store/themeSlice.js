import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  background: "#FFB6C1",
  textColor: "#0C0705",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    resetTheme: (state) => {
      state = { ...state, ...initialState };
    },
    setBackground: (state, action) => {
      state.background = action.payload;
    },
    setTextColor: (state, action) => {
      state.textColor = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { resetTheme, setBackground, setTextColor } = themeSlice.actions;

export default themeSlice.reducer;
