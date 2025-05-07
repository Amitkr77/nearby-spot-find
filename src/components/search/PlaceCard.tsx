
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Star } from "lucide-react";
import SaveButton from "@/components/places/SaveButton";
import { cn } from "@/lib/utils";

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
  className?: string;
}

const PlaceCard = ({ place, className }: PlaceCardProps) => {
  return (
    <div className={cn("place-card bg-white rounded-xl shadow-sm border overflow-hidden h-full flex flex-col", className)}>
      <Link to={`/place/${place.id}`} className="aspect-video bg-gray-100 relative overflow-hidden">
        <img
          src={place.image}
          alt={place.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 flex items-center gap-1 text-amber-500 text-xs font-medium shadow-sm">
          <Star className="h-3 w-3 fill-current" />
          <span>{place.rating}</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-12"></div>
      </Link>
      <div className="p-4 flex-1 flex flex-col">
        <div>
          <h3 className="font-medium text-lg line-clamp-1 hover:text-primary transition-colors">
            <Link to={`/place/${place.id}`}>{place.name}</Link>
          </h3>
          <p className="text-muted-foreground text-sm mt-1 flex items-center">
            <MapPin className="h-3 w-3 mr-1 inline flex-shrink-0" />
            <span className="line-clamp-1">{place.address}</span>
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
              {place.category}
            </span>
            {place.distance && (
              <span className="inline-block bg-gray-100 text-xs text-muted-foreground px-2 py-1 rounded-full">
                {place.distance} away
              </span>
            )}
          </div>
          {place.description && (
            <p className="mt-2 text-sm text-gray-600 line-clamp-2">{place.description}</p>
          )}
        </div>
        <div className="mt-auto pt-4 flex justify-between items-center">
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
