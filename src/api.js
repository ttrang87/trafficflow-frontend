const API_BASE = "https://trafficflow-backend.onrender.com"

export const API = {
    START_SIMULATION: `${API_BASE}/start-simulation`,
    GET_ROAD_COORDINATE: `${API_BASE}/get-road-coordinate`,
    GET_TRAFFIC_LIGHT:  `${API_BASE}/get-traffic-light`,
    GET_CAR:  `${API_BASE}/get-car`,
    LIGHT_DURATION: `${API_BASE}/set-light-duration`,

    POST_NEW_SPEED: `${API_BASE}/set-speed-level`,
    POST_NEW_DENSITY: `${API_BASE}/set-density-level`,
    POST_SIMULATION_STATUS: `${API_BASE}/monitor`,

    SYSTEM_CHECK: `${API_BASE}/actuator/health`,
    CONNECT: `${API_BASE}/connect`,
    WS_ENDPOINT: `${API_BASE}/ws`
}

