import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Home from "./pages/Home.jsx";

// Placeholder pages (built in later phases)
const Placeholder = ({ title }) => (
  <div className="max-w-6xl mx-auto px-4 py-20 text-center">
    <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
    <p className="text-slate-600 mt-2">Coming in the next phase.</p>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<Placeholder title="About" />} />
          <Route path="projects" element={<Placeholder title="Projects" />} />
          <Route path="blog" element={<Placeholder title="Blog" />} />
          <Route path="blog/:slug" element={<Placeholder title="Blog Post" />} />
          <Route path="contact" element={<Placeholder title="Contact" />} />
          <Route path="admin/*" element={<Placeholder title="Admin" />} />
          <Route path="*" element={<Placeholder title="404 — Not Found" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}