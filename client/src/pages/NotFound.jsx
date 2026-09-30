import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 — Page Not Found | Stephen Chad Ethan</title>
      </Helmet>

      <section className="max-w-3xl mx-auto px-4 py-24 text-center">
        <p className="text-sm font-semibold text-brand-600 tracking-wider uppercase mb-4">
          Error 404
        </p>
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-4">
          Lost in <span className="bg-gradient-to-r from-brand-600 to-indigo-500 bg-clip-text text-transparent">space</span>
        </h1>
        <p className="text-lg text-slate-600 mb-8 max-w-lg mx-auto">
          The page you're looking for doesn't exist, was moved, or is taking a
          day off.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            to="/"
            className="px-6 py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors"
          >
            Back home
          </Link>
          <Link
            to="/projects"
            className="px-6 py-3 rounded-xl border border-slate-300 font-semibold hover:bg-slate-50 transition-colors"
          >
            See my work
          </Link>
        </div>
      </section>
    </>
  );
}