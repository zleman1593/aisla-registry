import { Gift } from "lucide-react";
import React, { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState("Aisla  ");
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [fade, setFade] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setName((prevName) => (prevName === "Aisla  " ? "Айсла " : "Aisla  "));
        setFade(false);
      }, 500);
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
    setShowVideo(true);
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
        {showVideo && (
          <video
            autoPlay
            loop
            muted
            className="absolute z-0 w-auto min-w-full min-h-full max-w-none"
          >
            <source src="./video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg text-center relative z-10">
          <h1
            className="text-4xl font-bold mb-4 text-pink-600 cursor-pointer"
            onClick={handleNameClick}
          >
            <span
              className={
                fade
                  ? "transition-opacity duration-500 opacity-0"
                  : "transition-opacity duration-500 opacity-100"
              }
            >
              {" "}
              {name}
            </span>
            Leman
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
            />
            <span className="relative z-10 flex items-center justify-center w-full">
              <Gift className="mr-2" />
              View Aisla's Registry
            </span>
          </a>
          {/* <div className="mt-6 text-gray-700">
            <p>
              <b>A</b> tender angel graces us, so smal<b>l</b>
            </p>
            <p>
              <b>I</b>nnocent eyes reflect the purest lov<b>e</b>
            </p>
            <p>
              <b>S</b>oftly sleeping, dreams embrace you war<b>m</b>
            </p>
            <p>
              <b>L</b>ife is brighter now with you, Aisl<b>a</b>
            </p>
            <p>
              <b>A</b>ll the world awaits your first daw<b>n</b>
            </p>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default App;
