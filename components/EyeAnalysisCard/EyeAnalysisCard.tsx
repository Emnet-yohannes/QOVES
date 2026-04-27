import React from "react";

type Label = {
  label: string;
  active?: boolean;
};

interface EyeAnalysisCardProps {
  matrix: string[][];
  leftLabels: Label[];
  rightLabels: Label[];
  insight: string;
  indicatorColumn?: number; // controls vertical selection bar
}

const AxisLabel: React.FC<{ item: Label; align?: "left" | "right" }> = ({
  item,
  align = "left",
}) => {
  return (
    <div
      className={`flex items-center gap-1 w-full ${
        align === "right" ? "justify-start" : "justify-end"
      }`}
    >
      {align === "right" && item.active && (
        <div className="w-[9px] h-[1px] bg-white/50" />
      )}

      <p
        className={`text-[6px] font-medium leading-[7.8px] ${
          item.active ? "text-white" : "text-[#515255]"
        }`}
      >
        {item.label}
      </p>

      {align === "left" && item.active && (
        <div className="w-[9px] h-[1px] bg-white/50" />
      )}
    </div>
  );
};

const ColorMatrix: React.FC<{ matrix: string[][] }> = ({ matrix }) => {
  return (
    <div className="flex w-full h-full border border-white/50 overflow-hidden">
      {matrix.map((row, i) => (
        <div key={i} className="flex flex-1">
          {row.map((color, j) => (
            <div key={j} className="flex-1" style={{ background: color }} />
          ))}
        </div>
      ))}
    </div>
  );
};

const IndicatorBar: React.FC<{ column?: number }> = ({ column = 2 }) => {
  return (
    <div
      className="absolute bottom-20 w-2 h-[30px] border border-white/50 opacity-50 rounded-sm"
      style={{
        left: `${column * 40}px`, // tweak scale depending on layout
      }}
    />
  );
};

const ScaleBar: React.FC<{
  label: string;
  align?: "left" | "right";
}> = ({ label, align = "left" }) => {
  return (
    <div
      className={`absolute bottom-[90px] ${
        align === "left" ? "-left-6" : "-right-6"
      }`}
    >
      <div className="relative w-[130px] h-[10px]">
        <div className="absolute top-[5px] w-full h-[2px] bg-white/30" />
        <div
          className={`absolute top-0 ${
            align === "left" ? "left-[60px]" : "right-[60px]"
          } bg-white border border-[#E8E8E8] rounded px-1 flex items-center gap-1`}
        >
          <div className="w-[6px] h-[6px] bg-[#624934]" />
          <span className="text-[6px] text-[#515255]">{label}</span>
        </div>
      </div>
    </div>
  );
};

export const EyeAnalysisCard: React.FC<EyeAnalysisCardProps> = ({
  matrix,
  leftLabels,
  rightLabels,
  insight,
  indicatorColumn = 2,
}) => {
  return (
    <div className="w-[273px] h-[337px] p-[7px] rounded-lg border border-white/10 bg-black/10">
      <div className="flex flex-col h-full justify-between">
        {/* MATRIX SECTION */}
        <div className="flex flex-1 p-3.5 gap-2 relative">
          {/* LEFT LABELS */}
          <div className="flex flex-col justify-between py-[21px] w-[50px]">
            {leftLabels.map((item, i) => (
              <AxisLabel key={i} item={item} align="left" />
            ))}
          </div>

          {/* MATRIX */}
          <div className="relative flex-1">
            <ColorMatrix matrix={matrix} />
            <IndicatorBar column={indicatorColumn} />
          </div>

          {/* RIGHT LABELS */}
          <div className="flex flex-col justify-between py-[21px] w-[50px]">
            {rightLabels.map((item, i) => (
              <AxisLabel key={i} item={item} align="right" />
            ))}
          </div>

          {/* SCALE BARS */}
          <ScaleBar label="Dark Brown" align="left" />
          <ScaleBar label="You" align="right" />
        </div>

        {/* INSIGHT */}
        <div className="p-[5px] rounded bg-white/20">
          <p className="text-[9px] text-white font-medium leading-[11px]">
            {insight}
          </p>
        </div>
      </div>
    </div>
  );
};