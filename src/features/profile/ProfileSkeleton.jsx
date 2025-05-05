import React from "react";

const SkeletonItem = ({ width = "w-full", height = "h-4" }) => (
  <div className={`bg-gray-300 rounded-md animate-pulse ${width} ${height}`} />
);

const ProfileSkeleton = () => {
  return (
    <div className="max-w-2xl mx-auto bg-white shadow rounded-lg p-6 space-y-4 animate-pulse">
      {/* Header */}
      <SkeletonItem width="w-3/4" height="h-6" />

      {/* Avatar */}
      <div className="flex flex-col items-center gap-4">
        <div className="w-32 h-32 rounded-full bg-gray-300" />

        {/* Resume link placeholder */}
        <SkeletonItem width="w-40" height="h-4" />
      </div>

      {/* Social Links */}
      <SkeletonItem width="w-1/2" height="h-5" />
      <SkeletonItem width="w-full" height="h-4" />
      <SkeletonItem width="w-full" height="h-4" />
      <SkeletonItem width="w-5/6" height="h-4" />
      <SkeletonItem width="w-2/3" height="h-4" />

      {/* Joined on */}
      <SkeletonItem width="w-1/3" height="h-4" />
    </div>
  );
};

export default ProfileSkeleton;
