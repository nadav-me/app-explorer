'use client';

import { useEffect, useRef } from 'react';

export default function Home() {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const renderRef = useRef(null);
  const runnerRef = useRef(null);

  useEffect(() => {
    // Import Matter.js dynamically to avoid SSR issues
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
      const minSize = 25;
      const maxSize = 80;
      const chamferRadius = 10;
      const gridColumns = 50;
      const gridRows = 10;
      const canvasWidth = 1200;
      const canvasHeight = 800;

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
      
      const stack = Composites.stack(20, 20, gridColumns, gridRows, 0, 0, function(x, y) {
        const size = Common.random(minSize, maxSize);
        return Bodies.rectangle(x, y, size, size, { 
          chamfer: { radius: chamferRadius }
        });
      });

      Composite.add(world, stack);

      Composite.add(world, [
        // walls
        Bodies.rectangle(canvasWidth / 2, 0, canvasWidth, 50, { isStatic: true }),
        Bodies.rectangle(canvasWidth / 2, canvasHeight, canvasWidth, 50, { isStatic: true }),
        Bodies.rectangle(canvasWidth, canvasHeight / 2, 50, canvasHeight, { isStatic: true }),
        Bodies.rectangle(0, canvasHeight / 2, 50, canvasHeight, { isStatic: true })
      ]);

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

    loadMatter();

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
