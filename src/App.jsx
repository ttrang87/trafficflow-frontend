// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TrafficSimulationLanding from "./component/LandingPage";
import MainSimulation from "./component/MainSimulation";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TrafficSimulationLanding />} />
        <Route path="/simulation" element={<MainSimulation/>} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
