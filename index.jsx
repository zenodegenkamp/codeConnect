import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Projects from "./pages/Projects/Projects"
import ProjectDetail from "./pages/Projects/ProjectDetail"
import Login from "./pages/Login"
import Dashboard from "./pages/Host/Dashboard"
import Income from "./pages/Host/Income"
import Reviews from "./pages/Host/Reviews"
import HostProjects from "./pages/Host/HostProjects"
import HostProjectDetail from "./pages/Host/HostProjectDetail"
import HostVanInfo from "./pages/Host/HostProjectInfo"
import HostProjectPricing from "./pages/Host/HostProjectPricing"
import HostProjectPhotos from "./pages/Host/HostProjectPhotos"
import NotFound from "./pages/NotFound"
import Layout from "./components/Layout"
import HostLayout from "./components/HostLayout"
import AuthRequired from "./components/AuthRequired"

function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:id" element={<ProjectDetail />} />
          <Route
            path="login"
            element={<Login />}
          />

          <Route element={<AuthRequired />}>
            <Route path="host" element={<HostLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="income" element={<Income />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="projects" element={<HostProjects />} />
              <Route path="projects/:id" element={<HostProjectDetail />}>
                <Route index element={<HostVanInfo />} />
                <Route path="pricing" element={<HostProjectPricing />} />
                <Route path="photos" element={<HostProjectPhotos />} />
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<App />);