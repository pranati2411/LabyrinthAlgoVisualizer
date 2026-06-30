# Labyrinth - Algorithm Visualizer 🕸️

Labyrinth is an interactive algorithmic simulation tool built to visualize dynamic maze generation and complex graph traversal algorithms in real-time. It provides a highly customizable grid environment where users can experiment with pathfinding behaviors by manipulating walls, nodes, and weights.

## 🚀 Features

* **Interactive Grid:** Dynamically configure the start node, target node, impenetrable walls, and weighted nodes.
* **Real-Time Visualization:** Watch algorithms search and construct paths step-by-step.
* **Maze Generation:** Generate complex, randomized mazes to test algorithm efficiency.
* **High-Performance Rendering:** Engineered with a custom rendering pipeline that utilizes direct DOM mutations, completely bypassing React's state reconciliation. This executes low-latency visual updates without triggering expensive, cascading re-renders across the grid.

## 🧠 Algorithms Implemented

* **Breadth-First Search (BFS):** Explores equally in all directions. Guarantees the shortest path in an unweighted grid.
* **Depth-First Search (DFS):** Explores as far as possible along each branch before backtracking. Does not guarantee the shortest path.
* **Dijkstra's Algorithm:** The father of pathfinding algorithms. Guarantees the shortest path and accounts for weighted nodes.
* **A* (A-Star) Search:** One of the most efficient pathfinding algorithms. Uses heuristics to guarantee the shortest path much faster than Dijkstra's.

## 🛠️ Tech Stack

* **Frontend Framework:** React.js
* **Styling:** Tailwind CSS
* **Language:** JavaScript (ES6+)
* **Core Concepts:** DOM Manipulation, Graph Theory, Data Structures

## 💻 Installation and Setup

To run this project locally, follow these steps in your command line prompt:

1. **Clone the repository:** `git clone https://github.com/yourusername/labyrinth.git`
2. **Navigate into the directory:** `cd labyrinth`
3. **Install dependencies:** `npm install`
4. **Start the development server:** `npm start`

The application will begin running locally on your machine.

## 💡 How to Use

1. **Draw Walls:** Click and drag on the empty grid to create unpassable barriers.
2. **Add Weights:** Toggle the weight tool to draw high-resistance nodes.
3. **Move Nodes:** Click and drag the Start (green) or End (red) nodes to change their positions.
4. **Select Algorithm:** Choose your desired pathfinding or maze generation algorithm from the navigation bar.
5. **Visualize:** Hit the "Visualize" button and watch the algorithm in action!

## 👤 Author

**Pranati**