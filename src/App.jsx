import LiveStats from "./component/control_panel/LiveStat"
import Simulation from "./component/control_panel/Simulation"
import TrafficFlow from "./component/road_system/TrafficFlow"

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-6 w-screen">
      <div className="w-full flex gap-6 items-start justify-center gap-10">

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-fit">
            <TrafficFlow />
          </div>

   
          <div className="flex flex-col gap-6">
            <Simulation />
            <LiveStats />
          </div>
 
      </div>
    </div>
  )
}


export default App