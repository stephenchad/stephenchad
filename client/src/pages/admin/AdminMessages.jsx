import { useEffect, useState } from "react";
import api from "../../api/axios.js";
import Spinner from "../../components/ui/Spinner.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";
import ConfirmDialog from "../../components/admin/ConfirmDialog.jsx";

const formatDate = (d) =>
  d
    ? new Date(d).toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all"); // all | unread
  const [toDelete, setToDelete] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const url = filter === "unread" ? "/contact?unread=true" : "/contact";
      const { data } = await api.get(url);
      setMessages(data);
      if (data.length && !selected) setSelected(data[0]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const markRead = async (msg) => {
    if (msg.isRead) return;
    try {
      await api.patch(`/contact/${msg._id}/read`);
      setMessages((ms) =>
        ms.map((m) => (m._id === msg._id ? { ...m, isRead: true } : m))
      );
      if (selected?._id === msg._id) {
        setSelected({ ...selected, isRead: true });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onSelect = (msg) => {
    setSelected(msg);
    markRead(msg);
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    setBusy(true);
    try {
      await api.delete(`/contact/${toDelete._id}`);
      setMessages((ms) => ms.filter((m) => m._id !== toDelete._id));
      if (selected?._id === toDelete._id) {
        setSelected(null);
      }
      setToDelete(null);
    } finally {
      setBusy(false);
    }
  };

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            Messages
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {messages.length} total · {unreadCount} unread
          </p>
        </div>
        <div className="flex gap-2">
          {["all", "unread"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                filter === f
                  ? "bg-brand-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : messages.length === 0 ? (
        <EmptyState
          title="Inbox empty"
          description={
            filter === "unread"
              ? "No unread messages. Nice!"
              : "No messages yet."
          }
        />
      ) : (
        <div className="grid md:grid-cols-[340px_1fr] gap-6">
          {/* List */}
          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden max-h-[70vh] overflow-y-auto">
            {messages.map((m) => {
              const isActive = selected?._id === m._id;
              return (
                <button
                  key={m._id}
                  onClick={() => onSelect(m)}
                  className={`w-full text-left px-4 py-3 border-b border-slate-100 last:border-b-0 transition-colors ${
                    isActive ? "bg-brand-50" : "hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`font-medium truncate ${
                        m.isRead ? "text-slate-700" : "text-slate-900"
                      }`}
                    >
                      {m.name}
                    </span>
                    {!m.isRead && (
                      <span className="w-2 h-2 rounded-full bg-brand-600 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-slate-500 truncate mt-0.5">
                    {m.subject || "(no subject)"}
                  </p>
                  <p className="text-xs text-slate-400 truncate mt-1">
                    {m.message.slice(0, 60)}
                    {m.message.length > 60 ? "…" : ""}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1.5">
                    {formatDate(m.createdAt)}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Detail */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            {selected ? (
              <>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">
                      {selected.subject || "(no subject)"}
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                      From <span className="font-medium text-slate-700">{selected.name}</span> ·{" "}
                      <a
                        href={`mailto:${selected.email}`}
                        className="text-brand-600 hover:underline"
                      >
                        {selected.email}
                      </a>
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      {formatDate(selected.createdAt)}
                    </p>
                  </div>
                  <button
                    onClick={() => setToDelete(selected)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>

                <hr className="my-5 border-slate-100" />

                <p className="whitespace-pre-wrap text-slate-700 leading-relaxed">
                  {selected.message}
                </p>

                <div className="mt-6 pt-5 border-t border-slate-100">
                  <a
                    href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(
                      selected.subject || "Your message"
                    )}`}
                    className="inline-block px-5 py-2.5 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors text-sm"
                  >
                    Reply via email
                  </a>
                </div>
              </>
            ) : (
              <p className="text-slate-400 text-center py-20">
                Select a message to read.
              </p>
            )}
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!toDelete}
        title="Delete message?"
        message="This message will be permanently removed."
        onCancel={() => setToDelete(null)}
        onConfirm={confirmDelete}
        busy={busy}
      />
    </div>
  );
}