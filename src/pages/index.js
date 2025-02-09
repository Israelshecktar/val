// pages/index.js
import Head from "next/head";
import FloatingHearts from "../components/FloatingHearts";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState(null);

  const handleYesClick = () => {
    setMessage("Yay! ♥ You said YES!");
  };

  const handleNoClick = () => {
    setMessage("Oh no! Are you sure? :(");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-200 to-pink-400 flex items-center justify-center">
      <Head>
        <title>Valentine’s Day Surprise</title>
        <meta name="description" content="Will you be my val?" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <FloatingHearts />

      <main className="p-6 bg-white/90 rounded-2xl shadow-xl text-center max-w-md z-10">
        <h1 className="text-3xl sm:text-5xl font-bold text-pink-600 mb-6">
          Will you be my val??
        </h1>

        <div className="flex gap-4 justify-center mb-4">
          <button
            className="px-5 py-2 rounded-full text-white bg-pink-500 hover:bg-pink-600 transition"
            onClick={handleYesClick}
          >
            Yes
          </button>
          <button
            className="px-5 py-2 rounded-full text-pink-600 bg-white border border-pink-500 hover:bg-pink-50 transition"
            onClick={handleNoClick}
          >
            No
          </button>
        </div>

        {message && <p className="text-pink-800 font-semibold">{message}</p>}
      </main>
    </div>
  );
}
