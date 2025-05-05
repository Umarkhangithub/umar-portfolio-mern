import React from "react";

const SkeletonBlock = ({ width = "w-full", height = "h-4", rounded = "rounded-md" }) => (
  <div className={`bg-gray-300 ${rounded} animate-pulse ${width} ${height}`} />
);

const ProjectCardSkeleton = () => {
  return (
    <div className="bg-slate-900 text-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-52 bg-gray-300" />

      <div className="p-6 space-y-3">
        {/* Title */}
        <SkeletonBlock width="w-3/4" height="h-6" />

        {/* Description */}
        <SkeletonBlock width="w-full" height="h-4" />
        <SkeletonBlock width="w-5/6" height="h-4" />

        {/* Tech Stack */}
        <SkeletonBlock width="w-1/2" height="h-3" />

        {/* Dates */}
        <div className="space-y-2 mt-4">
          <SkeletonBlock width="w-2/3" height="h-4" />
          <SkeletonBlock width="w-1/2" height="h-4" />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <SkeletonBlock width="w-full sm:w-1/2" height="h-10" rounded="rounded-md" />
          <SkeletonBlock width="w-full sm:w-1/2" height="h-10" rounded="rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default ProjectCardSkeleton;
