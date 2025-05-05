
import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";
import { Place } from "../search/PlaceCard";

interface MapViewProps {
  places: Place[];
  selectedPlaceId?: string;
  onSelectPlace?: (placeId: string) => void;
}

const MapView = ({ places, selectedPlaceId, onSelectPlace }: MapViewProps) => {
  // This is a placeholder component for a map view
  // In a real app, you would integrate with a map library like Google Maps or MapBox
  const mapRef = useRef<HTMLDivElement>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsMapLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative bg-gray-100 rounded-lg overflow-hidden h-full min-h-[400px]">
      <div ref={mapRef} className="absolute inset-0">
        {!isMapLoaded ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          // Placeholder for actual map
          <div className="h-full w-full bg-[#e8f0f7] flex flex-col items-center justify-center p-4">
            <div className="text-center mb-4">
              <p className="text-muted-foreground">Map Placeholder</p>
              <p className="text-sm text-muted-foreground">
                In the actual app, this would be an interactive map showing the locations.
              </p>
            </div>
            
            <div className="grid gap-2 w-full max-w-md">
              {places.map((place) => (
                <div 
                  key={place.id}
                  className={`
                    flex items-center gap-2 p-2 rounded-md cursor-pointer
                    ${selectedPlaceId === place.id ? 'bg-primary text-white' : 'bg-white hover:bg-gray-50'}
                  `}
                  onClick={() => onSelectPlace?.(place.id)}
                >
                  <MapPin className={`h-5 w-5 ${selectedPlaceId === place.id ? 'text-white' : 'text-primary'}`} />
                  <span className="font-medium">{place.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapView;
