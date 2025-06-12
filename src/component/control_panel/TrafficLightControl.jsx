import { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import { API } from '../../api';

const TrafficLightController = ({ trafficLightColors, isReset, setIsReset }) => {
    if (!trafficLightColors) {
        return (
            <div className="bg-white rounded-lg border border-gray-200 p-5 w-full max-w-md min-w-80">
                <div className="flex items-center justify-center h-80">
                    <span className="text-xs font-medium text-blue-900">Loading traffic light data...</span>
                </div>
            </div>
        );
    }

    const [isUpdating, setIsUpdating] = useState(false);
    const [isEmergency, setEmergency] = useState(false);

    const {
        North: north,
        East: east,
        South: south,
        West: west
    } = trafficLightColors;

    const [currentStates, setCurrentStates] = useState({
        north: north.color.toLowerCase(),
        south: south.color.toLowerCase(),
        east: east.color.toLowerCase(),
        west: west.color.toLowerCase()
    });
    const [timers, setTimers] = useState({
        north: north.count,
        south: south.count,
        east: east.count,
        west: west.count
    });

    // Initialize with default values, will be updated from API
    const [yellowTime, setYellowTime] = useState(3);
    const [greenTime, setGreenTime] = useState(7);

    useEffect(() => {
        const getDuration = async () => {
            try {
                const response = await fetch(API.LIGHT_DURATION, {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (data.YELLOW !== undefined) {
                    setYellowTime(data.YELLOW);
                }
                if (data.GREEN !== undefined) {
                    setGreenTime(data.GREEN);
                }



            } catch (error) {
                console.error('❌ Error fetching light duration: ', error);
            } finally {
                // Reset the flag after completion
                setIsReset(false);
            }
        };

        getDuration();
    }, [isReset, setIsReset]); // Added setIsReset to dependencies

    useEffect(() => {
        if (trafficLightColors) {
            setCurrentStates({
                north: trafficLightColors.North.color.toLowerCase(),
                south: trafficLightColors.South.color.toLowerCase(),
                east: trafficLightColors.East.color.toLowerCase(),
                west: trafficLightColors.West.color.toLowerCase()
            });
            setTimers({
                north: trafficLightColors.North.count,
                south: trafficLightColors.South.count,
                east: trafficLightColors.East.count,
                west: trafficLightColors.West.count
            });
        }
    }, [trafficLightColors]);

    // Check for emergency mode (all lights red)
    useEffect(() => {
        const allRed = currentStates.north === 'red' &&
            currentStates.south === 'red' &&
            currentStates.east === 'red' &&
            currentStates.west === 'red';

        if (allRed) {
            if (!isEmergency) {
                toast('Emergency Mode', {
                    icon: '🚨',
                    style: {
                        borderRadius: '10px',
                        background: '#FFFFFF',
                        color: '#8a0606',   
                        fontWeight: 600,    
                    },
                    duration: 4000,
                });
                setEmergency(true)
            }
        } else {
            setEmergency(false)
        }
    }, [currentStates]);

    const postNewDuration = async (newYellow, newGreen) => {
        setIsUpdating(true);
        try {
            const response = await fetch(API.LIGHT_DURATION, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    yellow: newYellow,
                    green: newGreen
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

        } catch (error) {
            console.error('❌ Error updating light duration: ', error);
        } finally {
            setIsUpdating(false);
        }
    };

    const adjustTime = (type, change) => {
        if (type === 'yellow') {
            const newValue = Math.max(1, yellowTime + change);
            setYellowTime(newValue);
        } else if (type === 'green') {
            const newValue = Math.max(1, greenTime + change);
            setGreenTime(newValue);
        }
    };

    const handleReset = async () => {
        await postNewDuration(yellowTime, greenTime)
        setIsReset(true);

    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-5 w-full max-w-md min-w-80">
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            {/* Header */}
            <div className="flex items-center gap-2 mb-3">
                <h2 className="text-sm font-semibold text-blue-900">Traffic Light</h2>
                {isUpdating && <span className="text-xs text-orange-500">Updating...</span>}
            </div>

            {/* Traffic Light Status Grid */}
            <div className="grid grid-cols-2 gap-2 mb-3">
                {/* North */}
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                    <div className={`w-4 h-4 rounded-full ${currentStates.north === 'green' ? 'bg-green-500' : currentStates.north === 'yellow' ? 'bg-yellow-400' : 'bg-red-500'}`}></div>
                    <span className="text-xs font-medium text-blue-900">North</span>
                    <span className="ml-auto text-xs ">{timers.north}s</span>
                </div>

                {/* East */}
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                    <div className={`w-4 h-4 rounded-full ${currentStates.east === 'green' ? 'bg-green-500' : currentStates.east === 'yellow' ? 'bg-yellow-400' : 'bg-red-500'}`}></div>
                    <span className="text-xs font-medium text-blue-900">East</span>
                    <span className="ml-auto text-xs ">{timers.east}s</span>
                </div>

                {/* South */}
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                    <div className={`w-4 h-4 rounded-full ${currentStates.south === 'green' ? 'bg-green-500' : currentStates.south === 'yellow' ? 'bg-yellow-400' : 'bg-red-500'}`}></div>
                    <span className="text-xs font-medium text-blue-900">South</span>
                    <span className="ml-auto text-xs ">{timers.south}s</span>
                </div>

                {/* West */}
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                    <div className={`w-4 h-4 rounded-full ${currentStates.west === 'green' ? 'bg-green-500' : currentStates.west === 'yellow' ? 'bg-yellow-400' : 'bg-red-500'}`}></div>
                    <span className="text-xs font-medium text-blue-900">West</span>
                    <span className="ml-auto text-xs ">{timers.west}s</span>
                </div>
            </div>

            {/* Light Timing Controls */}
            <div className="space-y-3 mb-3">
                <h2 className="text-xs font-semibold text-blue-900">Duration (seconds)</h2>

                {/* Red - Non-modifiable */}
                <div className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-xs text-red-800">Red</span>
                    </div>
                    <div className="flex items-center gap-2 mr-10">
                        <span className="text-xs text-center">{3 * (yellowTime + greenTime)}</span>
                    </div>
                </div>

                {/* Yellow */}
                <div className="flex items-center justify-between p-2 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <span className="text-xs text-yellow-800">Yellow</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            className="w-4 h-5 text-xs rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center disabled:opacity-50"
                            onClick={() => adjustTime('yellow', -1)}
                            disabled={isUpdating}
                        >
                            −
                        </button>
                        <span className="text-xs text-center">{yellowTime}</span>
                        <button
                            className="w-4 h-5 text-xs rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center disabled:opacity-50"
                            onClick={() => adjustTime('yellow', 1)}
                            disabled={isUpdating}
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Green */}
                <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-green-800">Green</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            className="w-4 h-5 text-xs rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center disabled:opacity-50"
                            onClick={() => adjustTime('green', -1)}
                            disabled={isUpdating}
                        >
                            −
                        </button>
                        <span className="text-xs text-center">{greenTime}</span>
                        <button
                            className="w-4 h-5 text-xs rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center disabled:opacity-50"
                            onClick={() => adjustTime('green', 1)}
                            disabled={isUpdating}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>

            {/* Control Buttons */}
            <button
                className="w-full p-2 rounded text-xs bg-gradient-to-br from-blue-100 to-green-100 text-blue-900 flex justify-center items-center gap-2 disabled:opacity-50"
                onClick={() => handleReset()}
                disabled={isUpdating}
            >
                <RotateCcw className='w-3 h-3 text-blue-800' />
                Reset
            </button>

            {/* Constraint Info */}
            <div className="mt-4 p-2 bg-blue-50 rounded-lg text-xs text-blue-800">
                <strong>Constraint:</strong> Red duration = (Yellow + Green) × 3<br />
                Current: {3 * (yellowTime + greenTime)}s = ({yellowTime} + {greenTime}) × 3
            </div>
        </div>
    );
};

export default TrafficLightController;