import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addService } from "../../../../features/services/servicesSlice";
import InputField from "../../../../components/UI/Input/InputField";

const AddService = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message } = useSelector((state) => state.services);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "",
    category: "Frontend",
    status: "active", // Adding the status field with a default value
  });

  const categories = ["Frontend", "Backend", "Database", "Tools", "Other"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addService(formData))
      .unwrap()
      .then(() => {
        navigate("/dashboard/services");
      })
      .catch((err) => {
        console.error("Failed to add service:", err);
      });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Add Service</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <InputField
            label="Service Title"
            placeholder="Enter service title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter service description"
            required
            className="w-full border border-gray-300 rounded p-2 text-gray-400"
            rows="4"
          ></textarea>
        </div>

        <div>
          <InputField
            label="Icon"
            placeholder="Enter a lucide-icon name"
            type="text"
            name="icon"
            value={formData.icon}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded p-2 text-gray-400"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 text-gray-400"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Adding..." : "Add Service"}
        </button>
      </form>

      {message && <p className="mt-4 text-center text-red-600">{message}</p>}
    </div>
  );
};

export default AddService;
