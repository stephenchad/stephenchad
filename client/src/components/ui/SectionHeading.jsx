export default function SectionHeading({ eyebrow, title, subtitle, center }) {
  return (
    <div className={`mb-10 ${center ? "text-center" : ""}`}>
      {eyebrow && (
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-600 mt-3 max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}