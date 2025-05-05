import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import InputField from "../../../../components/UI/Input/InputField";
import { Captions, Github, Image, Layers, Link } from "lucide-react";
import {
  addProject,
  updateProject,
  clearMessageAndError,
} from "../../../../features/project/projectSlice";

const ProjectAddUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const existingProject = useSelector((state) =>
    state.projects.projects.find((project) => project._id === id)
  );
  const { loading, error, message } = useSelector((state) => state.projects);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "",
    githubLink: "",
    liveDemo: "",
    image: null,
  });

  useEffect(() => {
    if (isEditing && existingProject) {
      setFormData({
        title: existingProject.title || "",
        description: existingProject.description || "",
        techStack: existingProject.techStack || "",
        githubLink: existingProject.githubLink || "",
        liveDemo: existingProject.liveDemo || "",
        image: existingProject.image || null,
      });
    }
  }, [isEditing, existingProject]);

  useEffect(() => {
    if (message || error) {
      const timeout = setTimeout(() => {
        dispatch(clearMessageAndError());
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [message, error, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("techStack", formData.techStack);
    form.append("githubLink", formData.githubLink);
    form.append("liveDemo", formData.liveDemo);
    if (formData.image) form.append("image", formData.image);

    try {
      if (isEditing) {
        await dispatch(updateProject({ id, data: form })).unwrap();
      } else {
        await dispatch(addProject(form)).unwrap();
      }
      setTimeout(() => navigate("/dashboard/projects"), 1000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <button
        onClick={() => navigate("/dashboard/projects")}
        className="text-gray-600 font-semibold text-lg mb-4 inline-flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Projects
      </button>

      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {isEditing ? "Update Project" : "Add New Project"}
      </h2>

      {/* Show error or message only if present */}
      {error && (
        <div className="mb-4 p-3 rounded bg-red-100 text-red-700">{error}</div>
      )}
      {message && (
        <div className="mb-4 p-3 rounded bg-green-100 text-green-700">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Project Title"
          type="text"
          name="title"
          placeholder="Project Title"
          value={formData.title}
          onChange={handleChange}
          required
          icon={Captions}
        />

        <div className="space-y-2">
          <label className="block font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            placeholder="Project Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
          />
        </div>

        <InputField
          label="Tech Stack"
          type="text"
          name="techStack"
          placeholder="Tech Stack (comma-separated)"
          value={formData.techStack}
          onChange={handleChange}
          icon={Layers}
        />

        <InputField
          label="GitHub Link"
          type="text"
          name="githubLink"
          placeholder="GitHub Link"
          value={formData.githubLink}
          onChange={handleChange}
          icon={Github}
        />

        <InputField
          label="Live Demo URL"
          type="text"
          name="liveDemo"
          placeholder="Live Demo URL"
          value={formData.liveDemo}
          onChange={handleChange}
          icon={Link}
        />

        <InputField
          label="Project Image"
          type="file"
          name="image"
          onChange={handleFileChange}
          accept="image/*"
          icon={Image}
          required={!isEditing}
        />

        <div className="mt-4 text-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 disabled:opacity-50"
          >
            {loading
              ? isEditing
                ? "Updating..."
                : "Adding..."
              : isEditing
              ? "Update Project"
              : "Add Project"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectAddUpdate;
