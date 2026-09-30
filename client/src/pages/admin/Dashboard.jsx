import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios.js";
import StatCard from "../../components/admin/StatCard.jsx";
import Spinner from "../../components/ui/Spinner.jsx";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [projects, blogs, contacts] = await Promise.all([
          api.get("/projects"),
          api.get("/blogs/admin/all"),
          api.get("/contact"),
        ]);

        const unread = contacts.data.filter((c) => !c.isRead).length;
        const drafts = blogs.data.filter((b) => b.status === "draft").length;
        const published = blogs.data.filter((b) => b.status === "published").length;

        setStats({
          projects: projects.data.length,
          blogs: blogs.data.length,
          drafts,
          published,
          messages: contacts.data.length,
          unread,
        });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <Spinner label="Loading dashboard..." />;

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
        Dashboard
      </h1>
      <p className="text-slate-500 mb-8">
        An overview of your portfolio activity.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Projects"
          value={stats.projects}
          hint="All projects in the portfolio"
          accent="brand"
        />
        <StatCard
          label="Blog posts"
          value={stats.blogs}
          hint={`${stats.published} published · ${stats.drafts} drafts`}
          accent="green"
        />
        <StatCard
          label="Messages"
          value={stats.messages}
          hint={`${stats.unread} unread`}
          accent="amber"
        />
        <StatCard
          label="Unread"
          value={stats.unread}
          hint="Awaiting your reply"
          accent="slate"
        />
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <Link
          to="/admin/projects"
          className="rounded-2xl border border-slate-200 p-6 hover:border-brand-300 hover:shadow-md transition-all"
        >
          <h3 className="font-semibold text-slate-900">Manage projects →</h3>
          <p className="text-sm text-slate-500 mt-1">
            Add, edit, or remove portfolio projects.
          </p>
        </Link>
        <Link
          to="/admin/blog"
          className="rounded-2xl border border-slate-200 p-6 hover:border-brand-300 hover:shadow-md transition-all"
        >
          <h3 className="font-semibold text-slate-900">Write a post →</h3>
          <p className="text-sm text-slate-500 mt-1">
            Draft, edit, and publish blog posts.
          </p>
        </Link>
        <Link
          to="/admin/messages"
          className="rounded-2xl border border-slate-200 p-6 hover:border-brand-300 hover:shadow-md transition-all"
        >
          <h3 className="font-semibold text-slate-900">Read messages →</h3>
          <p className="text-sm text-slate-500 mt-1">
            {stats.unread} unread message{stats.unread === 1 ? "" : "s"} waiting.
          </p>
        </Link>
      </div>
    </div>
  );
}