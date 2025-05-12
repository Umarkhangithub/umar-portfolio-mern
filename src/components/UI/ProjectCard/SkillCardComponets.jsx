import React from "react";
import { Code } from "lucide-react"; // fallback icon

const SkillCardComponents = ({ name, level, Icon, category }) => {
  const RenderedIcon = Icon || Code; // Fallback to Code icon

  return (
    <div className="bg-[#0F0F0F] rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
    <div className="flex items-center justify-center mb-6">
        <img
          src={Icon}
          alt={name}
          className="w-24 h-24 rounded-full object-cover border border-[#00A8E8] "
        />
      </div>

      <h3 className="text-xl font-semibold text-center mb-2">{name}</h3>
      <p className="text-sm text-[#BDC3C7] text-center mb-4">{category}</p>
      <div className="text-center">
        <span className="inline-block bg-[#00A8E8] text-[#1C1C1C] px-4 py-1 rounded text-sm font-medium">
          Level: {level}
        </span>
      </div>
    </div>
  );
};

export default SkillCardComponents;
