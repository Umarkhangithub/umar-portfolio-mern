import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResume } from "../../../features/profile/profileSlice";

const SkeletonBlock = ({ width = "w-full", height = "h-4" }) => (
  <div className={`bg-gray-300 rounded-md animate-pulse ${width} ${height}`} />
);

const ResumeDownload = () => {
  const dispatch = useDispatch();
  const { resume, error } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchResume());
  }, [dispatch]);

  return (
    <div className="text-center">
      {/* Error or No Resume Message */}
      {error && <SkeletonBlock width="w-32" height="h-10" />}

      {/* Resume Link */}
      {resume && (
        <a
          href={resume?.url}
          download="Mohammad_Umar_MERN.pdf"
          className="inline-block bg-[#00A8E8] text-white py-2 px-4 rounded-md shadow-md hover:bg-[#008FB3] transition-colors duration-300 ease-in-out"
        >
          Resume
        </a>
      )}
    </div>
  );
};

export default ResumeDownload;
