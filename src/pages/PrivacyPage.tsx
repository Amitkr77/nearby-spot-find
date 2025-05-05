
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";

const PrivacyPage = () => {
  return (
    <Layout>
      <div className="container py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-6">Last updated: May 5, 2025</p>
            
            <section className="mb-8">
              <p>
                At SpotEase, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our service. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
              
              <h3 className="text-xl font-medium mt-6 mb-3">Personal Information</h3>
              <p className="mb-4">
                We may collect personally identifiable information, such as your name, email address, telephone number, and geographic location when you register with the site, use our services, or participate in activities on SpotEase. This information is collected on a voluntary basis and is used to personalize your experience and improve our service.
              </p>
              
              <h3 className="text-xl font-medium mt-6 mb-3">Non-Personal Information</h3>
              <p className="mb-4">
                We may collect non-personal information about you whenever you interact with our site. Non-personal information may include the browser name, the type of computer, and technical information about your means of connection to our site, such as the operating system, the Internet service providers utilized, and other similar information.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
              <p className="mb-4">SpotEase may use the information we collect from you in the following ways:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>To personalize your experience and deliver the type of content and service offerings in which you are most interested.</li>
                <li>To improve our website in order to better serve you.</li>
                <li>To allow us to better service you in responding to your customer service requests.</li>
                <li>To administer contests, promotions, surveys, or other site features.</li>
                <li>To send periodic emails regarding your order or other products and services.</li>
                <li>To follow up with you after correspondence (live chat, email, or phone inquiries).</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Third-Party Disclosure</h2>
              <p className="mb-4">
                We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.
              </p>
              <p className="mb-4">
                We may also release information when its release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property, or safety.
              </p>
              <p>
                Non-personally identifiable visitor information may be provided to other parties for marketing, advertising, or other uses.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
              <p className="mb-4">
                SpotEase uses cookies to store information about visitors' preferences, record user-specific information on which pages the user accesses or visits, and customize web page content based on visitors' browser type or other information that the visitor sends.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Third-Party Links</h2>
              <p className="mb-4">
                We may include or offer third-party products or services on our website. These third-party sites have separate and independent privacy policies. We therefore have no responsibility or liability for the content and activities of these linked sites. Nonetheless, we seek to protect the integrity of our site and welcome any feedback about these sites.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Children's Information</h2>
              <p className="mb-4">
                SpotEase does not knowingly collect any personally identifiable information from children under the age of 13. If a parent or guardian believes that SpotEase has in its database the personally identifiable information of a child under the age of 13, please contact us immediately at privacy@spotease.com and we will use our best efforts to promptly remove such information from our records.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
              <p className="mb-4">
                SpotEase reserves the right to change this policy at any time. We will notify you of significant changes to our Privacy Policy by placing a prominent notice on our site or by sending an email. Your continued use of SpotEase after we make changes is deemed to be acceptance of those changes.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <p className="mb-4">
                If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at privacy@spotease.com.
              </p>
            </section>
            
            <div className="mt-12 border-t pt-6">
              <p>
                By using our website, you hereby consent to our Privacy Policy and agree to its terms. If you require any more information or have any questions about our privacy policy, please feel free to <Link to="/contact" className="text-primary hover:underline">contact us</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPage;
