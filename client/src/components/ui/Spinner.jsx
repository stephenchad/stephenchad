export default function Spinner({ label = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <div className="w-8 h-8 border-3 border-slate-200 border-t-brand-600 rounded-full animate-spin" />
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  );
}