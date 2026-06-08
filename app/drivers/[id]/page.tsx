import { notFound } from "next/navigation";
import Link from "next/link";
import { drivers } from "@/lib/drivers";
import { teams } from "@/lib/teams";

export function generateStaticParams() {
  return drivers.map((d) => ({ id: String(d.id) }));
}

export default async function DriverDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const driver = drivers.find((d) => d.id === Number(id));
  if (!driver) notFound();

  const team = teams.find((t) => t.name === driver.team);

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/drivers"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition mb-8"
      >
        ← 드라이버 목록
      </Link>

      {/* 드라이버 헤더 */}
      <div className="rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden mb-8">
        <div className="h-2" style={{ backgroundColor: driver.teamColor }} />
        <div className="p-8">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <span className="text-6xl font-black" style={{ color: driver.teamColor }}>
                #{driver.number}
              </span>
              <h1 className="mt-2 text-3xl font-black text-gray-900">{driver.name}</h1>
              <div className="mt-2 flex items-center gap-3 flex-wrap">
                <span className="text-sm font-semibold bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
                  {driver.nationality}
                </span>
                {team ? (
                  <Link
                    href={`/teams/${team.id}`}
                    className="text-sm font-semibold px-3 py-1 rounded-full transition hover:opacity-80"
                    style={{ backgroundColor: driver.teamColor + "20", color: driver.teamColor }}
                  >
                    {driver.team}
                  </Link>
                ) : (
                  <span
                    className="text-sm font-semibold px-3 py-1 rounded-full"
                    style={{ backgroundColor: driver.teamColor + "20", color: driver.teamColor }}
                  >
                    {driver.team}
                  </span>
                )}
              </div>
            </div>
            {driver.championships > 0 && (
              <span className="text-sm font-bold text-yellow-700 bg-yellow-50 border border-yellow-200 px-4 py-2 rounded-full shrink-0">
                🏆 월드 챔피언 {driver.championships}회
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 드라이버 소개 */}
      <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-8">
        <h2 className="text-xl font-black text-gray-900 mb-6">드라이버 소개</h2>
        <div className="space-y-5">
          {driver.bio.map((paragraph, i) => (
            <div key={i} className="flex gap-4">
              <div
                className="mt-1.5 w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: driver.teamColor }}
              />
              <p className="text-gray-700 leading-relaxed text-sm">{paragraph}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
