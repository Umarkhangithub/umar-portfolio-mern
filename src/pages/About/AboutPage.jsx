import React, { Suspense, lazy } from "react";
import ContainerComponents from "../../components/container/ContainerComponents";
import { Link } from "react-router-dom";
import AboutSkeleton from "../../components/UI/skeleton/AboutSkeleton";

const AvatarCard = lazy(() => import("../../components/UI/avatar/AvatarCard"));
const SocialLinksPage = lazy(() => import("../socialLinks/SocialLinksPage"));
const ResumeDownload = lazy(() => import("../../components/UI/Resume/ResumeDownload"));

const AboutPage = () => {
  return (
    <div>
      <ContainerComponents>
        <section className="min-h-screen bg-transparent y-10 px-4 w-full grid place-items-center">
          <Suspense fallback={<AboutSkeleton />}>
            <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-10 bg-[#222222] shadow-lg rounded-lg p-6">
              {/* Image Section */}
              <div className="flex-1 flex justify-center">
                <AvatarCard />
              </div>

              {/* Text Section */}
              <div className="flex-2 text-left pl-12">
                <h1 className="text-4xl font-extrabold text-white  mb-3">
                  About Me
                </h1>
                <h3 className="text-2xl font-semibold text-[#EDEDED] mb-3">
                  I'm a MERN Stack Developer
                </h3>

                <p className="text-base md:text-lg leading-7 text-[#BDC3C7] mb-4">
                Hi, I'm <span className="font-semibold">Mohd Umar</span>, a MERN
                Stack Developer from Noida, Uttar Pradesh, India. I enjoy
                building full-stack web applications that are fast, responsive,
                and user-friendly. My core skills include MongoDB, Express.js,
                React.js, and Node.js, and I love turning ideas into real,
                working websites.
                </p>

                <p className="text-base text-[#BDC3C7] mb-2">
                I'm confident in building full-stack applications using the MERN
                stack. I connect the front-end and back-end seamlessly using
                RESTful APIs, manage state efficiently with Redux, and focus on
                creating secure, scalable, and responsive web applications.
                </p>

                <p className="text-base text-[#BDC3C7] mb-2">
                I'm always excited to learn new things, especially in areas like
                cloud deployment, designing better databases, and making
                websites run faster. I enjoy building helpful and meaningful web
                applications. Let's work together to create something great!
                </p>

                <SocialLinksPage  />

                <div className="flex gap-4 mt-4">
                  <ResumeDownload />
                  <Link
                    to="contact-us"
                    className="btn btn-outline hover:bg-[#BDC3C7] hover:border-[#EDEDED] hover:text-[#2c2c2c] text-white transition-colors duration-300 ease-in-out"
                  >
                    Contact Me
                  </Link>
                </div>
              </div>
            </div>
          </Suspense>
        </section>
      </ContainerComponents>
    </div>
  );
};

export default AboutPage;
