import React from 'react';

const Description = ({ algorithm }) => {
  const descriptions = {
    "Dijkstra": "Dijkstra's Algorithm is a weighted algorithm that guarantees the shortest path.",
    "AStar": "A* Search is a weighted algorithm that uses heuristics to guarantee the shortest path much faster.",
    "BFS": "Breadth-First Search is an unweighted algorithm that guarantees the shortest path.",
    "DFS": "Depth-First Search is an unweighted algorithm that does not guarantee the shortest path.",
    "default": "Welcome to Labyrinth! Choose an algorithm and visualize the pathfinding process!"
  };

  const text = algorithm ? descriptions[algorithm] : descriptions["default"];
  const heading = algorithm === "AStar" ? "A* Search" : algorithm ? algorithm : "Welcome!";

  return (
    <div className="bg-pastel-purple/20 border-b border-pastel-purple/30 px-6 py-3 shadow-sm">
      <h2 className="text-lg font-extrabold text-slate-800 mb-0.5">{heading}</h2>
      <p className="text-sm font-medium text-slate-600">{text}</p>
    </div>
  );
};

export default Description;