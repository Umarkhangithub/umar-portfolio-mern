// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import LayoutComponents from "./components/Layout/LayoutComponents";
import ProtectedRoute from "./routes/ProtectedRoutes";
import LoaderComponents from "./components/UI/Loader/LoaderComponents";

// Skeleton Loader Component


// Lazy Load Pages
const HomePage = lazy(() => import("./pages/Home/HomePage"));
const AboutPage = lazy(() => import("./pages/About/AboutPage"));
const ContactPage = lazy(() => import("./pages/contact/ContactPage"));
const LoginComponents = lazy(() => import("./components/Login/LoginComponents"));
const SkillsPage = lazy(() => import("./pages/Skills/SkillsPage"));
const ServicesPage = lazy(() => import("./pages/Services/ServicesPage"));
const ProjectPage = lazy(() => import("./pages/Projects/ProjectPage"));

// Dashboard Layout and Protected Pages
const DashboardLayout = lazy(() => import("./pages/Dashboard/DashboardLayout"));
const DashboardHome = lazy(() => import("./pages/Dashboard/DashboardHome"));
const ProjectList = lazy(() => import("./pages/Dashboard/protected/project/ProjectList"));
const ProjectAddUpdate = lazy(() => import("./pages/Dashboard/protected/project/ProjectAddUpdate"));
const ProjctDetail = lazy(() => import("./pages/Dashboard/protected/project/ProjectDetail"));
const ContactList = lazy(() => import("./pages/Dashboard/protected/contact/ContactList"));
const ContactDetail = lazy(() => import("./pages/Dashboard/protected/contact/ContactDetail"));
const SkillsList = lazy(() => import("./pages/Dashboard/protected/skills/SkillsList"));
const SkillDetail = lazy(() => import("./pages/Dashboard/protected/skills/SkillDetail"));
const AddSkill = lazy(() => import("./pages/Dashboard/protected/skills/AddSkill"));
const ServicesList = lazy(() => import("./pages/Dashboard/protected/services/ServicesList"));
const ServiceDetail = lazy(() => import("./pages/Dashboard/protected/services/ServiceDetail"));
const AddService = lazy(() => import("./pages/Dashboard/protected/services/AddService"));
const ProfileDetail = lazy(() => import("./pages/Dashboard/protected/profile/ProfileDetail"));
const AddProfileForm = lazy(() => import("./pages/Dashboard/protected/profile/AddProfileForm"));

function App() {
  return (
    <Router>
      <LayoutComponents>
        <Suspense fallback={<LoaderComponents />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact-us" element={<ContactPage />} />
            <Route path="/login" element={<LoginComponents />} />

            {/* Protected Dashboard Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardHome />} />
              <Route path="projects" element={<ProjectList />} />
              <Route path="projects/add" element={<ProjectAddUpdate />} />
              <Route path="projects/:id/view" element={<ProjctDetail />} />
              <Route path="projects/:id/edit" element={<ProjectAddUpdate />} />
              <Route path="contacts" element={<ContactList />} />
              <Route path="contacts/:id" element={<ContactDetail />} />
              <Route path="skills" element={<SkillsList />} />
              <Route path="skills/add" element={<AddSkill />} />
              <Route path="skills/:id" element={<SkillDetail />} />
              <Route path="services" element={<ServicesList />} />
              <Route path="services/:id" element={<ServiceDetail />} />
              <Route path="services/add" element={<AddService />} />
              <Route path="profile" element={<ProfileDetail />} />
              <Route path="profile/add" element={<AddProfileForm />} />
            </Route>
          </Routes>
        </Suspense>
      </LayoutComponents>
    </Router>
  );
}

export default App;
