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
      ctx.fillStyle = "#454d52";
      ctx.fillRect(xLeft, yUp, xRight - xLeft, yDown - yUp);

      const roadWidth = xRight - xLeft;
      const roadHeight = yDown - yUp;
      const numLanes = 6; // 3 inbound + 3 outbound

      if (roadHeight >= roadWidth) {
        // Vertical road
        const laneWidth = roadWidth / numLanes;

        for (let i = 1; i < numLanes; i++) {
          const x = xLeft + i * laneWidth;
          ctx.beginPath();
          ctx.moveTo(x, yUp);
          ctx.lineTo(x, yDown);

          if (i === numLanes / 2) {
            ctx.setLineDash([]);
            ctx.lineWidth = 4;
          } else {
            ctx.setLineDash([12, 12]);
            ctx.lineWidth = 2;
          }

          ctx.strokeStyle = "white";
          ctx.stroke();
        }

        // Optional emergency lane fills (currently commented out)
        // ctx.fillRect(xLeft, yUp, laneWidth, yDown - yUp); // inbound
        // ctx.fillRect(xRight - laneWidth, yUp, laneWidth, yDown - yUp); // outbound

        // Add EMERGENCY labels
        ctx.fillStyle = "white";
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Leftmost lane (inbound emergency)
        ctx.save();
        ctx.translate(xLeft + 5 * laneWidth / 2, (yUp + yDown) / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText("EMERGENCY", 0, 0);
        ctx.restore();

        // Rightmost lane (outbound emergency)
        ctx.save();
        ctx.translate(xRight - 5 * laneWidth / 2, (yUp + yDown) / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText("EMERGENCY", 0, 0);
        ctx.restore();

      } else {
        // Horizontal road
        const laneHeight = roadHeight / numLanes;

        for (let i = 1; i < numLanes; i++) {
          const y = yUp + i * laneHeight;
          ctx.beginPath();
          ctx.moveTo(xLeft, y);
          ctx.lineTo(xRight, y);

          if (i === numLanes / 2) {
            ctx.setLineDash([]);
            ctx.lineWidth = 4;
          } else {
            ctx.setLineDash([12, 12]);
            ctx.lineWidth = 2;
          }

          ctx.strokeStyle = "white";
          ctx.stroke();
        }

        // Optional emergency lane fills (currently commented out)
        // ctx.fillRect(xLeft, yUp, xRight - xLeft, laneHeight); // inbound
        // ctx.fillRect(xLeft, yDown - laneHeight, xRight - xLeft, laneHeight); // outbound

        // Add EMERGENCY labels
        ctx.fillStyle = "white";
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Top lane (inbound emergency)
        ctx.fillText("EMERGENCY", (xLeft + xRight) / 2, yUp + 5 * laneHeight / 2);

        // Bottom lane (outbound emergency)
        ctx.fillText("EMERGENCY", (xLeft + xRight) / 2, yDown - 5 * laneHeight / 2);
      }

      ctx.setLineDash([]); // Reset after drawing
    });

    // Draw center box (hardcoded)
    ctx.fillStyle = "#454d52";
    ctx.fillRect(420, 400, 180, 180);
  }, [roadCoordinate]);

  return (
    <canvas
      ref={canvasRef}
      width={1020}
      height={1000}
      style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
    />
  );
};

export default RoadCanvas;
