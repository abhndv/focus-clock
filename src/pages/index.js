import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Timer from "../components/timer";
import { useSelector, useDispatch } from "react-redux";
import { setMinutes, setSeconds, setTime, setRunning, decrementTime, resetTimer } from "../store/timerSlice";

export default function Home() {
  const intervalRef = useRef();
  const dispatch = useDispatch();

  const time = useSelector((state) => state.timer.time);
  const min = useSelector((state) => state.timer.minutes);
  const sec = useSelector((state) => state.timer.seconds);
  const running = useSelector((state) => state.timer.running);

  const startClick = () => {
    clearTimer();
    const iTime = parseInt(min * 60) + parseInt(sec);
    if (iTime && iTime > 0) {
      dispatch(setRunning(true));
      dispatch(setTime(iTime));
      startTimer();
    }
  };

  const startTimer = () => {
    const id = setInterval(() => {
      if (time < 0) clearTimer();
      else dispatch(decrementTime());
    }, 1000);
    intervalRef.current = id;
  };

  const clearTimer = () => {
    dispatch(setTime(0));
    clearInterval(intervalRef.current);
  };

  const emptyTimer = () => {
    dispatch(resetTimer());
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
    <div className="bg-primary-400 text-white h-screen w-screen flex flex-col">
      <Head>
        <title>Focus Clock</title>
        <meta name="description" content="Focus Clock" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col flex-[100%] p-12">
        {running ? (
          <Timer />
        ) : (
          <>
            <div className="flex flex-col sm:flex-row items-baseline sm:gap-8">
              <h1 className="font-bold text-secondary-400 text-4xl md:text-5xl lg:text-7xl ">Focus Clock</h1>
              <span className="text-slate-600">- Countdown timer to focus only on time</span>
            </div>
            <div className="h-full flex items-center justify-center mb-8">
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
            </div>
          </>
        )}
      </main>

      <footer className="flex items-center justify-center p-4 text-gray-400">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made with NextJS
        </a>
      </footer>
    </div>
  );
}
