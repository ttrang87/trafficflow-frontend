import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { API } from "../api";

export default function useTrafficWebSocket(setVehicles, setTrafficLightColors, shouldConnect, setTotalCar, setAvgSpeed, setAvgWait, setTotalAllVehicle) {
  const clientRef = useRef(null);

  useEffect(() => {
    if (!shouldConnect) return;

    const client = new Client({
      webSocketFactory: () => new SockJS(API.WS_ENDPOINT),
      debug: (msg) => console.log("STOMP DEBUG:", msg),
      reconnectDelay: 0,
      onConnect: (frame) => {
        console.log("✅ STOMP connected:", frame);

        client.subscribe("/topic/vehicles", (message) => {
          const data = JSON.parse(message.body);
          setVehicles(data); // will always update
        });

        client.subscribe("/topic/traffic-light", (message) => {
          const data = JSON.parse(message.body);
          setTrafficLightColors(data);
        });

        client.subscribe("/topic/number-of-vehicles", (message) => {
          const data = JSON.parse(message.body);
          setTotalCar(data);
        });

        client.subscribe("/topic/total-number-of-vehicles", (message) => {
          const data = JSON.parse(message.body);
          setTotalAllVehicle(data);
        });

        client.subscribe("/topic/avg-speed", (message) => {
          const data = JSON.parse(message.body);
          setAvgSpeed(data);
        });

        client.subscribe("/topic/avg-wait", (message) => {
          const data = JSON.parse(message.body);
          setAvgWait(data);
        });
      },
      onStompError: (frame) => {
        console.error("❌ Broker error:", frame.headers["message"]);
        console.error("Details:", frame.body);
      },
    });

    clientRef.current = client;
    client.activate();

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
        clientRef.current = null;
        console.log("🔌 STOMP client deactivated");
      }
    };

  }, [shouldConnect]); // <— Depend only on shouldConnect
}
