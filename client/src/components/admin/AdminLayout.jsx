import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const links = [
  { to: "/admin", label: "Dashboard", end: true, icon: "📊" },
  { to: "/admin/projects", label: "Projects", icon: "🗂️" },
  { to: "/admin/blog", label: "Blog", icon: "✍️" },
  { to: "/admin/messages", label: "Messages", icon: "📬" },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
      isActive
        ? "bg-brand-600 text-white"
        : "text-slate-700 hover:bg-slate-100"
    }`;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-[240px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="space-y-2">
          <div className="px-4 py-3 mb-2 rounded-xl bg-slate-900 text-white">
            <p className="text-xs uppercase tracking-wider opacity-60">
              Signed in as
            </p>
            <p className="font-semibold truncate">{user?.name}</p>
            <p className="text-xs opacity-70 truncate">{user?.email}</p>
          </div>

          <nav className="space-y-1">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
                <span>{l.icon}</span>
                <span>{l.label}</span>
              </NavLink>
            ))}
          </nav>

          <button
            onClick={handleLogout}
            className="w-full mt-4 flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </aside>

        {/* Content */}
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}