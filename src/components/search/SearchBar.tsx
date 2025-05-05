
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Search } from "lucide-react";

const categories = [
  { value: "hotels", label: "Hotels" },
  { value: "restaurants", label: "Restaurants" },
  { value: "hospitals", label: "Hospitals" },
  { value: "pharmacies", label: "Pharmacies" },
  { value: "shopping", label: "Shopping" },
  { value: "atm", label: "ATMs" },
];

const SearchBar = ({ className = "" }: { className?: string }) => {
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (category || location) {
      const searchParams = new URLSearchParams();
      if (category) searchParams.set("category", category);
      if (location) searchParams.set("location", location);
      navigate(`/search?${searchParams.toString()}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className={`flex flex-col md:flex-row gap-4 ${className}`}>
      <div className="flex-1">
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1 relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
          className="pl-10 bg-white"
        />
      </div>
      <Button type="submit" className="w-full md:w-auto">
        <Search className="mr-2 h-4 w-4" /> Search
      </Button>
    </form>
  );
};

export default SearchBar;
