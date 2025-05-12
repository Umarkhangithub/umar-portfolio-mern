import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServiceById } from "../../../../features/services/servicesSlice";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import LoaderComponents from "../../../../components/UI/Loader/LoaderComponents";

const ServiceDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { service, loading, error } = useSelector((state) => state.services);

  useEffect(() => {
    if (id) {
      dispatch(fetchServiceById(id));
    }
  }, [dispatch, id]);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:underline mb-4"
      >
        <ArrowLeft className="mr-2" size={18} />
        Back
      </button>

      {loading && <LoaderComponents />}
      {error && <p className="text-red-600 text-center">{error}</p>}

      {!loading && service && (
        <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {service.title}
          </h2>
          <p className="text-gray-600 mb-1">
            <strong>Category:</strong> {service.category}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Description:</strong> {service.description}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Date Added:</strong>{" "}
            {service.createdAt
              ? new Date(service.createdAt).toLocaleDateString()
              : "N/A"}
          </p>

       {service.icon && (
  <p className="text-gray-600 mb-1 break-words whitespace-pre-wrap">
    <strong>Icon:</strong> {service.icon}
  </p>
)}

        </div>
      )}
    </div>
  );
};

export default ServiceDetail;
