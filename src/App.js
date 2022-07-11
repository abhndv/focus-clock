import logo from "./logo.svg";
import "./App.css";
import { useEffect, useRef, useState } from "react";

function App() {
  const intervalRef = useRef();
  const [time, setTime] = useState(0);
  const [min, setMinutes] = useState(null);
  const [sec, setSeconds] = useState(null);
  const [running, setRunning] = useState(false);

  const displayTime = () => {
    const m = parseInt(time / 60)
      .toString()
      .padStart(2, 0);
    const s = parseInt(time % 60)
      .toString()
      .padStart(2, 0);
    return m + ":" + s;
  };

  const startClick = () => {
    clearTimer();
    setRunning(true);
    setTime(parseInt(min * 60) + parseInt(sec));
    startTimer();
  };

  const startTimer = () => {
    const id = setInterval(() => {
      if (time < 0) clearTimer();
      else setTime((x) => x - 1);
    }, 1000);
    intervalRef.current = id;
  };

  const clearTimer = () => {
    setTime(0);
    clearInterval(intervalRef.current);
  };

  const pauseTimer = () => {
    if (running) {
      clearInterval(intervalRef.current);
      setRunning(false);
    } else {
      startTimer();
      setRunning(true);
    }
  };

  useEffect(() => {
    if (time < 0) {
      clearTimer();
    }
  }, [time]);

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="App">
      <h1>Timer</h1>
      <div className="flex justify-center gap-8">
        <div className="flex-col">
          <label>Minutes</label>
          <input
            type="number"
            onChange={(e) => {
              setMinutes(e.target.value);
            }}
          />
        </div>
        <div className="flex-col">
          <label>Seconds</label>
          <input
            type="number"
            onChange={(e) => {
              setSeconds(e.target.value);
            }}
          />
        </div>
        <button onClick={startClick}>Start</button>
        <button onClick={pauseTimer}>Pause/Resume</button>
        <button onClick={clearTimer}>Reset</button>
      </div>
      <h1 className="timer">{displayTime(time)}</h1>
    </div>
  );
}

export default App;
