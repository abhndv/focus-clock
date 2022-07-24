import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  timer: null,
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
      state.time = iTime || 0;
      state.running = true;
    },
    setTimerId: (state, action) => {
      state.timer = action.payload;
    },
    clearTimer: (state) => {
      if (state.time != 0) state.time = 0;
      if (state.timer) clearInterval(state.timer);
    },
    resetTimer: (state) => {
      state = { ...state, ...initialState };
    },
    decrementTime: (state) => {
      if (!(state.time < 0)) state.time -= 1;
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
    setFlipTimer: (state, action) => {
      state.isFlipTimer = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  startTimer,
  clearTimer,
  resetTimer,
  decrementTime,
  setTimerId,
  setMinutes,
  setSeconds,
  setTime,
  setRunning,
  setFlipTimer,
} = timerSlice.actions;

export default timerSlice.reducer;
