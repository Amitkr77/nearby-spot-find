
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setName("");
      setEmail("");
      setMessage("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Layout>
      <div className="container py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions or suggestions? We'd love to hear from you. Reach out to our team using any of the methods below.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-semibold mb-8">Get In Touch</h2>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Email Us</h3>
                  <p className="text-muted-foreground mb-1">For general inquiries:</p>
                  <a href="mailto:info@spotease.com" className="text-primary hover:underline">
                    info@spotease.com
                  </a>
                  <p className="text-muted-foreground mb-1 mt-3">For support:</p>
                  <a href="mailto:support@spotease.com" className="text-primary hover:underline">
                    support@spotease.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Call Us</h3>
                  <p className="text-muted-foreground mb-1">Customer Support:</p>
                  <a href="tel:+1-800-123-4567" className="text-primary hover:underline">
                    +1 (800) 123-4567
                  </a>
                  <p className="text-muted-foreground mb-1 mt-3">Business Inquiries:</p>
                  <a href="tel:+1-800-987-6543" className="text-primary hover:underline">
                    +1 (800) 987-6543
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Visit Us</h3>
                  <p className="text-muted-foreground">
                    SpotEase Headquarters<br />
                    123 Tech Lane<br />
                    San Francisco, CA 94107<br />
                    United States
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-lg font-medium mb-4">Office Hours</h3>
              <p className="text-muted-foreground">
                Monday - Friday: 9:00 AM - 6:00 PM (PST)<br />
                Saturday: 10:00 AM - 4:00 PM (PST)<br />
                Sunday: Closed
              </p>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Your Name
                </label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john.doe@example.com"
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help you?"
                  required
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-32 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
              
              <p className="text-sm text-muted-foreground text-center mt-4">
                We'll get back to you as soon as possible, usually within 24 hours.
              </p>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-20">
          <h2 className="text-2xl font-semibold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-medium mb-2">How do I report an issue with the app?</h3>
              <p className="text-muted-foreground">
                You can report any technical issues by emailing our support team at support@spotease.com or by using the contact form on this page.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-medium mb-2">How can I suggest a new feature?</h3>
              <p className="text-muted-foreground">
                We love hearing from our users! Send us your ideas through the contact form or email us directly at feedback@spotease.com.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-medium mb-2">Do you have a mobile app?</h3>
              <p className="text-muted-foreground">
                We're currently developing mobile apps for iOS and Android. Sign up for our newsletter to be notified when they're available.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-medium mb-2">Can I list my business on SpotEase?</h3>
              <p className="text-muted-foreground">
                Yes! For business inquiries, please contact our partnership team at partners@spotease.com.
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ContactPage;
