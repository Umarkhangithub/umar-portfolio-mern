import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectById } from "../../../../features/project/projectSlice";

const ProjctDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { project, loading, error } = useSelector((state) => state.projects);

  useEffect(() => {
    if (id) dispatch(fetchProjectById(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="p-6 text-center text-gray-700">
        <p>{error || "Project not found."}</p>
        <button
          onClick={() => navigate("/dashboard/projects")}
          className="mt-4 text-blue-600 hover:underline"
        >
          Back to Project List
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto mt-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Project Details</h2>

      <div className="space-y-4 text-gray-700">
        <p><strong>Title:</strong> {project.title || "N/A"}</p>
        <p><strong>Description:</strong> {project.description || "N/A"}</p>
        <p><strong>Tech Stack:</strong> {project.techStack?.join(", ") || "N/A"}</p>
        <p>
          <strong>GitHub:</strong>{" "}
          {project.githubLink ? (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {project.githubLink}
            </a>
          ) : "N/A"}
        </p>
        <p>
          <strong>Live Link:</strong>{" "}
          {project.liveDemo ? (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {project.liveDemo}
            </a>
          ) : "N/A"}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {project.createdAt
            ? new Date(project.createdAt).toLocaleString()
            : "N/A"}
        </p>

        {project.image && (
          <div className="mt-6">
            <img
              src={project.image}
              alt={project.title || "Project"}
              className="rounded-lg w-full max-h-96 object-cover"
            />
          </div>
        )}
      </div>

      <button
        onClick={() => navigate("/dashboard/projects")}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Back to Project List
      </button>
    </div>
  );
};

export default ProjctDetail;
