import { Gift } from "lucide-react";
import React from "react";

function App() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          'url("https://aisla-leman.vercel.app/posts/aisla.jpg")',
      }}
    >
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4 text-pink-600">
          {React.useState(["Aisla Leman", "Айсла Леман"])[0]}
        </h1>
        {React.useEffect(() => {
          const interval = setInterval(() => {
            setName((prevName) =>
              prevName === "Aisla Leman" ? "Айсла Леман" : "Aisla Leman",
            );
          }, 5000);
          return () => clearInterval(interval);
        }, [])}
        <p className="text-xl mb-6 text-gray-700">
          Arriving November 11th 2024
        </p>
        <a
          href="https://www.amazon.com/baby-reg/gayana-leman-gayana-leman-november-2024-losangeles/18XG54OIUA6QN"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-pink-500 text-white font-semibold rounded-full hover:bg-pink-600 transition duration-300"
        >
          <Gift className="mr-2" />
          View Aisla's Registry
        </a>
      </div>
    </div>
  );
}

export default App;
