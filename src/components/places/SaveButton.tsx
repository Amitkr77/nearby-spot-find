
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { savePlace, unsavePlace, isPlaceSaved } from "@/services/placeService";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface SaveButtonProps {
  placeId: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

const SaveButton = ({ 
  placeId,
  variant = "outline",
  size = "default"
}: SaveButtonProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the place is saved when component mounts
    const checkIfSaved = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      
      // For mock data with non-UUID IDs, check local storage
      if (!placeId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
        const savedPlaces = JSON.parse(localStorage.getItem(`savedPlaces_${user.id}`) || '[]');
        setSaved(savedPlaces.includes(placeId));
        setLoading(false);
        return;
      }
      
      // For real data, check the database
      try {
        const isSaved = await isPlaceSaved(user.id, placeId);
        setSaved(isSaved);
      } catch (error) {
        console.error("Error checking saved status:", error);
      } finally {
        setLoading(false);
      }
    };
    
    checkIfSaved();
  }, [user, placeId]);

  const handleToggleSave = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    
    setLoading(true);
    
    try {
      // For mock data with non-UUID IDs, use localStorage
      if (!placeId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
        const savedPlacesKey = `savedPlaces_${user.id}`;
        const savedPlaces = JSON.parse(localStorage.getItem(savedPlacesKey) || '[]');
        
        if (saved) {
          const updatedPlaces = savedPlaces.filter((id: string) => id !== placeId);
          localStorage.setItem(savedPlacesKey, JSON.stringify(updatedPlaces));
          setSaved(false);
          setTimeout(() => toast.success("Place removed from saved places"), 100);
        } else {
          savedPlaces.push(placeId);
          localStorage.setItem(savedPlacesKey, JSON.stringify(savedPlaces));
          setSaved(true);
          setTimeout(() => toast.success("Place saved successfully!"), 100);
        }
        setLoading(false);
        return;
      }
      
      // For real data, use the database
      if (saved) {
        const success = await unsavePlace(user.id, placeId);
        if (success) setSaved(false);
      } else {
        const success = await savePlace(user.id, placeId);
        if (success) setSaved(true);
      }
    } catch (error) {
      console.error("Error toggling save:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleToggleSave}
      variant={saved ? "default" : variant}
      size={size}
      disabled={loading}
      aria-label={saved ? "Remove from saved places" : "Save this place"}
      className={`${saved ? "bg-rose-500 hover:bg-rose-600" : ""} animate-fade-in transition-all`}
    >
      <Heart className={`${saved ? "fill-white" : ""} mr-2 transition-all duration-300`} size={18} />
      <span>{saved ? "Saved" : "Save"}</span>
    </Button>
  );
};

export default SaveButton;
