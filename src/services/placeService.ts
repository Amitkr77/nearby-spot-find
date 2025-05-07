
// This file contains mock data functions and simulates API calls

import { Place } from "@/components/search/PlaceCard";
import { getPlaceById, getPlacesByCategory, getAllPlaces } from "@/data/mockPlaces";

// Get all places or filter by search criteria
export const getPlaces = async (
  category?: string,
  location?: string
): Promise<Place[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      let places;
      if (category) {
        places = getPlacesByCategory(category);
      } else {
        places = getAllPlaces();
      }
      
      // Filter by location if provided
      if (location && location.trim() !== '') {
        places = places.filter(place => 
          place.address.toLowerCase().includes(location.toLowerCase())
        );
      }
      
      resolve(places);
    }, 500); // Simulating a short delay
  });
};

// Get a single place by ID
export const getPlace = async (id: string): Promise<Place | null> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const place = getPlaceById(id);
      resolve(place || null);
    }, 300);
  });
};

// Check if a place is saved by a user
export const isPlaceSaved = async (userId: string, placeId: string): Promise<boolean> => {
  // For non-UUID IDs (mock data), check local storage
  if (!placeId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
    const savedPlaces = JSON.parse(localStorage.getItem(`savedPlaces_${userId}`) || '[]');
    return savedPlaces.includes(placeId);
  }
  
  // For real data with UUIDs, this would check the database
  // Simulating an API call
  return Promise.resolve(false);
};

// Save a place for a user
export const savePlace = async (userId: string, placeId: string): Promise<void> => {
  // For non-UUID IDs (mock data), use local storage
  if (!placeId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
    const savedPlacesKey = `savedPlaces_${userId}`;
    const savedPlaces = JSON.parse(localStorage.getItem(savedPlacesKey) || '[]');
    if (!savedPlaces.includes(placeId)) {
      savedPlaces.push(placeId);
      localStorage.setItem(savedPlacesKey, JSON.stringify(savedPlaces));
    }
    return Promise.resolve();
  }
  
  // For real data with UUIDs, this would update the database
  return Promise.resolve();
};

// Unsave a place for a user
export const unsavePlace = async (userId: string, placeId: string): Promise<void> => {
  // For non-UUID IDs (mock data), use local storage
  if (!placeId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
    const savedPlacesKey = `savedPlaces_${userId}`;
    const savedPlaces = JSON.parse(localStorage.getItem(savedPlacesKey) || '[]');
    const updatedPlaces = savedPlaces.filter((id: string) => id !== placeId);
    localStorage.setItem(savedPlacesKey, JSON.stringify(updatedPlaces));
    return Promise.resolve();
  }
  
  // For real data with UUIDs, this would update the database
  return Promise.resolve();
};

// Get all saved places for a user
export const getSavedPlaces = async (userId: string): Promise<Place[]> => {
  // Get saved place IDs from local storage
  const savedPlacesKey = `savedPlaces_${userId}`;
  const savedPlaceIds = JSON.parse(localStorage.getItem(savedPlacesKey) || '[]');
  
  if (savedPlaceIds.length === 0) {
    return Promise.resolve([]);
  }
  
  // Get the actual place objects
  const allPlaces = getAllPlaces();
  const savedPlaces = allPlaces.filter(place => savedPlaceIds.includes(place.id));
  
  return Promise.resolve(savedPlaces);
};
