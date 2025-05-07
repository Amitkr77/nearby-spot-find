
import { Place } from "@/components/search/PlaceCard";

export const mockHotels: Place[] = [
  {
    id: "hotel-1",
    name: "Grand Luxury Hotel",
    category: "hotels",
    address: "123 Main Street, Downtown",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    distance: "1.2 km",
    description: "Experience luxury at its finest with our 5-star accommodations and world-class amenities."
  },
  {
    id: "hotel-2",
    name: "Seaside Resort & Spa",
    category: "hotels",
    address: "456 Ocean Drive, Beachfront",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    distance: "3.5 km",
    description: "Relax by the ocean with our beachfront rooms and rejuvenating spa treatments."
  },
  {
    id: "hotel-3",
    name: "Urban Boutique Inn",
    category: "hotels",
    address: "789 City Avenue, Arts District",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    distance: "0.7 km",
    description: "A stylish boutique hotel in the heart of the arts district."
  },
  {
    id: "hotel-4",
    name: "Mountain View Lodge",
    category: "hotels",
    address: "101 Summit Road, Highland Hills",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    distance: "5.2 km",
    description: "Stunning mountain views and cozy accommodations for nature lovers."
  }
];

export const mockRestaurants: Place[] = [
  {
    id: "restaurant-1",
    name: "Bella Italia",
    category: "restaurants",
    address: "234 Cuisine Boulevard, Little Italy",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    distance: "1.5 km",
    description: "Authentic Italian cuisine with homemade pasta and wood-fired pizzas."
  },
  {
    id: "restaurant-2",
    name: "Sushi Master",
    category: "restaurants",
    address: "567 Pacific Lane, Harbor District",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    distance: "2.1 km",
    description: "Premium sushi and Japanese cuisine prepared by master chefs."
  },
  {
    id: "restaurant-3",
    name: "Farm & Table",
    category: "restaurants",
    address: "890 Harvest Road, Green Valley",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    distance: "3.8 km",
    description: "Farm-to-table dining with seasonal ingredients from local producers."
  },
  {
    id: "restaurant-4",
    name: "Spice Route",
    category: "restaurants",
    address: "112 Flavor Street, Midtown",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    distance: "0.9 km",
    description: "Global fusion cuisine with bold flavors and spices from around the world."
  }
];

export const mockHospitals: Place[] = [
  {
    id: "hospital-1",
    name: "Central Medical Center",
    category: "hospitals",
    address: "345 Health Avenue, Medical District",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    distance: "2.3 km",
    description: "Comprehensive healthcare services with state-of-the-art facilities and specialists."
  },
  {
    id: "hospital-2",
    name: "Riverside General Hospital",
    category: "hospitals",
    address: "678 Wellness Road, Riverside",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    distance: "4.1 km",
    description: "Full-service hospital with emergency care and specialized departments."
  },
  {
    id: "hospital-3",
    name: "Children's Health Institute",
    category: "hospitals",
    address: "901 Care Lane, Northeastern District",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1516549655023-a49d520140a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    distance: "3.2 km",
    description: "Specialized pediatric care and family-centered healthcare services."
  }
];

export const mockPharmacies: Place[] = [
  {
    id: "pharmacy-1",
    name: "QuickCare Pharmacy",
    category: "pharmacies",
    address: "432 Medicine Road, Shopping District",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    distance: "0.8 km",
    description: "Convenient pharmacy with prescription services and health products."
  },
  {
    id: "pharmacy-2",
    name: "Wellness Drugstore",
    category: "pharmacies",
    address: "765 Health Street, Central Plaza",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    distance: "1.7 km",
    description: "Full-service pharmacy with a wide range of health and wellness products."
  },
  {
    id: "pharmacy-3",
    name: "24-Hour MediMart",
    category: "pharmacies",
    address: "098 Round-the-Clock Avenue, East Side",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    distance: "2.9 km",
    description: "Always open pharmacy with emergency medications and consultation services."
  }
];

export const getAllPlaces = (): Place[] => {
  return [...mockHotels, ...mockRestaurants, ...mockHospitals, ...mockPharmacies];
};

export const getPlacesByCategory = (category: string): Place[] => {
  switch (category) {
    case "hotels":
      return mockHotels;
    case "restaurants":
      return mockRestaurants;
    case "hospitals":
      return mockHospitals;
    case "pharmacies":
      return mockPharmacies;
    default:
      return getAllPlaces();
  }
};

export const getPlaceById = (id: string): Place | undefined => {
  return getAllPlaces().find(place => place.id === id);
};
