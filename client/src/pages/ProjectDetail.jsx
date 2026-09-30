import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch.js";
import Spinner from "../components/ui/Spinner.jsx";

import { Helmet } from "react-helmet-async";

export default function ProjectDetail() {
  const { slug } = useParams();
  const { data: project, loading, error } = useFetch(`/projects/slug/${slug}`, [
    slug,
  ]);

  if (loading) return <Spinner label="Loading project..." />;

  if (error || !project)
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-slate-900">Project not found</h1>
        <Link
          to="/projects"
          className="inline-block mt-6 text-brand-600 hover:underline"
        >
          ← Back to all projects
        </Link>
      </div>
    );
    <Helmet>
      <title>Stephen Chad Ethan — Full-Stack Engineer</title>
        <meta
          name="description"
          content="project?.description"
        />
    </Helmet>

  return (
    <article className="max-w-4xl mx-auto px-4 py-16">
      <Link
        to="/projects"
        className="text-sm text-slate-500 hover:text-brand-600"
      >
        ← All projects
      </Link>

      <header className="mt-6 mb-8">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
          {project.title}
        </h1>
        <p className="text-lg text-slate-600">{project.description}</p>

        <div className="flex flex-wrap gap-2 mt-6">
          {project.techStack?.map((t) => (
            <span
              key={t}
              className="px-3 py-1 text-sm rounded-lg bg-brand-50 text-brand-700 font-medium"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mt-6">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors"
            >
              Live site ↗
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl border border-slate-300 font-semibold hover:bg-slate-50 transition-colors"
            >
              Source code
            </a>
          )}
        </div>
      </header>

      {project.imageUrl && (
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full rounded-2xl border border-slate-200 mb-10"
        />
      )}

      {project.longDescription && (
        <div className="prose prose-slate max-w-none whitespace-pre-wrap text-slate-700 leading-relaxed">
          {project.longDescription}
        </div>
      )}
    </article>
  );
}