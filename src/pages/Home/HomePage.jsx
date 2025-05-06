import React, { lazy, Suspense } from "react";
import HeroPage from "../Hero/HeroPage";
import AboutSkeleton from "../../components/UI/skeleton/AboutSkeleton";
import ProjectCardSkeleton from "../../components/UI/skeleton/ProjectCardSkeleton";
import SkillCardSkeleton from "../../components/UI/skeleton/SkillCardSkeleton";
import ServiceSkeleton from "../../components/UI/skeleton/ServiceSkeleton";
import ContactFormSkeleton from "../../components/UI/skeleton/ContactFormSkeleton";

// Lazy-loaded components
const AboutPage = lazy(() => import("../About/AboutPage"));
const ProjectList = lazy(() => import("../Projects/ProjectPage"));
const SkillsPage = lazy(() => import("../Skills/SkillsPage"));
const ServicesPage = lazy(() => import("../Services/ServicesPage"));
const ContactPage = lazy(() => import("../contact/ContactPage"));

// Generic suspense wrapper
const WithSuspense = ({ children, fallback }) => (
  <Suspense fallback={fallback}>{children}</Suspense>
);

const HomePage = () => {
  return (
    <>
      <HeroPage />

      <WithSuspense fallback={<AboutSkeleton />}>
        <AboutPage />
      </WithSuspense>

      <WithSuspense fallback={<ProjectCardSkeleton />}>
        <ProjectList />
      </WithSuspense>

      <WithSuspense fallback={<SkillCardSkeleton />}>
        <SkillsPage />
      </WithSuspense>

      <WithSuspense fallback={<ServiceSkeleton />}>
        <ServicesPage />
      </WithSuspense>

      <WithSuspense fallback={<ContactFormSkeleton />}>
        <ContactPage />
      </WithSuspense>
    </>
  );
};

export default HomePage;
