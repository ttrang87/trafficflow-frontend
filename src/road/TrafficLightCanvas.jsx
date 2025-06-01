import { useEffect, useRef } from "react";

const TrafficLightCanvas = ({ trafficAttribute }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (trafficAttribute) {
      Object.values(trafficAttribute).forEach(({ xLeft, xRight, yUp, yDown }) => {
        const width = xRight - xLeft;
        const height = yDown - yUp;

        // Draw the traffic light box
        ctx.fillStyle = "#dde3ed";
        ctx.fillRect(xLeft, yUp, width, height);

        const isVertical = height >= width;

        // Parameters
        const lightColors = ["#803232", "#96844e", "#0e5714"];
        const gapBetweenCircles = 4; // Customize this for desired spacing

        // Calculate radius and adjusted total space needed
        const availableSpace = isVertical ? height : width;
        const maxRadius = isVertical
          ? Math.min(width / 3, (availableSpace - 2 * gapBetweenCircles) / 3 / 2)
          : Math.min(height / 3, (availableSpace - 2 * gapBetweenCircles) / 3 / 2);

        const radius = maxRadius * 0.9; // slightly shrink to add padding

        for (let i = 0; i < 3; i++) {
          let cx, cy;

          if (isVertical) {
            cx = xLeft + width / 2;
            cy =
              yUp +
              radius +
              i * (2 * radius + gapBetweenCircles);
          } else {
            cx =
              xLeft +
              radius +
              i * (2 * radius + gapBetweenCircles);
            cy = yUp + height / 2;
          }

          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
          ctx.fillStyle = lightColors[i];
          ctx.fill();
          ctx.strokeStyle = "#333";
          ctx.stroke();
        }
      });
    }
  }, [trafficAttribute]);

  return (
    <canvas
      ref={canvasRef}
      width={950}
      height={920}
      style={{ position: "absolute", top: 0, left: 0 }}
    />
  );
};

export default TrafficLightCanvas;
