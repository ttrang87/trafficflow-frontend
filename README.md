# 🚦 Traffic Simulation System

Real-time traffic simulation with intelligent vehicle behavior, dynamic traffic management, and interactive controls.

## 🚀 Overview

This project aims to combine learning and practical application of Java core concepts and the Spring Boot framework by simulating real-world traffic scenarios in a controlled web environment. The simulation allows exploring complex and unpredictable traffic behaviors safely, providing insights and control through an interactive web interface.

## ⚡ Key Features

### 🚥 Traffic Infrastructure

- **Smart Traffic Lights**: Automatic color cycling with adaptive timing based on traffic flow
- **Pedestrian Signals**: Dedicated crossing signals with realistic timing patterns
- **Multi-Lane Roads**: Dynamic lane management with directional flow control
- **Intersection Management**: Complex traffic routing and collision detection

### 🚗 Vehicle System

**Vehicle Categories:**
- Normal Cars (sedans, SUVs, trucks)
- Utility Vehicles (buses, delivery trucks)
- Emergency Vehicles (ambulances, fire trucks, police)

**Realistic Behavior:**
- Dynamic speed and acceleration based on traffic conditions
- Intelligent stopping at safe distances
- Acceleration patterns when lights change
- Emergency vehicle priority handling
- **Collision Detection**: Advanced accident simulation and response

### 🚶 Pedestrian System

- **Realistic Movement**: Human-like walking patterns and crossing behavior
- **Signal Compliance**: Response to pedestrian crossing signals
- **Rush Behavior**: Faster movement when signal timing is critical

### 🎛️ Control Panel

**Analytics Dashboard**
- **Traffic Flow Metrics**: Real-time vehicle and pedestrian count tracking
- **Safety Analysis**: Accident rate monitoring and safety score calculation
- **Performance Insights**: System efficiency and bottleneck identification

**Simulation Controls**
- **Playback Control**: Start, pause, and reset simulation
- **Dynamic Spawning**: Add custom vehicles and pedestrians during runtime
- **Traffic Load Management**: Adjust overall traffic density
- **Signal Timing**: Custom traffic light and pedestrian signal intervals
- **Weather Simulation**: Rain, fog, and other conditions affecting behavior

## 🛠️ Tech Stack

**Backend**: Java 17, Spring Boot, WebSocket, Multithreading  
**Frontend**: React, TypeScript, Canvas API, Tailwind CSS  
**Architecture**: REST API + WebSocket for real-time communication

## 🏆 Technical Highlights

- **Concurrent Processing**: Thread-safe simulation engine handling hundreds of entities
- **Real-Time Communication**: WebSocket integration for instant state synchronization  
- **Performance Optimization**: Canvas rendering with requestAnimationFrame for smooth animations
- **Complex Algorithms**: Advanced pathfinding, collision detection, and traffic flow optimization

## 🚀 Quick Start

```bash
# Backend
cd backend && mvn spring-boot:run

# Frontend  
cd frontend && npm install && npm start
```

Visit `http://localhost:3000` to start simulating traffic scenarios.

## 💡 Why This Project

Demonstrates advanced software engineering skills through:

- **System Design**: Multi-component real-time architecture
- **Concurrent Programming**: Safe multithreading with Java
- **Full-Stack Development**: Modern React + Spring Boot integration
- **Performance Engineering**: Optimized rendering and state management
- **Real-World Problem Solving**: Complex traffic behavior modeling

---

**Built to showcase production-ready development skills for software engineering roles.**
