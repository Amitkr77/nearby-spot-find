
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SearchBar from "@/components/search/SearchBar";
import CategoryCard from "@/components/search/CategoryCard";
import { Button } from "@/components/ui/button";
import { MapPin, Search, Hotel, Utensils, Building, Pill, ShoppingBag, CreditCard } from "lucide-react";

const HomePage = () => {
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

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Find Essential Services Near You
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover hotels, restaurants, hospitals, and more around your location
              with just a few clicks.
            </p>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <SearchBar />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-10 text-center">
            Explore by Category
          </h2>
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

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-10 text-center">
            Why Choose NearbyEssentials?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="rounded-full bg-primary/10 p-4 w-16 h-16 flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Accurate Locations</h3>
              <p className="text-muted-foreground">
                Find exactly what you need with precise location data and detailed information.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="rounded-full bg-primary/10 p-4 w-16 h-16 flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Smart Search</h3>
              <p className="text-muted-foreground">
                Our intelligent search helps you find the most relevant places based on your needs.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="rounded-full bg-primary/10 p-4 w-16 h-16 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8 text-primary"
                >
                  <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Save Favorites</h3>
              <p className="text-muted-foreground">
                Bookmark your favorite places for quick access in the future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-primary text-white rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to explore?</h2>
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
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
