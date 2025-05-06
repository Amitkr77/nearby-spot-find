
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SearchBar from "@/components/search/SearchBar";
import PlaceCard, { Place } from "@/components/search/PlaceCard";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const DashboardPage = () => {
  const { user } = useAuth();
  const [recentPlaces, setRecentPlaces] = useState<Place[]>([]);
  const [savedPlaces, setSavedPlaces] = useState<Place[]>([]);
  const [recentSearches, setRecentSearches] = useState<{id: number, query: string}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedPlaces = async () => {
      if (!user) return;
      
      try {
        // Fetch saved places
        const { data: savedPlacesData, error: savedPlacesError } = await supabase
          .from('saved_places')
          .select('place_id')
          .eq('user_id', user.id)
          .limit(3);

        if (savedPlacesError) throw savedPlacesError;

        if (savedPlacesData && savedPlacesData.length > 0) {
          const placeIds = savedPlacesData.map(item => item.place_id);
          
          const { data: placesData, error: placesError } = await supabase
            .from('places')
            .select('*')
            .in('id', placeIds);

          if (placesError) throw placesError;

          const formattedPlaces: Place[] = placesData.map(place => ({
            id: place.id,
            name: place.name,
            category: place.category,
            address: place.address,
            rating: place.rating,
            image: place.image_url,
            description: place.description,
            phone: place.phone,
            website: place.website,
            hours: place.hours
          }));
          
          setSavedPlaces(formattedPlaces);
        }
      } catch (error) {
        console.error("Error fetching saved places:", error);
        toast.error("Failed to fetch saved places");
      } finally {
        setLoading(false);
      }
    };

    // We would fetch recent views if we had that functionality
    // For now, use some sample data for recent places
    setRecentPlaces([
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
    ]);

    // Set sample recent searches
    setRecentSearches([
      { id: 1, query: "Hotels near Central Park" },
      { id: 2, query: "Restaurants in Downtown" },
      { id: 3, query: "Hospitals in Brooklyn" },
      { id: 4, query: "ATMs near me" },
    ]);

    fetchSavedPlaces();
  }, [user]);

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || "User";

  return (
    <Layout>
      <div className="container py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome, {userName}</h1>
          <p className="text-muted-foreground">
            Search and manage your favorite places
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
          <h2 className="text-lg font-medium mb-4">Quick Search</h2>
          <SearchBar />
        </div>

        <Tabs defaultValue="recent" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="recent">Recently Viewed</TabsTrigger>
            <TabsTrigger value="saved">Saved Places</TabsTrigger>
            <TabsTrigger value="searches">Recent Searches</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recent" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPlaces.length > 0 ? (
                recentPlaces.map((place) => (
                  <PlaceCard key={place.id} place={place} />
                ))
              ) : (
                <div className="col-span-full text-center p-10">
                  <p className="text-muted-foreground mb-4">
                    You haven't viewed any places yet.
                  </p>
                  <Button asChild>
                    <Link to="/search">Start Exploring</Link>
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="saved" className="animate-fade-in">
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedPlaces.length > 0 ? (
                  savedPlaces.map((place) => (
                    <PlaceCard key={place.id} place={place} />
                  ))
                ) : (
                  <div className="col-span-full text-center p-10">
                    <p className="text-muted-foreground mb-4">
                      You haven't saved any places yet.
                    </p>
                    <Button asChild>
                      <Link to="/search">Start Exploring</Link>
                    </Button>
                  </div>
                )}
              </div>
            )}

            {savedPlaces.length > 0 && (
              <div className="mt-6 text-center">
                <Button asChild variant="outline">
                  <Link to="/saved">View All Saved Places</Link>
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="searches" className="animate-fade-in">
            <div className="bg-white rounded-lg border overflow-hidden">
              <div className="p-4 space-y-2">
                {recentSearches.length > 0 ? (
                  recentSearches.map((search) => (
                    <Link
                      key={search.id}
                      to={`/search?q=${encodeURIComponent(search.query)}`}
                      className="flex items-center p-3 hover:bg-gray-50 rounded-md"
                    >
                      <Search className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{search.query}</span>
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      No recent searches found.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

const Search = ({ className, ...props }: React.ComponentProps<"svg">) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
};

export default DashboardPage;
