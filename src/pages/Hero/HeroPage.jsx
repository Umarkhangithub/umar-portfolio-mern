import React, { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import ContainerComponents from "../../components/container/ContainerComponents";
import { Link } from "react-router-dom";
import HeroSkeleton from "../../components/UI/skeleton/HeroSkeleton";

const SocialLinksPage = lazy(() => import("../socialLinks/SocialLinksPage"));
const AvatarCard = lazy(() => import("../../components/UI/avatar/AvatarCard"));
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

const HeroPage = () => {
  return (
    <ContainerComponents>
      <section className="min-h-screen bg-transparent py-10 mt-12 md:mt-0 lg:mt-0  w-full grid place-items-center">
        <motion.div
          className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-10 bg-[#222222] shadow-lg rounded-lg p-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Text Section */}
          <motion.div
            className="flex-2 space-y-5   md:pl-12 lg:pl-12"
            variants={itemVariants}
          >
            <motion.h1
              className="text-4xl font-extrabold text-white mb-3"
              variants={itemVariants}
            >
              Hi, I'm <span className="text-[#00A8E8]">Mohd Umar</span>
            </motion.h1>
            <motion.h3
              className="text-2xl font-semibold text-[#EDEDED] mb-3"
              variants={itemVariants}
            >
              I'm a MERN Stack Developer
            </motion.h3>
            <motion.p
              className="text-base md:text-lg leading-7 text-[#BDC3C7] mb-4"
              variants={itemVariants}
            >
              I'm a MERN Stack Developer from Noida, Uttar Pradesh, India. I
              specialize in building full-stack applications using MongoDB,
              Express.js, React, and Node.js. I'm confident in connecting
              front-end and back-end with RESTful APIs, managing state with
              Redux, and creating secure, scalable web apps. I'm passionate
              about cloud deployment, database design, and performance
              optimization. Let's build something amazing together!
            </motion.p>

            {/* Social Links */}
            <Suspense fallback={<HeroSkeleton />}>
              <motion.div variants={itemVariants}>
                <SocialLinksPage />
              </motion.div>
            </Suspense>

            {/* Buttons */}
            <motion.div className="flex gap-4" variants={itemVariants}>
              <Suspense fallback={<button className="btn btn-outline" disabled>Loading...</button>}>
                <ResumeDownload />
              </Suspense>
              <Link
                to="/contact-us"
                className="btn btn-outline hover:bg-[#BDC3C7] hover:border-[#EDEDED] hover:text-[#2c2c2c] text-white transition-colors duration-300 ease-in-out"
              >
                Contact Me
              </Link>
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div className="flex-1" variants={itemVariants}>
            <Suspense fallback={<HeroSkeleton />}>
              <AvatarCard />
            </Suspense>
          </motion.div>
        </motion.div>
      </section>
    </ContainerComponents>
  );
};

export default HeroPage;
