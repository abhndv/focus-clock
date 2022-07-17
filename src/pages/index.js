import Head from "next/head";
import Timer from "../components/timer";
import TimerForm from "../components/timerForm";
import { useSelector } from "react-redux";

export default function Home() {
  const running = useSelector((state) => state.timer.running);

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
              <TimerForm />
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
