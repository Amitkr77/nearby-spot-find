
export interface Profile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface PlaceData {
  id: string;
  name: string;
  category: string;
  address: string;
  coordinates?: any;
  rating: number;
  image_url: string | null;
  description: string | null;
  phone: string | null;
  website: string | null;
  hours: Record<string, string> | null;
  created_at: string;
  updated_at: string;
}

export interface SavedPlace {
  id: string;
  user_id: string;
  place_id: string;
  created_at: string;
}

export interface Review {
  id: string;
  place_id: string;
  user_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  updated_at: string;
}
