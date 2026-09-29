import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Projects from "./pages/Projects.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import Blog from "./pages/Blog.jsx";
import BlogPost from "./pages/BlogPost.jsx";
import Contact from "./pages/Contact.jsx";

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
          <Route path="about" element={<About />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:slug" element={<ProjectDetail />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="contact" element={<Contact />} />
          <Route path="admin/*" element={<Placeholder title="Admin" />} />
          <Route path="*" element={<Placeholder title="404 — Not Found" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}