import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-20 text-center">
      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 mb-4">
        Available for opportunities
      </span>
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-4">
        Hi, I'm{" "}
        <span className="bg-gradient-to-r from-brand-600 to-indigo-400 bg-clip-text text-transparent">
          Stephen Chad Ethan
        </span>
      </h1>
      <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8">
        Senior Software Engineer (Full-Stack Dev) crafting reliable web
        products end-to-end with React, Node, and MongoDB.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          to="/projects"
          className="px-6 py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors"
        >
          View my work
        </Link>
        <Link
          to="/contact"
          className="px-6 py-3 rounded-xl border border-slate-300 font-semibold hover:bg-slate-50 transition-colors"
        >
          Get in touch
        </Link>
      </div>
    </section>
  );
}