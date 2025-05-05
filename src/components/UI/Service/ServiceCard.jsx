// src/components/UI/ServiceCard/ServiceCard.js
import React from "react";

const ServiceCard = ({ icon, title, description, category }) => {
  return (
    <div className="bg-[#0F0F0F] p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <div className="flex items-center justify-center mb-6">
        <img
          src={icon}
          alt={title}
          className="w-24 h-24 rounded-full object-cover border border-[#00A8E8] "
        />
      </div>
      <h3 className="text-xl font-semibold text-[#00A8E8]">{title}</h3>
      <p className="text-sm text-[#BDC3C7] mt-2">{description}</p>
      <p className="text-sm text-[#BDC3C7] mt-4">
        <span className="font-semibold text-[#00A8E8]">Category:</span> {category}
      </p>
    </div>
  );
};

export default ServiceCard;
