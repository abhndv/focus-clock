import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrementTime, clearTimer, setTime, setRunning } from "../store/timerSlice";
import { HiArrowLeft } from "react-icons/hi";

function Timer() {
  const time = useSelector((state) => state.timer.time);
  const running = useSelector((state) => state.timer.running);
  const textColor = useSelector((state) => state.theme.textColor);
  const backgroundColor = useSelector((state) => state.theme.background);

  const dispatch = useDispatch();

  const timerId = useRef();
  const stopTimer = () => clearInterval(timerId.current);

  const displayTime = () => {
    const m = parseInt(time / 60)
      .toString()
      .padStart(2, 0);
    const s = parseInt(time % 60)
      .toString()
      .padStart(2, 0);
    return m + ":" + s;
  };

  useEffect(() => {
    if (time == 0 && timerId.current != undefined) stopTimer();
    if (time <= 0) {
      dispatch(clearTimer());
    }
  }, [time]);

  useEffect(() => {
    if (running) {
      stopTimer();
      timerId.current = setInterval(() => {
        dispatch(decrementTime());
      }, 1000);
    }

    return () => stopTimer();
  }, []);

  return (
    <div className="flex flex-1 h-full w-full items-center justify-center relative">
      <button
        className="absolute top-0 left-0 block p-2 rounded-full timer-back"
        onClick={() => {
          dispatch(setTime(0));
          dispatch(setRunning(false));
        }}
        style={{ backgroundColor: textColor }}
      >
        <HiArrowLeft
          className="h-5 w-5 transition-all duration-100 timer-back__icon"
          style={{ color: backgroundColor }}
        />
      </button>
      <h1
        className="font-bold text-7xl sm:text-9xl lg:text-[180px] xl:text-[240px] mt-4 mb-10"
        style={{ color: textColor }}
      >
        {displayTime(time)}
      </h1>
    </div>
  );
}

export default Timer;
