import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [showMessage, setShowMessage] = useState(false);
  const [petals, setPetals] = useState([]);
  const [clickedRoses, setClickedRoses] = useState([]);
  const [roseCount, setRoseCount] = useState(0);
  const [showSecret, setShowSecret] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [compliments, setCompliments] = useState([]);
  const [showMemories, setShowMemories] = useState(false);
  const [currentMemory, setCurrentMemory] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState("");
  const [quizCorrect, setQuizCorrect] = useState(false);
  const [particles, setParticles] = useState([]);
  const [friendName, setFriendName] = useState("");
  const [showNameInput, setShowNameInput] = useState(true);
  const audioRef = useRef(null);

  const complimentsList = [
    "You're so sweet and helpful! 🥹💖",
    "You make every chat better! ✨",
    "Talking to you always improves my mood! 🌟",
    "You're too good, kasam se! 💝",
    "You're really special! 💎",
    "Your care and concern mean so much! 🫂",
    "You're the best friend anyone could ask for! 💕",
    "MashaAllah, you're amazing! 🌸",
  ];

  const memories = [
    {
      emoji: "💬",
      text: "Those late-night chats that make everything better!",
    },
    {
      emoji: "📚",
      text: "All the times you motivated me and believed in me — that meant more than you’ll ever know",
    },
    {
      emoji: "🏠",
      text: "Missing home together and understanding each other's feelings!",
    },
    { emoji: "😂", text: "Our funny conversations that always make me laugh!" },
    {
      emoji: "🤲",
      text: "Sharing duas and reminders - you make me a better person!",
    },
    {
      emoji: "⏰",
      text: "Waiting for your messages and being there for each other despite the distance!",
    },
  ];

  useEffect(() => {
    // Show message after animation
    setTimeout(() => setShowMessage(true), 1000);

    // Create floating petals
    const petalArray = [];
    for (let i = 0; i < 15; i++) {
      petalArray.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 5 + Math.random() * 5,
      });
    }
    setPetals(petalArray);

    // Random compliments appear
    const complimentInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        showRandomCompliment();
      }
    }, 8000);

    return () => clearInterval(complimentInterval);
  }, []);

  const showRandomCompliment = () => {
    const compliment = {
      id: Date.now(),
      text: complimentsList[Math.floor(Math.random() * complimentsList.length)],
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
    };
    setCompliments((prev) => [...prev, compliment]);
    setTimeout(() => {
      setCompliments((prev) => prev.filter((c) => c.id !== compliment.id));
    }, 3000);
  };

  const handleRoseClick = (e) => {
    const newRose = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
    };
    setClickedRoses((prev) => [...prev, newRose]);
    setRoseCount((prev) => prev + 1);

    // Create heart particles
    createHearts(e.clientX, e.clientY);

    // Remove rose after animation
    setTimeout(() => {
      setClickedRoses((prev) => prev.filter((rose) => rose.id !== newRose.id));
    }, 2000);

    // Show secret message after 10 clicks
    if (roseCount + 1 === 10) {
      setShowSecret(true);
      createPartyEffect();
    }

    // Unlock memories after 15 roses
    if (roseCount + 1 === 15) {
      setShowMemories(true);
    }

    // Unlock quiz after 20 roses
    if (roseCount + 1 === 20) {
      setShowQuiz(true);
    }
  };

  const createHearts = (x, y) => {
    const newHearts = [];
    for (let i = 0; i < 3; i++) {
      newHearts.push({
        id: Date.now() + i,
        x: x + (Math.random() - 0.5) * 50,
        y: y,
        delay: i * 0.1,
      });
    }
    setHearts((prev) => [...prev, ...newHearts]);
    setTimeout(() => {
      setHearts((prev) =>
        prev.filter((h) => !newHearts.find((nh) => nh.id === h.id)),
      );
    }, 2000);
  };

  const createPartyEffect = () => {
    const newParticles = [];
    for (let i = 0; i < 30; i++) {
      newParticles.push({
        id: Date.now() + i,
        x: 50,
        y: 50,
        angle: (360 / 30) * i,
      });
    }
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 2000);
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const checkQuizAnswer = () => {
    if (
      quizAnswer.toLowerCase().includes("best") ||
      quizAnswer.toLowerCase().includes("amazing") ||
      quizAnswer.toLowerCase().includes("awesome") ||
      quizAnswer.toLowerCase().includes("favourite") ||
      quizAnswer.toLowerCase().includes("foreover") 
    ) {
      setQuizCorrect(true);
      createPartyEffect();
    }
  };

  const nextMemory = () => {
    setCurrentMemory((prev) => (prev + 1) % memories.length);
  };

  const prevMemory = () => {
    setCurrentMemory((prev) => (prev - 1 + memories.length) % memories.length);
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    const name = friendName.trim().toLowerCase();
    // Check if name is "saima" or "cutie" (case-insensitive)
    if (name === "saima" || name === "cutie") {
      setShowNameInput(false);
      // Auto-play music when website opens
      if (audioRef.current) {
        audioRef.current.play().catch((err) => {
          console.log("Audio autoplay prevented:", err);
        });
        setIsPlaying(true);
      }
    } else {
      // Show error or shake animation if wrong name
      alert("❌ This special website is only for Saima! 💕");
    }
  };

  return (
    <div className="app" onClick={handleRoseClick}>
      {/* Name Input Modal */}
      {showNameInput && (
        <div className="modal-overlay">
          <div className="name-modal" onClick={(e) => e.stopPropagation()}>
            <h2>🌹 Welcome! 🌹</h2>
            <p>What's your name, beautiful soul?</p>
            <p className="hint-text">
              (Hint: Only a special someone can enter! 💕)
            </p>
            <form onSubmit={handleNameSubmit}>
              <input
                type="text"
                value={friendName}
                onChange={(e) => setFriendName(e.target.value)}
                placeholder="Enter your name..."
                className="name-input"
                autoFocus
              />
              <button type="submit" className="name-submit">
                Let's Begin! 💖
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Party Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="party-particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            transform: `rotate(${particle.angle}deg)`,
          }}
        >
          ✨
        </div>
      ))}

      {/* Floating Hearts */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="floating-heart"
          style={{
            left: `${heart.x}px`,
            top: `${heart.y}px`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          💖
        </div>
      ))}

      {/* Random Compliments */}
      {compliments.map((compliment) => (
        <div
          key={compliment.id}
          className="random-compliment"
          style={{
            left: `${compliment.x}%`,
            top: `${compliment.y}%`,
          }}
        >
          {compliment.text}
        </div>
      ))}

      {/* Clicked roses animation */}
      {clickedRoses.map((rose) => (
        <div
          key={rose.id}
          className="clicked-rose"
          style={{
            left: `${rose.x}px`,
            top: `${rose.y}px`,
          }}
        >
          🌹
        </div>
      ))}

      {/* Floating petals background */}
      <div className="petals-container">
        {petals.map((petal) => (
          <div
            key={petal.id}
            className="petal"
            style={{
              left: `${petal.left}%`,
              animationDelay: `${petal.delay}s`,
              animationDuration: `${petal.duration}s`,
            }}
          >
            🌹
          </div>
        ))}
      </div>

      {/* Music toggle button */}
      <button
        className="music-toggle"
        onClick={(e) => {
          e.stopPropagation();
          toggleMusic();
        }}
      >
        {isPlaying ? "🎵" : "🎶"}
      </button>

      {/* Rose counter with milestones */}
      <div className="rose-counter">
        <div className="counter-text">Roses: {roseCount} 🌹</div>
        <div className="milestones">
          <span className={roseCount >= 10 ? "unlocked" : "locked"}>🎁 10</span>
          <span className={roseCount >= 15 ? "unlocked" : "locked"}>📸 15</span>
          <span className={roseCount >= 20 ? "unlocked" : "locked"}>❓ 20</span>
        </div>
      </div>

      {/* Compliment Generator Button */}
      <button
        className="compliment-btn"
        onClick={(e) => {
          e.stopPropagation();
          showRandomCompliment();
        }}
      >
        💝 Get Compliment
      </button>

      {/* Main content */}
      <div className="container" onClick={(e) => e.stopPropagation()}>
        <div className="rose-icon">
          <span className="rose">🌹</span>
        </div>

        <h1 className="title">
          Happy Rose Day{friendName ? `, ${friendName}` : ""}!
        </h1 >
        <h5 className="title">You are my fav🌹</h5>
        
        {showMessage && (
          <div className="message-box">
            <p className="message">
              To my dearest {friendName ? `, ${friendName}` : ""} ❤️
            </p>

            <p className="message">
              No matter where life takes us, one thing has always stayed the
              same — you’ve been by my side 🤗. In my good days and especially
              in my low ones, you’ve been that quiet strength that never left.
              You understand me in a way very few people do, sometimes even
              without me saying a word 😊.
            </p>

            <p className="message">
              You’ve been my comfort, my safe place, and the person who made
              tough moments feel lighter just by being there 🤗. With you, I
              never had to pretend or explain too much — you just got it ❤️. And
              that means more to me than I can ever fully express.
            </p>

            <p className="message">
              You’re not just close to me, you’re a part of me — someone I
              trust, someone I rely on, someone who feels like home🏡💛.
              Alhamdulillah for you and for having someone like you in my life
              🌸😊
            </p>

            {/* Secret Message at 10 roses */}
            {showSecret && (
              <div className="secret-message">
                <div className="secret-header">
                  ✨ Secret Message Unlocked! ✨
                </div>
                <p className="secret-text">
                  🎉 You found it! 🎉
                  <br />
                  Remember when i said "Tum bhot acchi ho"? Well, right back
                  at you! 🥹🫂
                  <br />
                  Your messages always brighten my day, even when we're both
                  super busy with studies.
                  <br />
                  JazakAllah Khair for being such an amazing bonding! 💖
                  <br />
                  <small>Keep collecting roses for more surprises...</small>
                </p>
              </div>
            )}

            {/* Memory Gallery at 15 roses */}
            {showMemories && (
              <div className="memory-gallery">
                <div className="memory-header">
                  📸 Our Beautiful Memories 📸
                </div>
                <div className="memory-card">
                  <div className="memory-emoji">
                    {memories[currentMemory].emoji}
                  </div>
                  <p className="memory-text">{memories[currentMemory].text}</p>
                  <div className="memory-nav">
                    <button onClick={prevMemory}>⬅️ Prev</button>
                    <span>
                      {currentMemory + 1} / {memories.length}
                    </span>
                    <button onClick={nextMemory}>Next ➡️</button>
                  </div>
                </div>
              </div>
            )}

            {/* Fun Quiz at 20 roses */}
            {showQuiz && !quizCorrect && (
              <div className="quiz-section">
                <div className="quiz-header">❓ Final Challenge ❓</div>
                <p className="quiz-question">
                  Complete this sentence: <br />
                  "Even though distance separates us and we meet only after many months, you’re still the ____ friend."
                </p>
                <input
                  type="text"
                  value={quizAnswer}
                  onChange={(e) => setQuizAnswer(e.target.value)}
                  placeholder="Type your answer..."
                  className="quiz-input"
                />
                <button onClick={checkQuizAnswer} className="quiz-btn">
                  Submit Answer 🎯
                </button>
              </div>
            )}

            {quizCorrect && (
              <div className="final-message">
                <div className="final-header">🏆 YOU DID IT! 🏆</div>
                <p className="final-text">
                  You've unlocked everything! 🎉
                  <br />
                  From late-night chats to exam help, from duas to funny
                  conversations...
                  <br />
                  Every moment with you is special, MashaAllah! 💖✨
                  <br />
                  Thank you for being you - sweet, helpful, caring, and always
                  there! 🫂
                  <br />
                  May Allah always keep our Bonding stronger, Aameen! 🤲
                  <br />
                  <br />
                  <strong>Happy Rose Day, {friendName || "Saima"}! 🌹💕</strong>
                </p>
              </div>
            )}

            <div className="signature">
              With love, duas, and appreciation,
              <br />
              <span className="from">Your Friend - Raj 💕</span>
            </div>

            {!showSecret && (
              <div className="hint">
                💡 Click anywhere to collect roses!
                <br />
                <small>Unlock surprises at 10, 15, and 20 roses! 🎁</small>
              </div>
            )}
          </div>
        )}

        <div className="roses-footer">
          <span>🌹</span>
          <span>🌹</span>
          <span>🌹</span>
        </div>

        <div className="date">
          February 7, 2026 - A Special Day for a Special Friend! 🌹💕
        </div>
      </div>

      {/* Hidden audio element */}
      <audio ref={audioRef} loop>
        <source
          src="/song.webm"
          type="audio/mpeg"
        />
      </audio>
    </div>
  );
}

export default App;
