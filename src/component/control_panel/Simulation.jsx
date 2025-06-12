import { useState } from 'react';
import { Settings, Play, RotateCcw } from 'lucide-react';
import { API } from '../../api';

export default function Simulation() {
    const [status, setStatus] = useState('Pause');
    const [speed, setSpeed] = useState('Normal');
    const [scenario, setScenario] = useState('Normal');

     const handlePlayPause = async () => {
        setStatus(status === 'Pause' ? 'Resume' : 'Pause');

        try {
            const response = await fetch(API.POST_SIMULATION_STATUS, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: status }), // paused = inverse of running
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.error("Server error:", errorText);
            }
        } catch (error) {
            console.error("Network or client error:", error);
        }
    };

    const handleReset = () => {
        setIsRunning(false);
    };

    const handleSetNewSpeedLevel = async (newLevel) => {
        try {
            setSpeed(newLevel);
            console.log(newLevel)

            const response = await fetch(API.POST_NEW_SPEED, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ level: newLevel }), // Send as object
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Server error:", errorText);
            }

        } catch (error) {
            console.error("Network or client error:", error);
        }
    };

    const handleSetNewDensityLevel = async (newLevel) => {
        try {
            setScenario(newLevel)

            const response = await fetch(API.POST_NEW_DENSITY, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ density: newLevel }), // Send as object
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Server error:", errorText);
            }

        } catch (error) {
            console.error("Network or client error:", error);
        }
    };


    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4 w-full max-w-md">
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
                <Settings className="w-4 h-4 text-blue-600" />
                <h2 className="text-sm font-semibold text-blue-900">Simulation</h2>
            </div>

            {/* Control Buttons */}
            <div className="flex gap-2 mb-3">
                <button
                    onClick={() => handlePlayPause()}
                    className="flex-1 bg-green-50 border border-green-200 hover:bg-green-100 rounded-lg px-2 py-2 flex items-center justify-center transition-colors focus:outline-none"
                >
                    {status === "Pause" ? (
                        <div className="flex gap-1">
                            <div className="w-1 h-3 bg-green-800 rounded-sm"></div>
                            <div className="w-1 h-3 bg-green-800 rounded-sm"></div>
                        </div>
                    ) : (
                        <Play className="w-3 h-3 text-green-800 fill-current" />
                    )}
                </button>
                <button
                    onClick={handleReset}
                    className="bg-blue-50 hover:bg-blue-100 rounded-lg px-2 py-2 flex items-center justify-center transition-colors"
                >
                    <RotateCcw className="w-3 h-3 text-blue-600" />
                </button>
            </div>

            {/* Speed Section */}
            <div className="mb-2">
                <h3 className="text-xs font-medium text-blue-900 mb-3">Speed</h3>
                <div className="flex gap-2">
                    {['Slow', 'Normal', 'Fast'].map((speedOption) => (
                        <button
                            key={speedOption}
                            onClick={() => handleSetNewSpeedLevel(speedOption)}
                            className={`flex-1 px-2 py-2 rounded-lg text-xs font-medium transition-colors focus:outline-none ${speed === speedOption
                                ? 'bg-green-100 text-green-800 border border-green-200'
                                : 'bg-blue-50 text-blue-900 hover:bg-blue-100'
                                }`}
                        >
                            {speedOption}
                        </button>
                    ))}
                </div>
            </div>

            {/* Scenario Section */}
            <div>
                <h3 className="text-xs font-medium text-blue-900 mb-3">Density</h3>
                <div className="flex gap-2">
                    {['Sparse', 'Normal', 'Rush Hour'].map((scenarioOption) => (
                        <button
                            key={scenarioOption}
                            onClick={() => handleSetNewDensityLevel(scenarioOption)}
                            className={`flex-1 px-2 py-2 rounded-lg text-xs font-medium transition-colors focus:outline-none ${scenario === scenarioOption
                                ? 'bg-green-100 text-green-800 border border-green-200'
                                : 'bg-blue-50 text-blue-900 hover:bg-blue-100'
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