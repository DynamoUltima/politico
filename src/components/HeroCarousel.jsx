import React, { useEffect, useState } from 'react';
import { clsx } from 'clsx';

export default function HeroCarousel({ images, intervalMs = 5000 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [images]);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [images, intervalMs]);

  return (
    <div className="absolute inset-0 z-0">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={clsx(
            'absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out',
            i === index ? 'opacity-80' : 'opacity-0'
          )}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/30 to-white" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_42%,rgba(255,255,255,0.85),rgba(255,255,255,0)_70%)]" />
    </div>
  );
}
