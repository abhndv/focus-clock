import { useSelector, useDispatch } from "react-redux";
import { setMinutes, setSeconds, startTimer, resetTimer } from "../store/timerSlice";

function TimerForm() {
  const dispatch = useDispatch();

  const min = useSelector((state) => state.timer.minutes);
  const sec = useSelector((state) => state.timer.seconds);
  const background = useSelector((state) => state.theme.background);
  const textColor = useSelector((state) => state.theme.textColor);

  const startClick = () => {
    const iTime = parseInt(min * 60) + parseInt(sec);
    if (iTime > 0) dispatch(startTimer(iTime));
  };

  const emptyTimer = () => {
    dispatch(resetTimer());
  };

  return (
    <div className="w-full lg:w-1/4 flex lg:flex-col gap-3 md:gap-5 justify-between min-w-fit">
      <div className="flex flex-col mt-2">
        <label className="block mb-3" style={{ color: textColor }}>
          Minutes
        </label>
        <input
          className="w-full md:w-40 lg:w-64 xl:w-full px-3 py-2 text-2xl border rounded-sm bg-transparent outline-none text-center"
          type="number"
          key="minutes"
          value={min}
          onChange={(e) => {
            dispatch(setMinutes(e.target.value));
          }}
          style={{ borderColor: textColor, color: textColor }}
        />
      </div>
      <div className="flex flex-col mt-2">
        <label className="block mb-3" style={{ color: textColor }}>
          Seconds
        </label>
        <input
          className="w-full md:w-40 lg:w-64 xl:w-full px-3 py-2 text-2xl border rounded-sm bg-transparent outline-none text-center"
          type="number"
          key="seconds"
          value={sec}
          onChange={(e) => {
            dispatch(setSeconds(e.target.value));
          }}
          style={{ borderColor: textColor, color: textColor }}
        />
      </div>
      <div className="flex flex-row-reverse gap-3 md:gap-5 mt-6 w-full lg:w-64 xl:w-full">
        <button
          className="block px-3 py-3 text-center min-w-[80px] md:min-w-[120px] w-full mt-5 rounded-sm transition-all duration-300"
          onClick={startClick}
          style={{ color: background, backgroundColor: textColor }}
        >
          Start
        </button>
        <button
          className="block px-3 py-3 text-center min-w-[80px] md:min-w-[120px] w-full mt-5 rounded-sm transition-all duration-300 border"
          onClick={emptyTimer}
          style={{ backgroundColor: background, color: textColor, borderColor: textColor }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
export default TimerForm;
