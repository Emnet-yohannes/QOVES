'use client';
import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceLine,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { x: 0, y: 2 },
  { x: 10, y: 5 },
  { x: 20, y: 12 },
  { x: 30, y: 25 },
  { x: 40, y: 40 },
  { x: 50, y: 55 },
  { x: 60, y: 48 },
  { x: 70, y: 30 },
  { x: 80, y: 18 },
  { x: 90, y: 8 },
  { x: 100, y: 3 },
];

const USER_PERCENTILE = 45;

export default function EyebrowDensityChart() {
  return (
    <div className="flex flex-col gap-3 p-2 w-[285px] rounded-lg border border-white/10 bg-black/10">
      
      {/* Chart */}
      <div className="w-full h-[160px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            
            {/* Grid (matches your faint vertical lines) */}
            <CartesianGrid stroke="#F2F2F2" opacity={0.1} vertical horizontal={false} />

            <XAxis
              dataKey="x"
              type="number"
              domain={[0, 100]}
              tick={false}
              axisLine={false}
            />
            <YAxis hide />

            {/* Density shape */}
            <Area
              type="monotone"
              dataKey="y"
              stroke="#FFFFFF"
              fill="#9AAEB5"
              fillOpacity={0.2}
              strokeWidth={1.5}
            />

            {/* Curve highlight (optional for sharper look) */}
            <Line
              type="monotone"
              dataKey="y"
              stroke="#FFFFFF"
              dot={false}
              strokeWidth={1}
            />

            {/* User position (vertical dashed line) */}
            <ReferenceLine
              x={USER_PERCENTILE}
              stroke="#9AAEB5"
              strokeDasharray="3 3"
            />

            <Tooltip cursor={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Labels */}
      <div className="flex justify-between text-[8px] text-[#F2F2F2] px-1">
        <span>Low Density</span>
        <span>Medium Density</span>
        <span>High Density</span>
      </div>

      {/* Insight */}
      <div className="p-1 rounded bg-white/20 text-[8px] text-white">
        Your eyebrow density is in the mid 40th percentile
      </div>
    </div>
  );
}