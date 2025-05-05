import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResume } from '../../../features/profile/profileSlice';

const ResumeDownload = () => {
  const dispatch = useDispatch();
  const { resume, loading, error } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchResume());
  }, [dispatch]);

  return (
    <div className="text-center">
      {/* Loading State */}
      {loading && <p className="text-gray-500">Loading resume...</p>}

      {/* Error or No Resume Message */}
      {error && <p className="text-red-500">{error}</p>}
      
      {/* Resume Link */}
      {resume ? (
        <a
          href={resume}
          download="Mohammad_Umar_ME.pdf"
          className="inline-block bg-[#00A8E8] text-white py-2 px-4 rounded-md shadow-md hover:bg-[#008FB3] transition-colors duration-300 ease-in-out"
        >
          Resume
        </a>
      ) : (
        !loading && <p className="text-red-500">No resume uploaded.</p>
      )}
    </div>
  );
};

export default ResumeDownload;
