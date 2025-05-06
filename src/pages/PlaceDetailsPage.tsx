import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import MapView from "@/components/map/MapView";
import { MapPin, Phone, Globe, Clock, Star, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import SaveButton from "@/components/places/SaveButton";
import { getPlaceById } from "@/services/placeService";

// Mock data for place details
const mockPlaceDetails = {
  id: "1",
  name: "Grand Plaza Hotel",
  category: "Hotel",
  address: "123 Main Street, New York, NY",
  phone: "+1 (555) 123-4567",
  website: "https://example.com",
  rating: 4.8,
  totalReviews: 324,
  description: "Located in the heart of the city, Grand Plaza Hotel offers luxurious rooms with stunning views. Enjoy our rooftop restaurant, spa facilities, and premium amenities during your stay.",
  hours: [
    { day: "Monday", open: "24 hours" },
    { day: "Tuesday", open: "24 hours" },
    { day: "Wednesday", open: "24 hours" },
    { day: "Thursday", open: "24 hours" },
    { day: "Friday", open: "24 hours" },
    { day: "Saturday", open: "24 hours" },
    { day: "Sunday", open: "24 hours" },
  ],
  amenities: ["Free Wi-Fi", "Parking", "Swimming Pool", "Restaurant", "Fitness Center", "Spa"],
  images: [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1560200353-ce0a76b1d438?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
  ],
};

const PlaceDetailsPage = () => {
  const { placeId } = useParams<{ placeId: string }>();
  const [place, setPlace] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      setIsLoading(true);
      try {
        if (!placeId) {
          throw new Error("Place ID is missing");
        }
        
        // Try to fetch real place data from Supabase
        const placeData = await getPlaceById(placeId);
        
        if (placeData) {
          setPlace({
            ...placeData,
            images: [placeData.image_url || "https://images.unsplash.com/photo-1566073771259-6a8506099945"],
            totalReviews: 324, // Placeholder data
            amenities: ["Free Wi-Fi", "Parking", "Restaurant"], // Placeholder data
          });
        } else {
          // Fallback to mock data for development
          setPlace({
            ...mockPlaceDetails,
            id: placeId,
          });
        }
      } catch (error) {
        console.error("Error fetching place details:", error);
        toast.error("Error loading place details");
      } finally {
        setIsLoading(false);
      }
    };

    if (placeId) {
      fetchPlaceDetails();
    }
  }, [placeId]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === place.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? place.images.length - 1 : prevIndex - 1
    );
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-10 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!place) {
    return (
      <Layout>
        <div className="container py-10 animate-fade-in">
          <div className="bg-white border rounded-lg p-12 text-center">
            <h2 className="text-xl font-semibold mb-2">Place not found</h2>
            <p className="text-muted-foreground mb-6">
              The place you are looking for does not exist or has been removed.
            </p>
            <Button asChild className="animate-pulse">
              <Link to="/search">Explore Other Places</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-10 animate-fade-in">
        <div className="mb-6">
          <Button variant="ghost" className="mb-4 transition-all duration-300 hover:translate-x-[-5px]" asChild>
            <Link to="/search">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to search results
            </Link>
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="animate-slide-up">
              <h1 className="text-3xl font-semibold">{place.name}</h1>
              <p className="text-muted-foreground flex items-center mt-2">
                <MapPin className="h-4 w-4 mr-1" />
                {place.address}
              </p>
            </div>
            
            <div className="flex items-center gap-2 animate-slide-up" style={{animationDelay: "0.1s"}}>
              <div className="flex items-center text-amber-500 p-2 rounded-md bg-amber-50 transition-all hover:bg-amber-100">
                <Star className="h-5 w-5 fill-current mr-1" />
                <span className="font-medium">{place.rating}</span>
                <span className="text-muted-foreground text-sm ml-1">({place.totalReviews})</span>
              </div>
              
              {placeId && <SaveButton placeId={placeId} />}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="relative aspect-[16/9] mb-6 rounded-lg overflow-hidden animate-scale-in">
              <img
                src={place.images[currentImageIndex]}
                alt={place.name}
                className="w-full h-full object-cover transition-opacity duration-500"
              />
              
              {place.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-all hover:scale-110"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-all hover:scale-110"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                  
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
                    {place.images.map((_, index) => (
                      <div
                        key={index}
                        className={`h-2 w-2 rounded-full transition-all duration-300 ${
                          index === currentImageIndex ? "bg-white scale-125" : "bg-white/50"
                        }`}
                      ></div>
                    ))}
                  </div>
                </>
              )}
            </div>
            
            <div className="space-y-6">
              {/* Description */}
              <div className="bg-white p-6 rounded-lg shadow-sm border animate-fade-in transition-all hover:shadow-md" style={{animationDelay: "0.2s"}}>
                <h2 className="text-xl font-medium mb-4">About</h2>
                <p className="text-muted-foreground">{place.description}</p>
              </div>
              
              {/* Amenities */}
              <div className="bg-white p-6 rounded-lg shadow-sm border animate-fade-in transition-all hover:shadow-md" style={{animationDelay: "0.3s"}}>
                <h2 className="text-xl font-medium mb-4">Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2">
                  {place.amenities.map((amenity: string, index: number) => (
                    <div key={amenity} className="flex items-center text-muted-foreground animate-fade-in" style={{animationDelay: `${0.4 + index * 0.05}s`}}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div>
            {/* Contact Info */}
            <div className="bg-white p-6 rounded-lg shadow-sm border mb-6 animate-fade-in transition-all hover:shadow-md" style={{animationDelay: "0.2s"}}>
              <h2 className="text-xl font-medium mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start transition-all hover:translate-x-1">
                  <MapPin className="h-5 w-5 mr-3 text-muted-foreground" />
                  <span>{place.address}</span>
                </div>
                
                <div className="flex items-start transition-all hover:translate-x-1">
                  <Phone className="h-5 w-5 mr-3 text-muted-foreground" />
                  <span>{place.phone}</span>
                </div>
                
                <div className="flex items-start transition-all hover:translate-x-1">
                  <Globe className="h-5 w-5 mr-3 text-muted-foreground" />
                  <a
                    href={place.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline transition-all"
                  >
                    Visit Website
                  </a>
                </div>
              </div>
            </div>
            
            {/* Opening Hours */}
            <div className="bg-white p-6 rounded-lg shadow-sm border mb-6 animate-fade-in transition-all hover:shadow-md" style={{animationDelay: "0.3s"}}>
              <h2 className="text-xl font-medium mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                Opening Hours
              </h2>
              <div className="space-y-2">
                {Array.isArray(place.hours) && place.hours.map((hour: { day: string; open: string }, index: number) => (
                  <div key={hour.day} className="flex justify-between animate-fade-in transition-all hover:bg-gray-50 p-1 rounded" style={{animationDelay: `${0.4 + index * 0.05}s`}}>
                    <span className="text-muted-foreground">{hour.day}</span>
                    <span>{hour.open}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Map */}
            <div className="bg-white p-6 rounded-lg shadow-sm border animate-fade-in transition-all hover:shadow-md" style={{animationDelay: "0.4s"}}>
              <h2 className="text-xl font-medium mb-4">Location</h2>
              <div className="h-60">
                <MapView places={[place]} selectedPlaceId={place.id} />
              </div>
              <div className="mt-4">
                <Button className="w-full transition-transform hover:transform hover:scale-105">
                  Get Directions
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PlaceDetailsPage;
