"use client";
import React, { useEffect, useRef, useState } from "react";
const SummerValuePack = () => {
  const images = [
    "https://t3.ftcdn.net/jpg/02/64/92/28/360_F_264922838_NErJEovZiP9MTa49apqL1Vs3f88ZT8Dg.jpg",
    "https://images.pexels.com/photos/449559/pexels-photo-449559.jpeg",
  ];

  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, []);

  const startAutoplay = () => {
    stopAutoplay();
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 4000);
  };

  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const goPrev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const goNext = () => setIndex((i) => (i + 1) % images.length);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-black"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, i) => (
          <div key={i} className="min-w-full relative h-[56vh] md:h-[60vh] lg:h-[72vh]">
            <img
              src={src}
              alt={`slide-${i}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
            <div className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 text-white max-w-md">
              <p className="uppercase tracking-wider text-sm md:text-base mb-1">T-shirt / Tops</p>
              <h2 className="text-2xl md:text-5xl lg:text-6xl font-extrabold leading-tight my-1">Summer Value Pack</h2>
              <p className="text-sm md:text-lg mb-2">cool / colorful / comfy</p>
              <button className="mt-2 bg-white text-black font-bold px-4 py-2 rounded">Shop Now</button>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-4 z-30 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            aria-label={`go-to-${i}`}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full ${i === index ? "bg-white" : "bg-white/50"}`}
          />
        ))}
      </div>
    </section>
  );
};


export default SummerValuePack;
