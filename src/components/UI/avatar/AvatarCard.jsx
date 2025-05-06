import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAvatar } from "../../../features/profile/profileSlice";

// Fallback image for when avatar is not available
const defaultAvatar = "/default-avatar.png"; // Make sure this path is valid

const AvatarCard = ({ size = 'w-64 h-64' }) => {
  const dispatch = useDispatch();
  const { avatar, loading, error } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchAvatar());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className={`rounded-full bg-gray-200 animate-pulse ${size}`} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center">
        <div className={`rounded-full bg-gray-200 animate-pulse ${size}`} />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center">
      <img
        src={avatar?.url || defaultAvatar}
        alt="User Avatar"
        loading="lazy"
        className={`${size} rounded-full object-cover shadow-lg`}
      />
    </div>
  );
};

export default AvatarCard;
