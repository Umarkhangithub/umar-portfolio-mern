import React, { useEffect, useMemo, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSkills } from "../../features/skills/skillsSlice";
import ContainerComponents from "../../components/container/ContainerComponents";
import { motion } from "framer-motion";

// Lazy-loaded components
const SkillCardComponents = lazy(() =>
  import("../../components/UI/ProjectCard/SkillCardComponets")
);
const SkillCardSkeleton = lazy(() =>
  import("../../components/UI/skeleton/SkillCardSkeleton")
);

// Framer Motion Variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const SkillsPage = () => {
  const dispatch = useDispatch();
  const { loading, error, skills } = useSelector((state) => state.skills);

  useEffect(() => {
    dispatch(fetchSkills());
  }, [dispatch]);

  const skeletonArray = useMemo(() => new Array(6).fill(0), []);

  return (
    <ContainerComponents>
      <section className="min-h-screen bg-[#222222] py-12 px-4">
        <div className="text-center my-12">
          <h1 className="text-4xl font-bold text-white mb-2">My Skills</h1>
          <p className="text-[#BDC3C7]">Some of the skills I have acquired</p>
        </div>

        {error && (
          <p className="text-red-500 text-center mb-6">
            Error loading skills. Please try again later.
          </p>
        )}

        <Suspense
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {skeletonArray.map((_, idx) => (
                <div key={idx} className="h-48 bg-[#BDC3C7] animate-pulse rounded-lg" />
              ))}
            </div>
          }
        >
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {skeletonArray.map((_, idx) => (
                <SkillCardSkeleton key={idx} />
              ))}
            </div>
          ) : (
            <motion.div
              className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {skills.map((skill) => (
                <motion.div key={skill._id} variants={cardVariants}>
                  <SkillCardComponents
                    name={skill.name}
                    level={skill.level}
                    Icon={skill.icon}
                    category={skill.category}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </Suspense>

        {!loading && skills.length === 0 && (
          <p className="text-white text-center mt-6 col-span-full">
            No skills available at the moment.
          </p>
        )}
      </section>
    </ContainerComponents>
  );
};

export default SkillsPage;
