import { notFound } from "next/navigation";
import Link from "next/link";
import { teams } from "@/lib/teams";
import { drivers } from "@/lib/drivers";

export function generateStaticParams() {
  return teams.map((t) => ({ id: String(t.id) }));
}

export default async function TeamDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const team = teams.find((t) => t.id === Number(id));
  if (!team) notFound();

  const teamDrivers = drivers.filter((d) => d.team === team.name);

  return (
    <div className="mx-auto max-w-3xl">
      {/* 뒤로가기 */}
      <Link
        href="/teams"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition mb-8"
      >
        ← 팀 목록
      </Link>

      {/* 팀 헤더 */}
      <div className="rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden mb-8">
        <div className="h-2" style={{ backgroundColor: team.color }} />
        <div className="p-8">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-3xl font-black text-gray-900">{team.name}</h1>
              <p className="mt-1 text-gray-500">{team.base} · 창단 {team.founded}년</p>
            </div>
            {team.championships > 0 && (
              <span className="text-sm font-bold text-yellow-700 bg-yellow-50 border border-yellow-200 px-4 py-2 rounded-full">
                🏆 컨스트럭터 챔피언십 {team.championships}회
              </span>
            )}
          </div>

          {/* 현재 드라이버 */}
          <div className="mt-8">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">2026 드라이버</p>
            <div className="flex gap-4 flex-wrap">
              {teamDrivers.map((d) => (
                <div
                  key={d.id}
                  className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3"
                >
                  <span
                    className="text-2xl font-black"
                    style={{ color: team.color }}
                  >
                    #{d.number}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{d.name}</p>
                    <p className="text-xs text-gray-400">{d.nationality}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 팀 역사 */}
      <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-8">
        <h2 className="text-xl font-black text-gray-900 mb-6">팀 역사</h2>
        <div className="space-y-5">
          {team.history.map((paragraph, i) => (
            <div key={i} className="flex gap-4">
              <div
                className="mt-1.5 w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: team.color }}
              />
              <p className="text-gray-700 leading-relaxed text-sm">{paragraph}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
