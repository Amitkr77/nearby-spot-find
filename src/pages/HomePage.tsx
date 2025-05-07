
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SearchBar from "@/components/search/SearchBar";
import CategoryCard from "@/components/search/CategoryCard";
import PlaceCard from "@/components/search/PlaceCard";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Search, 
  Hotel, 
  Utensils, 
  Building, 
  Pill, 
  ShoppingBag, 
  CreditCard, 
  Star,
  Clock,
  TrendingUp,
  MapPinned,
  ChevronRight
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { mockHotels, mockRestaurants } from "@/data/mockPlaces";

const HomePage = () => {
  const { user } = useAuth();
  
  const categories = [
    {
      title: "Hotels",
      icon: <Hotel className="h-6 w-6" />,
      href: "/search?category=hotels",
    },
    {
      title: "Restaurants",
      icon: <Utensils className="h-6 w-6" />,
      href: "/search?category=restaurants",
    },
    {
      title: "Hospitals",
      icon: <Building className="h-6 w-6" />,
      href: "/search?category=hospitals",
    },
    {
      title: "Pharmacies",
      icon: <Pill className="h-6 w-6" />,
      href: "/search?category=pharmacies",
    },
    {
      title: "Shopping",
      icon: <ShoppingBag className="h-6 w-6" />,
      href: "/search?category=shopping",
    },
    {
      title: "ATMs",
      icon: <CreditCard className="h-6 w-6" />,
      href: "/search?category=atm",
    },
  ];

  const featuredPlaces = [...mockHotels.slice(0, 2), ...mockRestaurants.slice(0, 2)];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Find Essential Services Near You
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover hotels, restaurants, hospitals, and more around your location
              with just a few clicks.
            </p>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
              <SearchBar />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-3 text-center">
            Explore by Category
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
            Find the services you need quickly by browsing our popular categories
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.title}
                title={category.title}
                icon={category.icon}
                href={category.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Places Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-semibold">
                Featured Places
              </h2>
              <p className="text-muted-foreground mt-2">
                Discover top-rated places around you
              </p>
            </div>
            <Link to="/search">
              <Button variant="outline" className="group">
                View all <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPlaces.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-10 text-center">
            Popular Categories
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Link to="/search?category=hotels" className="group">
              <div className="relative rounded-xl overflow-hidden h-64">
                <img 
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Hotels" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white text-2xl font-semibold mb-2 flex items-center">
                    <Hotel className="h-6 w-6 mr-2" /> Hotels
                  </h3>
                  <p className="text-white/80">Find accommodations for your stay</p>
                </div>
              </div>
            </Link>
            <Link to="/search?category=restaurants" className="group">
              <div className="relative rounded-xl overflow-hidden h-64">
                <img 
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Restaurants" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white text-2xl font-semibold mb-2 flex items-center">
                    <Utensils className="h-6 w-6 mr-2" /> Restaurants
                  </h3>
                  <p className="text-white/80">Explore dining options nearby</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-3 text-center">
            Why Choose SpotEase?
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
            Our platform makes finding essential services simple and efficient
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="rounded-full bg-primary/10 p-4 w-16 h-16 flex items-center justify-center mb-4">
                <MapPinned className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Accurate Locations</h3>
              <p className="text-muted-foreground">
                Find exactly what you need with precise location data and detailed information.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="rounded-full bg-primary/10 p-4 w-16 h-16 flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Smart Search</h3>
              <p className="text-muted-foreground">
                Our intelligent search helps you find the most relevant places based on your needs.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="rounded-full bg-primary/10 p-4 w-16 h-16 flex items-center justify-center mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Save Favorites</h3>
              <p className="text-muted-foreground">
                Bookmark your favorite places for quick access in the future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-3 text-center">
            What Our Users Say
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
            Discover how SpotEase has helped people find essential services easily
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl border shadow-sm">
              <div className="flex items-center text-amber-500 mb-4">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
              </div>
              <p className="text-gray-700 mb-4">
                "SpotEase helped me find a nearby hospital when I was in an unfamiliar city. The directions were accurate and saved me valuable time."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-300 mr-3"></div>
                <div>
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">Traveler</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border shadow-sm">
              <div className="flex items-center text-amber-500 mb-4">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
              </div>
              <p className="text-gray-700 mb-4">
                "I use SpotEase regularly to find new restaurants in my area. The reviews and ratings have never led me wrong!"
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-300 mr-3"></div>
                <div>
                  <p className="font-medium">Michael Rodriguez</p>
                  <p className="text-sm text-muted-foreground">Food Enthusiast</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border shadow-sm hidden lg:block">
              <div className="flex items-center text-amber-500 mb-4">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
              </div>
              <p className="text-gray-700 mb-4">
                "As a business traveler, finding good hotels quickly is essential. SpotEase makes it simple to find and book quality accommodations."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-300 mr-3"></div>
                <div>
                  <p className="font-medium">Jennifer Lee</p>
                  <p className="text-sm text-muted-foreground">Business Executive</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary to-blue-500 text-white rounded-xl p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-pattern opacity-10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">Ready to explore?</h2>
              
              {user ? (
                <>
                  <p className="text-xl mb-8 max-w-2xl mx-auto">
                    Find and save your favorite places for quick access in the future.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/dashboard">
                      <Button size="lg" variant="secondary">
                        My Dashboard
                      </Button>
                    </Link>
                    <Link to="/search">
                      <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                        Explore Places
                      </Button>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-xl mb-8 max-w-2xl mx-auto">
                    Create an account to save your favorite places and get personalized recommendations.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/register">
                      <Button size="lg" variant="secondary">
                        Sign Up Now
                      </Button>
                    </Link>
                    <Link to="/search">
                      <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                        Start Searching
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
