import { useEffect, useState } from "react";
import { API } from "../api";
import RoadCanvas from "./RoadCanvas";
import TrafficLightCanvas from "./TrafficLightCanvas";

const TrafficFlow = () => {
  const [roadCoordinate, setRoadCoordinate] = useState(null);
  const [trafficLightColors, setTrafficLightColors] = useState(null);
  const [trafficAttribute, setTrafficAttribute] = useState(null);
  const trafficWidth = 15;
  const trafficLength = 40;

  useEffect(() => {
    const getRoadCoordinate = async () => {
      try {
        const response = await fetch(API.GET_ROAD_COORDINATE, {
          method: "GET",
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        setRoadCoordinate(data);
      } catch (err) {
        console.error(err);
      }
    };

    getRoadCoordinate();
  }, []);

  // Fetch traffic light colors
  useEffect(() => {
    const getTrafficLightColors = async () => {
      try {
        const response = await fetch(API.GET_TRAFFIC_LIGHT, {
          method: "GET",
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        setTrafficLightColors(data);
        console.log(data)
      } catch (err) {
        console.error(err);
      }
    };

    getTrafficLightColors();
  }, []);

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
  }, [roadCoordinate]);

  if (!roadCoordinate || !trafficAttribute) return <div>Loading...</div>;

  return (
    <div className="p-10">
      <div className="bg-gray-400 rounded-lg" style={{ position: "relative", width: 950, height: 920 }}>
        <RoadCanvas roadCoordinate={roadCoordinate} />
        <TrafficLightCanvas trafficAttribute={trafficAttribute} />
      </div>
    </div>
  );
};

export default TrafficFlow;
