import { useEffect, useRef, useState } from 'react'
import { carImages } from '../../assets/cars/carmatch'

const preloadImages = () => {
    const loaded = {}
    for (const [brand, src] of Object.entries(carImages)) {
        const img = new Image()
        img.src = src
        loaded[brand] = img
    }
    return loaded
}

const Vehicle = ({ vehicles }) => {
    const canvasRef = useRef(null)
    const imagesRef = useRef(preloadImages()) // preload once

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        const allCars = Object.values(vehicles || {}).flat()

        allCars.forEach((car) => {
            const img = imagesRef.current[car.brand]
            if (!img.complete) return // skip if not loaded yet

            ctx.save()

            const centerX = car.x
            const centerY = car.y
            ctx.translate(centerX, centerY)

            const angleMap = {
                0: 90,
                1: 180,
                2: -90,
                3: 0,
            }
            const angle = (angleMap[car.direction] * Math.PI) / 180
            ctx.rotate(angle)

            let scale = 0.03
            if (car.brand === "Ambulance" ||  car.brand === "MiniVan" || car.brand === "Police" || car.brand === "Honda" || car.brand === "Toyota" || car.brand === "Audi") {
                scale = 0.045
            } else if ( car.brand === "FireTruck") {
                scale = 0.04
            } else if (car.brand === "Delivery" || car.brand === "Ford" ) {
                scale = 0.05
            }

            const width = img.width * scale
            const height = img.height * scale
            ctx.drawImage(img, -width / 2, -height / 2, width, height)

            ctx.restore()
        })
    }, [vehicles])

    return (
        <canvas
            ref={canvasRef}
            width={800}
            height={800}
            style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
        />
    )
}

export default Vehicle
