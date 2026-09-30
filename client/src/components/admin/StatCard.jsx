export default function StatCard({ label, value, hint, accent = "brand" }) {
  const accents = {
    brand: "from-brand-500 to-indigo-500",
    green: "from-emerald-500 to-teal-500",
    amber: "from-amber-500 to-orange-500",
    slate: "from-slate-700 to-slate-900",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div
        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${accents[accent]} mb-4`}
      />
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-3xl font-bold text-slate-900 mt-1">{value}</p>
      {hint && <p className="text-xs text-slate-400 mt-1">{hint}</p>}
    </div>
  );
}