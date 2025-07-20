'use client';

import { useEffect, useRef } from 'react';

export default function Home() {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const renderRef = useRef(null);
  const runnerRef = useRef(null);
  const dataRef = useRef(null);
  const maxRef = useRef(null);
  const minRef = useRef(null);

  const loadData = async () => {
    const response = await fetch('/app-data.csv');
    const csvText = await response.text();
    
    
    // Parse CSV to array of objects with proper handling of quoted fields
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    
    const parseCSVLine = (line) => {
      const result = [];
      let current = '';
      let inQuotes = false;
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          result.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      result.push(current.trim());
      return result;
    };
    
    const data = lines.slice(1).filter(line => line.trim()).map(line => {
      const values = parseCSVLine(line);
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = values[index] || '';
      });
      return obj;
    });
    
    console.log('Parsed data sample:', data.slice(0, 3));
    dataRef.current = data;
    getMinMax();
  }

  const getMinMax = () => {
    //go through dataRef.current and find the min and max values of sites_installed
    
    const sitesInstalledValues = dataRef.current.map(item => parseInt(item.sites_installed)).filter(val => !isNaN(val));
    
    const min = Math.min(...sitesInstalledValues);
    const max = Math.max(...sitesInstalledValues);
    
    console.log('Min:', min, 'Max:', max);
    
    minRef.current = min;
    maxRef.current = max;
  }


  const loadMatter = async () => {
    const Matter = await import('matter-js');

    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const Runner = Matter.Runner;
    const Composites = Matter.Composites;
    const Common = Matter.Common;
    const MouseConstraint = Matter.MouseConstraint;
    const Mouse = Matter.Mouse;
    const Composite = Matter.Composite;
    const Bodies = Matter.Bodies;

    // create engine
    const engine = Engine.create();
    const world = engine.world;

    // add bodies
    const canvasWidth = 1200;
    const canvasHeight = 800;

          // Function to add a single square
      const addSquare = (x, y, size, data, index) => {
        const chamferRadius = Math.ceil(size * 0.25);
        const square = Bodies.rectangle(x, y, size, size, {
          chamfer: { radius: chamferRadius }
        });
        
        // Store the data and index with the square
        square.data = data;
        square.index = index;
        
        Composite.add(world, square);
        return square;
      };

    // create renderer
    const render = Render.create({
      element: canvasRef.current,
      engine: engine,
      options: {
        width: canvasWidth,
        height: canvasHeight,
        showAngleIndicator: false,
      }
    });

    Render.run(render);

    // create runner
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Add one square
    // addSquare(600, 0, 50);

    Composite.add(world, [
      // walls
      Bodies.rectangle(canvasWidth / 2, 0, canvasWidth, 50, { isStatic: true }),
      Bodies.rectangle(canvasWidth / 2, canvasHeight, canvasWidth, 50, { isStatic: true }),
      Bodies.rectangle(canvasWidth, canvasHeight / 2, 50, canvasHeight, { isStatic: true }),
      Bodies.rectangle(0, canvasHeight / 2, 50, canvasHeight, { isStatic: true })
    ]);

    for (let i = 0; i < dataRef.current.length; i++) {
      const minSize = 20;
      const maxSize = 60;
      
      const normalizedSize = (parseInt(dataRef.current[i].sites_installed) - minRef.current) / (maxRef.current - minRef.current);
      
      const actualSize = Math.round(minSize + (normalizedSize * (maxSize - minSize)));
      addSquare(600, 0, actualSize, dataRef.current[i], i);
      //pause for 100ms
      await new Promise(resolve => setTimeout(resolve, 50));
    }


    // add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });

          Composite.add(world, mouseConstraint);

      // keep the mouse in sync with rendering
      render.mouse = mouse;

      // Add click event listener to detect square clicks
      render.canvas.addEventListener('click', (event) => {
        const rect = render.canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        
        // Convert screen coordinates to world coordinates
        const worldPos = {
          x: mouseX / render.options.pixelRatio,
          y: mouseY / render.options.pixelRatio
        };
        
        // Check if any body was clicked
        const bodies = Composite.allBodies(world);
        for (let body of bodies) {
          if (body.data && Matter.Bounds.contains(body.bounds, worldPos)) {
            console.log('Clicked square data:', body.data.sites_installed);
            console.log('Clicked square index:', body.index);
            break;
          }
        }
      });

    // fit the render viewport to the scene
    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: canvasWidth, y: canvasHeight }
    });

    // Store references for cleanup
    engineRef.current = engine;
    renderRef.current = render;
    runnerRef.current = runner;
  };

  useEffect(() => {
    // Import Matter.js dynamically to avoid SSR issues
    const init = async () => {
      await loadData();
      loadMatter();
    };

    init();

    // Cleanup function
    return () => {
      if (renderRef.current) {
        Render.stop(renderRef.current);
      }
      if (runnerRef.current) {
        Runner.stop(runnerRef.current);
      }
    };
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div ref={canvasRef} className="border border-gray-300 rounded-lg shadow-lg"></div>
    </div>
  );
}
