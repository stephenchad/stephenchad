import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useFetch from "../hooks/useFetch.js";
import Spinner from "../components/ui/Spinner.jsx";

const formatDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

export default function BlogPost() {
  const { slug } = useParams();
  const { data: post, loading, error } = useFetch(`/blogs/slug/${slug}`, [
    slug,
  ]);

  if (loading) return <Spinner label="Loading post..." />;

  if (error || !post)
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-slate-900">Post not found</h1>
        <Link
          to="/blog"
          className="inline-block mt-6 text-brand-600 hover:underline"
        >
          ← Back to blog
        </Link>
      </div>
    );

  return (
    <article className="max-w-3xl mx-auto px-4 py-16">
      <Link to="/blog" className="text-sm text-slate-500 hover:text-brand-600">
        ← All posts
      </Link>

      <header className="mt-6 mb-10">
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mb-4">
          <span>{formatDate(post.publishedAt || post.createdAt)}</span>
          {post.readTime > 0 && (
            <>
              <span>•</span>
              <span>{post.readTime} min read</span>
            </>
          )}
          <span>•</span>
          <span>{post.views} views</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
          {post.title}
        </h1>
        <p className="text-lg text-slate-600">{post.excerpt}</p>

        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags.map((t) => (
              <span
                key={t}
                className="px-3 py-1 text-sm rounded-lg bg-slate-100 text-slate-700"
              >
                #{t}
              </span>
            ))}
          </div>
        )}
      </header>

      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full rounded-2xl border border-slate-200 mb-10"
        />
      )}

      <div className="prose prose-slate prose-lg max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}