import { bgColors, textColors } from "../colors";
import { HiCheckCircle } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { setBackground, setTextColor } from "../store/themeSlice";

function Theme() {
  const dispatch = useDispatch();
  const background = useSelector((state) => state.theme.background);
  const textColor = useSelector((state) => state.theme.textColor);

  return (
    <article className="themes w-full lg:w-3/4 xl:w-1/2">
      <h2 className="font-semibold text-xl mb-4" style={{ color: textColor }}>
        Background
      </h2>
      <div className="grid grid-cols-4 md:grid-cols-5 gap-3 md:gap-4 overflow-x-auto flex-wrap max-h-120">
        {Object.entries(bgColors).map(([key, value]) => (
          <div
            className={[
              `themes__card h-24 md:h-28 p-3 rounded-md flex flex-col justify-between border cursor-pointer transition-all duration-200 `,
              value == background ? "border-white" : "border-transparent",
            ].join(" ")}
            key={key}
            style={{ backgroundColor: value, color: textColor }}
            onClick={() => dispatch(setBackground(value))}
          >
            {value == background ? <HiCheckCircle /> : <span></span>}
            <p>
              <span className="text-ellipsis whitespace-pre w-full overflow-hidden block">{key}</span>
              {value}
            </p>
          </div>
        ))}
      </div>
      <h2 className="font-semibold text-xl my-4" style={{ color: textColor }}>
        Text Color
      </h2>
      <div className="grid grid-cols-4 md:grid-cols-5 gap-3 md:gap-4 overflow-x-auto flex-wrap max-h-120">
        {Object.entries(textColors).map(([key, value]) => (
          <div
            className="themes__card h-24 md:h-28 p-3 rounded-md flex flex-col justify-between cursor-pointer transition-all duration-200 hover:shadow-md hover:shadow-slate-500"
            key={key}
            style={{ backgroundColor: value, color: background }}
            onClick={() => dispatch(setTextColor(value))}
          >
            {value == textColor ? <HiCheckCircle /> : <span></span>}
            <p>
              <span className="text-ellipsis whitespace-pre w-full overflow-hidden block">{key}</span>

              {value}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}
export default Theme;
