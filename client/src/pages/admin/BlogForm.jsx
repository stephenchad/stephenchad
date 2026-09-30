import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import api from "../../api/axios.js";
import Spinner from "../../components/ui/Spinner.jsx";

const empty = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImage: "",
  tags: "",
  status: "draft",
  readTime: 0,
};

// Very rough estimate: ~200 words per minute
const estimateReadTime = (text) => {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
};

export default function BlogForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    api
      .get("/blogs/admin/all")
      .then(({ data }) => {
        const p = data.find((x) => x._id === id);
        if (!p) {
          setError("Post not found");
          return;
        }
        setForm({
          ...p,
          tags: p.tags?.join(", ") || "",
        });
      })
      .catch(() => setError("Failed to load post"))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...form,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      readTime: Number(form.readTime) || estimateReadTime(form.content),
    };

    try {
      if (isEdit) {
        await api.put(`/blogs/${id}`, payload);
      } else {
        await api.post("/blogs", payload);
      }
      navigate("/admin/blog");
    } catch (err) {
      setError(err.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const wordCount = useMemo(
    () => form.content.trim().split(/\s+/).filter(Boolean).length,
    [form.content]
  );

  if (loading) return <Spinner label="Loading post..." />;

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent";
  const labelClass = "block text-sm font-medium text-slate-700 mb-1.5";

  return (
    <div>
      <div className="mb-6">
        <Link
          to="/admin/blog"
          className="text-sm text-slate-500 hover:text-brand-600"
        >
          ← Back to posts
        </Link>
        <div className="mt-3 flex items-center justify-between gap-4 flex-wrap">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            {isEdit ? "Edit post" : "New post"}
          </h1>
          <button
            type="button"
            onClick={() => setPreview((v) => !v)}
            className="px-4 py-2 rounded-lg border border-slate-300 text-sm font-medium hover:bg-slate-50"
          >
            {preview ? "Edit" : "Preview"}
          </button>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-5">
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
              <label className={labelClass}>Slug (auto if blank)</label>
              <input
                name="slug"
                value={form.slug}
                onChange={onChange}
                placeholder="my-post"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Excerpt *</label>
            <textarea
              required
              name="excerpt"
              rows={2}
              maxLength={300}
              value={form.excerpt}
              onChange={onChange}
              className={`${inputClass} resize-y`}
            />
            <p className="text-xs text-slate-400 mt-1">
              {form.excerpt.length}/300 characters
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <div>
              <label className={labelClass}>Cover image URL</label>
              <input
                name="coverImage"
                value={form.coverImage}
                onChange={onChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Tags (comma-separated)</label>
              <input
                name="tags"
                value={form.tags}
                onChange={onChange}
                placeholder="react, node, tips"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Read time (minutes)</label>
              <input
                type="number"
                name="readTime"
                value={form.readTime}
                onChange={onChange}
                placeholder="auto"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Status</label>
            <div className="flex gap-2">
              {["draft", "published"].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, status: s }))}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                    form.status === s
                      ? "bg-brand-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2.5 text-xs text-slate-500">
            <span>{preview ? "Preview (markdown rendered)" : "Content (markdown)"}</span>
            <span>{wordCount} words</span>
          </div>

          {preview ? (
            <div className="prose prose-slate max-w-none p-6 md:p-8">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {form.content || "_Nothing to preview yet..._"}
              </ReactMarkdown>
            </div>
          ) : (
            <textarea
              name="content"
              rows={20}
              value={form.content}
              onChange={onChange}
              placeholder={"## Heading\n\nWrite your post in **markdown**..."}
              className="w-full p-6 font-mono text-sm focus:outline-none resize-y"
            />
          )}
        </div>

        {error && (
          <div className="text-sm px-4 py-3 rounded-xl bg-red-50 text-red-700 border border-red-200">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 disabled:opacity-60 transition-colors"
          >
            {saving
              ? "Saving..."
              : isEdit
              ? "Save changes"
              : form.status === "published"
              ? "Publish post"
              : "Save draft"}
          </button>
          <Link
            to="/admin/blog"
            className="px-6 py-3 rounded-xl border border-slate-300 font-semibold hover:bg-slate-50 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}