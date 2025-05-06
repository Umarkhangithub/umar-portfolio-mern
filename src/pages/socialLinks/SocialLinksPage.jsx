import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SocialLinksCard from "../../components/UI/Social-links/SocialLinksCard";
import { fetchSocialLinks } from "../../features/profile/profileSlice";

// Reusable skeleton block
const SkeletonBlock = ({ width = "w-full", height = "h-4" }) => (
  <div className={`bg-gray-300 rounded-md animate-pulse ${width} ${height}`} />
);

const SocialLinksPage = ({ color }) => {
  const dispatch = useDispatch();
  const { socialLinks, loading, error } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchSocialLinks());
  }, [dispatch]);

  // Loading state
  if (loading) {
    return (
      <div className="flex gap-3 mt-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-10 h-10 bg-gray-300 rounded-full animate-pulse" />
        ))}
      </div>
    );
  }

  // Error state
  if (error) {
    return  <div className="flex gap-3 mt-4">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="w-10 h-10 bg-gray-300 rounded-full animate-pulse" />
    ))}
  </div>
  }

  // No social links available state
  if (!socialLinks || Object.keys(socialLinks).length === 0) {
    return (
      <p className="text-center text-yellow-400 mt-10">
        No social links available.
      </p>
    );
  }

  // Render social links
  return <SocialLinksCard socialLinks={socialLinks} color={color} />;
};

export default SocialLinksPage;
