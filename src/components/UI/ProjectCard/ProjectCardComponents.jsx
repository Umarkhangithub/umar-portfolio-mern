import { Eye, Github, Calendar, CalendarClock } from "lucide-react";
import { Link } from "react-router-dom";

// Format date to a readable string
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const ProjectCardComponents = ({
  image,
  title,
  description,
  techStack,
  githubLink,
  liveDemo,
  createdAt,
  updatedAt,
}) => {
  return (
    <div className="bg-[#0F0F0F] text-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
      <img
        src={image}
        alt={title}
        className="w-full h-52 object-cover transition-transform hover:scale-105 duration-300 p-4 rounded-t-xl"
        loading="lazy" // Lazy load the image
      />
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 border-b border-slate-700 pb-2">{title}</h3>
        <p className="text-gray-300 text-sm mb-2">{description}</p>
        <p className="text-[#00A8E8] text-xs font-mono mb-4">{techStack}</p>

        <div className="text-gray-400 text-xs space-y-1 mb-5">
          {createdAt && (
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>Created: {formatDate(createdAt)}</span>
            </div>
          )}
          {updatedAt && (
            <div className="flex items-center">
              <CalendarClock className="w-4 h-4 mr-1" />
              <span>Updated: {formatDate(updatedAt)}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#00A8E8] hover:bg-[#008FB3] text-white px-4 py-2 rounded-md font-medium transition duration-300 ease-in-out"
          >
            <Eye className="w-4 h-4" />
            View Project
          </a>
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md font-medium transition duration-300 ease-in-out"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCardComponents;
