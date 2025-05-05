import React from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa"; // Example social icons
import { FaSquareXTwitter } from "react-icons/fa6";

// This function maps platform names to their respective icons
const getIcon = (platform) => {
  switch (platform) {
    case "github":
      return <FaGithub className="mr-2 text-4xl text-[#EDEDED]" />;
    case "linkedin":
      return <FaLinkedin className="mr-2 text-4xl text-blue-500" />;
    case "twitter":
      return <FaSquareXTwitter className="mr-2 text-4xl text-black" />;
    case "instagram":
      return <FaInstagram className="mr-2 text-4xl text-pink-500" />;
    case "youtube":
      return <FaYoutube className="mr-2 text-4xl text-red-600" />;
    default:
      return null;
  }
};

const SocialLinksCard = ({ socialLinks, color = 'bg-transparent' }) => {
  return (
    <div className={`w-fit  p-2  rounded-lg  my-4 ${color}`}>
      <div className="text-left flex justify-start space-y-2">
        {Object.entries(socialLinks || {}).map(([platform, url]) => (
          <div key={platform} className=" space-x-3 text-sm">
            <a
              href={url}
              target="_blank"
              title={platform}
              rel="noopener noreferrer"
              className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            >
              
              <span className="hover:scale-125 mx-2 duration-300">{getIcon(platform)}</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialLinksCard;
