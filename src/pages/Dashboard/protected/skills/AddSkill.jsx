import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addSkill } from "../../../../features/skills/skillsSlice";
import InputField from "../../../../components/UI/Input/InputField";
import { Code, Link } from "lucide-react";

const AddSkill = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message } = useSelector((state) => state.skills);
  const [formData, setFormData] = useState({
    name: "",
    level: "Beginner",
    icon: "",
    category: "Frontend",
  });

  const levels = ["Beginner", "Intermediate", "Advanced"];
  const categories = ["Frontend", "Backend","Full Stack", "Database", "Tools", "Other"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addSkill(formData))
      .unwrap()
      .then(() => {
        navigate("/dashboard/skills");
      })
      .catch((err) => {
        console.error("Failed to add skill:", err);
      });
   

  
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Add Skill</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <InputField
            label="Skill Name"
            placeholder="Enter skill name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            icon={Code}
            required
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        <div>
          <label className="block mb-1  text-gray-700">Level</label>
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 text-gray-400"
          >
            {levels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <div>
          <InputField
            label="Icon"
            placeholder="icon url"
            type="url"
            name="icon"
            value={formData.icon}
            onChange={handleChange}
            required
            icon={Link}
            
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        <div>
          <label className="block mb-1  text-gray-700">Category</label>
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

        <button
          type="submit"
          // disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Adding..." : "Add Skill"}
        </button>
      </form>

      {message && <p className="mt-4 text-center text-red-600">{message}</p>}
    </div>
  );
};

export default AddSkill;
