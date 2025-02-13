import { useRouter } from "next/router";
import Head from "next/head";
import { useState } from "react";
import FloatingHearts from "../components/FloatingHearts";
import confetti from "canvas-confetti"; // Import confetti 🎊
import { Music, X } from "lucide-react"; // Icons for music & closing

export default function Home() {
  const router = useRouter();
  const [message, setMessage] = useState(null);
  const [noClicks, setNoClicks] = useState(0);
  const [noButtonStyle, setNoButtonStyle] = useState({});
  const [yesButtonScale, setYesButtonScale] = useState(1);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showQuestion, setShowQuestion] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [audio, setAudio] = useState(null);

  const { loverName } = router.query;
  const displayName = loverName || "Friend";

  const handleYesClick = () => {
    setShowQuestion(false);
    setShowMessage(true);

    setTimeout(() => {
      confetti({
        particleCount: 200,
        spread: 150,
        origin: { y: 0.6 },
      });

      setTimeout(() => {
        setShowMessage(false);
        setShowCelebration(true);

        const loveSong = new Audio("/you are the reason.mp3"); 
        loveSong.loop = true;
        loveSong.play();
        setAudio(loveSong);
      }, 1000);
    }, 1000);
  };

  const handleNoClick = () => {
    setNoClicks(noClicks + 1);
    const funnyMessages = [
      "Are you sure? 🧐", "Wait... Think about this well o 😢",
      "But... I already told my mom 😭", "You're breaking my heart 💔",
      "Haaa! Have fear of God now 😩", "Just say yes, I will buy you shawarma and Pepsi 😆",
      "If you say no, my village people will laugh at me 😭", "Do you want me to kneel down? 😩"
    ];

    setMessage(funnyMessages[Math.min(noClicks, funnyMessages.length - 1)]);

    const randomX = Math.random() * 200 - 100;
    const randomY = Math.random() * 200 - 100;

    setNoButtonStyle({
      transform: `translate(${randomX}px, ${randomY}px) scale(${Math.max(1 - noClicks * 0.1, 0.5)})`,
      transition: "all 0.3s ease-out",
    });
  };

  const handleCloseCelebration = () => {
    setShowCelebration(false);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-200 to-pink-400 flex items-center justify-center px-4">
      <Head>
        <title>Valentine’s Day Surprise</title>
        <meta name="description" content="Will you be my val?" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <FloatingHearts />

      <div className="absolute inset-0 z-50 pointer-events-none">
        <canvas id="confettiCanvas"></canvas>
      </div>

      <main className="p-6 bg-white/90 rounded-2xl shadow-xl text-center max-w-sm md:max-w-lg lg:max-w-xl w-full z-10">
        {showQuestion && (
          <>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-600 mb-6 leading-tight">
              {displayName}, will you be my val?? 💖
            </h1>

            <div className="flex gap-4 justify-center mb-4 relative">
              <button
                className="px-4 py-2 md:px-6 md:py-3 rounded-full text-white bg-pink-500 hover:bg-pink-600 transition text-lg md:text-xl"
                onClick={handleYesClick}
                style={{ transform: `scale(${yesButtonScale})`, transition: "transform 0.3s ease-in-out" }}
              >
                Yes 😍
              </button>

              <button
                className="px-4 py-2 md:px-6 md:py-3 rounded-full text-pink-600 bg-white border border-pink-500 hover:bg-pink-50 transition text-lg md:text-xl"
                onClick={handleNoClick}
                style={{ ...noButtonStyle, position: "relative" }}
              >
                No 🙃
              </button>
            </div>
          </>
        )}

        {showMessage && <p className="text-pink-800 font-semibold mt-4 text-lg md:text-xl">Finally! ♥ upon all your shakara! 🎉😍</p>}
        {message && <p className="text-pink-800 font-semibold mt-4 text-lg">{message}</p>}
      </main>

      {showCelebration && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-md z-50 p-4">
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl text-center animate-pop max-w-sm md:max-w-lg lg:max-w-xl w-full">
            <h1 className="text-3xl md:text-4xl font-bold text-pink-600">🎉 CONGRATULATIONS! 🎉</h1>
            <p className="text-lg md:text-xl text-gray-700 mt-2">Love is in the air! 💖💞</p>
            <p className="text-xl md:text-2xl text-black mt-4">Enjoy this special moment with a love song! 🎶</p>

            <div className="bg-pink-100 p-4 mt-4 rounded-lg flex flex-col items-center">
              <Music size={40} className="text-pink-500 animate-bounce" />
              <p className="text-pink-600 font-medium mt-2">Now Playing: "You Are The Reason" - Calum Scott</p>
            </div>

            <button
  className="mt-6 px-6 py-3 md:px-8 md:py-4 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition text-lg md:text-xl"
  onClick={handleCloseCelebration}
>
  Close
</button>

          </div>
        </div>
      )}

      <footer className="absolute bottom-4 w-full text-center text-blue-700 font-semibold text-sm md:text-base">
        Built with ❤️ by Shecktar
      </footer>
    </div>
  );
}
