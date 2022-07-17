import { bgColors, textColors } from "../colors";
import { HiCheckCircle } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { setBackground, setTextColor } from "../store/themeSlice";

function Theme() {
  const dispatch = useDispatch();
  const background = useSelector((state) => state.theme.background);
  const textColor = useSelector((state) => state.theme.textColor);

  return (
    <article className="themes w-1/2">
      <h2 className="font-semibold text-xl mb-4">Background</h2>
      <div className="grid grid-cols-5 gap-4 overflow-x-auto flex-wrap max-h-120">
        {Object.entries(bgColors).map(([key, value]) => (
          <div
            className={[
              `themes__card h-28 p-3 rounded-md flex flex-col justify-between border cursor-pointer transition-all duration-200 `,
              value == background ? "border-white" : "border-transparent",
            ].join(" ")}
            key={key}
            style={{ backgroundColor: value, color: textColor }}
            onClick={() => dispatch(setBackground(value))}
          >
            {value == background ? <HiCheckCircle /> : <span></span>}
            <p>
              {key}
              <br />
              {value}
            </p>
          </div>
        ))}
      </div>
      <h2 className="font-semibold text-xl my-4">Text Color</h2>
      <div className="grid grid-cols-5 gap-4 overflow-x-auto flex-wrap max-h-120">
        {Object.entries(textColors).map(([key, value]) => (
          <div
            className="themes__card h-28 p-3 rounded-md flex flex-col justify-between cursor-pointer transition-all duration-200 hover:shadow-md hover:shadow-slate-500"
            key={key}
            style={{ backgroundColor: value, color: background }}
            onClick={() => dispatch(setTextColor(value))}
          >
            {value == textColor ? <HiCheckCircle /> : <span></span>}
            <p>
              {key}
              <br />
              {value}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}
export default Theme;
