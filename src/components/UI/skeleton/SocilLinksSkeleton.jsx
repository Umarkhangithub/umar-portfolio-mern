// SocialLinksSkeleton.js
import React from "react";

const SocialLinksSkeleton = () => {
  return (
    <div className="space-y-4 w-full max-w-7xl mx-auto">
      {[...Array(3)].map((_, idx) => (
        <div
          key={idx}
          className="bg-gray-300 p-6 rounded-lg shadow-md animate-pulse"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-gray-400"></div>
          </div>
          <div className="h-6 bg-gray-400 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-400 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
};

export default SocialLinksSkeleton;
