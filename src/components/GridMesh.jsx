import React, { useState, useEffect } from 'react';

const GridMesh = ({ start, setStart, end, setEnd, walls, setWalls, weights, setWeights, visitedNodes, path, editMode }) => {
  const [mouseDown, setMouseDown] = useState(false);
  const [movingNode, setMovingNode] = useState(null); 

  useEffect(() => {
    let index = 1;
    for (let cell of visitedNodes) {
      const element = document.getElementById(`${cell[0]}-${cell[1]}`);
      if (element) {
        setTimeout(() => {
          element.style.animation = "animateVisitedCell 1s linear forwards";
        }, 10 * index);
        index++;
      }
    }

    let index2 = index;
    index = 1;
    for (let cell of path) {
      const element = document.getElementById(`${cell[0]}-${cell[1]}`);
      if (element) {
        setTimeout(() => {
          element.style.backgroundColor = "#d4bfff"; // Pastel purple path
          element.style.animation = "none";
        }, 10 * index2 + 30 * index);
        index++;
      }
    }
  }, [visitedNodes, path]);

  const handleInteract = (row, col) => {
    if (movingNode === 'start') { setStart([row, col]); setMovingNode(null); return; }
    if (movingNode === 'end') { setEnd([row, col]); setMovingNode(null); return; }

    const id = `${row}-${col}`;
    if (editMode === 'wall') {
      setWalls(prev => new Set(prev).add(id));
      const el = document.getElementById(id);
      if(el) el.style.animation = "animateWall 0.2s linear forwards";
    } else if (editMode === 'weight') {
      setWeights(prev => new Set(prev).add(id));
    } else if (editMode === 'erase') {
      setWalls(prev => { const next = new Set(prev); next.delete(id); return next; });
      setWeights(prev => { const next = new Set(prev); next.delete(id); return next; });
      const el = document.getElementById(id);
      if(el) { el.style.animation = "none"; el.style.backgroundColor = "white"; }
    }
  };

  const rows = [];
  for (let i = 0; i < 20; i++) {
    const cols = [];
    for (let j = 0; j < 50; j++) {
      const isStart = i === start[0] && j === start[1];
      const isEnd = i === end[0] && j === end[1];
      const isWall = walls.has(`${i}-${j}`);
      const isWeight = weights.has(`${i}-${j}`);

      cols.push(
        <div
          key={`${i}-${j}`}
          id={`${i}-${j}`}
          className={`w-6 h-6 border-[0.5px] border-stone-200 cursor-pointer flex items-center justify-center relative
            ${isWall ? 'bg-slate-400' : 'bg-white'}`}
          onMouseDown={() => { setMouseDown(true); handleInteract(i, j); }}
          onMouseEnter={() => { if (mouseDown) handleInteract(i, j); }}
          onMouseUp={() => setMouseDown(false)}
          onClick={() => {
            if (isStart) setMovingNode('start');
            else if (isEnd) setMovingNode('end');
          }}
        >
          {isStart && <div className="w-[75%] h-[75%] bg-blue-300 rounded-full shadow-sm absolute z-10" title="Start Node"></div>}
          {isEnd && <div className="w-[75%] h-[75%] bg-red-300 rounded-full shadow-sm absolute z-10" title="End Node"></div>}
          
          {isWeight && (
            <img 
              src="/weighticon.svg" 
              alt="weight" 
              className="w-4 h-4 opacity-80 absolute z-10 select-none pointer-events-none" 
            />
          )}
        </div>
      );
    }
    rows.push(<div key={i} className="flex">{cols}</div>);
  }

  return (
    <div className="bg-white border-2 border-stone-300 shadow-sm" onMouseLeave={() => setMouseDown(false)}>
      {rows}
    </div>
  );
};

export default GridMesh;