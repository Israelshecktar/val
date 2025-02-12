// components/FloatingHearts.js
import React from "react";
import styles from "../styles/FloatingHearts.module.css";

export default function FloatingHearts() {
  // Number of hearts to render
  const heartsCount = 100;

  // Some cute pastel/pinkish colors—customize
  const colors = [
    "#FF4F81",
    "#FF8FAB",
    "#FFAFCC",
    "#FFC0CB",
    "#B19CD9",
    "#F8BBD0",
    "#FFD1DC",
    "#FFB6C1",
    "#FF69B4",
    "#FFFACD",
  ];

  // Generate random hearts
  const hearts = Array.from({ length: heartsCount }, () => {
    // Starting positions (0..100%)
    const startXPercent = Math.random() * 100;
    const startYPercent = Math.random() * 100;

    // Movement in X/Y from -300..300 px
    const translateX = (Math.random() - 0.5) * 600; 
    const translateY = (Math.random() - 0.5) * 600;

    // Random timing
    const delay = Math.random() * 5;       // 0..5s
    const duration = 4 + Math.random() * 5; // 4..9s

    // Random size (20..50px)
    const size = 20 + Math.random() * 30;

    // Pick a random color from the array
    const colorIndex = Math.floor(Math.random() * colors.length);
    const color = colors[colorIndex];

    return {
      startXPercent,
      startYPercent,
      translateX,
      translateY,
      delay,
      duration,
      size,
      color,
    };
  });

  return (
    <div className={styles.heartContainer}>
      {hearts.map((heart, index) => (
        <div
          key={index}
          className={styles.heart}
          style={{
            top: `${heart.startYPercent}%`,
            left: `${heart.startXPercent}%`,
            width: `${heart.size}px`,
            height: `${heart.size}px`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            // Pass the translation offset & color as CSS variables or inline style
            "--dx": `${heart.translateX}px`,
            "--dy": `${heart.translateY}px`,
            backgroundColor: heart.color, // inline color override
          }}
        />
      ))}
    </div>
  );
}
