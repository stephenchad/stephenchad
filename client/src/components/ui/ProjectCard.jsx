import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <article className="group rounded-2xl border border-slate-200 overflow-hidden bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
      <div className="aspect-video bg-gradient-to-br from-brand-50 to-indigo-100 overflow-hidden">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full grid place-items-center text-brand-600 font-bold text-2xl">
            {project.title.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-slate-900 group-hover:text-brand-600 transition-colors">
            {project.title}
          </h3>
          {project.featured && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-700">
              Featured
            </span>
          )}
        </div>
        <p className="text-sm text-slate-600 mt-2 line-clamp-2">
          {project.description}
        </p>

        {project.techStack?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.techStack.slice(0, 4).map((t) => (
              <span
                key={t}
                className="text-xs px-2 py-1 rounded-md bg-slate-100 text-slate-700"
              >
                {t}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="text-xs px-2 py-1 rounded-md bg-slate-100 text-slate-500">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>
        )}

        <div className="mt-5 flex items-center gap-3 text-sm">
          <Link
            to={`/projects/${project.slug}`}
            className="font-semibold text-brand-600 hover:text-brand-700"
          >
            Details →
          </Link>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="text-slate-500 hover:text-slate-700"
            >
              Live
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="text-slate-500 hover:text-slate-700"
            >
              Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
}