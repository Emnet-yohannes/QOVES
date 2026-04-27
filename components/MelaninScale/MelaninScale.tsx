export default function MelaninScale() {
  return (
    <div className="bg-[#6f6a67] rounded-xl p-6 relative flex flex-col items-center justify-between h-[360px]">

      <div className="relative h-full flex items-center">

        {/* vertical color scale */}
        <div className="w-3 h-[260px] rounded bg-gradient-to-b from-sky-200 via-yellow-200 via-orange-300 to-black"></div>

        {/* marker line */}
        <div className="absolute left-[-120px] flex items-center gap-2">
          <span className="bg-white text-black text-xs px-2 py-1 rounded">
            DARK BROWN
          </span>

          <div className="w-[120px] border-t border-dashed border-white"></div>

          <span className="bg-white text-black text-xs px-2 py-1 rounded">
            YOU
          </span>
        </div>

      </div>

      <div className="bg-white/20 text-[8px] sm:text-xs px-3 py-2 rounded mt-4 text-white">
        Your eyes have a medium melanin concentration.
      </div>

    </div>
  );
}