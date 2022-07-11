import { useEffect, useRef, useState } from "react";
import Head from "next/head";

export default function Home() {
  const intervalRef = useRef();
  const [time, setTime] = useState(0);
  const [min, setMinutes] = useState(0);
  const [sec, setSeconds] = useState(0);
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
    // setRunning(false);
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
    <div className="bg-primary-400 text-white h-screen w-screen flex flex-col">
      <Head>
        <title>Focus Clock</title>
        <meta name="description" content="Focus Clock" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col flex-[100%] p-12">
        {running ? (
          <div className="flex h-full w-full items-center justify-center relative">
            <button
              className="absolute top-0 left-0 block px-4 py-2 text-center mt-5 rounded-sm border-secondary-400 border"
              onClick={() => {
                clearTimer();
                setRunning(false);
              }}
            >
              Go back
            </button>
            <h1 className="font-bold text-9xl text-secondary-400 mt-4 mb-10">{displayTime(time)}</h1>
          </div>
        ) : (
          <>
            <div className="flex items-baseline gap-8">
              <h1 className="font-bold text-7xl text-secondary-400">Focus Clock</h1>
              <span className="text-slate-600">- Countdown timer to focus only on time</span>
            </div>
            <div className="h-full flex items-center justify-center mb-8">
              <div className="w-1/4">
                <div className="flex flex-col mt-2">
                  <label className="block mb-3 text-slate-300">Minutes</label>
                  <input
                    className="px-3 py-2 text-2xl border border-tertiary rounded-sm bg-tertiary outline-none text-center"
                    type="number"
                    key="minutes"
                    value={min}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setMinutes(e.target.value);
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
                      setSeconds(e.target.value);
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
                  {/* <button className="block px-3 py-2 text-center w-full mt-6 rounded-sm bg-secondary" onClick={pauseTimer}>
              Pause/Resume
            </button> */}
                  <button
                    className="block px-3 py-3 text-center w-full mt-5 rounded-sm border-secondary-400 transition-all duration-300 bg-primary-400 border hover:bg-primary-600"
                    onClick={clearTimer}
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
