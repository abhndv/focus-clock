import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTimerId, decrementTime, clearTimer, setTime, setRunning } from "../store/timerSlice";

function Timer() {
  const time = useSelector((state) => state.timer.time);
  const timer = useSelector((state) => state.timer.timer);
  const running = useSelector((state) => state.timer.running);

  const dispatch = useDispatch();

  const displayTime = () => {
    const m = parseInt(time / 60)
      .toString()
      .padStart(2, 0);
    const s = parseInt(time % 60)
      .toString()
      .padStart(2, 0);
    return m + ":" + s;
  };

  //   const pauseTimer = () => {
  //     if (running) {
  //       clearInterval(intervalRef.current);
  //       dispatch(setRunning(false));
  //     } else {
  //       startTimer();
  //       dispatch(setRunning(true));
  //     }
  //   };

  useEffect(() => {
    if (time < 0) dispatch(clearTimer());
  }, [time]);

  useEffect(() => {
    if (running) {
      clearInterval(timer);
      const id = setInterval(() => {
        dispatch(decrementTime());
      }, 1000);
      dispatch(setTimerId(id));
    }
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center relative">
      <button
        className="absolute top-0 left-0 block px-4 py-2 text-center mt-5 rounded-sm border-secondary-400 border"
        onClick={() => {
          dispatch(setTime(0));
          dispatch(setRunning(false));
        }}
      >
        Go back
      </button>
      <h1 className="font-bold text-7xl sm:text-9xl lg:text-[180px] xl:text-[240px] text-secondary-400 mt-4 mb-10">
        {displayTime(time)}
      </h1>
    </div>
  );
}

export default Timer;
