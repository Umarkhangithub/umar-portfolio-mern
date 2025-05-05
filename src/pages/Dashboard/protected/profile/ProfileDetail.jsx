import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProfile } from "../../../../features/profile/profileSlice";
import ProfileSkeleton from "../../../../features/profile/ProfileSkeleton";

const ProfileDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { profile, loading, error } = useSelector(
    (state) => ({
      profile: state.profile.profile,
      loading: state.profile.loading,
      error: state.profile.error,
    }),
    shallowEqual
  );

  // Memoize the fetchProfile function
  const fetchProfileData = useCallback(() => {
    if (!profile) {
      dispatch(fetchProfile());
    }
  }, [dispatch, profile]);

  // Fetch profile only if not already loaded
  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  const handleAddProfile = () => navigate("/dashboard/profile/add");

  const hasSocialLinks = profile?.socialLinks && Object.keys(profile.socialLinks).length > 0;

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
      {!loading && !error && !profile && (
        <p className="text-center text-gray-500">No profile data found.</p>
      )}

      {/* Profile Info */}
      {!loading && profile && (
        <div className="max-w-2xl mx-auto bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {profile.name || "No Name Provided"}
          </h2>

          {/* Avatar and Resume */}
          <div className="flex flex-col items-center gap-4 mb-6">
            {profile.avatar?.url && (
              <img
                src={profile.avatar.url}
                alt="Avatar"
                className="w-32 h-32 rounded-full object-cover shadow"
              />
            )}

            {profile.resume?.url && (
              <a
                href={profile.resume.url}
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
              {Object.entries(profile.socialLinks).map(
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

          {/* Created At */}
          {profile.createdAt && (
            <p className="text-gray-500 text-sm mt-6">
              <strong>Joined on:</strong>{" "}
              {new Date(profile.createdAt).toLocaleDateString()}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileDetail;
