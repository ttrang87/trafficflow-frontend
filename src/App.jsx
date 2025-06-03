import TrafficFlow from "./component/TrafficFlow"
import { useEffect } from "react";
function App() {
  useEffect(() => {
    const startSimulation = async () => {
      try {
        await fetch("http://localhost:8080/start-simulation", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        console.log("Simulation started");
      } catch (err) {
        console.error("Error starting simulation:", err);
      }
    };

    startSimulation();
  }, []);
  return <TrafficFlow />
}


export default App
