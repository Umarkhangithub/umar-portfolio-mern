import React, { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import ContainerComponents from "../../components/container/ContainerComponents";
import { Link } from "react-router-dom";
import AboutSkeleton from "../../components/UI/skeleton/AboutSkeleton";

const AvatarCard = lazy(() => import("../../components/UI/avatar/AvatarCard"));
const SocialLinksPage = lazy(() => import("../socialLinks/SocialLinksPage"));
const ResumeDownload = lazy(() => import("../../components/UI/Resume/ResumeDownload"));

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const AboutPage = () => {
  return (
    <ContainerComponents>
      <section className="min-h-screen bg-transparent py-10  mt-12 md:mt-0 lg:mt-0 w-full grid place-items-center">
        <Suspense fallback={<AboutSkeleton />}>
          <motion.div
            className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-10 bg-[#222222] shadow-lg rounded-lg p-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Image Section */}
            <motion.div className="flex-1 flex justify-center" variants={itemVariants}>
              <AvatarCard />
            </motion.div>

            {/* Text Section */}
            <motion.div className="flex-2 text-left pl-0  md:pl-12 lg:pl-12" variants={itemVariants}>
              <motion.h1
                className="text-4xl font-extrabold text-white mb-3"
                variants={itemVariants}
              >
                About Me
              </motion.h1>
              <motion.h3
                className="text-2xl font-semibold text-[#EDEDED] mb-3"
                variants={itemVariants}
              >
                I'm a MERN Stack Developer
              </motion.h3>

              <motion.p className="text-base md:text-lg leading-7 text-[#BDC3C7] mb-4" variants={itemVariants}>
                Hi, I'm <span className="font-semibold">Mohd Umar</span>, a MERN Stack Developer from Noida,
                Uttar Pradesh, India. I enjoy building full-stack web applications that are fast, responsive,
                and user-friendly. My core skills include MongoDB, Express.js, React.js, and Node.js, and I love
                turning ideas into real, working websites.
              </motion.p>

              <motion.p className="text-base text-[#BDC3C7] mb-2" variants={itemVariants}>
                I'm confident in building full-stack applications using the MERN stack. I connect the front-end
                and back-end seamlessly using RESTful APIs, manage state efficiently with Redux, and focus on
                creating secure, scalable, and responsive web applications.
              </motion.p>

              <motion.p className="text-base text-[#BDC3C7] mb-2" variants={itemVariants}>
                I'm always excited to learn new things, especially in areas like cloud deployment, designing
                better databases, and making websites run faster. I enjoy building helpful and meaningful web
                applications. Let's work together to create something great!
              </motion.p>

              <motion.div variants={itemVariants}>
                <SocialLinksPage />
              </motion.div>

              <motion.div className="flex gap-4 mt-4" variants={itemVariants}>
                <ResumeDownload />
                <Link
                  to="/contact-us"
                  className="btn btn-outline hover:bg-[#BDC3C7] hover:border-[#EDEDED] hover:text-[#2c2c2c] text-white transition-colors duration-300 ease-in-out"
                >
                  Contact Me
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </Suspense>
      </section>
    </ContainerComponents>
  );
};

export default AboutPage;
