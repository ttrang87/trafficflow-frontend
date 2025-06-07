import { useEffect, useState } from "react";
import useTrafficWebSocket from "./useTrafficWebSocket";
import RoadCanvas from "./RoadCanvas";
import TrafficLightCanvas from "./TrafficLightCanvas";
import Vehicle from "./Vehicle";
import { API } from "../api";

const TrafficFlow = () => {
  const [roadCoordinate, setRoadCoordinate] = useState(null);
  const [vehicles, setVehicles] = useState(null);
  const [trafficLightColors, setTrafficLightColors] = useState(null);
  const [trafficAttribute, setTrafficAttribute] = useState(null);
  const [isServerReady, setIsServerReady] = useState(false);
  const [shouldConnectWebSocket, setShouldConnectWebSocket] = useState(false);

  const trafficWidth = 15;
  const trafficLength = 40;

  const checkServerHealth = async () => {
    try {
      const response = await fetch('http://localhost:8080/actuator/health', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        timeout: 5000
      });

      if (response.ok) {
        console.log('✅ Server is ready');
        return true;
      }
    } catch (error) {
      console.log('⏳ Server not ready yet, retrying...', error.message);
    }
    return false;
  };

  useEffect(() => {
    let isMounted = true;

    const initializeTrafficFlow = async () => {
      console.log('🔄 Initializing traffic flow...');

      let attempts = 0;
      const maxAttempts = 15;

      while (attempts < maxAttempts && isMounted) {
        const serverReady = await checkServerHealth();
        if (serverReady) {
          setIsServerReady(true);
          break;
        }
        attempts++;
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      if (!isMounted) return;

      if (!isServerReady && attempts >= maxAttempts) {
        console.error('❌ Server failed to start within timeout period');
        return;
      }

      try {
        console.log('📍 Fetching road coordinates...');
        const response = await fetch(API.GET_ROAD_COORDINATE, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('✅ Road coordinates loaded');

        if (isMounted) {
          setRoadCoordinate(data);

          setTimeout(() => {
            if (isMounted) {
              console.log('🔌 Enabling WebSocket connection...');
              setShouldConnectWebSocket(true);
            }
          }, 1000);
        }
      } catch (error) {
        console.error('❌ Error fetching road coordinates:', error);
      }
    };

    initializeTrafficFlow();

    return () => {
      isMounted = false;
    };
  }, []);

  useTrafficWebSocket(setVehicles, setTrafficLightColors, shouldConnectWebSocket);

  useEffect(() => {
    if (!roadCoordinate) return;

    const attr = {
      "North": {
        xLeft: roadCoordinate.North.xLeft,
        xRight: roadCoordinate.North.xLeft + trafficLength,
        yUp: roadCoordinate.North.yDown,
        yDown: roadCoordinate.North.yDown + trafficWidth
      },
      "East": {
        xLeft: roadCoordinate.East.xLeft - trafficWidth,
        xRight: roadCoordinate.East.xLeft,
        yUp: roadCoordinate.East.yUp,
        yDown: roadCoordinate.East.yUp + trafficLength
      },
      "South": {
        xLeft: roadCoordinate.South.xRight - trafficLength,
        xRight: roadCoordinate.South.xRight,
        yUp: roadCoordinate.South.yUp - trafficWidth,
        yDown: roadCoordinate.South.yUp
      },
      "West": {
        xLeft: roadCoordinate.West.xRight,
        xRight: roadCoordinate.West.xRight + trafficWidth,
        yUp: roadCoordinate.West.yDown - trafficLength,
        yDown: roadCoordinate.West.yDown
      }
    };

    setTrafficAttribute(attr);
    console.log('✅ Traffic attributes calculated');
  }, [roadCoordinate]);

  if (!isServerReady) {
    return (
      <div className="p-10">
        <div className="bg-gray-100 rounded-lg p-8 text-center" style={{ width: 950, height: 920 }}>
          <div className="mt-96">
            <div className="text-xl mb-4 text-black">🚦 Traffic Simulation</div>
            <div className="text-gray-600">⏳ Waiting for server to start...</div>
            <div className="mt-2 text-sm text-gray-500">This may take a few moments</div>
          </div>
        </div>
      </div>
    );
  }

  if (!roadCoordinate || !trafficAttribute) {
    return (
      <div className="p-10">
        <div className="bg-gray-100 rounded-lg p-8 text-center" style={{ width: 950, height: 920 }}>
          <div className="mt-96">
            <div className="text-xl mb-4 text-black">🚦 Traffic Simulation</div>
            <div className="text-gray-600">📍 Loading road coordinates...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!shouldConnectWebSocket) {
    return (
      <div className="p-10">
        <div className="bg-gray-100 rounded-lg p-8 text-center" style={{ width: 950, height: 920 }}>
          <div className="mt-96">
            <div className="text-xl mb-4 text-black">🚦 Traffic Simulation</div>
            <div className="text-gray-600">🔌 Connecting to traffic system...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10">
      <div className="mb-4">
        <div className="text-sm text-gray-600">
          Server: <span className="text-green-600">✅ Connected</span> | 
          WebSocket: <span className="text-green-600">🔌 Active</span>
        </div>
      </div>
      <div className="bg-gray-400 rounded-lg" style={{ position: "relative", width: 1000, height: 970 }}>
        <RoadCanvas roadCoordinate={roadCoordinate} />
        <TrafficLightCanvas trafficAttribute={trafficAttribute} trafficLightColors={trafficLightColors} />
        <Vehicle vehicles={vehicles} />
      </div>
    </div>
  );
};

export default TrafficFlow;
