import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios.js";
import Spinner from "../../components/ui/Spinner.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";
import ConfirmDialog from "../../components/admin/ConfirmDialog.jsx";

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toDelete, setToDelete] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/projects");
      setProjects(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const confirmDelete = async () => {
    if (!toDelete) return;
    setBusy(true);
    try {
      await api.delete(`/projects/${toDelete._id}`);
      setProjects((ps) => ps.filter((p) => p._id !== toDelete._id));
      setToDelete(null);
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            Projects
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage your portfolio projects.
          </p>
        </div>
        <Link
          to="/admin/projects/new"
          className="px-5 py-2.5 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors text-sm"
        >
          + New project
        </Link>
      </div>

      {loading ? (
        <Spinner />
      ) : projects.length === 0 ? (
        <EmptyState
          title="No projects yet"
          description="Create your first project to get started."
          action={
            <Link
              to="/admin/projects/new"
              className="inline-block px-5 py-2.5 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 text-sm"
            >
              Create project
            </Link>
          }
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 uppercase text-xs tracking-wider">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">Title</th>
                <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">
                  Tech
                </th>
                <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">
                  Status
                </th>
                <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">
                  Featured
                </th>
                <th className="text-right px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projects.map((p) => (
                <tr key={p._id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-900">{p.title}</p>
                    <p className="text-xs text-slate-400">{p.slug}</p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {p.techStack?.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600"
                        >
                          {t}
                        </span>
                      ))}
                      {p.techStack?.length > 3 && (
                        <span className="text-xs text-slate-400">
                          +{p.techStack.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell capitalize text-slate-600">
                    {p.status}
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    {p.featured ? (
                      <span className="text-amber-600 font-semibold">★ Yes</span>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap">
                    <Link
                      to={`/projects/${p.slug}`}
                      className="text-slate-500 hover:text-slate-900 text-xs"
                    >
                      View
                    </Link>
                    <Link
                      to={`/admin/projects/${p._id}/edit`}
                      className="text-brand-600 hover:text-brand-700 text-xs font-medium"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => setToDelete(p)}
                      className="text-red-600 hover:text-red-700 text-xs font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        open={!!toDelete}
        title="Delete project?"
        message={`"${toDelete?.title}" will be permanently removed. This can't be undone.`}
        onCancel={() => setToDelete(null)}
        onConfirm={confirmDelete}
        busy={busy}
      />
    </div>
  );
}