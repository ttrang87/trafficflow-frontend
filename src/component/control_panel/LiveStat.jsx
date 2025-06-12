import { useState, useEffect } from 'react';
import { TrendingUp, Car, Zap, Timer, Skull } from 'lucide-react';

export default function LiveStats({totalCar, avgSpeed, avgWait}) {
  const [stats, setStats] = useState({
    cars: 24,
    trucks: 8,
    buses: 3,
    avgSpeed: 45,
    waitTime: 2.3
  });

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        cars: Math.max(0, prev.cars + Math.floor(Math.random() * 5) - 2),
        trucks: Math.max(0, prev.trucks + Math.floor(Math.random() * 3) - 1),
        buses: Math.max(0, prev.buses + Math.floor(Math.random() * 2) - 1),
        avgSpeed: Math.max(0, prev.avgSpeed + Math.floor(Math.random() * 10) - 5),
        waitTime: Math.max(0, prev.waitTime + (Math.random() * 2 - 1))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

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
            <span className="text-xs font-medium text-blue-900">Cars</span>
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