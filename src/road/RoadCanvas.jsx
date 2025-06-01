import { useEffect, useRef } from "react";

const RoadCanvas = ({ roadCoordinate }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ===== Draw roads =====
    ctx.fillStyle = "#454d52";
    Object.values(roadCoordinate).forEach(({ xLeft, xRight, yUp, yDown }) => {
      ctx.fillRect(xLeft, yUp, xRight - xLeft, yDown - yUp);

      // Dotted lane line
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;
      ctx.setLineDash([12, 12]);

      const roadWidth = xRight - xLeft;
      const roadHeight = yDown - yUp;
      if (roadHeight >= roadWidth) {
        const midX = (xLeft + xRight) / 2;
        ctx.beginPath();
        ctx.moveTo(midX, yUp);
        ctx.lineTo(midX, yDown);
        ctx.stroke();
      } else {
        const midY = (yUp + yDown) / 2;
        ctx.beginPath();
        ctx.moveTo(xLeft, midY);
        ctx.lineTo(xRight, midY);
        ctx.stroke();
      }

      ctx.setLineDash([]);
    });

    // Draw center box (hardcoded)
    ctx.fillStyle = "#454d52";
    ctx.fillRect(420, 400, 120, 120);
  }, [roadCoordinate]);

  return (
    <canvas
      ref={canvasRef}
      width={950}
      height={920}
      style={{ position: "absolute", top: 0, left: 0 }}
    />
  );
};

export default RoadCanvas;
