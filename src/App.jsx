import React, { useState, useEffect, useRef } from "react";
import { generateWords } from "./utils/wordGenerator";
import {
  calculateWPM,
  calculateWPH,
  calculateWPS,
  calculateAccuracy,
  calculateWordStats, // Correct usage
  calculateAccuracyWords, // Correct usage
} from "./utils/metrics";
import PromptDisplay from "./components/PromptDisplay";
import TypingInput from "./components/TypingInput";
import StatsDisplay from "./components/StatsDisplay";
import Results from "./components/Results";
import { useTheme } from "./hooks/useTheme";

function App() {
  const typingRef = useRef();

  const { theme, toggleTheme } = useTheme();
  const [words, setWords] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [status, setStatus] = useState("idle"); // idle, running, finished
  const [startTime, setStartTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  // Auto focus input
  useEffect(() => {
    const handleClick = () => {
      if (status !== "finished") {
        typingRef.current?.focusInput();
      }
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [status]);

  const resetTest = () => {
    setWords(generateWords(40));
    setUserInput("");
    setStatus("idle");
    setStartTime(null);
    setCurrentTime(null);
    setEndTime(null);
  };

  useEffect(() => {
    resetTest();
  }, []);

  // Timer
  useEffect(() => {
    let interval;
    if (status === "running") {
      interval = setInterval(() => {
        setCurrentTime(Date.now());
      }, 100);
    }
    return () => clearInterval(interval);
  }, [status]);

  const handleInput = (input) => {
    if (status === "finished") return;

    if (status === "idle") {
      setStatus("running");
      setStartTime(Date.now());
      setCurrentTime(Date.now());
    }

    setUserInput(input);

    const fullText = words.join(" ");
    if (input.length >= fullText.length) {
      finishTest();
    }
  };

  const finishTest = () => {
    setStatus("finished");
    setEndTime(Date.now());
  };

  // Time
  const timeNow = status === "finished" ? endTime : currentTime || 0;
  const start = startTime || 0;
  const elapsedSeconds =
    start > 0 && timeNow > 0 ? Math.max(0, (timeNow - start) / 1000) : 0;

  // Character stats
  const fullText = words.join(" ");
  let correctChars = 0;
  for (let i = 0; i < userInput.length; i++) {
    if (userInput[i] === fullText[i]) {
      correctChars++;
    }
  }

  const wpm = calculateWPM(correctChars, elapsedSeconds);
  const wph = calculateWPH(wpm);
  const wps = calculateWPS(wpm);
  const accuracy = calculateAccuracy(correctChars, userInput.length);

  // Word-based
  const typedWords = userInput.trim().split(/\s+/);
  const { correctWords, incorrectWords, totalWords } = calculateWordStats(
    typedWords,
    words
  );

  // Final stats
  const finalStats = {
    wpm,
    wph,
    wps,
    accuracy: calculateAccuracyWords(correctWords, totalWords),
    timeTaken: elapsedSeconds.toFixed(2),
    correctWords,
    incorrectWords,
    totalWords,
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 font-sans">
      {/* Toggle Button */}
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 px-4 py-2 rounded-md bg-gray-700 dark:bg-gray-200 text-white dark:text-gray-800 transition duration-300 shadow-md"
      >
        {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <div className="max-w-4xl w-full">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
            Typing Speed Test
          </h1>
          <p className="text-gray-400">
            Test your typing speed with random words and special characters.
          </p>
        </header>

        <StatsDisplay
          wpm={wpm}
          wph={wph}
          wps={wps}
          accuracy={accuracy}
          timeLeft={elapsedSeconds.toFixed(1)}
        />

        <div className="relative mb-8">
          <PromptDisplay words={words} userInput={userInput} />
          <TypingInput
            ref={typingRef}
            userInput={userInput}
            onInput={handleInput}
            disabled={status === "finished"}
          />

          {status === "running" && (
            <div className="flex items-center justify-center mt-2">
              <button
                onClick={finishTest}
                className="px-4 py-2 cursor-pointer rounded-md bg-rose-700 text-white transition duration-300 shadow-md"
              >
                Stop
              </button>
            </div>
          )}

          {status === "idle" && (
            <div className=" flex items-center justify-center pointer-events-none">
              <p className="text-xl text-gray-400 animate-pulse bg-gray-900/80 px-4 py-2 rounded-lg">
                Start typing to begin...
              </p>
            </div>
          )}
        </div>

        {status === "finished" && <Results stats={finalStats} onRestart={resetTest} />}

        <footer className=" text-center text-gray-600 text-sm">
          <p>Press any key to focus. Type the text exactly as shown.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
