import { useMemo, useState } from "react";
import useFetch from "../hooks/useFetch.js";
import SectionHeading from "../components/ui/SectionHeading.jsx";
import ProjectCard from "../components/ui/ProjectCard.jsx";
import Spinner from "../components/ui/Spinner.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";

export default function Projects() {
  const { data: projects, loading, error } = useFetch("/projects");
  const [activeTech, setActiveTech] = useState("All");
  const [search, setSearch] = useState("");

  const allTechs = useMemo(() => {
    if (!projects) return [];
    const set = new Set();
    projects.forEach((p) => p.techStack?.forEach((t) => set.add(t)));
    return ["All", ...Array.from(set).sort()];
  }, [projects]);

  const filtered = useMemo(() => {
    if (!projects) return [];
    return projects.filter((p) => {
      const matchesTech =
        activeTech === "All" || p.techStack?.includes(activeTech);
      const matchesSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      return matchesTech && matchesSearch;
    });
  }, [projects, activeTech, search]);

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <SectionHeading
        eyebrow="Portfolio"
        title="Things I've built"
        subtitle="A growing collection of projects, tools, and experiments."
      />

      {loading ? (
        <Spinner label="Loading projects..." />
      ) : error ? (
        <p className="text-red-600">Error: {error}</p>
      ) : projects?.length === 0 ? (
        <EmptyState
          title="No projects yet"
          description="Add your first project from the admin panel."
        />
      ) : (
        <>
          {/* Filters */}
          <div className="mb-8 space-y-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects..."
              className="w-full md:max-w-sm px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            />
            <div className="flex flex-wrap gap-2">
              {allTechs.map((tech) => (
                <button
                  key={tech}
                  onClick={() => setActiveTech(tech)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    activeTech === tech
                      ? "bg-brand-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              title="No matches"
              description="Try a different filter or search term."
            />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <ProjectCard key={p._id} project={p} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}