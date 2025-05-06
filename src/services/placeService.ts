
import { supabase } from "@/integrations/supabase/client";
import { PlaceData, SavedPlace } from "@/types/supabase";
import { toast } from "sonner";

export const getPlaces = async (
  category?: string,
  query?: string,
  location?: string
): Promise<PlaceData[]> => {
  try {
    let queryBuilder = supabase
      .from("places")
      .select("*");

    // Filter by category if provided
    if (category) {
      queryBuilder = queryBuilder.ilike("category", `%${category}%`);
    }

    // Filter by query if provided (search in name or description)
    if (query) {
      queryBuilder = queryBuilder.or(`name.ilike.%${query}%,description.ilike.%${query}%`);
    }

    // Filter by location if provided (basic implementation)
    if (location) {
      queryBuilder = queryBuilder.ilike("address", `%${location}%`);
    }

    const { data, error } = await queryBuilder;

    if (error) throw error;
    return data as PlaceData[] || [];
  } catch (error) {
    console.error("Error fetching places:", error);
    toast.error("Failed to fetch places");
    return [];
  }
};

export const getPlaceById = async (placeId: string): Promise<PlaceData | null> => {
  try {
    // Handle non-UUID IDs (for mock data)
    if (!placeId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
      // For mock data - return a fallback mock place based on ID
      return {
        id: placeId,
        name: placeId === "1" ? "Grand Plaza Hotel" : placeId === "2" ? "City General Hospital" : `Place ${placeId}`,
        category: placeId === "1" ? "Hotel" : placeId === "2" ? "Hospital" : "Place",
        address: `${placeId === "1" ? "123 Main Street" : placeId === "2" ? "456 Health Avenue" : `${placeId} Some Street`}, New York, NY`,
        rating: 4.5,
        image_url: placeId === "1" 
          ? "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
          : placeId === "2" 
          ? "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
          : "https://images.unsplash.com/photo-1577791465485-b80039b4d69a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: `Description for place ${placeId}`,
        phone: "+1 (555) 123-4567",
        website: "https://example.com",
        hours: "24 hours",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as PlaceData;
    }

    // For real Supabase data
    const { data, error } = await supabase
      .from("places")
      .select("*")
      .eq("id", placeId)
      .single();

    if (error) throw error;
    return data as PlaceData;
  } catch (error) {
    console.error(`Error fetching place with ID ${placeId}:`, error);
    toast.error("Failed to fetch place details");
    return null;
  }
};

export const savePlace = async (userId: string, placeId: string): Promise<boolean> => {
  try {
    // Handle non-UUID IDs (for mock data)
    if (!placeId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
      // For mock data, save to localStorage
      const savedPlacesKey = `savedPlaces_${userId}`;
      const savedPlaces = JSON.parse(localStorage.getItem(savedPlacesKey) || '[]');
      if (!savedPlaces.includes(placeId)) {
        savedPlaces.push(placeId);
        localStorage.setItem(savedPlacesKey, JSON.stringify(savedPlaces));
      }
      return true;
    }
    
    const { error } = await supabase
      .from("saved_places")
      .insert({ user_id: userId, place_id: placeId });

    if (error) {
      // Check if it's a duplicate entry error
      if (error.code === "23505") { // Postgres unique violation code
        toast.error("This place is already saved");
      } else {
        throw error;
      }
    }
    return !error;
  } catch (error) {
    console.error("Error saving place:", error);
    toast.error("Failed to save place");
    return false;
  }
};

export const unsavePlace = async (userId: string, placeId: string): Promise<boolean> => {
  try {
    // Handle non-UUID IDs (for mock data)
    if (!placeId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
      // For mock data, remove from localStorage
      const savedPlacesKey = `savedPlaces_${userId}`;
      const savedPlaces = JSON.parse(localStorage.getItem(savedPlacesKey) || '[]');
      const updatedPlaces = savedPlaces.filter((id: string) => id !== placeId);
      localStorage.setItem(savedPlacesKey, JSON.stringify(updatedPlaces));
      return true;
    }
    
    const { error } = await supabase
      .from("saved_places")
      .delete()
      .match({ user_id: userId, place_id: placeId });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error removing saved place:", error);
    toast.error("Failed to remove place from saved places");
    return false;
  }
};

export const isPlaceSaved = async (userId: string, placeId: string): Promise<boolean> => {
  try {
    // Handle non-UUID IDs (for mock data)
    if (!placeId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
      // For mock data, check localStorage
      const savedPlaces = JSON.parse(localStorage.getItem(`savedPlaces_${userId}`) || '[]');
      return savedPlaces.includes(placeId);
    }
    
    const { data, error } = await supabase
      .from("saved_places")
      .select("id")
      .match({ user_id: userId, place_id: placeId });

    if (error) throw error;
    return (data && data.length > 0) || false;
  } catch (error) {
    console.error("Error checking if place is saved:", error);
    return false;
  }
};
