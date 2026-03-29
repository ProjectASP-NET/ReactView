"use client";

import { motion } from "framer-motion";
import { Product, ILiquid, IVape } from "@/types/Mockdata";

interface Props {
  product: Product;
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

export function ProductRadar({ product }: Props) {
  if (product.type === "consumables") return null;

  const isLiquid = product.type === "liquid";
  const liquid = product as ILiquid;
  const vape = product as IVape;

  const metrics = isLiquid
    ? [
        { label: "Никотин", value: normalize(liquid.nicotine, 50) },
        { label: "Объём", value: normalize(liquid.volume, 100) },
        { label: "Вкусы", value: normalize(liquid.flavor.length, 5) },
        { label: "Холодок", value: liquid.Icelevel },
      ]
    : [
        { label: "Батарея", value: normalize(vape.batteryCapacity, 5000) },
        { label: "Мощность", value: normalize(vape.maxPower, 200) },
        { label: "Бак", value: normalize(vape.TankCapacity, 10) },
        { label: "Сопр.", value: normalize(2 - vape.CoilResistence, 1.6) },
      ];

  const size = 280;
  const center = size / 2;
  const maxRadius = 100;
  const gridLevels = [25, 50, 75, 100];
  const pathPoints = getPolygonPoints(metrics, center, maxRadius);

  return (
    <div className="relative flex flex-col items-center">
      <svg width={size} height={size} className="overflow-visible">
        {gridLevels.map((level) => (
          <polygon
            key={level}
            points={getPolygonPoints(
              metrics.map(() => ({ value: level })),
              center,
              maxRadius
            )
              .map((p) => `${p.x},${p.y}`)
              .join(" ")}
            className="stroke-white/10 fill-none"
          />
        ))}
        {metrics.map((_, i) => {
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
              className="stroke-white/20"
            />
          );
        })}
        <motion.polygon
          points={pathPoints.map((p) => `${p.x},${p.y}`).join(" ")}
          className="fill-green-500/20 stroke-green-500"
          strokeWidth={2}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        {pathPoints.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={4}
            className="fill-green-500"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
          />
        ))}
        {metrics.map((m, i) => {
          const angleStep = (2 * Math.PI) / metrics.length;
          const startAngle = -Math.PI / 2;
          const angle = startAngle + i * angleStep;
          const radius = 115;
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
              className="fill-white/60 text-[10px] font-medium"
            >
              {m.label}
            </text>
          );
        })}
      </svg>
      <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-1 text-xs">
        {metrics.map((m, i) => (
          <div key={i} className="flex justify-between gap-4">
            <span className="text-white/40">{m.label}</span>
            <span className="font-medium text-white">
              {isLiquid && m.label === "Холодок"
                ? iceLabels[m.value as keyof typeof iceLabels]
                : `${Math.round(m.value)}%`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
