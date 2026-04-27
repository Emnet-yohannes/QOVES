import React from "react";

type ThirdItem = {
  label: string;
  value: number;
  color: string;
  align?: "start" | "center" | "end"; // controls bar rounding
};

interface FacialThirdsCardProps {
  title?: string;
  data: ThirdItem[];
  className?: string;
}

const ProgressBar: React.FC<{ color: string; align?: ThirdItem["align"] }> = ({
  color,
  align = "center",
}) => {
  const radius =
    align === "start"
      ? "rounded-l-full"
      : align === "end"
      ? "rounded-r-full"
      : "rounded-none";

  return (
    <div className="w-full h-[3px] bg-transparent">
      <div
        className={`h-full ${radius}`}
        style={{ backgroundColor: color }}
      />
    </div>
  );
};

const ThirdColumn: React.FC<{ item: ThirdItem }> = ({ item }) => {
  return (
    <div className="flex flex-col items-center gap-[5px] w-full">
      {/* Label */}
      <p className="text-[7px] text-[#F2F2F2] tracking-tight leading-[8px] text-center">
        {item.label}
      </p>

      {/* Bar */}
      <ProgressBar color={item.color} align={item.align} />

      {/* Value */}
      <p className="text-[8px] text-white font-medium leading-[10px]">
        {item.value.toFixed(2)}
      </p>
    </div>
  );
};

export const FacialThirdsCard: React.FC<FacialThirdsCardProps> = ({
  title = "Facial Thirds",
  data,
  className,
}) => {
  return (
    <div
      className={`w-[352px] h-[165px] p-[9px] rounded-lg border border-white/10 bg-black/10 flex flex-col justify-between ${className}`}
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <p className="text-[7px] text-[#F2F2F2] tracking-tight">
          {title}
        </p>
      </div>

      {/* Content */}
      <div className="flex gap-2 w-full">
        {data.map((item, index) => (
          <ThirdColumn key={index} item={item} />
        ))}
      </div>
    </div>
  );
};