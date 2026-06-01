import DriverFilter from "@/components/DriverFilter";

export default function DriversPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-[#111111]">Drivers</h1>
        <p className="mt-2 text-gray-500 text-sm">2025 시즌 F1 드라이버 20명</p>
      </div>
      <DriverFilter />
    </div>
  );
}
