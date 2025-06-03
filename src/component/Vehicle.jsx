import { useEffect, useRef } from 'react'
import { carImages } from '../assets/cars/carmatch';

const Vehicle = ({ vehicles }) => {
    if (!vehicles) return; 
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d")
        const allCars = Object.values(vehicles).flat()

        if (!allCars) return; 

        allCars.forEach((car) => {
            const img = new Image()
            img.src = carImages[car.brand]

            img.onload = () => {
                ctx.save()  // save context state

                const centerX = car.x;
                const centerY = car.y;

                ctx.translate(centerX, centerY)

                const angleMap = {
                    0: 90,
                    1: 180,
                    2: -90,
                    3: 0,
                };

                const angle = (angleMap[car.direction] * Math.PI) / 180
                ctx.rotate(angle)

                // Calculate aspect ratio and scaled dimensions
                var scale = 0.1; // <== Adjust this to make vehicle smaller or bigger
                const originalWidth = img.width;
                const originalHeight = img.height;

                const brand = car.brand

                if (brand === "Delivery" || brand == "MiniVan") {
                    scale = 0.125
                } else if (brand == "Police") {
                    scale = 0.15
                }

                const width = originalWidth * scale;
                const height = originalHeight * scale;

                ctx.drawImage(img, -width / 2, -height / 2, width, height);

                ctx.restore();
            }

        })
    }, [vehicles])
    return (
        <canvas
            ref={canvasRef}
            width={950}
            height={950}
            style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
        />
    );
};

export default Vehicle