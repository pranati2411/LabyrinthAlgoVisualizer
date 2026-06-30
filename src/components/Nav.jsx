import React, { useState } from 'react';
import bfs from '../algos/bfs';
import dfs from '../algos/dfs';
import Dijkstra from '../algos/Dijkstra';
import AStar from '../algos/AStar';
import recursiveDivision from '../mazes/RecursiveDivision';
import WeightedMaze from '../mazes/WeightedMaze';

const Nav = ({
  start,
  end,
  walls,
  setWalls,
  weights,
  setWeights,
  setVisitedNodes,
  setPath,
  algorithm,
  setAlgorithm,
  setEditMode,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mazeDropdownOpen, setMazeDropdownOpen] = useState(false);
  const [clearDropdownOpen, setClearDropdownOpen] = useState(false);
  const [weightDensity, setWeightDensity] = useState(0.3);

  const handleVisualize = () => {
    setVisitedNodes([]);
    setPath([]);

    let result = null;
    if (algorithm === 'BFS') {
      result = bfs(start, end, walls);
    } else if (algorithm === 'DFS') {
      result = dfs(start, end, walls);
    } else if (algorithm === 'Dijkstra') {
      result = Dijkstra(start, end, walls, weights);
    } else if (algorithm === 'AStar') {
      result = AStar(start, end, walls, weights);
    }

    if (result && result.visited) {
      setVisitedNodes(Array.from(result.visited));
    }
    if (result && result.path) {
      setPath(result.path);
    }
  };

  const handleMaze = (type) => {
    clearBoard();
    const newWalls = new Map();
    const newWeights = new Map();

    if (type === 'recursive') {
      recursiveDivision(start, end, 0, 19, 0, 49, newWalls, null, null);
      const wallSet = new Set();
      for (let key of newWalls.keys()) {
        wallSet.add(key);
      }
      setWalls(wallSet);
    } else if (type === 'weighted') {
      WeightedMaze(newWeights, start, end, weightDensity);
      const weightSet = new Set();
      for (let key of newWeights.keys()) {
        weightSet.add(key);
      }
      setWeights(weightSet);
    }
    setMazeDropdownOpen(false);
  };

  const clearBoard = () => {
    setWalls(new Set());
    setWeights(new Set());
    setVisitedNodes([]);
    setPath([]);
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 50; j++) {
        const cell = document.getElementById(`${i}-${j}`);
        if (cell) {
          cell.style.animation = 'none';
          cell.style.backgroundColor = '';
        }
      }
    }
  };

  return (
    <nav className="bg-white border-b border-stone-200 px-6 py-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
      {/* Title */}
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold tracking-tight text-slate-800">
          Labyrinth<span className="text-pastel-purple font-black">.</span>
        </span>
      </div>

      {/* Action Controls */}
      <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
        
        {/* Algorithms Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-stone-100 hover:bg-stone-200 text-slate-700 px-4 py-2 rounded-lg transition-colors flex items-center gap-1"
          >
            Algorithm: <span className="text-stone-900 font-semibold">{algorithm || 'Select'}</span>
          </button>
          {dropdownOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white border border-stone-200 rounded-lg shadow-md z-50 py-1">
              {['Dijkstra', 'AStar', 'BFS', 'DFS'].map((algo) => (
                <button
                  key={algo}
                  onClick={() => {
                    setAlgorithm(algo);
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-stone-50 text-slate-700"
                >
                  {algo === 'AStar' ? 'A* Search' : algo}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Mazes Dropdown */}
        <div className="relative">
          <button
            onClick={() => setMazeDropdownOpen(!mazeDropdownOpen)}
            className="bg-stone-100 hover:bg-stone-200 text-slate-700 px-4 py-2 rounded-lg transition-colors flex items-center gap-1"
          >
            Mazes & Patterns
          </button>
          {mazeDropdownOpen && (
            <div className="absolute left-0 mt-2 w-64 bg-white border border-stone-200 rounded-lg shadow-md z-50 py-2">
              <button
                onClick={() => handleMaze('recursive')}
                className="w-full text-left px-4 py-2 hover:bg-stone-50 text-slate-700"
              >
                Recursive Division (Walls)
              </button>
              
              <div className="px-4 py-3 mt-1 border-t border-stone-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-700">Weight Density</span>
                  <span className="text-sm font-bold text-pastel-purple">
                    {Math.round(weightDensity * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="0.8"
                  step="0.01"
                  value={weightDensity}
                  onChange={(e) => setWeightDensity(parseFloat(e.target.value))}
                  className="w-full accent-pastel-purple cursor-pointer mb-3"
                />
                <button
                  onClick={() => handleMaze('weighted')}
                  className="w-full bg-stone-100 hover:bg-stone-200 text-slate-700 font-medium px-3 py-2 rounded transition-colors"
                >
                  Generate Random Weights
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mode Selectors */}
        <div className="h-6 w-1px bg-stone-200 mx-1 hidden sm:block"></div>

        <button
          onClick={() => setEditMode('wall')}
          className="px-3 py-2 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-slate-700 focus:ring-2 focus:ring-slate-400"
        >
          Draw Walls
        </button>
        <button
          onClick={() => setEditMode('weight')}
          className="px-3 py-2 rounded-lg border border-stone-200 bg-white hover:bg-pastel-pink/20 text-slate-700 focus:ring-2 focus:ring-pastel-pink"
        >
          Draw Weights
        </button>
        <button
          onClick={() => setEditMode('erase')}
          className="px-3 py-2 rounded-lg border border-stone-200 bg-white hover:bg-stone-100 text-rose-600 focus:ring-2 focus:ring-rose-400"
        >
          Eraser
        </button>

        {/* Clear Actions Dropdown */}
        <div className="relative">
          <button
            onClick={() => setClearDropdownOpen(!clearDropdownOpen)}
            className="bg-stone-100 hover:bg-stone-200 text-slate-600 px-3 py-2 rounded-lg transition-colors"
          >
            Clear Options
          </button>
          {clearDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-stone-200 rounded-lg shadow-md z-50 py-1">
              <button
                onClick={() => { setWalls(new Set()); setClearDropdownOpen(false); }}
                className="w-full text-left px-4 py-2 hover:bg-stone-50 text-slate-700"
              >
                Clear Walls
              </button>
              <button
                onClick={() => { setWeights(new Set()); setClearDropdownOpen(false); }}
                className="w-full text-left px-4 py-2 hover:bg-stone-50 text-slate-700"
              >
                Clear Weights
              </button>
              <button
                onClick={() => { clearBoard(); setClearDropdownOpen(false); }}
                className="w-full text-left px-4 py-2 hover:bg-stone-50 text-rose-600 font-semibold"
              >
                Clear Entire Board
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Trigger Action Button */}
      <button
        onClick={handleVisualize}
        disabled={!algorithm}
        className={`px-5 py-2.5 rounded-lg font-semibold shadow-xs transition-all ${
          algorithm
            ? 'bg-pastel-purple text-slate-800 hover:scale-[1.02] cursor-pointer'
            : 'bg-stone-200 text-stone-400 cursor-not-allowed'
        }`}
      >
        Visualize {algorithm ? `${algorithm}` : ''}
      </button>
    </nav>
  );
};

export default Nav;