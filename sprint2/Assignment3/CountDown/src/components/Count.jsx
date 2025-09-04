import React, { useState, useEffect, useRef } from "react";

const CountdownTimer = () => {
  const [time, setTime] = useState("");        // input seconds
  const [remaining, setRemaining] = useState(0); // countdown state
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [initialTime, setInitialTime] = useState(0); // for progress bar
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setRemaining((prev) => {
          if (prev > 1) {
            return prev - 1;
          } else {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            playAlarm();
            return 0;
          }
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, isPaused]);

  const handleStart = () => {
    if (!time || time <= 0) {
      alert("Please enter a valid time in seconds!");
      return;
    }
    setRemaining(Number(time));
    setInitialTime(Number(time));
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    setIsPaused((prev) => !prev);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setIsPaused(false);
    setRemaining(0);
    setTime("");
  };

  const playAlarm = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const progress =
    initialTime > 0 ? (remaining / initialTime) * 100 : 0;

  return (
    <div className="timer-container">
      <h2> Countdown Timer</h2>

      <input
        type="number"
        placeholder="Enter time in seconds"
        value={time}
        disabled={isRunning}
        onChange={(e) => setTime(e.target.value)}
      />
      <div className="buttons">
        <button onClick={handleStart} disabled={isRunning}>
          Start
        </button>
        {isRunning && (
          <button onClick={handlePauseResume}>
            {isPaused ? "Resume" : "Pause"}
          </button>
        )}
        <button onClick={handleReset}>Reset</button>
      </div>

      <h3>
        {remaining > 0
          ? `Time left: ${remaining} sec`
          : isRunning
          ? "..."
          : "No timer running"}
      </h3>

      {remaining === 0 && initialTime > 0 && !isRunning && (
        <p className="timesup">Time’s up!</p>
      )}

      {isRunning || remaining > 0 ? (
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      ) : null}

      <audio ref={audioRef} src="/alarm.mp3" preload="auto" />
    </div>
  );
};

export default CountdownTimer;
