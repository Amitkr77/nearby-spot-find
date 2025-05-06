
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import PlaceCard, { Place } from "@/components/search/PlaceCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { getPlaceById } from "@/services/placeService";

const SavedPlacesPage = () => {
  const [savedPlaces, setSavedPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchSavedPlaces = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        // First, handle localStorage saved places (for non-UUID mock data)
        const savedPlacesLocalKey = `savedPlaces_${user.id}`;
        const localSavedPlaces = JSON.parse(localStorage.getItem(savedPlacesLocalKey) || '[]');
        
        // Fetch local saved places details
        const localPlacesData: Place[] = [];
        for (const placeId of localSavedPlaces) {
          try {
            const placeData = await getPlaceById(placeId);
            if (placeData) {
              localPlacesData.push({
                id: placeData.id,
                name: placeData.name,
                category: placeData.category,
                address: placeData.address,
                rating: placeData.rating || 0,
                image: placeData.image_url || '',
                description: placeData.description,
              });
            }
          } catch (error) {
            console.error(`Error fetching local place ${placeId}:`, error);
          }
        }

        // Then fetch database saved places
        const { data: savedPlacesData, error: savedPlacesError } = await supabase
          .from('saved_places')
          .select('place_id')
          .eq('user_id', user.id);

        if (savedPlacesError) throw savedPlacesError;

        let dbPlacesData: Place[] = [];
        if (savedPlacesData && savedPlacesData.length > 0) {
          // Extract place IDs
          const placeIds = savedPlacesData.map(item => item.place_id);
          
          // Fetch place details for saved places
          const { data: placesData, error: placesError } = await supabase
            .from('places')
            .select('*')
            .in('id', placeIds);

          if (placesError) throw placesError;

          // Transform the data to match our Place type
          dbPlacesData = placesData.map(place => ({
            id: place.id,
            name: place.name,
            category: place.category,
            address: place.address,
            rating: place.rating || 0,
            image: place.image_url || '',
            description: place.description,
            phone: place.phone,
            website: place.website,
            hours: place.hours
          }));
        }
        
        // Combine both local and database saved places
        setSavedPlaces([...localPlacesData, ...dbPlacesData]);
      } catch (error) {
        console.error("Error fetching saved places:", error);
        toast.error("Failed to fetch saved places");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedPlaces();
  }, [user]);

  return (
    <Layout>
      <div className="container py-10 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-2 animate-slide-up">Saved Places</h1>
          <p className="text-muted-foreground animate-slide-up" style={{animationDelay: "0.1s"}}>
            Your bookmarked locations for quick access
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : savedPlaces.length === 0 ? (
          <div className="bg-white border rounded-lg p-12 text-center animate-scale-in">
            <h2 className="text-xl font-semibold mb-2">No saved places</h2>
            <p className="text-muted-foreground mb-6">
              You haven't saved any places yet. Start exploring to add places to your favorites!
            </p>
            <Button asChild className="animate-pulse">
              <Link to="/search">Start Exploring</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {savedPlaces.map((place, index) => (
              <div key={place.id} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <PlaceCard place={place} />
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SavedPlacesPage;
