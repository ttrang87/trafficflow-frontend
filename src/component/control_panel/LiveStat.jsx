import { useState, useEffect } from 'react';
import { TrendingUp, Car, Truck, Bus } from 'lucide-react';

export default function LiveStats() {
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
    <div className="bg-white rounded-lg border border-gray-200 p-6 w-full max-w-md">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-blue-900">Live Stats</h2>
      </div>

      {/* Vehicle Stats */}
      <div className="space-y-4 mb-6 border-b border-green-200 pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center">
              <Car className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-blue-900">Cars</span>
          </div>
          <span className="text-lg font-semibold text-green-700">{stats.cars}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center">
              <Truck className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-sm font-medium text-blue-900">Trucks</span>
          </div>
          <span className="text-lg font-semibold text-green-700">{stats.trucks}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center">
              <Bus className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-blue-900">Emergency</span>
          </div>
          <span className="text-lg font-semibold text-green-700">{stats.buses}</span>
        </div>
      </div>

      {/* Performance Stats */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-blue-900">Avg Speed</span>
          <span className="text-lg font-semibold text-green-700">{stats.avgSpeed} km/h</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-blue-900">Wait Time</span>
          <span className="text-lg font-semibold text-green-700">{stats.waitTime.toFixed(1)} min</span>
        </div>

         <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-blue-900">Collisions</span>
          <span className="text-lg font-semibold text-green-700">0</span>
        </div>
      </div>
    </div>
  );
}