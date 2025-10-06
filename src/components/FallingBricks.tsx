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
const BRICK_COLORS = ["#f8fafc", "#f1f5f9", "#e2e8f0", "#cbd5e1", "#94a3b8"];
const GRID_SIZE = 36;
const GRID_WIDTH = 25;
let BRICK_COUNTER = 0;

// ───────────────────────────────
// Component
// ───────────────────────────────
export function FallingBricks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bricksRef = useRef<Map<string, Brick>>(new Map());

  const spawnBrick = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const gridX = Math.floor(Math.random() * GRID_WIDTH);
    const layer = Math.floor(Math.random() * 3); // 0 = front, 1 = mid, 2 = back
    const layerDepth = [1, 0.85, 0.65][layer];
    const layerOpacity = [0.25, 0.18, 0.12][layer];
    const layerOffset = [-12, 0, 12][layer];

    const pixelX =
      gridX * GRID_SIZE + (window.innerWidth - GRID_WIDTH * GRID_SIZE) / 2;

    const color = BRICK_COLORS[Math.floor(Math.random() * BRICK_COLORS.length)];
    const id = `brick-${++BRICK_COUNTER}`;

    const el = document.createElement("div");
    el.className = "absolute rounded-sm";
    el.style.left = `${pixelX}px`;
    el.style.top = `${-GRID_SIZE}px`;
    el.style.width = `${GRID_SIZE - 4}px`;
    el.style.height = `${GRID_SIZE - 4}px`;
    el.style.backgroundColor = color;
    el.style.opacity = layerOpacity.toString();
    el.style.scale = layerDepth.toString();
    el.style.willChange = "transform, opacity";
    el.style.zIndex = `${5 - layer}`;

    container.appendChild(el);
    bricksRef.current.set(id, { id, gridX, element: el, layer });

    const duration = 2.5 + Math.random() * 2.5;
    const drift = layerOffset * (Math.random() > 0.5 ? 1 : -1);

    gsap.fromTo(
      el,
      { y: -50, x: drift / 2, opacity: 0 },
      {
        y: window.innerHeight + 60,
        x: `+=${drift}`,
        opacity: 0,
        duration,
        ease: "power1.inOut",
        onComplete: () => {
          el.remove();
          bricksRef.current.delete(id);
        },
      },
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(spawnBrick, 900); // 🧱 Slower density
    return () => clearInterval(interval);
  }, [spawnBrick]);

  // Cleanup
  useEffect(() => {
    return () => {
      const container = containerRef.current;
      if (container) container.innerHTML = "";
      bricksRef.current.clear();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    />
  );
}
