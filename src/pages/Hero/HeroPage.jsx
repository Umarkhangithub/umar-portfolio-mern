import React, { Suspense, lazy } from "react";
import ContainerComponents from "../../components/container/ContainerComponents";
import { Link } from "react-router-dom";
import HeroSkeleton from "../../components/UI/skeleton/HeroSkeleton";

// Lazy load heavy components
const SocialLinksPage = lazy(() => import("../socialLinks/SocialLinksPage"));
const AvatarCard = lazy(() => import("../../components/UI/avatar/AvatarCard"));
const ResumeDownload = lazy(() => import("../../components/UI/Resume/ResumeDownload"));

const HeroPage = () => {
  return (
    <ContainerComponents>
      <section className="min-h-screen bg-transparent py-10 px-4 w-full grid place-items-center">
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-10 bg-[#222222]  shadow-lg rounded-lg p-6">
          {/* Text Section */}
          <div className="flex-2 space-y-5 pl-12">
            <h1 className="text-4xl font-extrabold text-white mb-3">
              Hi, I'm <span className="text-[#00A8E8]">Mohd Umar</span>
            </h1>
            <h3 className="text-2xl font-semibold text-[#EDEDED] mb-3">
              I'm a MERN Stack Developer
            </h3>
            <p className="text-base md:text-lg leading-7 text-[#BDC3C7] mb-4">
              I'm a MERN Stack Developer from Noida, Uttar Pradesh, India. I
              specialize in building full-stack applications using MongoDB,
              Express.js, React, and Node.js. I'm confident in connecting
              front-end and back-end with RESTful APIs, managing state with
              Redux, and creating secure, scalable web apps. I'm passionate
              about cloud deployment, database design, and performance
              optimization. Let's build something amazing together!
            </p>

            {/* Social Links */}
            <Suspense fallback={<HeroSkeleton />}>
            <SocialLinksPage  />

            </Suspense>

            {/* Buttons */}
            <div className="flex gap-4">
              <Suspense fallback={<button className="btn btn-outline" disabled>Loading...</button>}>
                <ResumeDownload />
              </Suspense>
              <Link
                to="/contact-us"
                className="btn btn-outline hover:bg-[#BDC3C7] hover:border-[#EDEDED] hover:text-[#2c2c2c] text-white transition-colors duration-300 ease-in-out"
              >
                Contact Me
              </Link>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex-1">
            <Suspense fallback={<HeroSkeleton />}>
              <AvatarCard />
            </Suspense>
          </div>
        </div>
      </section>
    </ContainerComponents>
  );
};

export default HeroPage;
