import { FaGithub } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-zinc-900 border-t border-zinc-800 py-4 px-6 mt-auto">
      <div className="flex justify-between items-center">
        <div className="text-zinc-400 text-sm">
          © {currentYear} • All Rights Reserved • Licensed under MIT
        </div>
        
        <a 
          href="https://github.com/Nanokwok/WhyDoToday" 
          target="_blank" 
          rel="noopener noreferrer"
          className="!text-zinc-400 hover:!text-zinc-100 transition-colors"
          aria-label="GitHub Repository"
        >
          <FaGithub size={20}/>
        </a>
      </div>
    </footer>
  );
};

export default Footer;