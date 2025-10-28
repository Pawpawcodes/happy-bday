import { useState, useRef } from 'react';
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import { Typewriter } from "react-simple-typewriter";
import "./App.css";

function App() {
  const [candlesOut, setCandlesOut] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [songPlaying, setSongPlaying] = useState(false);
  
  const audioRef = useRef(null);
  const { width, height } = useWindowSize();

  const handlePlaySong = async () => {
    try {
      await audioRef.current.play();
      setSongPlaying(true);
    } catch (err) {
      console.warn("Audio play blocked until user gesture:", err);
    }
  };

  const handleBlow = () => {
    setCandlesOut(true);
    setShowConfetti(true);

    setTimeout(() => setShowConfetti(false), 5000);
  };

  return (
    <div className="app" onClick={handleBlow}>
      {showConfetti && <Confetti width={width} height={height} />}

      <h1 className="title">🎉 Happy Birthday Monu Bhai!!! 🎂</h1>

      <img
        src={candlesOut ? "/cake.png" : "/burning-candles.gif"}
        alt="Birthday Cake"
        className={`cake fade ${candlesOut ? "show" : "show"}`}
      />

      <button className="song-btn" onClick={handlePlaySong}>
        🎵 {songPlaying ? "Playing..." : "Play Birthday Song"}
      </button>

      <p className="message">
        <Typewriter
          words={["Miss you so so much","Thank you for always supporting me","Come jaldi ❤️", "Love youu 💖"]}
          loop={false}
          cursor
          cursorStyle="|"
          typeSpeed={60}
          deleteSpeed={40}
          delaySpeed={1500}
        />
      </p>

      <audio ref={audioRef} src="/happy-birthday.mp3" />
    </div>
  );
}

export default App;
