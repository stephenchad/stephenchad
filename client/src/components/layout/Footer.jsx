import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-8 rounded-lg bg-brand-600 text-white grid place-items-center font-bold">
              SC
            </span>
            <span className="font-bold text-slate-900">Stephen Chad Ethan</span>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Senior Software Engineer building fast, reliable, and delightful
            full-stack web experiences.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-slate-900 mb-3 text-sm uppercase tracking-wider">
            Explore
          </h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li><Link to="/projects" className="hover:text-brand-600">Projects</Link></li>
            <li><Link to="/blog" className="hover:text-brand-600">Blog</Link></li>
            <li><Link to="/about" className="hover:text-brand-600">About</Link></li>
            <li><Link to="/contact" className="hover:text-brand-600">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-slate-900 mb-3 text-sm uppercase tracking-wider">
            Connect
          </h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>
              <a href="https://github.com/stephenchad" target="_blank" rel="noreferrer" className="hover:text-brand-600">
                GitHub
              </a>
            </li>
            <li>
              <a href="https://linkedin.com/in/stephenchad" target="_blank" rel="noreferrer" className="hover:text-brand-600">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="mailto:stephen@stephenchad.dev" className="hover:text-brand-600">
                Email
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <span>© {year} Stephen Chad Ethan. All rights reserved.</span>
          <span>Built with MERN + Tailwind</span>
        </div>
      </div>
    </footer>
  );
}