import Head from "next/head";
import Theme from "../components/theme";
import Timer from "../components/timer";
import TimerForm from "../components/timerForm";
import { useSelector } from "react-redux";

export default function Home() {
  const running = useSelector((state) => state.timer.running);
  const background = useSelector((state) => state.theme.background);
  const textColor = useSelector((state) => state.theme.textColor);

  return (
    <div className="text-white min-h-screen w-screen flex flex-col" style={{ backgroundColor: background }}>
      <Head>
        <title>Focus Clock</title>
        <meta name="description" content="Countdown Timer that lets you focus. Inspired based on timer/clock seen on Work Dest Setup tiktoks/reels." />
        <meta name="keywords" content="TikTok Timer, Timer, Countdown Timer, Flip Timer"/>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="flex flex-col flex-[100%] p-12">
        {running ? (
          <Timer />
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
