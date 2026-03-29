"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Product, ILiquid, IVape } from "@/types/Mockdata";

interface Props {
  product: Product;
}

interface MetricItem {
  label: string;
  value: number;
  rawValue: number;
  unit?: string;
}

const normalize = (value: number, max: number) =>
  Math.min(100, (value / max) * 100);

const iceLabels: Record<number, string> = {
  0: "Нет",
  25: "Лёгкий",
  50: "Средний",
  75: "Сильный",
  100: "Очень сильный",
};

function getPolygonPoints(
  metrics: { value: number }[],
  center: number,
  maxRadius: number
): { x: number; y: number }[] {
  const angleStep = (2 * Math.PI) / metrics.length;
  const startAngle = -Math.PI / 2;
  return metrics.map((m, i) => {
    const angle = startAngle + i * angleStep;
    const radius = (m.value / 100) * maxRadius;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  });
}

function smoothPath(points: { x: number; y: number }[]): string {
  if (points.length < 2) return "";
  const tension = 0.3;
  let path = `M ${points[0].x} ${points[0].y}`;

  for (let i = 0; i < points.length; i++) {
    const p0 = points[i === 0 ? points.length - 1 : i - 1];
    const p1 = points[i];
    const p2 = points[(i + 1) % points.length];
    const p3 = points[(i + 2) % points.length];

    const cp1x = p1.x + ((p2.x - p0.x) * tension) / 2;
    const cp1y = p1.y + ((p2.y - p0.y) * tension) / 2;
    const cp2x = p2.x - ((p3.x - p1.x) * tension) / 2;
    const cp2y = p2.y - ((p3.y - p1.y) * tension) / 2;

    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }

  path += " Z";
  return path;
}

