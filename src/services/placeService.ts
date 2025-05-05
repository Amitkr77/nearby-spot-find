
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
    return data || [];
  } catch (error) {
    console.error("Error fetching places:", error);
    toast.error("Failed to fetch places");
    return [];
  }
};

export const getPlaceById = async (placeId: string): Promise<PlaceData | null> => {
  try {
    const { data, error } = await supabase
      .from("places")
      .select("*")
      .eq("id", placeId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching place with ID ${placeId}:`, error);
    toast.error("Failed to fetch place details");
    return null;
  }
};

export const savePlace = async (userId: string, placeId: string): Promise<boolean> => {
  try {
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
    } else {
      toast.success("Place saved successfully!");
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
    const { error } = await supabase
      .from("saved_places")
      .delete()
      .match({ user_id: userId, place_id: placeId });

    if (error) throw error;
    toast.success("Place removed from saved places");
    return true;
  } catch (error) {
    console.error("Error removing saved place:", error);
    toast.error("Failed to remove place from saved places");
    return false;
  }
};

export const isPlaceSaved = async (userId: string, placeId: string): Promise<boolean> => {
  try {
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
