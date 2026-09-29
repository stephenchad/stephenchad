import useFetch from "../hooks/useFetch.js";
import SectionHeading from "../components/ui/SectionHeading.jsx";
import BlogCard from "../components/ui/BlogCard.jsx";
import Spinner from "../components/ui/Spinner.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";

export default function Blog() {
  const { data: posts, loading, error } = useFetch("/blogs");

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <SectionHeading
        eyebrow="Writing"
        title="Blog"
        subtitle="Notes on engineering, architecture, and building things that last."
      />

      {loading ? (
        <Spinner label="Loading posts..." />
      ) : error ? (
        <p className="text-red-600">Error: {error}</p>
      ) : posts?.length === 0 ? (
        <EmptyState
          title="No posts published yet"
          description="Once you publish a post from the admin panel, it'll show up here."
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <BlogCard key={p._id} post={p} />
          ))}
        </div>
      )}
    </section>
  );
}