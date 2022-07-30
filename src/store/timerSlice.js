import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  time: 0,
  isFlipTimer: false,
  minutes: 0,
  seconds: 0,
  running: false,
};

export const timerSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    startTimer: (state, action) => {
      const iTime = action.payload;
      return { ...state, time: iTime || 0, running: true };
    },
    clearTimer: (state) => {
      let time = state.time;
      if (time != 0) time = 0;
      return { ...state, time };
    },
    resetTimer: (state) => {
      return { ...state, ...initialState };
    },
    decrementTime: (state) => {
      let time = state.time;
      if (time > 0) time -= 1;
      else time = 0;
      return { ...state, time };
    },
    setTime: (state, action) => {
      return { ...state, time: action.payload };
    },
    setMinutes: (state, action) => {
      return { ...state, minutes: action.payload };
    },
    setSeconds: (state, action) => {
      return { ...state, seconds: action.payload };
    },
    setRunning: (state, action) => {
      return { ...state, running: action.payload };
    },
    setFlipTimer: (state, action) => {
      return { ...state, isFlipTimer: action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  startTimer,
  clearTimer,
  resetTimer,
  decrementTime,
  setMinutes,
  setSeconds,
  setTime,
  setRunning,
  setFlipTimer,
} = timerSlice.actions;

export default timerSlice.reducer;
