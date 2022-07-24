import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTimerId, decrementTime, clearTimer, setTime, setRunning } from "../store/timerSlice";
import { HiArrowLeft } from "react-icons/hi";

function FlipTimer() {
  const time = useSelector((state) => state.timer.time);
  const timer = useSelector((state) => state.timer.timer);
  const running = useSelector((state) => state.timer.running);
  const textColor = useSelector((state) => state.theme.textColor);
  const backgroundColor = useSelector((state) => state.theme.background);

  const getSeconds = () => {
    return parseInt(time % 60)
      .toString()
      .padStart(2, 0);
  };

  const getSecondObj = (cn, sec) => {
    return { key: new Date().getTime(), className: cn || "", second: sec };
  };

  const [play, setPlay] = useState(false);
  const [secDOM, setSecDOM] = useState([getSecondObj("", getSeconds())]);
  const [minDOM, setMinDOM] = useState([{ key: new Date().getTime(), className: "", minutes: "00" }]);

  const flipStyle = {
    color: backgroundColor,
    backgroundColor: textColor,
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (time < 0) dispatch(clearTimer());
    else startFlipping();
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

  function flipSeconds() {
    let sec = getSeconds();
    let cName = "active",
      arr = [...secDOM];
    if (sec != secDOM[secDOM.length - 1]?.second) {
      if (arr.length > 1) {
        arr.shift();
      } else if (arr.length == 0) cName = "";
      arr[0].className = "before";
      arr.push(getSecondObj(cName, sec));
      setSecDOM(arr);
    }
  }

  function flipMinutes() {
    let min = parseInt(time / 60)
      .toString()
      .padStart(2, 0);
    if (min != minDOM[minDOM.length - 1]?.minutes) {
      let arr = [...minDOM];
      if (minDOM.length > 1) arr.shift();
      arr[0].className = "before";
      if (arr.length < 0 && min > 1) arr.push({ key: new Date().getTime(), className: "before", minutes: min - 1 });
      arr.push({ key: new Date().getTime(), className: "active", minutes: min });
      setMinDOM(arr);
    }
  }

  function startFlipping() {
    setPlay(false);
    // if (time == undefined || !time) {
    flipSeconds();
    flipMinutes();
    setPlay(true);
    // }
  }

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

      <div className={`container ${play ? "play" : ""}`}>
        <ul className="flip minutePlay">
          {minDOM.map((item) => {
            return (
              <li key={item.key} className={item.className}>
                <a href="#">
                  <div className="up">
                    <div className="shadow"></div>
                    <div className="inn" style={flipStyle}>
                      {item.minutes}
                    </div>
                  </div>
                  <div className="down">
                    <div className="shadow"></div>
                    <div className="inn" style={flipStyle}>
                      {item.minutes}
                    </div>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
        <span className="mx-4" style={{ color: textColor }}>
          :
        </span>
        <ul className="flip secondPlay">
          {secDOM.map((item) => {
            return (
              <li key={item.key} className={item.className}>
                <a href="#">
                  <div className="up">
                    <div className="shadow"></div>
                    <div className="inn" style={flipStyle}>
                      {item.second}
                    </div>
                  </div>
                  <div className="down">
                    <div className="shadow"></div>
                    <div className="inn" style={flipStyle}>
                      {item.second}
                    </div>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default FlipTimer;
