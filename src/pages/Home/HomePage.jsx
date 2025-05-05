import React, { lazy, Suspense } from 'react';
import HeroPage from '../Hero/HeroPage';

// Lazy-loaded components
const AboutPage = lazy(() => import('../About/AboutPage'));
const ProjectList = lazy(() => import('../Projects/ProjectPage'));
const SkillsPage = lazy(() => import('../Skills/SkillsPage'));
const ServicesPage = lazy(() => import('../Services/ServicesPage'));
const ContactPage = lazy(() => import('../contact/ContactPage'));

// Optional: You can define a simple fallback loader
const FallbackLoader = () => (
  <div className="w-full text-center py-10 text-white">Loading...</div>
);

const HomePage = () => {
  return (
    <>
      <HeroPage />

      <Suspense fallback={<FallbackLoader />}>
        <AboutPage />
      </Suspense>

      <Suspense fallback={<FallbackLoader />}>
        <ProjectList />
      </Suspense>

      <Suspense fallback={<FallbackLoader />}>
        <SkillsPage />
      </Suspense>

      <Suspense fallback={<FallbackLoader />}>
        <ServicesPage />
      </Suspense>

      <Suspense fallback={<FallbackLoader />}>
        <ContactPage />
      </Suspense>
    </>
  );
};

export default HomePage;
