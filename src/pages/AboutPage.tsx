
import Layout from "@/components/layout/Layout";
import { MapPin, Search, Clock, Shield } from "lucide-react";

const AboutPage = () => {
  return (
    <Layout>
      <div className="container py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">About SpotEase</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the story behind SpotEase and our mission to connect people with essential services around them.
          </p>
        </div>

        {/* Our Story Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold mb-8">Our Story</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg mb-4">
                Founded in 2023, SpotEase was born from a simple idea: to make finding essential services quick and effortless, no matter where you are.
              </p>
              <p className="text-lg mb-4">
                Our founder experienced the frustration of searching for a hospital in an unfamiliar city during a family emergency. That challenging experience highlighted the need for a reliable, easy-to-use platform focused specifically on essential services.
              </p>
              <p className="text-lg">
                Today, SpotEase has grown into a comprehensive platform that helps thousands of users locate hotels, restaurants, hospitals, pharmacies, and other crucial services around their location with just a few clicks.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Team working together" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-primary/10 p-8 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-lg">
                To create a seamless experience that connects people with essential services globally, saving time and reducing stress during moments when finding these services matters most.
              </p>
            </div>
            <div className="bg-primary/10 p-8 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
              <p className="text-lg">
                To become the most trusted platform for locating essential services worldwide, known for accuracy, reliability, and a user-friendly experience that makes finding what you need effortless.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold mb-8">Our Core Values</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="border p-6 rounded-lg text-center">
              <div className="rounded-full bg-primary/10 p-4 w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Accessibility</h3>
              <p className="text-muted-foreground">
                Making essential services discoverable for everyone, everywhere.
              </p>
            </div>
            <div className="border p-6 rounded-lg text-center">
              <div className="rounded-full bg-primary/10 p-4 w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Accuracy</h3>
              <p className="text-muted-foreground">
                Providing reliable and precise information you can count on.
              </p>
            </div>
            <div className="border p-6 rounded-lg text-center">
              <div className="rounded-full bg-primary/10 p-4 w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Efficiency</h3>
              <p className="text-muted-foreground">
                Saving you time with a streamlined search experience.
              </p>
            </div>
            <div className="border p-6 rounded-lg text-center">
              <div className="rounded-full bg-primary/10 p-4 w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Trust</h3>
              <p className="text-muted-foreground">
                Building a platform you can rely on when it matters most.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-8">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="rounded-full overflow-hidden w-32 h-32 mx-auto mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                  alt="Team Member" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <h3 className="text-xl font-medium">Alex Johnson</h3>
              <p className="text-muted-foreground">Founder & CEO</p>
            </div>
            <div className="text-center">
              <div className="rounded-full overflow-hidden w-32 h-32 mx-auto mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                  alt="Team Member" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <h3 className="text-xl font-medium">Samantha Lee</h3>
              <p className="text-muted-foreground">CTO</p>
            </div>
            <div className="text-center">
              <div className="rounded-full overflow-hidden w-32 h-32 mx-auto mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                  alt="Team Member" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <h3 className="text-xl font-medium">Michael Chen</h3>
              <p className="text-muted-foreground">Head of Product</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AboutPage;
