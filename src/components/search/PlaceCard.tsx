
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Star } from "lucide-react";
import SaveButton from "@/components/places/SaveButton";

export interface Place {
  id: string;
  name: string;
  category: string;
  address: string;
  rating: number;
  image: string;
  distance?: string;
  description?: string;
}

interface PlaceCardProps {
  place: Place;
}

const PlaceCard = ({ place }: PlaceCardProps) => {
  return (
    <div className="place-card bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="aspect-video bg-gray-100 relative">
        <img
          src={place.image}
          alt={place.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-lg line-clamp-1">{place.name}</h3>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm">{place.rating}</span>
          </div>
        </div>
        <p className="text-muted-foreground text-sm mt-1 flex items-center">
          <MapPin className="h-3 w-3 mr-1 inline" />
          <span className="line-clamp-1">{place.address}</span>
        </p>
        <div className="mt-2">
          <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
            {place.category}
          </span>
          {place.distance && (
            <span className="inline-block text-xs text-muted-foreground ml-2">
              {place.distance} away
            </span>
          )}
        </div>
        <div className="mt-4 flex justify-between items-center">
          <Link to={`/place/${place.id}`}>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </Link>
          <SaveButton placeId={place.id} variant="ghost" size="sm" />
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
