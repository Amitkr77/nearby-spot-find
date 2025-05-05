
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import PlaceCard, { Place } from "@/components/search/PlaceCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Mock data for saved places
const mockSavedPlaces: Place[] = [
  {
    id: "1",
    name: "Grand Plaza Hotel",
    category: "Hotel",
    address: "123 Main Street, New York, NY",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    name: "City General Hospital",
    category: "Hospital",
    address: "456 Health Avenue, New York, NY",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    name: "Italiano Restaurant",
    category: "Restaurant",
    address: "789 Taste Street, New York, NY",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "4",
    name: "Central Pharmacy",
    category: "Pharmacy",
    address: "101 Health Lane, New York, NY",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1575991473588-5b5c39174df3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
];

const SavedPlacesPage = () => {
  const [savedPlaces, setSavedPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSavedPlaces = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // In a real app, you would fetch saved places from an API
        setSavedPlaces(mockSavedPlaces);
      } catch (error) {
        console.error("Error fetching saved places:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedPlaces();
  }, []);

  return (
    <Layout>
      <div className="container py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-2">Saved Places</h1>
          <p className="text-muted-foreground">
            Your bookmarked locations for quick access
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : savedPlaces.length === 0 ? (
          <div className="bg-white border rounded-lg p-12 text-center">
            <h2 className="text-xl font-semibold mb-2">No saved places</h2>
            <p className="text-muted-foreground mb-6">
              You haven't saved any places yet. Start exploring to add places to your favorites!
            </p>
            <Button asChild>
              <Link to="/search">Start Exploring</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {savedPlaces.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SavedPlacesPage;
