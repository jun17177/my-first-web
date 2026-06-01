"use client";

import { useState } from "react";
import { drivers } from "@/lib/drivers";
import { teams } from "@/lib/teams";
import DriverCard from "./DriverCard";

export default function DriverFilter() {
  const [selected, setSelected] = useState("전체");
  const teamNames = ["전체", ...teams.map((t) => t.name)];
  const filtered = selected === "전체" ? drivers : drivers.filter((d) => d.team === selected);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        {teamNames.map((t) => (
          <button
            key={t}
            onClick={() => setSelected(t)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              selected === t
                ? "bg-[#1a1a1a] text-white"
                : "border border-gray-300 text-gray-600 hover:bg-gray-100"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((driver) => (
          <DriverCard key={driver.id} driver={driver} />
        ))}
      </div>
    </div>
  );
}
