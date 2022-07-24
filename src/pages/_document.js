import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <title>Focus Clock</title>
        <meta
          name="description"
          content="Countdown Timer that lets you focus. Inspired based on timer/clock seen on Work Dest Setup tiktoks/reels."
        />
        <meta name="keywords" content="TikTok Timer, Timer, Countdown Timer, Flip Timer" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
