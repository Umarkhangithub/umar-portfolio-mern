import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputField from "../../../../components/UI/Input/InputField";
import {
  ArrowLeft,
  File,
  Github,
  Image,
  Instagram,
  Linkedin,
  Twitter,
  User,
  Youtube,
} from "lucide-react";
import { addProfile } from "../../../../features/profile/profileSlice";

const AddProfileForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    avatar: null,
    resume: null,
    github: "",
    linkedin: "",
    twitter: "",
    instagram: "",
    youtube: "",
  });

  const handleChange = useCallback((e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files?.[0] || value,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("name", formData.name);
      if (formData.avatar) data.append("avatar", formData.avatar);
      if (formData.resume) data.append("resume", formData.resume);

      const socialLinks = {
        github: formData.github,
        linkedin: formData.linkedin,
        twitter: formData.twitter,
        instagram: formData.instagram,
        youtube: formData.youtube,
      };

      data.append("socialLinks", JSON.stringify(socialLinks));

      await dispatch(addProfile(data)).unwrap();
      navigate("/dashboard/profile");
    } catch (error) {
      console.error("Add profile error:", error);
      alert("Failed to add profile. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <button
        type="button"
        onClick={() => navigate("/dashboard/profile")}
        className="text-gray-600 font-semibold text-lg mb-4 inline-flex items-center"
      >
        <ArrowLeft className="mr-2" />
        Back to Profile
      </button>

      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Add Profile
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Full Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          icon={User}
        />

        <InputField
          label="Avatar Image"
          type="file"
          name="avatar"
          onChange={handleChange}
          accept="image/*"
          icon={Image}
        />

        <InputField
          label="Resume (PDF/Doc)"
          type="file"
          name="resume"
          onChange={handleChange}
          accept=".pdf,.doc,.docx"
          icon={File}
        />

        <InputField
          label="GitHub"
          type="url"
          name="github"
          value={formData.github}
          onChange={handleChange}
          icon={Github}
        />

        <InputField
          label="LinkedIn"
          type="url"
          name="linkedin"
          value={formData.linkedin}
          onChange={handleChange}
          icon={Linkedin}
        />

        <InputField
          label="Twitter"
          type="url"
          name="twitter"
          value={formData.twitter}
          onChange={handleChange}
          icon={Twitter}
        />

        <InputField
          label="Instagram"
          type="url"
          name="instagram"
          value={formData.instagram}
          onChange={handleChange}
          icon={Instagram}
        />

        <InputField
          label="YouTube"
          type="url"
          name="youtube"
          value={formData.youtube}
          onChange={handleChange}
          icon={Youtube}
        />

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Add Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProfileForm;
