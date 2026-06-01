"use client";

import { useState } from "react";
import { races } from "@/lib/races";

type Filter = "전체" | "completed" | "upcoming";

export default function RaceTable() {
  const [filter, setFilter] = useState<Filter>("전체");
  const filtered = filter === "전체" ? races : races.filter((r) => r.status === filter);

  return (
    <div>
      <div className="flex gap-2 mb-8">
        {(["전체", "completed", "upcoming"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              filter === f
                ? "bg-[#1a1a1a] text-white"
                : "border border-gray-300 text-gray-600 hover:bg-gray-100"
            }`}
          >
            {f === "전체" ? "전체" : f === "completed" ? "완료" : "예정"}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs text-gray-500 uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3">Round</th>
              <th className="px-4 py-3">Grand Prix</th>
              <th className="hidden px-4 py-3 sm:table-cell">Circuit</th>
              <th className="hidden px-4 py-3 md:table-cell">Country</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((race) => (
              <tr key={race.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3 font-medium text-gray-500">{race.round}</td>
                <td className="px-4 py-3 font-semibold text-gray-900">{race.name}</td>
                <td className="hidden px-4 py-3 text-gray-600 sm:table-cell">{race.circuit}</td>
                <td className="hidden px-4 py-3 text-gray-600 md:table-cell">{race.country}</td>
                <td className="px-4 py-3 text-gray-600">
                  {new Date(race.date).toLocaleDateString("ko-KR")}
                </td>
                <td className="px-4 py-3">
                  {race.status === "completed" ? (
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">완료</span>
                  ) : (
                    <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">예정</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
