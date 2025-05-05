import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SocialLinksCard from '../../components/UI/Social-links/SocialLinksCard';
import { fetchSocialLinks } from '../../features/profile/profileSlice';

const SocialLinksPage = ({ color }) => {
  const dispatch = useDispatch();
  const { socialLinks, loading, error } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchSocialLinks());
  }, [dispatch]);

  // Loading state
  if (loading) {
    return <p className="text-center text-white mt-10">Loading social links...</p>;
  }

  // Error state
  if (error) {
    return <p className="text-center text-red-500 mt-10">Error: {error}</p>;
  }

  // No social links available state
  if (!socialLinks || Object.keys(socialLinks).length === 0) {
    return <p className="text-center text-yellow-400 mt-10">No social links available.</p>;
  }

  // Render social links
  return <SocialLinksCard socialLinks={socialLinks} color={color} />;
};

export default SocialLinksPage;
