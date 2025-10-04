"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
interface Brick {
  id: string;
  gridX: number;
  gridWidth: number;
  width: number;
  height: number;
  color: string;
  opacity: number;
  element: HTMLDivElement;
}

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────
const BRICK_COLORS = [
  "#e2e8f0",
  "#cbd5e1",
  "#94a3b8",
  "#64748b",
  "#475569",
  "#334155",
];

const GRID_SIZE = 40;
const GRID_WIDTH = 25;
let BRICK_COUNTER = 0; // ✅ unique id counter

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export function FallingBricks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bricksRef = useRef<Map<string, Brick>>(new Map());
  const occupancyGrid = useRef<boolean[][]>([]);
  const animTicker = useRef<number | null>(null);
  const windowSize = useRef({ width: 0, height: 0 });

  // ── Setup grid + resize listener
  useEffect(() => {
    const updateSize = () => {
      windowSize.current = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      const gridHeight = Math.ceil(window.innerHeight / GRID_SIZE) + 5;
      occupancyGrid.current = Array(gridHeight)
        .fill(null)
        .map(() => Array(GRID_WIDTH).fill(false));
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // ── Cleanup offscreen bricks
  const cleanupSettled = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const bricks = Array.from(bricksRef.current.values());
    bricks.forEach((b) => {
      const y = parseFloat(gsap.getProperty(b.element, "y") as string) || 0;
      if (y > windowSize.current.height - GRID_SIZE * 2) {
        // keep bottom layer visible, remove excess
        if (bricks.length > 50) {
          gsap.killTweensOf(b.element);
          container.removeChild(b.element);
          bricksRef.current.delete(b.id);
        }
      }
    });
  }, []);

  // ── Handle settling (wrapped in useCallback)
  const settleBrick = useCallback(
    (id: string) => {
      const brick = bricksRef.current.get(id);
      if (!brick) return;
      const el = brick.element;
      const { height: winH } = windowSize.current;

      const landingY = Math.floor(winH / GRID_SIZE) - 1;
      gsap.to(el, {
        y: landingY * GRID_SIZE,
        duration: 0.3,
        ease: "bounce.out",
        onComplete: () => {
          gsap.fromTo(
            el,
            { scale: 1 },
            { scale: 1.05, yoyo: true, repeat: 1, duration: 0.1 },
          );
          cleanupSettled();
        },
      });
    },
    [cleanupSettled],
  );

  // ── Spawn new bricks periodically
  useEffect(() => {
    const spawnInterval = setInterval(() => {
      const { width, height } = windowSize.current;
      if (!width || !height) return;

      const gridWidth = Math.floor(Math.random() * 3) + 1;
      const gridX = Math.floor(Math.random() * (GRID_WIDTH - gridWidth + 1));
      const pixelX = gridX * GRID_SIZE + (width - GRID_WIDTH * GRID_SIZE) / 2;

      const id = `brick-${++BRICK_COUNTER}-${Math.random()
        .toString(36)
        .slice(2)}`;
      const color =
        BRICK_COLORS[Math.floor(Math.random() * BRICK_COLORS.length)];
      const opacity = Math.random() * 0.3 + 0.4;
      const brickWidth = gridWidth * GRID_SIZE - 4;
      const brickHeight = GRID_SIZE - 4;

      const el = document.createElement("div");
      el.className = "absolute rounded-sm";
      el.style.left = `${pixelX}px`;
      el.style.top = `${-GRID_SIZE * 2}px`;
      el.style.width = `${brickWidth}px`;
      el.style.height = `${brickHeight}px`;
      el.style.backgroundColor = color;
      el.style.opacity = opacity.toString();
      el.style.transform = "translateY(0px)";
      el.style.willChange = "transform";

      containerRef.current?.appendChild(el);

      const brick: Brick = {
        id,
        gridX,
        gridWidth,
        width: brickWidth,
        height: brickHeight,
        color,
        opacity,
        element: el,
      };
      bricksRef.current.set(id, brick);

      const fallSpeed = Math.random() * 2 + 3;
      const rotation = Math.random() * 30 - 15;

      gsap.fromTo(
        el,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity,
          duration: 0.3,
          ease: "back.out(1.7)",
          onComplete: () => {
            gsap.to(el, {
              y: height + 100,
              duration: fallSpeed,
              ease: "none",
              rotation,
              onComplete: () => settleBrick(id),
            });
          },
        },
      );
    }, 1800);

    return () => clearInterval(spawnInterval);
  }, [settleBrick]); // ✅ fixed missing dependency

  // ── Cleanup on unmount
  useEffect(() => {
    const currentBricks = bricksRef.current;
    const currentTicker = animTicker.current;
    return () => {
      currentBricks.forEach((b) => {
        gsap.killTweensOf(b.element);
        b.element.remove();
      });
      currentBricks.clear();
      if (currentTicker) cancelAnimationFrame(currentTicker);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {/* Fade mask for bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
}
