import { animated } from "@react-spring/three";
import React, { useEffect } from "react";
import { useState } from "react";

const StartBackground = () => {
  const [start, setStart] = useState([]);
  const [meteor, setMeteor] = useState([]);

  useEffect(() => {
    generateStars();
    generateMeteor();

    const handleResize = () => {
      generateStars();
      generateMeteor();
    };

    window.addEventListener("resize", handleResize);
  }, []);

  const generateStars = () => {
    const numberOfStars = Math.floor(
      (window.innerWidth * window.innerHeight) / 10000
    );

    const newStart = [];

    for (let i = 0; i < numberOfStars; i++) {
      newStart.push({
        id: i,
        size: Math.random() * 3 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.5 + 0.5,
        animationDureation: Math.random() * 4 + 2,
      });
    }
    setStart(newStart);
  };

  const generateMeteor = () => {
    const numberOfMeteors = 4;

    const newMeteor = [];

    for (let i = 0; i < numberOfMeteors; i++) {
      newMeteor.push({
        id: i,
        size: Math.random() * 2 + 1,
        x: Math.random() * 100,
        y: Math.random() * 20,
        delay: Math.random() * 15,
        animationDureation: Math.random() * 3 + 3,
      });
    }
    setMeteor(newMeteor);
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {...start.map((star) => (
        <div
          key={star.id}
          className="star animate-pulse-subtle"
          style={{
            width: star.size + "px",
            height: star.size + "px",
            left: star.x + "%",
            top: star.y + "%",
            opacity: star.opacity,
            animationDuration: star.animationDuration + "s",
          }}
        />
      ))}
      {meteor.map((meteor) => (
        <div
          key={meteor.id}
          className="meteor animate-meteor"
          style={{
            width: meteor.size * 50 + "px",
            height: meteor.size * 2 + "px",
            left: meteor.x + "%",
            top: meteor.y + "%",
            delay: meteor.delay + "s",
            animationDuration: meteor.animationDuration + "s",
          }}
        />
      ))}
    </div>
  );
};

export default StartBackground;
