import { teams } from "@/lib/teams";
import TeamCard from "@/components/TeamCard";

export default function TeamsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-[#111111]">Teams</h1>
        <p className="mt-2 text-gray-500 text-sm">2025 시즌 F1 컨스트럭터 10팀</p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {teams.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </div>
  );
}
