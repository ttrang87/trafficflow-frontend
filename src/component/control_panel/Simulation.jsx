import { useState } from 'react';
import { Settings, Play, Square, RotateCcw } from 'lucide-react';

export default function Simulation() {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState('Normal');
  const [scenario, setScenario] = useState('Normal');

  const handlePlayPause = () => {
    setIsRunning(!isRunning);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 w-full max-w-md">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Settings className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-blue-900">Simulation</h2>
      </div>

      {/* Control Buttons */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={handlePlayPause}
          className="flex-1 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg px-4 py-3 flex items-center justify-center transition-colors"
        >
          {isRunning ? (
            <div className="flex gap-1">
              <div className="w-1 h-4 bg-green-600 rounded-sm"></div>
              <div className="w-1 h-4 bg-green-600 rounded-sm"></div>
            </div>
          ) : (
            <Play className="w-4 h-4 text-green-600 fill-current" />
          )}
        </button>
        <button
          onClick={handleReset}
          className="bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg px-4 py-3 flex items-center justify-center transition-colors"
        >
          <RotateCcw className="w-4 h-4 text-blue-600" />
        </button>
      </div>

      {/* Speed Section */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-blue-900 mb-3">Speed</h3>
        <div className="flex gap-2">
          {['Slow', 'Normal', 'Fast'].map((speedOption) => (
            <button
              key={speedOption}
              onClick={() => setSpeed(speedOption)}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                speed === speedOption
                  ? 'bg-green-100 text-green-800 border border-green-200'
                  : 'bg-blue-50 text-blue-900 hover:bg-blue-100 border border-blue-200'
              }`}
            >
              {speedOption}
            </button>
          ))}
        </div>
      </div>

      {/* Scenario Section */}
      <div>
        <h3 className="text-sm font-medium text-blue-900 mb-3">Scenario</h3>
        <div className="flex gap-2">
          {['Normal', 'Rush Hour', 'Rainy'].map((scenarioOption) => (
            <button
              key={scenarioOption}
              onClick={() => setScenario(scenarioOption)}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                scenario === scenarioOption
                  ? 'bg-green-100 text-green-800 border border-green-200'
                  : 'bg-blue-50 text-blue-900 hover:bg-blue-100 border border-blue-200'
              }`}
            >
              {scenarioOption}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}