export default function EmptyState({ title, description, action }) {
  return (
    <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-2xl">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      {description && (
        <p className="text-sm text-slate-500 mt-1">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}