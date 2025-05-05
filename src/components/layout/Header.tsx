
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Placeholder for actual auth logic
  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <header className="border-b bg-white shadow-sm py-4">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <MapPin className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">NearbyEssentials</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/search" className="text-foreground hover:text-primary transition-colors">
            Explore
          </Link>
          <Link to="/about" className="text-foreground hover:text-primary transition-colors">
            About
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Button variant="ghost" onClick={() => navigate("/dashboard")}>
                Dashboard
              </Button>
              <Button variant="ghost" onClick={() => navigate("/saved")}>
                Saved Places
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button onClick={() => navigate("/register")}>
                Register
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
