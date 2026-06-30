import React, { useState } from 'react';
import Nav from './components/Nav';
import Description from './components/Description';
import GridMesh from './components/GridMesh';

const App = () => {
  const [start, setStart] = useState([10, 10]);
  const [end, setEnd] = useState([4, 46]);
  const [walls, setWalls] = useState(new Set());
  const [weights, setWeights] = useState(new Set());
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [path, setPath] = useState([]);
  
  const [algorithm, setAlgorithm] = useState(null);
  const [editMode, setEditMode] = useState(null); // 'wall', 'weight', or 'erase'

  return (
    <div className="min-h-screen bg-cream flex flex-col font-sans">
      {/* Command Center */}
      <Nav 
        start={start} 
        end={end} 
        walls={walls} 
        setWalls={setWalls} 
        weights={weights} 
        setWeights={setWeights}
        setVisitedNodes={setVisitedNodes} 
        setPath={setPath}
        algorithm={algorithm} 
        setAlgorithm={setAlgorithm}
        setEditMode={setEditMode} 
      />
      
      {/* Information Banner */}
      <Description algorithm={algorithm} />

      {/* The Canvas */}
      <div className="flex-1 flex justify-center items-start pt-6 overflow-auto">
        <GridMesh 
          start={start} 
          setStart={setStart}
          end={end} 
          setEnd={setEnd}
          walls={walls} 
          setWalls={setWalls}
          weights={weights} 
          setWeights={setWeights}
          visitedNodes={visitedNodes} 
          path={path}
          editMode={editMode}
        />
      </div>
    </div>
  );
};

export default App;