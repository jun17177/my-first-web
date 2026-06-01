import Link from "next/link";
import type { Team } from "@/lib/teams";

export default function TeamCard({ team }: { team: Team }) {
  return (
    <Link href={`/teams/${team.id}`} className="block group">
      <div className="rounded-lg border border-[#eeeeee] bg-white shadow-sm transition hover:shadow-md overflow-hidden">
        <div className="h-1.5 rounded-t-lg" style={{ backgroundColor: team.color }} />
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div
              className="w-4 h-4 rounded-full mt-1 shrink-0"
              style={{ backgroundColor: team.color }}
            />
            {team.championships > 0 && (
              <span className="text-xs font-semibold text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">
                🏆 {team.championships}회
              </span>
            )}
          </div>
          <h3 className="text-lg font-bold text-[#111111] group-hover:underline">{team.name}</h3>
          <p className="mt-1 text-sm text-[#666666]">{team.base}</p>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400 mb-1">드라이버</p>
            {team.drivers.map((d) => (
              <p key={d} className="text-sm text-[#333333] font-medium">{d}</p>
            ))}
          </div>
          <p className="mt-4 text-xs text-gray-400">창단 {team.founded}년 · 자세히 보기 →</p>
        </div>
      </div>
    </Link>
  );
}
