import { useRouter } from "next/router";
import Head from "next/head";
import { useState, useEffect } from "react";
import FloatingHearts from "../components/FloatingHearts";
import confetti from "canvas-confetti"; // Import confetti 🎊

export default function Home() {
  const router = useRouter();
  const [message, setMessage] = useState(null);
  const [noClicks, setNoClicks] = useState(0);
  const [noButtonStyle, setNoButtonStyle] = useState({});
  const [yesButtonScale, setYesButtonScale] = useState(1);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showQuestion, setShowQuestion] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  const { loverName } = router.query;
  const displayName = loverName || "Friend";

  const funnyMessages = [
    "Are you sure? 🧐",
    "Wait... Think about this well o 😢",
    "But... I already told my mom 😭",
    "You're breaking my heart 💔. Is this how you do your people? 😭",
    "Haaa! Have fear of God now 😩",
    "Just say yes, I will buy you shawarma and Pepsi 😆",
    "See ehn, I don’t have plan B. It’s you or nobody 😭",
    "Omo, even Dangote no chase money like this 😂",
    "Ah! No be juju be this? Say yes nau! 🙆🏽‍♂️",
    "If you say no, my village people will laugh at me 😭",
    "Do you want me to kneel down? 😩",
    "Walahi, even your ancestors want you to say yes 😂",
    "If you no gree, I go call elders meeting for this matter 😭",
    "Are you doing me strong thing? 😩",
    "Omo, my heart don break. Who will console me now? 💔😂",
    "Please nowww, my spirit is not at peace 😭",
    "You dey whine me? 🙃",
    "Lai lai, I no gree. I go wait till you say yes 😂",
    "Ah! You no wan chop wedding jollof? 😲",
    "I go tell mummy you’re stressing me like this 😭",
    "Even your pastor go support this one o, say yes 😆",
    "No wahala, I dey go mountain for prayers. I go come back 😂",
    "No vex o, but are you still thinking or na final answer be this? 😩",
    "Haba! You want make I write WAEC again for this? 😂",
    "God go touch your heart, I dey wait 😭",
    "Last chance o! Don’t fall my hand! 😂",
  ];

  const handleYesClick = () => {
    setShowQuestion(false); // Hide the main question
    setShowMessage(true); // Show "Yay! You said YES!"

    // ⏳ Wait 1 second before firing confetti & showing celebration
    setTimeout(() => {
      // 🎊 Confetti Effect
      confetti({
        particleCount: 200,
        spread: 150,
        origin: { y: 0.6 },
      });

      // Remove message & show pop-up
      setTimeout(() => {
        setShowMessage(false); // Hide "Yay! You said YES!"
        setShowCelebration(true); // Show the celebration pop-up
      }, 1000);

      // 🔊 Play celebration sound (optional)
      const audio = new Audio("/celebration.mp3"); // Place a sound file in /public/
      audio.play();
    }, 1000);
  };

  const handleNoClick = () => {
    setNoClicks(noClicks + 1);
    setMessage(funnyMessages[Math.min(noClicks, funnyMessages.length - 1)]);

    const randomX = Math.random() * 200 - 100;
    const randomY = Math.random() * 200 - 100;

    setNoButtonStyle({
      transform: `translate(${randomX}px, ${randomY}px) scale(${Math.max(1 - noClicks * 0.1, 0.5)})`,
      transition: "all 0.3s ease-out",
    });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-200 to-pink-400 flex items-center justify-center">
      <Head>
        <title>Valentine’s Day Surprise</title>
        <meta name="description" content="Will you be my val?" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
  
      <FloatingHearts />
  
      {/* Confetti container (Ensures confetti is on top) */}
      <div className="absolute inset-0 z-50 pointer-events-none">
        <canvas id="confettiCanvas"></canvas>
      </div>
  
      <main className="p-6 bg-white/90 rounded-2xl shadow-xl text-center max-w-md z-10">
        {showQuestion && (
          <>
            <h1 className="text-3xl sm:text-5xl font-bold text-pink-600 mb-6">
              {displayName}, will you be my val?? 💖
            </h1>
  
            {/* Buttons for Yes/No */}
            <div className="flex gap-4 justify-center mb-4 relative">
              <button
                className="px-5 py-2 rounded-full text-white bg-pink-500 hover:bg-pink-600 transition"
                onClick={handleYesClick}
                style={{ transform: `scale(${yesButtonScale})`, transition: "transform 0.3s ease-in-out" }}
              >
                Yes 😍
              </button>
  
              <button
                className="px-5 py-2 rounded-full text-pink-600 bg-white border border-pink-500 hover:bg-pink-50 transition"
                onClick={handleNoClick}
                style={{ ...noButtonStyle, position: "relative" }}
              >
                No 🙃
              </button>
            </div>
          </>
        )}
  
        {showMessage && <p className="text-pink-800 font-semibold mt-4">Finally! ♥ upon all your shakara! 🎉😍</p>}
        {message && <p className="text-pink-800 font-semibold mt-4">{message}</p>}
      </main>
  
      {/* Celebration Pop-Out */}
      {showCelebration && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50">
          <div className="p-8 bg-white rounded-3xl shadow-2xl text-center animate-pop">
            <h1 className="text-4xl font-bold text-pink-600">🎉 CONGRATULATIONS! 🎉</h1>
            <p className="text-lg text-gray-700 mt-2">Love is in the air! 💖💞</p>
            <p className="text-xl mt-4">You have made someone's day! 😊</p>
            <button
              className="mt-4 px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition"
              onClick={() => setShowCelebration(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
  
      {/* Footer - "Built by Shecktar" */}
      <footer className="absolute bottom-4 text-center text-blue-700 font-semibold text-sm">
        Built with ❤️ by Shecktar
      </footer>
    </div>
  );  
}