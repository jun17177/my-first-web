import RaceTable from "@/components/RaceTable";
import { races } from "@/lib/races";

export default function CalendarPage() {
  const completed = races.filter((r) => r.status === "completed").length;
  const upcoming = races.filter((r) => r.status === "upcoming").length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-[#111111]">Calendar</h1>
        <p className="mt-2 text-gray-500 text-sm">
          2025 시즌 전체 {races.length}전 —{" "}
          <span className="text-green-600 font-medium">완료 {completed}전</span>{" "}
          <span className="text-orange-600 font-medium">예정 {upcoming}전</span>
        </p>
      </div>
      <RaceTable />
    </div>
  );
}
