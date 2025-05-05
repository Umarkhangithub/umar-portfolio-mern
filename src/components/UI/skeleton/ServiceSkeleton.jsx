// src/components/UI/Skeleton/ServiceSkeleton.js
import React from "react";

const SkeletonBlock = ({ width = "w-full", height = "h-4" }) => (
  <div className={`bg-gray-300 rounded-md animate-pulse ${width} ${height}`} />
);

const ServiceSkeleton = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg animate-pulse">
      <div className="flex items-center justify-center mb-6">
        <div className="w-24 h-24 rounded-full bg-gray-300 border-4 border-blue-200" />
      </div>
      <SkeletonBlock width="w-3/4" height="h-6" />
      <SkeletonBlock width="w-full" height="h-4" />
      <SkeletonBlock width="w-5/6" height="h-4" />
    </div>
  );
};

export default ServiceSkeleton;
