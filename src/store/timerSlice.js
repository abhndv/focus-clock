import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  time: 0,
  minutes: 0,
  seconds: 0,
  running: false,
};

export const timerSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    resetTimer: (state) => {
      state = { ...state, ...initialState };
    },
    decrementTime: (state) => {
      state.time -= 1;
    },
    setTime: (state, action) => {
      state.time = action.payload;
    },
    setMinutes: (state, action) => {
      state.minutes = action.payload;
    },
    setSeconds: (state, action) => {
      state.seconds = action.payload;
    },
    setRunning: (state, action) => {
      state.running = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { resetTimer, decrementTime, setMinutes, setSeconds, setTime, setRunning } = timerSlice.actions;

export default timerSlice.reducer;
