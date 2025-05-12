import React, { useEffect,  useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Edit, Eye, Trash } from "lucide-react";
import ProjectListSkeleton from "../../../../components/UI/skeleton/ProjectListSkeleton";
import { deleteProject, fetchProjects } from "../../../../features/project/projectSlice";
import Pagination from "../../../../components/UI/pagination/Pagination";

const ProjectList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { projects, loading, error, message, totalPages, currentPage, projectsPerPage } = useSelector((state) => state.projects);

  // Fetch projects when page or limit changes
  useEffect(() => {
    dispatch(fetchProjects({ page: currentPage, limit: projectsPerPage }));
  }, [dispatch, currentPage, projectsPerPage]);

  const handleAddProject = () => navigate("/dashboard/projects/add");

  const handleDelete = useCallback(
    (id) => {
      if (window.confirm("Are you sure you want to delete this project?")) {
        dispatch(deleteProject(id))
          .unwrap()
          .then(() => dispatch(fetchProjects({ page: currentPage, limit: projectsPerPage })))
          .catch((err) => console.error("Failed to delete project:", err));
      }
    },
    [dispatch, currentPage, projectsPerPage]
  );

  const handlePageChange = useCallback(
    (page) => {
      if (page > 0 && page <= totalPages) {
        dispatch(fetchProjects({ page, limit: projectsPerPage }));
      }
    },
    [dispatch, totalPages, projectsPerPage]
  );

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-950">Projects List</h2>
        <button
          onClick={handleAddProject}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Add Project
        </button>
      </div>

      {/* Messages */}
      {(message || error) && (
        <div
          className={`mb-4 p-3 rounded-md ${error ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
        >
          {message || error}
        </div>
      )}

      {/* Loading */}
      {loading && <ProjectListSkeleton rows={6} cols={5} />}

      {/* Error */}
      {error && !loading && <p className="text-red-600 text-center py-4">{error}</p>}

      {/* Empty */}
      {!loading && projects.length === 0 && <p className="text-center text-gray-600">No projects found.</p>}

      {/* Table */}
      {!loading && projects.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100 text-gray-900">
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Title</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">Created</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr key={project._id} className="hover:bg-gray-50 text-gray-700">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{project.title}</td>
                  <td className="px-4 py-2 border line-clamp-2">{project.description}</td>
                  <td className="px-4 py-2 border">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <div className="flex justify-center items-center gap-3">
                      <button
                        title="Edit"
                        className="text-blue-600 hover:text-blue-800 transition"
                        onClick={() => navigate(`/dashboard/projects/${project._id}/edit`)}
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        title="View"
                        className="text-green-600 hover:text-green-800 transition"
                        onClick={() => navigate(`/dashboard/projects/${project._id}/view`)}
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        title="Delete"
                        className="text-red-600 hover:text-red-800 transition"
                        onClick={() => handleDelete(project._id)}
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <Pagination
          style="text-gray-700"
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ProjectList;
