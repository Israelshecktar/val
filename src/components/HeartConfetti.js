// components/HeartConfetti.js
import React, { useCallback, useRef, useEffect } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";

/**
 * A simple function that draws a heart shape around (0,0).
 * We'll rely on confetti's "scalar" or "startVelocity" to size/throw them.
 */
function drawHeart(ctx) {
  // You can tweak this path to get the look you want
  ctx.beginPath();
  // Move to center
  const topCurveHeight = 0.3;
  ctx.moveTo(0, topCurveHeight);

  // Top left curve
  ctx.bezierCurveTo(
    0, topCurveHeight - 0.3, 
    -0.5, topCurveHeight - 0.5, 
    -0.5, topCurveHeight - 0.9
  );
  
  // Left side down
  ctx.bezierCurveTo(-0.5, -0.7, 0, -0.7, 0, -0.3);

  // Top right curve
  ctx.bezierCurveTo(
    0, -0.7, 
    0.5, -0.7, 
    0.5, topCurveHeight - 0.9
  );
  
  // Right side down
  ctx.bezierCurveTo(
    0.5, topCurveHeight - 0.5, 
    0, topCurveHeight - 0.3, 
    0, topCurveHeight
  );

  ctx.closePath();
  ctx.fill();
}

export default function HeartConfetti({ fire }) {
  const refAnimationInstance = useRef(null);

  // Store the confetti instance
  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  // Helper to fire one "shot" of hearts
  const makeShot = useCallback((particleRatio, opts) => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },   // 70% from top, so it appears near middle
        particleCount: Math.floor(200 * particleRatio),
        shapes: ["custom"],  // use our custom shape
        drawShape: drawHeart // the function that draws hearts
      });
    }
  }, []);

  // Fire multiple bursts in sequence
  const fireConfetti = useCallback(() => {
    // You can tweak each "burst" to get the look you want
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ["#ff8fab", "#ff4f81", "#ffafcc"],
      scalar: 2, // make the hearts bigger
    });
    makeShot(0.2, {
      spread: 60,
      colors: ["#ff8fab", "#ff4f81", "#ffafcc"],
      scalar: 2,
    });
    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      colors: ["#ff8fab", "#ff4f81", "#ffafcc"],
      scalar: 2,
    });
    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      colors: ["#ff8fab", "#ff4f81", "#ffafcc"],
      scalar: 2,
    });
    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
      colors: ["#ff8fab", "#ff4f81", "#ffafcc"],
      scalar: 2,
    });
  }, [makeShot]);

  // Whenever "fire" prop is true, trigger the confetti
  useEffect(() => {
    if (fire) {
      fireConfetti();
    }
  }, [fire, fireConfetti]);

  return (
    <ReactCanvasConfetti
      refConfetti={getInstance}
      style={{
        position: "fixed",
        pointerEvents: "none",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%"
      }}
    />
  );
}
