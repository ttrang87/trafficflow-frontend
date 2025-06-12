import { useState } from "react";
import useTrafficWebSocket from "./component/useTrafficWebSocket";
import LiveStats from "./component/control_panel/LiveStat"
import Simulation from "./component/control_panel/Simulation"
import TrafficFlow from "./component/road_system/TrafficFlow"
import TrafficLightController from "./component/control_panel/TrafficLightControl";

function App() {
  // All WebSocket-related state is now in the parent App component
  const [vehicles, setVehicles] = useState(null);
  const [trafficLightColors, setTrafficLightColors] = useState(null);
  const [totalCar, setTotalCar] = useState(0);
  const [avgSpeed, setAvgSpeed] = useState(0);
  const [avgWait, setAvgWait] = useState(0);
  const [shouldConnectWebSocket, setShouldConnectWebSocket] = useState(false);

  // WebSocket hook is now called in the parent component
  useTrafficWebSocket(setVehicles, setTrafficLightColors, shouldConnectWebSocket, setTotalCar, setAvgSpeed, setAvgWait);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-6 w-screen">
      <div className="w-full flex gap-6 items-start justify-center gap-6">

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-fit">
            {/* Pass down all the props TrafficFlow needs */}
            <TrafficFlow 
              vehicles={vehicles}
              trafficLightColors={trafficLightColors}
              setShouldConnectWebSocket={setShouldConnectWebSocket}
              shouldConnectWebSocket={shouldConnectWebSocket}
            />
          </div>

          <div className="flex flex-col gap-3">
            <Simulation />
            {/* LiveStats now gets totalCar directly */}
            <LiveStats totalCar={totalCar} avgSpeed={avgSpeed} avgWait={avgWait} />
            <TrafficLightController trafficLightColors={trafficLightColors} />
          </div>
 
      </div>
    </div>
  )
}

export default App