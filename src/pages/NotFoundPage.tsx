
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { MapPin } from "lucide-react";

const NotFoundPage = () => {
  return (
    <Layout>
      <div className="container py-20">
        <div className="max-w-md mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-primary/10 p-6">
              <MapPin className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button asChild size="lg">
            <Link to="/">
              Return to Home
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
