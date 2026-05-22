"use client";
import { useState, useEffect, useRef } from "react";

const banners = [
  { src: "/advertise-1.jpg", alt: "Advertisement 1" },
  { src: "/advertise-2.jpg", alt: "Advertisement 2" },
  { src: "/advertise-3.jpg", alt: "Advertisement 3" },
  { src: "/advertise-4.png", alt: "Advertisement 4" },
];

export default function Banners() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const goTo = (index) => {
    setCurrent((index + banners.length) % banners.length);
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 3000);
  };

  const stopTimer = () => clearInterval(timerRef.current);

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={stopTimer}
      onMouseLeave={startTimer}
    >
      {/* Track */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {banners.map((banner, i) => (
          <img
            key={i}
            src={banner.src}
            alt={banner.alt}
            className="min-w-full object-cover"
            style={{height:"236px"}}
          />
        ))}
      </div>

      {/* Prev / Next */}
      <button
        onClick={() => goTo(current - 1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/60"
        aria-label="Previous"
      >
        ‹
      </button>
      <button
        onClick={() => goTo(current + 1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/60"
        aria-label="Next"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}