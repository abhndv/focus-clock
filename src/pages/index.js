import Head from "next/head";
import Theme from "../components/theme";
import Timer from "../components/timer";
import FlipTimer from "../components/flipTimer";
import TimerForm from "../components/timerForm";
import { useSelector } from "react-redux";

export default function Home() {
  const running = useSelector((state) => state.timer.running);
  const isFlipTimer = useSelector((state) => state.timer.isFlipTimer);
  const background = useSelector((state) => state.theme.background);
  const textColor = useSelector((state) => state.theme.textColor);

  return (
    <div className="text-white min-h-screen w-screen flex flex-col" style={{ backgroundColor: background }}>
      <main className="flex flex-col flex-[100%] p-12">
        {running ? (
          isFlipTimer ? (
            <FlipTimer />
          ) : (
            <Timer />
          )
        ) : (
          <>
            <div className="flex flex-col sm:flex-row items-baseline sm:gap-4" style={{ color: textColor }}>
              <h1 className="font-bold text-4xl md:text-5xl lg:text-7xl">Focus Clock</h1>
              <small className="">- Countdown timer to focus only on time</small>
            </div>
            <div className="h-full flex flex-col lg:flex-row items-center justify-evenly my-8 gap-8">
              <TimerForm />
              <Theme />
            </div>
          </>
        )}
      </main>

      <footer className="flex items-center justify-center p-4 text-sm" style={{ color: textColor }}>
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
