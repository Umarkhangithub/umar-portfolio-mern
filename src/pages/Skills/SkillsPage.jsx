import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSkills } from "../../features/skills/skillsSlice";
import ContainerComponents from "../../components/container/ContainerComponents";
import SkillCardComponents from "../../components/UI/ProjectCard/SkillCardComponets";
import SkillCardSkeleton from "../../components/UI/skeleton/SkillCardSkeleton";

const SkillsPage = () => {
  const dispatch = useDispatch();
  const { loading, error, skills } = useSelector((state) => state.skills);

  useEffect(() => {
    dispatch(fetchSkills());
  }, [dispatch]);

  const skeletonArray = useMemo(() => new Array(6).fill(0), []);

  const renderSkills = () => {
    if (loading) {
      return skeletonArray.map((_, idx) => <SkillCardSkeleton key={idx} />);
    }

    if (skills.length === 0) {
      return (
        <p className="text-white text-center col-span-full">
          No skills available at the moment.
        </p>
      );
    }

    return skills.map((skill) => (
      <SkillCardComponents
        key={skill._id}
        name={skill.name}
        level={skill.level}
        Icon={skill.icon}
        category={skill.category}
      />
    ));
  };

  return (
    <ContainerComponents>
      <section className="min-h-screen bg-[#222222] py-12 px-4">
        <div className="text-center my-12">
          <h1 className="text-4xl font-bold text-white mb-2">My Skills</h1>
          <p className="text-[#BDC3C7] ">Some of the skills I have acquired</p>
        </div>

        {error && <p className="text-red-500 text-center mb-6">Error: {error}</p>}

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {renderSkills()}
        </div>
      </section>
    </ContainerComponents>
  );
};

export default SkillsPage;
