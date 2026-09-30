import { useState } from "react";
import api from "../api/axios.js";
import SectionHeading from "../components/ui/SectionHeading.jsx";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", text: "" });
  const [sending, setSending] = useState(false);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus({ type: "", text: "" });

    try {
      await api.post("/contact", form);
      setStatus({
        type: "success",
        text: "Thanks! Your message is on its way — I'll get back to you soon.",
      });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus({
        type: "error",
        text: err.response?.data?.message || "Something went wrong.",
      });
    } finally {
      setSending(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-shadow";

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <SectionHeading
        eyebrow="Contact"
        title="Let's talk"
        subtitle="Have a project, role, or just want to say hi? Drop a message below."
      />

      <div className="grid md:grid-cols-3 gap-8">
        {/* Sidebar */}
        <aside className="md:col-span-1 space-y-6">
          <div className="rounded-2xl border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Reach me</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:stephen@stephenchad.dev"
                  className="text-slate-600 hover:text-brand-600"
                >
                  📧 stephen@stephenchad.dev
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/stephenchad"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-600 hover:text-brand-600"
                >
                  🐙 github.com/stephenchad
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/stephenchad"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-600 hover:text-brand-600"
                >
                  💼 linkedin.com/in/stephenchad
                </a>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl bg-brand-50 border border-brand-100 p-6 text-sm text-brand-900">
            <p className="font-semibold mb-2">Response time</p>
            <p className="text-brand-800/80">
              I usually reply within 24–48 hours. For urgent things, use email
              directly.
            </p>
          </div>
        </aside>

        {/* Form */}
        <form
          onSubmit={onSubmit}
          className="md:col-span-2 rounded-2xl border border-slate-200 p-6 md:p-8 space-y-5"
        >
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Name *
              </label>
              <input
                required
                name="name"
                value={form.name}
                onChange={onChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Email *
              </label>
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Subject
            </label>
            <input
              name="subject"
              value={form.subject}
              onChange={onChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Message *
            </label>
            <textarea
              required
              name="message"
              rows={6}
              value={form.message}
              onChange={onChange}
              className={`${inputClass} resize-y`}
            />
          </div>

          {status.text && (
            <div
              className={`text-sm px-4 py-3 rounded-xl ${
                status.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {status.text}
            </div>
          )}

          <button
            type="submit"
            disabled={sending}
            className="w-full md:w-auto px-7 py-3.5 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {sending ? "Sending..." : "Send message"}
          </button>
        </form>
      </div>
    </section>
  );
}