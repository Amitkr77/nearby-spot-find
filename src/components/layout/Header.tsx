
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, User, LogOut, Menu, X, Search, Heart } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useMobileDetect } from "@/hooks/use-mobile";

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMobileDetect();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  const getUserInitials = () => {
    if (!user) return "U";
    
    // Try to get initials from email
    const email = user.email || "";
    if (email) {
      return email[0].toUpperCase();
    }
    
    return "U";
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/search", label: "Explore" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-md py-2" 
          : "bg-transparent py-4"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary rounded-full p-1.5">
            <MapPin className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl">SpotEase</span>
        </Link>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-700 hover:text-primary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map(link => (
            <Link 
              key={link.path}
              to={link.path} 
              className={cn(
                "text-foreground hover:text-primary transition-colors relative py-1.5",
                isActive(link.path) && "text-primary font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("/search")}
            className="hover:bg-gray-100"
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>

          {user ? (
            <>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate("/saved")}
                className="hover:bg-gray-100"
              >
                <Heart className="h-4 w-4 mr-2" />
                Saved
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0 hover:bg-gray-100">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.user_metadata?.avatar_url} />
                      <AvatarFallback className="bg-primary text-white">{getUserInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-2">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/dashboard")} className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/saved")} className="cursor-pointer">
                    <Heart className="mr-2 h-4 w-4" />
                    <span>Saved Places</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/login")}
                className="hover:bg-gray-100"
              >
                Login
              </Button>
              <Button 
                onClick={() => navigate("/register")}
                size="sm"
                className="bg-primary hover:bg-primary/90"
              >
                Register
              </Button>
            </>
          )}
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg p-4 md:hidden animate-fade-in border-t">
            <nav className="flex flex-col space-y-4">
              {navLinks.map(link => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className={cn(
                    "text-foreground hover:text-primary transition-colors p-2",
                    isActive(link.path) && "text-primary font-medium bg-gray-50 rounded"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t pt-4">
                {user ? (
                  <>
                    <div className="flex items-center mb-4 p-2">
                      <Avatar className="h-8 w-8 mr-3">
                        <AvatarImage src={user.user_metadata?.avatar_url} />
                        <AvatarFallback className="bg-primary text-white">{getUserInitials()}</AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{user.email}</div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        navigate("/dashboard");
                        setMobileMenuOpen(false);
                      }}
                      className="w-full justify-start mb-2"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        navigate("/saved");
                        setMobileMenuOpen(false);
                      }}
                      className="w-full justify-start mb-2"
                    >
                      <Heart className="mr-2 h-4 w-4" />
                      Saved Places
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </Button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        navigate("/login");
                        setMobileMenuOpen(false);
                      }}
                    >
                      Login
                    </Button>
                    <Button 
                      onClick={() => {
                        navigate("/register");
                        setMobileMenuOpen(false);
                      }}
                    >
                      Register
                    </Button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
