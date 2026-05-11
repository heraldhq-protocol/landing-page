"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface NodeProps {
  x: number;
  y: number;
  label: string;
  sublabel?: string;
  color?: string;
  delay?: number;
}

function FlowNode({ x, y, label, sublabel, color = "#00C896", delay = 0 }: NodeProps) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
    >
      <rect
        x={x - 60}
        y={y - 22}
        width={120}
        height={44}
        rx={10}
        fill={`${color}15`}
        stroke={color}
        strokeWidth={1.5}
      />
      <text
        x={x}
        y={y - 2}
        textAnchor="middle"
        fill={color}
        fontSize="11"
        fontWeight="700"
        fontFamily="var(--font-mono, monospace)"
      >
        {label}
      </text>
      {sublabel && (
        <text
          x={x}
          y={y + 14}
          textAnchor="middle"
          fill="#4A607A"
          fontSize="8"
          fontFamily="var(--font-mono, monospace)"
        >
          {sublabel}
        </text>
      )}
    </motion.g>
  );
}

interface ArrowProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay?: number;
  label?: string;
}

function FlowArrow({ x1, y1, x2, y2, delay = 0, label }: ArrowProps) {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const pathLength = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
    >
      <motion.line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#1A3A52"
        strokeWidth={2}
        strokeDasharray="6 4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: delay + 0.3, duration: 0.6 }}
      />
      <motion.circle
        cx={x2}
        cy={y2}
        r={3}
        fill="#00C896"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.8 }}
      />
      {label && (
        <text
          x={midX}
          y={midY - 10}
          textAnchor="middle"
          fill="#4A607A"
          fontSize="8"
          fontFamily="var(--font-mono, monospace)"
        >
          {label}
        </text>
      )}
    </motion.g>
  );
}

export default function ArchitectureDiagram() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-full aspect-[3/1] bg-[#020810] border border-border rounded-2xl" />;

  const w = 800;
  const h = 260;
  const cx = w / 2;
  const nodeGap = 130;
  const topY = 80;
  const bottomY = 200;
  const stages = ["Client", "Encrypt", "On-Chain", "Relayer", "TEE", "Delivery"];

  const positions = stages.map((_, i) => ({
    x: cx - ((stages.length - 1) * nodeGap) / 2 + i * nodeGap,
  }));

  const stageColors = ["#7C3AED", "#00C896", "#F59E0B", "#00C896", "#EF4444", "#22C55E"];

  return (
    <div className="bg-[#020810] border border-border rounded-2xl p-4 sm:p-6 overflow-x-auto">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="w-full max-w-[800px] mx-auto"
        style={{ minWidth: 500 }}
      >
        {positions.slice(0, -1).map((p, i) => (
          <FlowArrow
            key={i}
            x1={p.x + 60}
            y1={topY}
            x2={positions[i + 1].x - 60}
            y2={topY}
            delay={0.2 * i}
          />
        ))}

        {positions.map((p, i) => (
          <FlowNode
            key={i}
            x={p.x}
            y={topY}
            label={stages[i]}
            color={stageColors[i]}
            delay={0.1 * i}
          />
        ))}

        <motion.text
          x={cx}
          y={topY + 70}
          textAnchor="middle"
          fill="#4A607A"
          fontSize="9"
          fontFamily="var(--font-mono, monospace)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          End-to-end encrypted notification flow
        </motion.text>

        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.4 }}
        >
          <rect x={cx - 160} y={bottomY - 18} width={320} height={36} rx={8} fill="#0A1628" stroke="#0E2A3D" strokeWidth={1} />
          <text x={cx} y={bottomY + 2} textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="var(--font-mono, monospace)">
            Zero-PII · Dual Encryption · ZK Receipts
          </text>
        </motion.g>
      </svg>
    </div>
  );
}
