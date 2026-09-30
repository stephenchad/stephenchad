import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios.js";
import Spinner from "../../components/ui/Spinner.jsx";

const empty = {
  title: "",
  slug: "",
  description: "",
  longDescription: "",
  techStack: "",
  imageUrl: "",
  liveUrl: "",
  repoUrl: "",
  featured: false,
  status: "completed",
  order: 0,
};

export default function ProjectForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEdit) return;
    api
      .get("/projects")
      .then(({ data }) => {
        const p = data.find((x) => x._id === id);
        if (!p) {
          setError("Project not found");
          return;
        }
        setForm({
          ...p,
          techStack: p.techStack?.join(", ") || "",
        });
      })
      .catch(() => setError("Failed to load project"))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...form,
      techStack: form.techStack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      order: Number(form.order) || 0,
    };

    try {
      if (isEdit) {
        await api.put(`/projects/${id}`, payload);
      } else {
        await api.post("/projects", payload);
      }
      navigate("/admin/projects");
    } catch (err) {
      setError(err.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Spinner label="Loading project..." />;

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent";

  const labelClass = "block text-sm font-medium text-slate-700 mb-1.5";

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <Link
          to="/admin/projects"
          className="text-sm text-slate-500 hover:text-brand-600"
        >
          ← Back to projects
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mt-3">
          {isEdit ? "Edit project" : "New project"}
        </h1>
      </div>

      <form
        onSubmit={onSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 space-y-5"
      >
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Title *</label>
            <input
              required
              name="title"
              value={form.title}
              onChange={onChange}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Slug (leave blank to auto)</label>
            <input
              name="slug"
              value={form.slug}
              onChange={onChange}
              placeholder="my-project"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Short description *</label>
          <textarea
            required
            name="description"
            rows={2}
            value={form.description}
            onChange={onChange}
            className={`${inputClass} resize-y`}
          />
        </div>

        <div>
          <label className={labelClass}>Long description</label>
          <textarea
            name="longDescription"
            rows={5}
            value={form.longDescription}
            onChange={onChange}
            className={`${inputClass} resize-y`}
          />
        </div>

        <div>
          <label className={labelClass}>
            Tech stack (comma-separated)
          </label>
          <input
            name="techStack"
            value={form.techStack}
            onChange={onChange}
            placeholder="React, Node.js, MongoDB"
            className={inputClass}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Image URL</label>
            <input
              name="imageUrl"
              value={form.imageUrl}
              onChange={onChange}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Live URL</label>
            <input
              name="liveUrl"
              value={form.liveUrl}
              onChange={onChange}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          <div>
            <label className={labelClass}>Repo URL</label>
            <input
              name="repoUrl"
              value={form.repoUrl}
              onChange={onChange}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Status</label>
            <select
              name="status"
              value={form.status}
              onChange={onChange}
              className={inputClass}
            >
              <option value="completed">Completed</option>
              <option value="in-progress">In progress</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Order</label>
            <input
              type="number"
              name="order"
              value={form.order}
              onChange={onChange}
              className={inputClass}
            />
          </div>
        </div>

        <label className="flex items-center gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            name="featured"
            checked={form.featured}
            onChange={onChange}
            className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
          />
          <span className="text-sm text-slate-700">
            Feature this project on the home page
          </span>
        </label>

        {error && (
          <div className="text-sm px-4 py-3 rounded-xl bg-red-50 text-red-700 border border-red-200">
            {error}
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 disabled:opacity-60 transition-colors"
          >
            {saving ? "Saving..." : isEdit ? "Save changes" : "Create project"}
          </button>
          <Link
            to="/admin/projects"
            className="px-6 py-3 rounded-xl border border-slate-300 font-semibold hover:bg-slate-50 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}