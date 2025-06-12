const API_BASE = "http://localhost:8080"

export const API = {
    START_SIMULATION: `${API_BASE}/start-simulation`,
    GET_ROAD_COORDINATE: `${API_BASE}/get-road-coordinate`,
    GET_TRAFFIC_LIGHT:  `${API_BASE}/get-traffic-light`,
    GET_CAR:  `${API_BASE}/get-car`,

    POST_NEW_SPEED: `${API_BASE}/set-speed-level`,

    SYSTEM_CHECK: `${API_BASE}/actuator/health`,
    WS_ENDPOINT: `${API_BASE}/ws`
}

