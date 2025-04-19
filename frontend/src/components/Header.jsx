import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants";

const Header = () => {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (token) {
        const storedUsername = localStorage.getItem("username");
        setUsername(storedUsername || "");
      }
      setIsLoading(false);
    };

    checkAuth();

    const handleStorageChange = (e) => {
      if (e.key === ACCESS_TOKEN || e.key === "username") {
        checkAuth();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem("username");
    setUsername("");
    navigate("/login");
  };

  if (isLoading) {
    return (
      <header className="bg-zinc-900 border-b border-zinc-800 py-4 px-6">
        <div className="animate-pulse h-6 w-40 bg-zinc-700 rounded" />
      </header>
    );
  }

  return (
    <header className="bg-zinc-900 border-b border-zinc-800 py-4 px-6 flex justify-between items-center">
      <div className="flex items-center">
        <h2 className="text-xl font-bold text-zinc-100">Why Do (It) Today?</h2>
      </div>
      
      <div className="flex items-center gap-4 text-zinc-100">
        {username ? (
          <div className="flex items-center gap-2">
            <User size={16} className="text-zinc-400" />
            <span className="font-medium">{username}</span>
          </div>
        ) : (
          <span className="text-zinc-400">No User</span>
        )}
        
        {username && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleSignOut}
            className="!bg-zinc-900 !text-zinc-300 hover:!text-zinc-100 !border-zinc-700 hover:!bg-zinc-800 transition-colors"
          >
            <LogOut size={16} className="mr-2" />
            Sign Out
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;