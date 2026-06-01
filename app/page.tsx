import Link from "next/link";
import { drivers } from "@/lib/drivers";
import { teams } from "@/lib/teams";
import { races } from "@/lib/races";
import DriverCard from "@/components/DriverCard";

const highlights = drivers.filter((d) =>
  ["Max Verstappen", "Lando Norris", "Charles Leclerc", "Lewis Hamilton", "Oscar Piastri", "George Russell"].includes(d.name)
);

const upcoming = races.filter((r) => r.status === "upcoming").slice(0, 3);

export default function Home() {
  return (
    <div className="space-y-16">
      {/* 히어로 */}
      <section className="rounded-2xl bg-[#1a1a1a] px-8 py-16 text-white text-center">
        <p className="text-red-500 font-semibold text-sm tracking-widest uppercase mb-3">2026 Season</p>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
          Formula 1<br />Fan Page
        </h1>
        <p className="text-gray-400 max-w-md mx-auto mb-8 text-sm leading-relaxed">
          2026 F1 시즌의 드라이버·팀·레이스 일정을 한눈에. 경기 의견도 남겨보세요.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/drivers" className="rounded-full bg-red-600 px-6 py-2.5 text-sm font-semibold hover:bg-red-700 transition">
            드라이버 보기
          </Link>
          <Link href="/calendar" className="rounded-full border border-gray-600 px-6 py-2.5 text-sm font-semibold text-gray-300 hover:bg-white/10 transition">
            레이스 일정
          </Link>
        </div>
      </section>

      {/* 시즌 통계 */}
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "드라이버", value: `${drivers.length}명` },
          { label: "팀", value: `${teams.length}개` },
          { label: "레이스", value: `${races.length}전` },
          { label: "완료", value: `${races.filter((r) => r.status === "completed").length}전` },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-xl bg-white border border-gray-200 p-6 text-center shadow-sm">
            <p className="text-3xl font-black text-[#1a1a1a]">{value}</p>
            <p className="mt-1 text-sm text-gray-500">{label}</p>
          </div>
        ))}
      </section>

      {/* 드라이버 하이라이트 */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-[#111111]">주목할 드라이버</h2>
          <Link href="/drivers" className="text-sm text-gray-500 hover:text-gray-900 transition">
            전체 보기 →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {highlights.map((driver) => (
            <DriverCard key={driver.id} driver={driver} />
          ))}
        </div>
      </section>

      {/* 다음 레이스 */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-[#111111]">다음 레이스</h2>
          <Link href="/calendar" className="text-sm text-gray-500 hover:text-gray-900 transition">
            전체 일정 →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {upcoming.map((race) => (
            <div key={race.id} className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
              <p className="text-xs font-semibold text-orange-600 bg-orange-50 rounded-full px-2 py-0.5 inline-block mb-3">Round {race.round}</p>
              <h3 className="font-bold text-gray-900 leading-tight">{race.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{race.circuit}</p>
              <p className="mt-3 text-xs text-gray-400">
                {new Date(race.date).toLocaleDateString("ko-KR", { month: "long", day: "numeric" })}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 의견 남기기 CTA */}
      <section className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-2">경기 의견을 남겨보세요</h2>
        <p className="text-gray-500 text-sm mb-6">드라이버와 레이스에 대한 생각을 기록하세요.</p>
        <Link
          href="/reviews"
          className="rounded-full bg-[#1a1a1a] px-6 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 transition"
        >
          의견 작성하기
        </Link>
      </section>
    </div>
  );
}
