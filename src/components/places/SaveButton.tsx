
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { savePlace, unsavePlace, isPlaceSaved } from "@/services/placeService";
import { useNavigate } from "react-router-dom";

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
      
      const isSaved = await isPlaceSaved(user.id, placeId);
      setSaved(isSaved);
      setLoading(false);
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
      if (saved) {
        const success = await unsavePlace(user.id, placeId);
        if (success) setSaved(false);
      } else {
        const success = await savePlace(user.id, placeId);
        if (success) setSaved(true);
      }
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
