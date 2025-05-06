import React from "react";

// Reusable skeleton block
const SkeletonBlock = ({ width = "w-full", height = "h-4" }) => (
  <div className={`bg-gray-300 rounded-md animate-pulse ${width} ${height}`} />
);

const AboutSkeleton = () => {
  return (
    <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-10 bg-white shadow-lg rounded-lg p-6 animate-pulse">
      {/* Image Section Skeleton */}
      <div className="flex-1 flex justify-center items-center">
        <div className="w-48 h-48 bg-gray-300 rounded-full" />
      </div>

      {/* Text Section Skeleton */}
      <div className="flex-2 w-full pl-12 space-y-4">
        {/* Heading */}
        <SkeletonBlock width="w-2/3" height="h-10" />
        {/* Subheading */}
        <SkeletonBlock width="w-1/3" height="h-6" />

        {/* Paragraph skeleton lines */}
        {[...Array(4)].map((_, index) => (
          <SkeletonBlock key={index} width="w-full" height="h-4" />
        ))}
        <SkeletonBlock width="w-5/6" height="h-4" />
        <SkeletonBlock width="w-2/3" height="h-4" />

        {/* Social Icons Skeleton */}
        <div className="flex gap-3 mt-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-10 h-10 bg-gray-300 rounded-full" />
          ))}
        </div>

        {/* Button Skeletons */}
        <div className="flex gap-4 mt-4">
          {/* <SkeletonBlock width="w-32" height="h-10" /> */}
          <SkeletonBlock width="w-32" height="h-10" />
        </div>
      </div>
    </div>
  );
};

export default AboutSkeleton;
