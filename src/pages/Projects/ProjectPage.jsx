import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../features/project/projectSlice";
import ProjectCardComponents from "../../components/UI/ProjectCard/ProjectCardComponents";
import ContainerComponents from "../../components/container/ContainerComponents";
import Pagination from "../../components/UI/pagination/Pagination";
import ProjectCardSkeleton from "../../components/UI/skeleton/ProjectCardSkeleton";
import { motion } from "framer-motion";

// Animation Variants
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

const ProjectPage = () => {
  const dispatch = useDispatch();
  const {
    projects,
    loading,
    error,
    totalPages,
    currentPage,
    projectsPerPage,
  } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchProjects({ page: currentPage, limit: projectsPerPage }));
  }, [dispatch, currentPage, projectsPerPage]);

  const handlePageChange = (page) => {
    dispatch(fetchProjects({ page, limit: projectsPerPage }));
  };

  return (
    <ContainerComponents>
      <section className="min-h-screen bg-[#222222] py-12 px-4">
        <div className="text-center my-12">
          <h1 className="text-4xl font-bold text-white mb-2">My Projects</h1>
          <p className="text-gray-300">Some of the work I’ve done recently</p>
        </div>

        {/* Loading Skeletons */}
        {loading || error ? (
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center text-white">
            No projects available at the moment.
          </div>
        ) : (
          <motion.div
            className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {projects.map((proj) => (
              <motion.div key={proj._id} variants={cardVariants}>
                <ProjectCardComponents
                  image={proj.image}
                  title={proj.title}
                  description={proj.description}
                  techStack={proj.techStack[0]}
                  githubLink={proj.githubLink}
                  liveDemo={proj.liveDemo}
                  createdAt={proj.createdAt}
                  updatedAt={proj.updatedAt}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </section>
    </ContainerComponents>
  );
};

export default ProjectPage;
