import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch.js";
import SectionHeading from "../components/ui/SectionHeading.jsx";
import ProjectCard from "../components/ui/ProjectCard.jsx";
import BlogCard from "../components/ui/BlogCard.jsx";
import Spinner from "../components/ui/Spinner.jsx";

const skills = [
  "React", "Node.js", "Express", "MongoDB", "TypeScript",
  "Tailwind CSS", "Next.js", "PostgreSQL", "Docker", "AWS",
];

export default function Home() {
  const { data: projects, loading: pLoading } = useFetch(
    "/projects?featured=true"
  );
  const { data: blogs, loading: bLoading } = useFetch("/blogs");

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-indigo-50 -z-10" />
        <div className="absolute top-20 -right-20 w-96 h-96 bg-brand-200 rounded-full blur-3xl opacity-30 -z-10" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-30 -z-10" />

        <div className="max-w-6xl mx-auto px-4 py-24 md:py-32 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white border border-brand-200 text-brand-700 mb-5">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Available for opportunities
          </span>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-6">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-brand-600 via-indigo-500 to-brand-600 bg-clip-text text-transparent">
              Stephen Chad Ethan
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-3 font-medium">
            Senior Software Engineer · Full-Stack Developer
          </p>
          <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto mb-10">
            I design and ship reliable, scalable web products end-to-end — from
            pixel-perfect UIs to battle-tested APIs and databases.
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/projects"
              className="px-7 py-3.5 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors shadow-lg shadow-brand-600/20"
            >
              View my work
            </Link>
            <Link
              to="/contact"
              className="px-7 py-3.5 rounded-xl border border-slate-300 bg-white font-semibold hover:bg-slate-50 transition-colors"
            >
              Get in touch
            </Link>
          </div>

          <div className="mt-14 flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {skills.map((s) => (
              <span
                key={s}
                className="px-3 py-1.5 text-sm rounded-lg bg-white border border-slate-200 text-slate-700"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <SectionHeading
          eyebrow="Featured work"
          title="Projects I'm proud of"
          subtitle="A selection of products, tools, and experiments I've built recently."
          center
        />

        {pLoading ? (
          <Spinner label="Loading projects..." />
        ) : projects?.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((p) => (
              <ProjectCard key={p._id} project={p} />
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-500">
            Featured projects will appear here once you add them from the admin panel.
          </p>
        )}

        <div className="text-center mt-10">
          <Link
            to="/projects"
            className="inline-block px-6 py-3 rounded-xl border border-slate-300 font-semibold hover:bg-slate-50 transition-colors"
          >
            See all projects
          </Link>
        </div>
      </section>

      {/* LATEST BLOG */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <SectionHeading
            eyebrow="From the blog"
            title="Latest writing"
            subtitle="Thoughts on engineering, architecture, and building products."
            center
          />

          {bLoading ? (
            <Spinner label="Loading posts..." />
          ) : blogs?.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogs.slice(0, 3).map((b) => (
                <BlogCard key={b._id} post={b} />
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-500">
              Published posts will appear here.
            </p>
          )}

          <div className="text-center mt-10">
            <Link
              to="/blog"
              className="inline-block px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors"
            >
              Read the blog
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Let's build something together
        </h2>
        <p className="text-slate-600 mb-8 max-w-xl mx-auto">
          Have a project, role, or idea in mind? I'm always happy to talk about
          interesting engineering problems.
        </p>
        <Link
          to="/contact"
          className="inline-block px-8 py-4 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors shadow-lg shadow-brand-600/20"
        >
          Start a conversation →
        </Link>
      </section>
    </>
  );
}