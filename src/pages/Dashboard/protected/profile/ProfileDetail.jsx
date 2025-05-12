import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAvatar, fetchSocialLinks, fetchResume } from "../../../../features/profile/profileSlice";
import ProfileSkeleton from "../../../../features/profile/ProfileSkeleton";

const ProfileDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {  loading, error, avatar, socialLinks, resume } = useSelector(
    (state) => ({
      avatar: state.profile.avatar,
      loading: state.profile.loading,
      error: state.profile.error,
      socialLinks: state.profile.socialLinks,
      resume: state.profile.resume
    }),
    shallowEqual
  );


  // Memoize the fetchProfile function
  const fetchProfileData = useCallback(() => {
    if (!avatar) {
      dispatch(fetchAvatar());
      dispatch(fetchResume());
      dispatch(fetchSocialLinks())
    }
  }, [dispatch, avatar]);

  // Fetch profile only if not already loaded
  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  const handleAddProfile = () => navigate("/dashboard/profile/add");

  const hasSocialLinks = socialLinks && Object.keys(socialLinks).length > 0;

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Profile</h2>
        <button
          onClick={handleAddProfile}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          + Add Profile
        </button>
      </div>

      {/* Loader */}
      {loading && <ProfileSkeleton />}

      {/* Error */}
      {error && !loading && (
        <p className="text-center text-red-600 font-medium">
          {error || "Something went wrong while fetching the profile."}
        </p>
      )}

      {/* Empty */}
      {!loading && !error && (
        <p className="text-center text-gray-500">No profile data found.</p>
      )}

      {/* Profile Info */}
      {!loading && avatar && (
        <div className="max-w-2xl mx-auto bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {"Mohd Umar" }
          </h2>

          {/* Avatar and Resume */}
          <div className="flex flex-col items-center gap-4 mb-6">
            {avatar?.url && (
              <img
                src={avatar.url}
                alt="Avatar"
                className="w-32 h-32 rounded-full object-cover shadow"
              />
            )}

            {resume?.url && (
              <a
                href={resume.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View Resume
              </a>
            )}
          </div>

          {/* Social Links */}
          {hasSocialLinks && (
            <div className="text-gray-700 space-y-2">
              <h3 className="font-semibold text-lg mb-1">Social Links</h3>
              {Object.entries(socialLinks).map(
                ([platform, link]) =>
                  link && (
                    <p key={platform}>
                      <strong className="capitalize">{platform}:</strong>{" "}
                      <a
                        href={link}
                        className="text-blue-500 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link}
                      </a>
                    </p>
                  )
              )}
            </div>
          )}

         
        </div>
      )}
    </div>
  );
};

export default ProfileDetail;
