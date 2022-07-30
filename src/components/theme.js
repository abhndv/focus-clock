import { palette } from "../colors";
import { HiCheckCircle } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { setBackground, setTextColor } from "../store/themeSlice";
import { setFlipTimer } from "../store/timerSlice";

function Theme() {
  const dispatch = useDispatch();
  const background = useSelector((state) => state.theme.background);
  const textColor = useSelector((state) => state.theme.textColor);
  const isFlipTimer = useSelector((state) => state.timer.isFlipTimer);

  const min = useSelector((state) => state.timer.minutes);
  const sec = useSelector((state) => state.timer.seconds);

  const displayTime = () => {
    const time = min * 60 + parseInt(sec || 0);
    const m = parseInt(time / 60)
      .toString()
      .padStart(2, 0);
    const s = parseInt(time % 60)
      .toString()
      .padStart(2, 0);
    return m + ":" + s;
  };

  const selectTheme = (bg, text) => {
    dispatch(setBackground(bg));
    dispatch(setTextColor(text));
  };

  return (
    <article className="themes w-full lg:w-3/4 xl:w-1/2">
      <h2 className="font-semibold text-xl my-4" style={{ color: textColor }}>
        Timer Style
      </h2>
      <div className="grid grid-cols-4 md:grid-cols-5 gap-3 md:gap-4 overflow-x-auto flex-wrap max-h-120">
        <div className="flex gap-4">
          <button
            className="inline-block py-3 px-4 rounded-lg border"
            onClick={() => {
              dispatch(setFlipTimer(false));
            }}
            style={{ color: textColor, borderColor: isFlipTimer ? "transparent" : textColor }}
          >
            Normal
          </button>
          <button
            className="inline-block py-3 px-4 rounded-lg border"
            onClick={() => {
              dispatch(setFlipTimer(true));
            }}
            style={{ color: textColor, borderColor: isFlipTimer ? textColor : "transparent" }}
          >
            FlipTimer
          </button>
        </div>
      </div>
      <h2 className="font-semibold text-xl my-4" style={{ color: textColor }}>
        Page Theme
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 md:gap-4 overflow-x-auto flex-wrap max-h-120">
        {palette.map((obj, index) => (
          <div
            className={[
              `themes__card h-24 md:h-28 p-3 rounded-md flex flex-col justify-between border cursor-pointer transition-all duration-200 `,
              obj.color1 == background ? "border-white" : "border-transparent",
            ].join(" ")}
            key={index}
            style={{ backgroundColor: obj.color1, color: obj.color2 }}
            onClick={() => selectTheme(obj.color1, obj.color2)}
          >
            {obj.color1 == background ? <HiCheckCircle /> : <span></span>}
            <p>
              <span className="text-ellipsis whitespace-pre w-full overflow-hidden block">{obj.name}</span>
              <span className="text-ellipsis whitespace-pre w-full overflow-hidden block">{displayTime()}</span>
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}
export default Theme;
