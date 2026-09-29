import { Link } from "react-router-dom";

const formatDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

export default function BlogCard({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block rounded-2xl border border-slate-200 overflow-hidden bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
    >
      <div className="aspect-video bg-gradient-to-br from-indigo-50 to-brand-100 overflow-hidden">
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full grid place-items-center text-brand-600 font-bold text-3xl">
            ✍️
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>{formatDate(post.publishedAt || post.createdAt)}</span>
          {post.readTime > 0 && (
            <>
              <span>•</span>
              <span>{post.readTime} min read</span>
            </>
          )}
        </div>
        <h3 className="font-semibold text-slate-900 mt-2 group-hover:text-brand-600 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-slate-600 mt-2 line-clamp-3">
          {post.excerpt}
        </p>
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {post.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="text-xs px-2 py-1 rounded-md bg-slate-100 text-slate-700"
              >
                #{t}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}