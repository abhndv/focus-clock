import { useSelector, useDispatch } from "react-redux";
import { setMinutes, setSeconds, startTimer, clearTimer, resetTimer } from "../store/timerSlice";

function TimerForm() {
  const dispatch = useDispatch();

  const min = useSelector((state) => state.timer.minutes);
  const sec = useSelector((state) => state.timer.seconds);

  const startClick = () => {
    const iTime = parseInt(min * 60) + parseInt(sec);
    dispatch(startTimer(iTime));
  };

  const emptyTimer = () => {
    dispatch(resetTimer());
  };

  return (
    <div className="w-1/4 min-w-fit">
      <div className="flex flex-col mt-2">
        <label className="block mb-3 text-slate-300">Minutes</label>
        <input
          className="px-3 py-2 text-2xl border border-tertiary rounded-sm bg-tertiary outline-none text-center"
          type="number"
          key="minutes"
          value={min}
          onChange={(e) => {
            dispatch(setMinutes(e.target.value));
          }}
        />
      </div>
      <div className="flex flex-col mt-2">
        <label className="block mb-3 text-slate-300">Seconds</label>
        <input
          className="px-3 py-2 text-2xl border border-tertiary rounded-sm bg-tertiary outline-none text-center"
          type="number"
          key="seconds"
          value={sec}
          onChange={(e) => {
            dispatch(setSeconds(e.target.value));
          }}
        />
      </div>
      <div className="flex flex-row-reverse gap-5 mt-6">
        <button
          className="block px-3 py-3 text-center w-full mt-5 rounded-sm bg-secondary-400 transition-all duration-300 text-primary-400 hover:bg-secondary-600"
          onClick={startClick}
        >
          Start
        </button>
        <button
          className="block px-3 py-3 text-center w-full mt-5 rounded-sm border-secondary-400 transition-all duration-300 bg-primary-400 border hover:bg-primary-600"
          onClick={emptyTimer}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
export default TimerForm;
