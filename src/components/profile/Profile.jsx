import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";
import SocialLinksCard from "../UI/Social-links/SocialLinksCard";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [resumeBlobUrl, setResumeBlobUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch profile data and resume blob
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/profile");
        setProfile(data.profile);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchResume = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/profile/resume/download",
          {
            responseType: "blob",
          }
        );
        const url = URL.createObjectURL(new Blob([data]));
        setResumeBlobUrl(url);
      } catch (error) {
        console.error("Failed to fetch resume:", error);
      }
    };

    fetchProfile();
    fetchResume();

    // Cleanup blob URL on unmount
    return () => {
      if (resumeBlobUrl) {
        URL.revokeObjectURL(resumeBlobUrl);
      }
    };
  }, []);

  if (loading)
    return <p className="text-center text-white mt-10">Loading...</p>;
  if (!profile)
    return <p className="text-center text-red-500 mt-10">No profile found.</p>;

  const { avatar, name, socialLinks } = profile;

 

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 text-white rounded shadow my-10">
      <h2 className="text-3xl font-bold mb-6">Profile Information</h2>

      {/* Avatar */}
      {avatar?.url && (
        <div className="mb-6 text-center">
          <img
            src={avatar.url}
            alt={name}
            className="w-32 h-32 object-cover rounded-full border mx-auto"
          />
        </div>
      )}

      {/* Name */}
      <p className="text-xl font-semibold text-center mb-4">{name}</p>

      {/* Resume Link */}
      {resumeBlobUrl ? (
        <div className="mb-4 text-center">
          <a
            href={resumeBlobUrl}
            download="Mohammad_Umar_ME.pdf"
            className="text-blue-500 underline"
          >
            Download Resume
          </a>
        </div>
      ) : (
        <p className="text-red-500 text-center">No resume uploaded.</p>
      )}

      {/* Social Links */}
      <SocialLinksCard socialLinks={socialLinks} />
    </div>
  );
};

export default ProfilePage;
