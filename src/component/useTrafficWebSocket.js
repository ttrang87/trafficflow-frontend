import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export default function useTrafficWebSocket(setVehicles, setTrafficLightColors, shouldConnect) {
  const clientRef = useRef(null);

  useEffect(() => {
    if (!shouldConnect) return;

    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      debug: (msg) => console.log("STOMP DEBUG:", msg),
      reconnectDelay: 5000,
      onConnect: (frame) => {
        console.log("✅ STOMP connected:", frame);

        client.subscribe("/topic/vehicles", (message) => {
          console.log("This demonstrate that client receive messge of vehicles")
          const data = JSON.parse(message.body);
          console.log("🚗 Vehicle update received:", data);
          setVehicles(data); // will always update
        });

        client.subscribe("/topic/traffic-light", (message) => {
          console.log("This demonstrate that client receive messge of vehicles")
          const data = JSON.parse(message.body);
          console.log("🚦 Traffic light update received:", data);
          setTrafficLightColors(data);
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
        console.log("🔌 STOMP client deactivated");
      }
    };
  }, [shouldConnect]); // <— Depend only on shouldConnect
}
