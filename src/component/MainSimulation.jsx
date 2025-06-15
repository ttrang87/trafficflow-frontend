import { useState, useEffect } from "react";
import useTrafficWebSocket from "./useTrafficWebSocket";
import LiveStats from "./control_panel/LiveStat";
import Simulation from "./control_panel/Simulation";
import TrafficFlow from "./road_system/TrafficFlow";
import TrafficLightController from "./control_panel/TrafficLightControl";
import { API } from "../api";

function MainSimulation() {
  // All WebSocket-related state is now in the parent App component
  const [vehicles, setVehicles] = useState(null);
  const [trafficLightColors, setTrafficLightColors] = useState(null);
  const [totalCar, setTotalCar] = useState(0);
  const [totalAllVehicle, setTotalAllVehicle] = useState(0);
  const [avgSpeed, setAvgSpeed] = useState(0);
  const [avgWait, setAvgWait] = useState(0);
  const [shouldConnectWebSocket, setShouldConnectWebSocket] = useState(false);
  const [isReset, setIsReset] = useState(false);

  useTrafficWebSocket(setVehicles, setTrafficLightColors, shouldConnectWebSocket, setTotalCar, setAvgSpeed, setAvgWait, setTotalAllVehicle);

  useEffect(() => {
    const handleDisconnect = () => {
      navigator.sendBeacon(
        API.DISCONNECT
      );
    };

    // 1. When tab is closed or page is refreshed
    window.addEventListener("unload", handleDisconnect);

    // 2. When navigating away (React Router)
    return () => {
      handleDisconnect(); // called when component unmounts (i.e., route changes)
      window.removeEventListener("unload", handleDisconnect);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-6 w-screen">
      <div className="w-full flex gap-6 items-start justify-center gap-6">

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-fit">
            <TrafficFlow 
              vehicles={vehicles}
              trafficLightColors={trafficLightColors}
              setShouldConnectWebSocket={setShouldConnectWebSocket}
              shouldConnectWebSocket={shouldConnectWebSocket}
            />
          </div>

          <div className="flex flex-col gap-3">
            <Simulation isReset={isReset} setIsReset={setIsReset}/>
            <LiveStats totalCar={totalCar} avgSpeed={avgSpeed} avgWait={avgWait} totalAllVehicle={totalAllVehicle}/>
            <TrafficLightController trafficLightColors={trafficLightColors}  isReset={isReset} setIsReset={setIsReset} />
          </div>
 
      </div>
    </div>
  )
}

export default MainSimulation