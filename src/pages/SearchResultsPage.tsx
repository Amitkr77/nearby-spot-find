
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SearchBar from "@/components/search/SearchBar";
import PlaceCard, { Place } from "@/components/search/PlaceCard";
import MapView from "@/components/map/MapView";
import { Button } from "@/components/ui/button";
import { getPlaces } from "@/services/placeService";

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
    // Fetch places using our placeService
    const fetchPlaces = async () => {
      setIsLoading(true);
      try {
        // Use the placeService to get places by category and location
        const fetchedPlaces = await getPlaces(category, location);
        setPlaces(fetchedPlaces);
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