export function ProductRadar({ product }: Props) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  if (product.type === "consumables") return null;

  const isLiquid = product.type === "liquid";
  const liquid = product as ILiquid;
  const vape = product as IVape;

  const metrics: MetricItem[] = isLiquid
    ? [
        { label: "Никотин", value: normalize(liquid.nicotine, 50), rawValue: liquid.nicotine, unit: "мг" },
        { label: "Объём", value: normalize(liquid.volume, 100), rawValue: liquid.volume, unit: "мл" },
        { label: "Вкусы", value: normalize(liquid.flavor.length, 5), rawValue: liquid.flavor.length },
        { label: "Холодок", value: liquid.Icelevel, rawValue: liquid.Icelevel },
      ]
    : [
        { label: "Батарея", value: normalize(vape.batteryCapacity, 5000), rawValue: vape.batteryCapacity, unit: "mAh" },
        { label: "Мощность", value: normalize(vape.maxPower, 200), rawValue: vape.maxPower, unit: "Вт" },
        { label: "Бак", value: normalize(vape.TankCapacity, 10), rawValue: vape.TankCapacity, unit: "мл" },
        { label: "Сопр.", value: normalize(2 - vape.CoilResistence, 1.6), rawValue: vape.CoilResistence, unit: "Ω" },
      ];

  const size = 280;
  const center = size / 2;
  const maxRadius = 100;
  const gridLevels = [25, 50, 75, 100];
  const pathPoints = getPolygonPoints(metrics, center, maxRadius);
  const pathD = smoothPath(pathPoints);

  return (
    <div className="relative flex flex-col items-center">
      <svg width={size} height={size} className="overflow-visible">
        <defs>
          <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity={0.05} />
            <stop offset="100%" stopColor="#22c55e" stopOpacity={0.35} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {gridLevels.map((level) => (
          <g key={level}>
            <polygon
              points={getPolygonPoints(
                metrics.map(() => ({ value: level })),
                center,
                maxRadius
              )
                .map((p) => `${p.x},${p.y}`)
                .join(" ")}
              className="stroke-white/10 fill-none"
            />
            <text
              x={center + 4}
              y={center - (level / 100) * maxRadius + 3}
              className="fill-white/30 text-[8px]"
            >
              {level}
            </text>
          </g>
        ))}

        {metrics.map((m, i) => {
          const angleStep = (2 * Math.PI) / metrics.length;
          const startAngle = -Math.PI / 2;
          const angle = startAngle + i * angleStep;
          const x2 = center + maxRadius * Math.cos(angle);
          const y2 = center + maxRadius * Math.sin(angle);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x2}
              y2={y2}
              className={`stroke-white/20 transition-colors ${
                hoveredIndex === i ? "stroke-green-500/60" : ""
              }`}
              strokeWidth={hoveredIndex === i ? 2 : 1}
            />
          );
        })}

        <motion.path
          d={pathD}
          fill="url(#radarGradient)"
          stroke="#22c55e"
          strokeWidth={2}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        {pathPoints.map((p, i) => {
          const isHovered = hoveredIndex === i;
          return (
            <g
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="cursor-pointer"
            >
              {isHovered && (
                <motion.circle
                  cx={p.x}
                  cy={p.y}
                  r={12}
                  fill="#22c55e"
                  opacity={0.2}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
              <motion.circle
                cx={p.x}
                cy={p.y}
                r={isHovered ? 8 : 5}
                fill={isHovered ? "#22c55e" : "#22c55e"}
                stroke={isHovered ? "#fff" : "transparent"}
                strokeWidth={2}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.15 + 0.5, duration: 0.3 }}
                filter={isHovered ? "url(#glow)" : undefined}
              />
            </g>
          );
        })}

        {metrics.map((m, i) => {
          const angleStep = (2 * Math.PI) / metrics.length;
          const startAngle = -Math.PI / 2;
          const angle = startAngle + i * angleStep;
          const radius = 120;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          const textAnchor =
            x < center - 10 ? "end" : x > center + 10 ? "start" : "middle";
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor={textAnchor}
              dominantBaseline="middle"
              className={`fill-white/60 text-[10px] font-medium transition-colors ${
                hoveredIndex === i ? "fill-green-500" : ""
              }`}
            >
              {m.label}
            </text>
          );
        })}

        {hoveredIndex !== null && (
          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <rect
              x={pathPoints[hoveredIndex].x - 40}
              y={pathPoints[hoveredIndex].y - 50}
              width={80}
              height={36}
              rx={8}
              className="fill-black/80 stroke-white/20"
            />
            <text
              x={pathPoints[hoveredIndex].x}
              y={pathPoints[hoveredIndex].y - 38}
              textAnchor="middle"
              className="fill-white/60 text-[9px]"
            >
              {metrics[hoveredIndex].label}
            </text>
            <text
              x={pathPoints[hoveredIndex].x}
              y={pathPoints[hoveredIndex].y - 24}
              textAnchor="middle"
              className="fill-green-500 text-sm font-bold"
            >
              {isLiquid && metrics[hoveredIndex].label === "Холодок"
                ? iceLabels[metrics[hoveredIndex].rawValue as keyof typeof iceLabels]
                : `${metrics[hoveredIndex].rawValue}${metrics[hoveredIndex].unit ? ` ${metrics[hoveredIndex].unit}` : ""}`}
            </text>
          </motion.g>
        )}
      </svg>

      <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-1 text-xs w-full max-w-70">
        {metrics.map((m, i) => (
          <div
            key={i}
            className={`flex justify-between gap-4 cursor-pointer transition-colors rounded px-2 py-1 ${
              hoveredIndex === i ? "bg-green-500/10" : ""
            }`}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <span className="text-white/40">{m.label}</span>
            <span className={`font-medium transition-colors ${hoveredIndex === i ? "text-green-500" : "text-white"}`}>
              {isLiquid && m.label === "Холодок"
                ? iceLabels[m.rawValue as keyof typeof iceLabels]
                : `${Math.round(m.value)}%`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
