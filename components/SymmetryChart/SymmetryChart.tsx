"use client";

import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

const data = [
  { x: 7, y: 3, label: "IDEAL" },
  { x: 6, y: 2, label: "YOU" },
  { x: 5, y: 1, label: "AVERAGE" }
];

export default function SymmetryChart() {
  return (
    <div className="bg-[#7d8a8f] rounded-xl p-6 h-[220px]">

      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            type="number"
            dataKey="x"
            name="symmetry"
            domain={[0, 10]}
            hide
          />

          <YAxis
            type="number"
            dataKey="y"
            domain={[0, 4]}
            hide
          />

          <Tooltip />

          <Scatter
            data={data}
            fill="#ffffff"
          />

        </ScatterChart>
      </ResponsiveContainer>

      <div className="flex justify-between text-xs text-white mt-2">
        <span>ASYMMETRICAL</span>
        <span>SYMMETRICAL</span>
      </div>

    </div>
  );
}