import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAvatar } from "../../../features/profile/profileSlice";

const defaultAvatar = "/default-avatar.png";

const AvatarCard = ({ size = 'w-64 h-64' }) => {
  const dispatch = useDispatch();
  const { avatar, loading, error } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchAvatar());
  }, [dispatch]);

  const content = (
    <div
      className={`relative overflow-hidden rounded-full border-4 border-gray-700 shadow-xl ${size} aspect-square`}
    >
      <img
        src={avatar?.url || defaultAvatar}
        alt="User Avatar"
        loading="lazy"
        className="w-full h-full  object-cover transition-transform duration-300 hover:scale-105"
      />
    </div>
  );

  if (loading || error) {
    return (
      <div className="flex justify-center items-center">
        <div className={`rounded-full bg-gray-300 animate-pulse ${size} aspect-square`} />
      </div>
    );
  }

  return <div className="flex justify-center items-center">{content}</div>;
};

export default AvatarCard;
