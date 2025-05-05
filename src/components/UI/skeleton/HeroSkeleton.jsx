import React from "react";

// Reusable skeleton item
const SkeletonItem = ({ width = "w-full", height = "h-4" }) => (
  <div className={`bg-gray-300 rounded-md animate-pulse ${width} ${height}`} />
);

const HeroSkeleton = () => {
  return (
    <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-10 bg-white shadow-lg rounded-lg p-6 animate-pulse">
      {/* Text Section Skeleton */}
      <div className="flex-2 space-y-5 pl-12 w-full">
        <SkeletonItem width="w-1/2" height="h-10" />  {/* Name */}
        <SkeletonItem width="w-1/3" height="h-6" />   {/* Title */}

        {/* Paragraph lines */}
        <SkeletonItem width="w-full" />
        <SkeletonItem width="w-full" />
        <SkeletonItem width="w-5/6" />
        <SkeletonItem width="w-2/3" />
        <SkeletonItem width="w-1/2" />

        {/* Social Icons Skeleton */}
        <div className="flex gap-3 mt-2">
          {[...Array(3)].map((_, i) => (
            <SkeletonItem key={i} width="w-10" height="h-10" />
          ))}
        </div>

        {/* Button skeletons */}
        <div className="flex gap-4 mt-4">
          <SkeletonItem width="w-32" height="h-10" />
          <SkeletonItem width="w-32" height="h-10" />
        </div>
      </div>

      {/* Image Section Skeleton */}
      <div className="flex-1 flex justify-center items-center">
        <div className="w-64 h-64 bg-gray-300 rounded-full" />
      </div>
    </div>
  );
};

export default HeroSkeleton;
