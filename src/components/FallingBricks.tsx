"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";

// ───────────────────────────────
// Types
// ───────────────────────────────
interface Brick {
  id: string;
  gridX: number;
  element: HTMLDivElement;
  layer: number; // 0 = front, 1 = mid, 2 = back
}

// ───────────────────────────────
// Constants
// ───────────────────────────────
const BRICK_COLORS = ["#e2e8f0", "#cbd5e1", "#94a3b8", "#64748b", "#475569"];
const GRID_SIZE = 40;
const GRID_WIDTH = 25;
let BRICK_COUNTER = 0;

// ───────────────────────────────
// Component
// ───────────────────────────────
export function FallingBricks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bricksRef = useRef<Map<string, Brick>>(new Map());
  const columnHeights = useRef<number[]>(Array(GRID_WIDTH).fill(0));

  const spawnBrick = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    // Pick column and layer depth
    const gridX = Math.floor(Math.random() * GRID_WIDTH);
    const layer = Math.floor(Math.random() * 3); // 0–2 = different depth planes
    const layerDepth = [1, 0.85, 0.65][layer]; // scaling per layer
    const layerOpacity = [1, 0.7, 0.45][layer];
    const layerOffset = [-10, 0, 10][layer]; // subtle parallax drift

    const pixelX =
      gridX * GRID_SIZE + (window.innerWidth - GRID_WIDTH * GRID_SIZE) / 2;

    const color = BRICK_COLORS[Math.floor(Math.random() * BRICK_COLORS.length)];
    const id = `brick-${++BRICK_COUNTER}`;
    const opacity = Math.random() * 0.3 + 0.4;

    // Create element
    const el = document.createElement("div");
    el.className = "absolute rounded-sm";
    el.style.left = `${pixelX}px`;
    el.style.top = `${-GRID_SIZE}px`;
    el.style.width = `${GRID_SIZE - 4}px`;
    el.style.height = `${GRID_SIZE - 4}px`;
    el.style.backgroundColor = color;
    el.style.opacity = (opacity * layerOpacity).toFixed(2);
    el.style.scale = layerDepth.toString();
    el.style.willChange = "transform";
    el.style.zIndex = `${10 - layer}`; // deeper layers behind

    container.appendChild(el);
    bricksRef.current.set(id, { id, gridX, element: el, layer });

    // Stack column heights
    const currentColHeight = columnHeights.current[gridX];
    const targetY = window.innerHeight - (currentColHeight + 1) * GRID_SIZE;
    columnHeights.current[gridX] += 1;

    // Animate clean fall with slight horizontal drift per layer
    gsap.fromTo(
      el,
      { y: -GRID_SIZE * 2, x: layerOffset * 2 },
      {
        y: targetY,
        x: `+=${layerOffset}`, // small drift during fall
        duration: 1.2 + Math.random() * 0.8,
        ease: "power2.out",
      },
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(spawnBrick, 450); // steady rhythm
    return () => clearInterval(interval);
  }, [spawnBrick]);

  useEffect(() => {
    return () => {
      const container = containerRef.current;
      if (container) container.innerHTML = "";
      bricksRef.current.clear();
      columnHeights.current.fill(0);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    />
  );
}
