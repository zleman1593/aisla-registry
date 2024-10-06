import { Gift } from "lucide-react";
import React, { useState, useEffect } from "react";
import { SnakeGame } from "./snake";

function App() {
  const [name, setName] = useState("Aisla Leman");
  const [showSnakeGame, setShowSnakeGame] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setName((prevName) =>
        prevName === "Aisla Leman" ? "Айсла Leman" : "Aisla Leman",
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const dueDate = new Date("2024-11-11");
    const startDate = new Date(dueDate);
    startDate.setMonth(startDate.getMonth() - 9);

    const updateProgress = () => {
      const now = new Date();
      const totalDuration = dueDate.getTime() - startDate.getTime();
      const elapsed = now.getTime() - startDate.getTime();
      const progress = Math.min(
        100,
        Math.max(0, (elapsed / totalDuration) * 100),
      );
      setProgressPercentage(progress);
    };

    updateProgress();
    const progressInterval = setInterval(updateProgress, 86400000); // Update daily

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    const animationDuration = 1000; // 1 second
    const steps = 60; // 60 frames per second
    const stepDuration = animationDuration / steps;
    const stepSize = progressPercentage / steps;

    let currentStep = 0;

    const animationInterval = setInterval(() => {
      if (currentStep < steps) {
        setAnimatedProgress((prev) =>
          Math.min(prev + stepSize, progressPercentage),
        );
        currentStep++;
      } else {
        clearInterval(animationInterval);
      }
    }, stepDuration);

    return () => clearInterval(animationInterval);
  }, [progressPercentage]);

  const handleNameClick = () => {
    setShowSnakeGame(true);
  };

  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            'url("https://aisla-leman.vercel.app/posts/aisla.jpg")',
        }}
      >
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg text-center">
          <h1
            className="text-4xl font-bold mb-4 text-pink-600 cursor-pointer"
            onClick={handleNameClick}
          >
            {name}
          </h1>
          <p className="text-xl mb-2 text-gray-700">
            Arriving November 11th 2024
          </p>
          <a
            href="https://www.amazon.com/baby-reg/gayana-leman-gayana-leman-november-2024-losangeles/18XG54OIUA6QN"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center px-6 py-3 bg-pink-500 text-white font-semibold rounded-full hover:bg-pink-600 transition duration-300 overflow-hidden"
            style={{ width: "250px" }}
          >
            <div
              className="absolute left-0 top-0 bottom-0 bg-pink-600 transition-all duration-1000"
              style={{ width: `${animatedProgress}%` }}
            ></div>
            <span className="relative z-10 flex items-center justify-center w-full">
              <Gift className="mr-2" />
              View Aisla's Registry
            </span>
          </a>
        </div>
      </div>
      {showSnakeGame && (
        <div className="fixed inset-0 z-50">
          <SnakeGame />
        </div>
      )}
    </>
  );
}

export default App;
