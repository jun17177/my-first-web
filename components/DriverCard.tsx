import type { Driver } from "@/lib/drivers";

export default function DriverCard({ driver }: { driver: Driver }) {
  return (
    <div className="rounded-lg border border-[#eeeeee] bg-white shadow-sm transition hover:shadow-md overflow-hidden">
      <div className="h-1.5 rounded-t-lg" style={{ backgroundColor: driver.teamColor }} />
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <span className="text-4xl font-black text-gray-100">#{driver.number}</span>
          <span className="text-xs font-semibold bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
            {driver.nationality}
          </span>
        </div>
        <h3 className="text-lg font-bold text-[#111111] leading-tight">{driver.name}</h3>
        <p className="mt-1 text-sm text-[#666666]">{driver.team}</p>
      </div>
    </div>
  );
}
