import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { LocationType } from '../types';


const RestaurantMapView: React.FC = () => {
  const { locations, restaurantMap, tables } = useAppContext();
  const [startLocation, setStartLocation] = useState<string>('');
  const [endLocation, setEndLocation] = useState<string>('');
  const [path, setPath] = useState<string[]>([]);
  const [distance, setDistance] = useState<number | null>(null);
  const [estimatedTime, setEstimatedTime] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  

  const WALKING_SPEED = 1.4;
  

  const scaleCoordinates = (x: number, y: number, canvasWidth: number, canvasHeight: number) => {
    const padding = 20;
    const maxX = Math.max(...locations.map(loc => loc.x)) + padding;
    const maxY = Math.max(...locations.map(loc => loc.y)) + padding;
    
    return {
      x: (x / maxX) * canvasWidth,
      y: (y / maxY) * canvasHeight
    };
  };
  

  const drawMap = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
   
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    const edges = restaurantMap.getAllEdges();
    ctx.strokeStyle = '#d1d5db';
    ctx.lineWidth = 2;
    
    edges.forEach(([from, to, weight]) => {
      const fromLoc = locations.find(loc => loc.id === from);
      const toLoc = locations.find(loc => loc.id === to);
      
      if (fromLoc && toLoc) {
        const fromCoords = scaleCoordinates(fromLoc.x, fromLoc.y, canvas.width, canvas.height);
        const toCoords = scaleCoordinates(toLoc.x, toLoc.y, canvas.width, canvas.height);
        
        ctx.beginPath();
        ctx.moveTo(fromCoords.x, fromCoords.y);
        ctx.lineTo(toCoords.x, toCoords.y);
        ctx.stroke();

        const midX = (fromCoords.x + toCoords.x) / 2;
        const midY = (fromCoords.y + toCoords.y) / 2;
        
        ctx.fillStyle = '#4b5563';
        ctx.font = '10px Arial';
        ctx.fillText(`${weight.toFixed(1)}m`, midX, midY);
      }
    });

    if (path.length > 1) {
      ctx.strokeStyle = '#7D2E46';
      ctx.lineWidth = 3;
      
      for (let i = 0; i < path.length - 1; i++) {
        const fromLoc = locations.find(loc => loc.id === path[i]);
        const toLoc = locations.find(loc => loc.id === path[i + 1]);
        
        if (fromLoc && toLoc) {
          const fromCoords = scaleCoordinates(fromLoc.x, fromLoc.y, canvas.width, canvas.height);
          const toCoords = scaleCoordinates(toLoc.x, toLoc.y, canvas.width, canvas.height);
          
          ctx.beginPath();
          ctx.moveTo(fromCoords.x, fromCoords.y);
          ctx.lineTo(toCoords.x, toCoords.y);
          ctx.stroke();
        }
      }
    }
    
    locations.forEach(loc => {
      const coords = scaleCoordinates(loc.x, loc.y, canvas.width, canvas.height);
      
      ctx.beginPath();
      
      switch (loc.type) {
        case LocationType.KITCHEN:
          ctx.fillStyle = '#8F9E7D';
          ctx.arc(coords.x, coords.y, 12, 0, Math.PI * 2);
          break;
        case LocationType.TABLE:
          const tableId = parseInt(loc.id.split('-')[1]);
          const table = tables.find(t => t.id === tableId);
          
          if (table) {
            switch (table.status) {
              case 'AVAILABLE':
                ctx.fillStyle = '#10B981';
                break;
              case 'OCCUPIED':
                ctx.fillStyle = '#F59E0B';
                break;
              case 'RESERVED':
                ctx.fillStyle = '#D4B483';
                break;
              case 'DIRTY':
                ctx.fillStyle = '#EF4444';
                break;
              default:
                ctx.fillStyle = '#D4B483';
            }
          } else {
            ctx.fillStyle = '#D4B483';
          }
          
          ctx.arc(coords.x, coords.y, 8, 0, Math.PI * 2);
          break;
        case LocationType.BAR:
          ctx.fillStyle = '#7D2E46';
          ctx.arc(coords.x, coords.y, 12, 0, Math.PI * 2);
          break;
        case LocationType.ENTRANCE:
          ctx.fillStyle = '#D4B483';
          ctx.arc(coords.x, coords.y, 12, 0, Math.PI * 2);
          break;
        case LocationType.RESTROOM:
          ctx.fillStyle = '#4b5563';
          ctx.arc(coords.x, coords.y, 8, 0, Math.PI * 2);
          break;
        default:
          ctx.fillStyle = '#4b5563';
          ctx.arc(coords.x, coords.y, 8, 0, Math.PI * 2);
      }
      
      ctx.fill();
      
      // Draw location name
      ctx.fillStyle = '#1f2937';
      ctx.font = '11px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(loc.name, coords.x, coords.y + 20);
      
      // Highlight start and end locations
      if (loc.id === startLocation || loc.id === endLocation) {
        ctx.strokeStyle = '#EF4444';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(coords.x, coords.y, loc.type === LocationType.TABLE ? 10 : 14, 0, Math.PI * 2);
        ctx.stroke();
      }
    });
  };
  
  const findPath = () => {
    if (!startLocation || !endLocation) {
      alert('Please select both start and end locations');
      return;
    }
    
    console.log(`🔍 Attempting to find path from ${startLocation} to ${endLocation}`);
    
  
    restaurantMap.debugGraph();
    

    const result = restaurantMap.dijkstra(startLocation, endLocation);
    
    if (result) {
      setPath(result.path);
      setDistance(result.distance);

      setEstimatedTime(result.distance / WALKING_SPEED);
      console.log('✅ Path found:', result.path);
      console.log('✅ Distance:', result.distance);
    } else {
      setPath([]);
      setDistance(null);
      setEstimatedTime(null);
      alert('No path found between these locations');
      console.log('❌ No path found between:', startLocation, 'and', endLocation);
    }
  };
  

  const clearPath = () => {
    setPath([]);
    setDistance(null);
    setEstimatedTime(null);
    setStartLocation('');
    setEndLocation('');
  };
  

  const debugGraph = () => {
    restaurantMap.debugGraph();
  };
  

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = 400; 
      }
      
      drawMap();
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [locations, path, tables]);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
      <div className="mb-4 p-4 bg-primary-50 rounded-lg border border-primary-200">
        <h2 className="text-lg font-medium text-primary-700 mb-2">About This View</h2>
        <p className="text-primary-600">
          The restaurant map uses a Graph data structure to represent locations and paths.
          Dijkstra's algorithm calculates the shortest path between any two points,
          providing both distance and estimated walking time.
        </p>
      </div>
      
      <div className="mb-4 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="label">Start Location</label>
          <select
            className="input"
            value={startLocation}
            onChange={(e) => setStartLocation(e.target.value)}
          >
            <option value="">Select start location</option>
            {locations.map((loc) => (
              <option key={`start-${loc.id}`} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex-1">
          <label className="label">End Location</label>
          <select
            className="input"
            value={endLocation}
            onChange={(e) => setEndLocation(e.target.value)}
          >
            <option value="">Select end location</option>
            {locations.map((loc) => (
              <option key={`end-${loc.id}`} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex items-end gap-2">
          <button
            className="btn btn-primary h-[42px]"
            onClick={findPath}
          >
            Find Path
          </button>
          
          <button
            className="btn bg-gray-200 text-gray-800 hover:bg-gray-300 h-[42px]"
            onClick={clearPath}
          >
            Clear
          </button>
          
          <button
            className="btn bg-blue-200 text-blue-800 hover:bg-blue-300 h-[42px]"
            onClick={debugGraph}
          >
            Debug
          </button>
        </div>
      </div>
      
      {path.length > 0 && distance !== null && estimatedTime !== null && (
        <div className="mb-4 p-3 bg-primary-50 border border-primary-200 rounded-md">
          <h3 className="font-medium text-primary-700 mb-1">Path Found:</h3>
          <p className="text-primary-600">
            {path.map((locId, index) => {
              const loc = locations.find(l => l.id === locId);
              return loc ? loc.name : locId;
            }).join(' → ')}
          </p>
          <p className="text-sm text-primary-600 mt-1">
            Total distance: {distance.toFixed(1)} meters
          </p>
          <p className="text-sm text-primary-600">
            Estimated walking time: {estimatedTime.toFixed(1)} seconds
          </p>
        </div>
      )}
      
      <div className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
        <canvas ref={canvasRef} className="w-full" height="400" />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-secondary-500 inline-block mr-1"></span>
          <span>Kitchen</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-primary-500 inline-block mr-1"></span>
          <span>Bar</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-accent-400 inline-block mr-1"></span>
          <span>Entrance</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-success-500 inline-block mr-1"></span>
          <span>Available Table</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-warning-500 inline-block mr-1"></span>
          <span>Occupied Table</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMapView;
