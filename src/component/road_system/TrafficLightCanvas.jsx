import { useEffect, useRef } from "react";

const TrafficLightCanvas = ({ trafficAttribute, trafficLightColors }) => {

    const canvasRef = useRef(null);


    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !trafficAttribute || !trafficLightColors) return;
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (trafficAttribute) {
            Object.entries(trafficAttribute).forEach(([direction, { xLeft, xRight, yUp, yDown }]) => {
                const width = xRight - xLeft;
                const height = yDown - yUp;

                const realColor = trafficLightColors[direction];
                const indexColor =
                    realColor === "RED" ? 0 :
                        realColor === "YELLOW" ? 1 :
                            realColor === "GREEN" ? 2 :
                                -1;


                // Draw the traffic light box
                ctx.fillStyle = "#080808";
                ctx.fillRect(xLeft, yUp, width, height);

                const isVertical = height >= width;

                // Parameters
                const defaultColors = ["#bf9b9b", "#807e4f", "#748c69"];
                const lightColors = ["#fc0a0a", "#fcec0a", "#11de07"];
                const gapBetweenCircles = 2; // Customize this for desired spacing



                // Calculate radius and adjusted total space needed
                const availableSpace = isVertical ? height : width;
                const maxRadius = isVertical
                    ? Math.min(width / 3, (availableSpace - 2 * gapBetweenCircles) / 3 / 2)
                    : Math.min(height / 3, (availableSpace - 2 * gapBetweenCircles) / 3 / 2);

                const radius = maxRadius * 1; // slightly shrink to add padding

                for (let i = 0; i < 3; i++) {
                    let cx, cy;

                    if (isVertical) {
                        cx = xLeft + width / 2;
                        cy =
                            yUp +
                            radius +
                            i * (2 * radius + gapBetweenCircles) + 2;
                    } else {
                        cx =
                            xLeft +
                            radius +
                            i * (2 * radius + gapBetweenCircles) + 2;
                        cy = yUp + height / 2;
                    }

                    ctx.beginPath();
                    ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
                    if (i === indexColor) {
                        ctx.fillStyle = lightColors[i];
                    } else {
                        ctx.fillStyle = defaultColors[i];
                    }
                    ctx.fill();
                    ctx.strokeStyle = "#333";
                    ctx.stroke();
                }
            });
        }
    }, [trafficAttribute, trafficLightColors]);

    return (
        <canvas
            ref={canvasRef}
            width={800}
            height={800}
            style={{ position: "absolute", top: 0, left: 0, zIndex: 2 }}
        />
    );
};

export default TrafficLightCanvas;
