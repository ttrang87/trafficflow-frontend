import { Github, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { API } from '../api';
import { useState } from 'react';

export default function TrafficSimulationLanding() {
    const navigate = useNavigate();
    const [isStarting, setIsStarting] = useState(false);

    const handleStartSimulation = async () => {
        setIsStarting(true);
        try {
            // Call REST API to start simulation
            const response = await fetch(API.CONNECT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log('✅ Simulation started via REST API');
                navigate("/simulation");
            } else {
                console.error('❌ Failed to start simulation');
                alert('Failed to start simulation. Please check if backend is running.');
            }
        } catch (error) {
            console.error('❌ Error calling start simulation API:', error);
            alert('Cannot connect to backend. Please check if backend is running.');
        } finally {
            setIsStarting(false);
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center p-12 relative overflow-hidden w-screen">
            <div className="max-w-4xl mx-auto text-center space-y-8">
                {/* Header */}
                <div className="space-y-12 mt-10">
                    <h1 className="text-4xl md:text-6xl font-bold text-blue-1000 leading-tight">
                        Traffic Intersection
                        <span className="block text-green-700">Simulation</span>
                    </h1>
                    {/* Description */}
                    <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
                        Real-time traffic intersection simulation with intelligent vehicle behavior, collision-free operation, and
                        interactive monitoring
                    </p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-500">
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-green-100">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">🚗</div>
                        <p className="font-medium">Intelligent Vehicles</p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-blue-100">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">🛡️</div>
                        <p className="font-medium">Collision-Free</p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-green-100">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">📊</div>
                        <p className="font-medium">Real-time Monitor</p>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-8 justify-center items-center pt-8">
                    <button
                        className={`${isStarting
                                ? 'bg-green-400 cursor-not-allowed'
                                : 'bg-green-700 hover:bg-green-600 hover:scale-105'
                            } text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform rounded-md flex items-center`}
                        onClick={() => handleStartSimulation()}
                        disabled={isStarting}
                    >
                        <Play className="w-5 h-5 mr-2" />
                        {isStarting ? 'Starting...' : 'Start Simulation'}
                    </button>
                    <a
                        href="https://github.com/ttrang87/trafficflow-frontend"
                        target='_blank'
                    >
                        <button className="border-2 border-blue-400 text-blue-800 hover:bg-blue-50 px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 rounded-md flex items-center bg-white">
                            <Github className="w-5 h-5 mr-2" />
                            View on GitHub
                        </button>
                    </a>
                </div>

                {/* Footer */}
                <div className="pt-8 text-sm text-slate-400">
                    <p>Built with modern web technologies for optimal performance</p>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-green-200/30 rounded-full blur-xl"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl"></div>
            <div className="absolute top-1/2 left-5 w-16 h-16 bg-green-300/20 rounded-full blur-lg"></div>
        </div>
    );
}