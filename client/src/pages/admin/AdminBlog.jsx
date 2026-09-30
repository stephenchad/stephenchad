import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios.js";
import Spinner from "../../components/ui/Spinner.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";
import ConfirmDialog from "../../components/admin/ConfirmDialog.jsx";

const formatDate = (d) =>
  d ? new Date(d).toLocaleDateString("en-US", { dateStyle: "medium" }) : "—";

export default function AdminBlog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toDelete, setToDelete] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/blogs/admin/all");
      setPosts(data);
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
      await api.delete(`/blogs/${toDelete._id}`);
      setPosts((ps) => ps.filter((p) => p._id !== toDelete._id));
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
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Blog</h1>
          <p className="text-slate-500 text-sm mt-1">
            Draft, publish, and manage posts.
          </p>
        </div>
        <Link
          to="/admin/blog/new"
          className="px-5 py-2.5 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors text-sm"
        >
          + New post
        </Link>
      </div>

      {loading ? (
        <Spinner />
      ) : posts.length === 0 ? (
        <EmptyState
          title="No posts yet"
          description="Write your first blog post to get started."
          action={
            <Link
              to="/admin/blog/new"
              className="inline-block px-5 py-2.5 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 text-sm"
            >
              Write a post
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
                  Status
                </th>
                <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">
                  Published
                </th>
                <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">
                  Views
                </th>
                <th className="text-right px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {posts.map((p) => (
                <tr key={p._id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-900">{p.title}</p>
                    <p className="text-xs text-slate-400">{p.slug}</p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        p.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-slate-600">
                    {formatDate(p.publishedAt)}
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-slate-600">
                    {p.views}
                  </td>
                  <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap">
                    {p.status === "published" && (
                      <Link
                        to={`/blog/${p.slug}`}
                        className="text-slate-500 hover:text-slate-900 text-xs"
                      >
                        View
                      </Link>
                    )}
                    <Link
                      to={`/admin/blog/${p._id}/edit`}
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
        title="Delete post?"
        message={`"${toDelete?.title}" will be permanently removed.`}
        onCancel={() => setToDelete(null)}
        onConfirm={confirmDelete}
        busy={busy}
      />
    </div>
  );
}