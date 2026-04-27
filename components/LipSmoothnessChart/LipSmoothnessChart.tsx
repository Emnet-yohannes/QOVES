'use client';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const data = [
  {
    name: "Lip",
    smooth: 56,        // main value
    remaining: 44,     // to reach 100%
  },
];

export default function LipSmoothnessChart() {
  return (
    <div className="flex flex-col gap-4 p-2 w-[284px] rounded-lg border border-white/10 bg-black/10">
      
      {/* Header */}
      <div>
        <p className="text-[#9AAEB5] text-[8px]">Lip Smoothness</p>
        <p className="text-white text-[24px] font-medium">56%</p>
      </div>

      {/* Chart */}
      <div className="w-full h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
          >
            <XAxis type="number" hide domain={[0, 100]} />
            <YAxis type="category" dataKey="name" hide />

            {/* Smooth portion */}
            <Bar
              dataKey="smooth"
              stackId="a"
              fill="#AEC2C9"
              radius={[4, 4, 0, 0]}
            >
              <LabelList
                dataKey="smooth"
                position="right"
                // formatter={(v: number) => `${v}%`}
                fill="#fff"
                fontSize={10}
              />
            </Bar>

            {/* Remaining portion */}
            <Bar
              dataKey="remaining"
              stackId="a"
              fill="#2A2A2A"
              radius={[0, 0, 4, 4]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer labels */}
      <div className="flex justify-between text-[8px] text-[#9AAEB5]">
        <span>Smooth (100%)</span>
        <span>Rough (0%)</span>
      </div>

      {/* You indicator */}
      <div className="self-center px-2 py-[2px] rounded bg-white/20 text-[8px] text-white/60">
        56% (You)
      </div>
    </div>
  );
}