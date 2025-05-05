// ContactFormSkeleton.js
import React from "react";

const ContactFormSkeleton = () => (
  <div className="space-y-6">
    {/* Skeleton for Full Name */}
    <div className="bg-gray-300 p-4 rounded-md animate-pulse">
      <div className="h-6 bg-gray-400 rounded mb-2 w-1/3"></div>
      <div className="h-10 bg-gray-400 rounded"></div>
    </div>
    
    {/* Skeleton for Email Address */}
    <div className="bg-gray-300 p-4 rounded-md animate-pulse">
      <div className="h-6 bg-gray-400 rounded mb-2 w-1/3"></div>
      <div className="h-10 bg-gray-400 rounded"></div>
    </div>
    
    {/* Skeleton for Phone Number */}
    <div className="bg-gray-300 p-4 rounded-md animate-pulse">
      <div className="h-6 bg-gray-400 rounded mb-2 w-1/3"></div>
      <div className="h-10 bg-gray-400 rounded"></div>
    </div>
    
    {/* Skeleton for Message */}
    <div className="bg-gray-300 p-4 rounded-md animate-pulse">
      <div className="h-6 bg-gray-400 rounded mb-2 w-1/3"></div>
      <div className="h-24 bg-gray-400 rounded"></div>
    </div>
    
    {/* Skeleton for Submit Button */}
    <div className="h-12 bg-gray-400 rounded mb-4"></div>
  </div>
);

export default ContactFormSkeleton;
