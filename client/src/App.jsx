import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Projects from "./pages/Projects.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import Blog from "./pages/Blog.jsx";
import BlogPost from "./pages/BlogPost.jsx";
import Contact from "./pages/Contact.jsx";

import AdminLayout from "./components/admin/AdminLayout.jsx";
import ProtectedRoute from "./components/admin/ProtectedRoute.jsx";
import Login from "./pages/admin/Login.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import AdminProjects from "./pages/admin/AdminProjects.jsx";
import ProjectForm from "./pages/admin/ProjectForm.jsx";
import AdminBlog from "./pages/admin/AdminBlog.jsx";
import BlogForm from "./pages/admin/BlogForm.jsx";
import AdminMessages from "./pages/admin/AdminMessages.jsx";
import NotFound from "./pages/NotFound.jsx";

import ScrollToTop from "./components/layout/ScrollToTop.jsx";



export default function App() {
  return (
    <BrowserRouter>
     <ScrollToTop />
      <Routes>
        {/* Public site */}
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:slug" element={<ProjectDetail />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin login (public) */}
        <Route path="/admin/login" element={<Login />} />

        {/* Admin (protected) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Layout>
                <AdminLayout />
              </Layout>
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="projects/new" element={<ProjectForm />} />
          <Route path="projects/:id/edit" element={<ProjectForm />} />
          <Route path="blog" element={<AdminBlog />} />
          <Route path="blog/new" element={<BlogForm />} />
          <Route path="blog/:id/edit" element={<BlogForm />} />
          <Route path="messages" element={<AdminMessages />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}