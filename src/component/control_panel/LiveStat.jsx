import { TrendingUp, Car, Zap, Timer, Skull } from 'lucide-react';

export default function LiveStats({totalCar, avgSpeed, avgWait}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 w-full max-w-md">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-4 h-4 text-blue-600" />
        <h2 className="text-sm font-semibold text-blue-900">Live Stats</h2>
      </div>


      {/* Performance Stats */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center">
              <Car className="w-3 h-3 text-blue-800" />
            </div>
            <span className="text-xs font-medium text-blue-900">Total Vehicles</span>
          </div>
          <span className="text-sm font-semibold text-green-700">{totalCar}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center">
              <Zap className="w-3 h-3 text-green-600" />
            </div>
            <span className="text-xs font-medium text-blue-900">System Speed</span>
          </div>
          <span className="text-sm font-semibold text-green-700">{avgSpeed * 10} px/s</span>
        </div>
       <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center">
              <Timer className="w-3 h-3 text-blue-800" />
            </div>
            <span className="text-xs font-medium text-blue-900">Wait Time</span>
          </div>
          <span className="text-sm font-semibold text-green-700">{avgWait} s</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center">
              <Skull className="w-3 h-3 text-green-600" />
            </div>
            <span className="text-xs font-medium text-blue-900">Collision</span>
          </div>
          <span className="text-sm font-semibold text-green-700">0</span>
        </div>
      </div>
    </div>
  );
}