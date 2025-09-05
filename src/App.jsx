import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  const sections = [
    { label: "Sí", color: "bg-green-500" },
    { label: "No", color: "bg-red-600" },
    { label: "Sí", color: "bg-blue-500" },
    { label: "No", color: "bg-purple-600" },
    { label: "Sí", color: "bg-yellow-500" },
    { label: "No", color: "bg-pink-600" },
  ];

  useEffect(() => {
    const ua = navigator.userAgent;

    // Lista de móviles autorizados (añade aquí más userAgents únicos)
    const ownerDevices = [
      "Android 10; K", // tu móvil Android
      "iPhone OS 18_6_2" // ejemplo de iPhone
    ];

    if (ownerDevices.some(sig => ua.includes(sig))) {
      setIsOwner(true);
    }
  }, []);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);

    if (isOwner) {
      // Siempre "No" si es alguno de los dueños
      const noIndexes = sections
        .map((s, i) => (s.label === "No" ? i : null))
        .filter((i) => i !== null);
      const randomNoIndex = noIndexes[Math.floor(Math.random() * noIndexes.length)];

      const sectionAngle = 360 / sections.length;
      const extraRotation = 1440 + randomNoIndex * sectionAngle;

      setRotation(rotation + extraRotation);

      setTimeout(() => {
        setSpinning(false);
        setResult("No");
      }, 4000);
    } else {
      // Aleatorio para otros
      const sectionAngle = 360 / sections.length;
      const randomIndex = Math.floor(Math.random() * sections.length);
      const extraRotation = 1440 + randomIndex * sectionAngle;

      setRotation(rotation + extraRotation);

      setTimeout(() => {
        setSpinning(false);
        setResult(sections[randomIndex].label);
      }, 4000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-800 via-pink-600 to-red-500 text-white p-4">
      <h1 className="text-4xl font-extrabold mb-10 drop-shadow-lg animate-bounce">
        ¿Eres 🏳️‍🌈?
      </h1>

      {/* Ruleta */}
      <motion.div
        animate={{ rotate: rotation }}
        transition={{ duration: 4, ease: "easeOut" }}
        className="relative w-80 h-80 rounded-full border-8 border-yellow-300 shadow-[0_0_40px_rgba(255,255,0,0.8)] overflow-hidden"
      >
        {sections.map((section, index) => {
          const angle = (360 / sections.length) * index;
          return (
            <div
              key={index}
              className={`${section.color} absolute w-1/2 h-1/2 origin-bottom-right flex items-center justify-center text-xl font-bold text-white`}
              style={{
                transform: `rotate(${angle}deg) skewY(-${90 - 360 / sections.length}deg)`,
                clipPath: "polygon(0 0, 100% 0, 100% 100%)",
              }}
            >
              {section.label}
            </div>
          );
        })}

        {/* Círculo central decorativo */}
        <div className="absolute w-20 h-20 bg-yellow-300 border-4 border-white rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg" />
      </motion.div>

      {/* Flecha indicador */}
      <div className="mt-[-22px] text-6xl drop-shadow-xl"></div>

      <button
        onClick={spin}
        disabled={spinning}
        className="mt-8 px-8 py-4 bg-yellow-400 text-black text-lg font-bold rounded-2xl shadow-xl hover:bg-yellow-300 disabled:opacity-50 transition-transform transform hover:scale-110"
      >
        {spinning ? "Girando..." : " Girar"}
      </button>

      {result && !spinning && (
        <p className="mt-8 text-3xl font-extrabold drop-shadow-md animate-pulse">
          Resultado: <span className="text-yellow-300">{result}</span>
        </p>
      )}
    </div>
  );
}
