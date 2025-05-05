import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSkillById } from "../../../../features/skills/skillsSlice";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import LoaderComponents from "../../../../components/UI/Loader/LoaderComponents";

const SkillDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { skill, loading, error } = useSelector((state) => state.skills);

  useEffect(() => {
    if (id) dispatch(fetchSkillById(id));
  }, [dispatch, id]);

  const renderDetailItem = (label, value) => (
    <p className="text-gray-700 mb-1">
      <span className="font-semibold">{label}:</span> {value || "N/A"}
    </p>
  );

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-800 font-medium mb-6 transition"
        aria-label="Go back"
      >
        <ArrowLeft className="mr-2" size={18} />
        Back
      </button>

      {/* Loading State */}
      {loading && <LoaderComponents />}

      {/* Error State */}
      {error && (
        <p className="text-center text-red-600 font-semibold">{error}</p>
      )}

      {/* Skill Detail Card */}
      {!loading && skill && (
        <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {skill.name}
          </h2>

          {renderDetailItem("Category", skill.category)}
          {renderDetailItem("Level", skill.level)}
          {renderDetailItem(
            "Date Added",
            skill.createdAt
              ? new Date(skill.createdAt).toLocaleDateString()
              : "N/A"
          )}

          {skill.icon && (
            <div className="mt-6 flex justify-center ">
              <p className="bg-gray-100 text-gray-800 px-4 py-2 rounded shadow-sm overflow-scroll">
                Icon: {skill.icon}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SkillDetail;
