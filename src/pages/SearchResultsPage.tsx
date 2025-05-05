
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SearchBar from "@/components/search/SearchBar";
import PlaceCard, { Place } from "@/components/search/PlaceCard";
import MapView from "@/components/map/MapView";
import { Button } from "@/components/ui/button";

// Mock data for search results
const mockPlaces: Place[] = [
  {
    id: "1",
    name: "Grand Plaza Hotel",
    category: "Hotel",
    address: "123 Main Street, New York, NY",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    distance: "2.5 miles",
  },
  {
    id: "2",
    name: "City General Hospital",
    category: "Hospital",
    address: "456 Health Avenue, New York, NY",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    distance: "3.2 miles",
  },
  {
    id: "3",
    name: "Italiano Restaurant",
    category: "Restaurant",
    address: "789 Taste Street, New York, NY",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    distance: "1.8 miles",
  },
  {
    id: "4",
    name: "Central Pharmacy",
    category: "Pharmacy",
    address: "101 Health Lane, New York, NY",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1575991473588-5b5c39174df3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    distance: "2.1 miles",
  },
  {
    id: "5",
    name: "Downtown Shopping Mall",
    category: "Shopping",
    address: "202 Commerce Avenue, New York, NY",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1610513320995-1ad4bbf25e55?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    distance: "1.5 miles",
  },
  {
    id: "6",
    name: "Community Bank ATM",
    category: "ATM",
    address: "303 Finance Street, New York, NY",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    distance: "0.8 miles",
  },
];

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "";
  const location = searchParams.get("location") || "";
  const query = searchParams.get("q") || "";

  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | undefined>();
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

  useEffect(() => {
    // Simulate API call to fetch places based on search params
    const fetchPlaces = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        let filteredPlaces = [...mockPlaces];
        
        // Filter by category if provided
        if (category) {
          filteredPlaces = filteredPlaces.filter(place => 
            place.category.toLowerCase() === category.toLowerCase()
          );
        }
        
        // Sort by distance (closest first)
        filteredPlaces.sort((a, b) => {
          const distA = parseFloat((a.distance || "0").split(" ")[0]);
          const distB = parseFloat((b.distance || "0").split(" ")[0]);
          return distA - distB;
        });
        
        setPlaces(filteredPlaces);
      } catch (error) {
        console.error("Error fetching places:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaces();
  }, [category, location, query]);

  const handleSelectPlace = (placeId: string) => {
    setSelectedPlaceId(placeId);
    
    // Scroll to the selected place in the list view
    if (viewMode === "grid") {
      const placeElement = document.getElementById(`place-${placeId}`);
      if (placeElement) {
        placeElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Create a search summary based on search params
  let searchSummary = "All Places";
  if (category) {
    searchSummary = `${category.charAt(0).toUpperCase() + category.slice(1)}`;
  }
  if (location) {
    searchSummary += ` in ${location}`;
  }
  if (query) {
    searchSummary = query;
  }

  return (
    <Layout>
      <div className="container py-10">
        <div className="mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <SearchBar />
          </div>
        </div>
        
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">
              {isLoading ? "Searching..." : `${places.length} Results Found`}
            </h1>
            <p className="text-muted-foreground">
              {searchSummary}
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              Grid
            </Button>
            <Button
              variant={viewMode === "map" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("map")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                <line x1="8" y1="2" x2="8" y2="18" />
                <line x1="16" y1="6" x2="16" y2="22" />
              </svg>
              Map
            </Button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : places.length === 0 ? (
          <div className="bg-white border rounded-lg p-12 text-center">
            <h2 className="text-xl font-semibold mb-2">No results found</h2>
            <p className="text-muted-foreground mb-6">
              We couldn't find any places matching your search criteria.
            </p>
            <Button onClick={() => window.history.back()}>
              Go Back
            </Button>
          </div>
        ) : (
          viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {places.map((place) => (
                <div key={place.id} id={`place-${place.id}`}>
                  <PlaceCard place={place} />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-300px)]">
              <div className="overflow-auto md:col-span-1 order-2 md:order-1">
                {places.map((place) => (
                  <div
                    key={place.id}
                    className={`mb-4 cursor-pointer ${
                      selectedPlaceId === place.id ? "ring-2 ring-primary rounded-lg" : ""
                    }`}
                    onClick={() => handleSelectPlace(place.id)}
                  >
                    <PlaceCard place={place} />
                  </div>
                ))}
              </div>
              <div className="md:col-span-2 h-[400px] md:h-full order-1 md:order-2">
                <MapView
                  places={places}
                  selectedPlaceId={selectedPlaceId}
                  onSelectPlace={handleSelectPlace}
                />
              </div>
            </div>
          )
        )}
      </div>
    </Layout>
  );
};

export default SearchResultsPage;
