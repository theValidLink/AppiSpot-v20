import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Cookie, CheckCircle } from 'lucide-react';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-[#40d9ed] hover:text-[#26b8a5] transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
          <div className="flex items-center mb-6">
            <Cookie className="h-8 w-8 text-[#40d9ed] mr-3" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Cookie Policy</h1>
          </div>

          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="text-sm text-gray-500 mb-6">Last Updated: February 1, 2025</p>

            <div className="mb-8">
              <p>
                This Cookie Policy explains how appiSpot ("we", "us", or "our") uses cookies and similar technologies to recognize you when you visit our website and use our services (collectively, the "Service"). It explains what these technologies are and why we use them, as well as your rights to control our use of them.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. What Are Cookies?</h2>
              <p>
                Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.
              </p>
              <p className="mt-4">
                Cookies set by the website owner (in this case, appiSpot) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics). The parties that set these third-party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Why Do We Use Cookies?</h2>
              <p>
                We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Service to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Service. Third parties serve cookies through our Service for advertising, analytics, and other purposes.
              </p>
              <p className="mt-4">
                The specific types of first and third-party cookies served through our Service and the purposes they perform are described below:
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Types of Cookies We Use</h2>
              
              <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">3.1 Essential Cookies</h3>
              <p>
                These cookies are strictly necessary to provide you with services available through our Service and to use some of its features, such as access to secure areas. Because these cookies are strictly necessary to deliver the Service, you cannot refuse them without impacting how our Service functions.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <p className="font-medium">Examples of essential cookies we use:</p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Cookies used to authenticate users and prevent fraudulent use of accounts</li>
                  <li>Cookies used to remember items in your shopping cart</li>
                  <li>Cookies that remember your preferences, such as language or region</li>
                  <li>Cookies that enable the Service to function properly and remain secure</li>
                </ul>
              </div>

              <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">3.2 Performance and Functionality Cookies</h3>
              <p>
                These cookies are used to enhance the performance and functionality of our Service but are non-essential to its use. However, without these cookies, certain functionality may become unavailable.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <p className="font-medium">Examples of performance and functionality cookies we use:</p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Cookies that help us remember your settings and preferences</li>
                  <li>Cookies that improve the way our Service performs</li>
                  <li>Cookies that provide enhanced functionality when accessing our Service</li>
                </ul>
              </div>

              <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">3.3 Analytics and Customization Cookies</h3>
              <p>
                These cookies collect information that is used either in aggregate form to help us understand how our Service is being used or how effective our marketing campaigns are, or to help us customize our Service for you.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <p className="font-medium">Examples of analytics and customization cookies we use:</p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Cookies from analytics providers like Google Analytics to help us understand how visitors interact with our Service</li>
                  <li>Cookies that track which pages are most popular and how users navigate through the site</li>
                  <li>Cookies that help us improve our Service based on user behavior</li>
                </ul>
              </div>

              <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">3.4 Advertising Cookies</h3>
              <p>
                These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed, and in some cases selecting advertisements that are based on your interests.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <p className="font-medium">Examples of advertising cookies we use:</p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Cookies used by advertising networks to deliver ads that may be relevant to you based on your browsing history</li>
                  <li>Cookies that limit the number of times you see an ad</li>
                  <li>Cookies that measure the effectiveness of advertising campaigns</li>
                </ul>
              </div>

              <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">3.5 Social Media Cookies</h3>
              <p>
                These cookies are used to enable you to share pages and content that you find interesting on our Service through third-party social networking and other websites. These cookies may also be used for advertising purposes.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <p className="font-medium">Examples of social media cookies we use:</p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Cookies set by social media platforms (like Facebook, Twitter, and LinkedIn) when you interact with their features on our Service</li>
                  <li>Cookies that enable sharing functionality</li>
                </ul>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. How Can You Control Cookies?</h2>
              <p>
                You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by following the instructions provided below:
              </p>
              
              <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">4.1 Browser Controls</h3>
              <p>
                Most web browsers allow you to manage your cookie preferences. You can set your browser to refuse cookies or delete certain cookies. Generally, you can also manage similar technologies in the same way that you manage cookies – using your browser's preferences.
              </p>
              <p className="mt-4">
                The following links provide information on how to modify your browser's settings to block or delete cookies:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[#40d9ed] hover:underline">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-[#40d9ed] hover:underline">Mozilla Firefox</a></li>
                <li><a href="https://support.microsoft.com/en-us/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd" target="_blank" rel="noopener noreferrer" className="text-[#40d9ed] hover:underline">Microsoft Edge</a></li>
                <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-[#40d9ed] hover:underline">Apple Safari</a></li>
              </ul>
              <p className="mt-4">
                Please note that if you choose to block cookies, you may not be able to use all the features of our Service.
              </p>

              <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">4.2 Third-Party Opt-Out Tools</h3>
              <p>
                You can opt out of interest-based advertising through some of the third parties we work with by using the following tools:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-[#40d9ed] hover:underline">Network Advertising Initiative (NAI) Opt-Out Tool</a></li>
                <li><a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-[#40d9ed] hover:underline">Digital Advertising Alliance (DAA) WebChoices Tool</a></li>
                <li><a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className="text-[#40d9ed] hover:underline">European Interactive Digital Advertising Alliance (EDAA) Your Online Choices</a></li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">4.3 Mobile Device Controls</h3>
              <p>
                On your mobile device, you can control cookies through your browser settings and other mechanisms. For example:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>For iOS devices, you can use the "Limit Ad Tracking" setting (Settings &gt; Privacy &gt; Advertising &gt; Limit Ad Tracking)</li>
                <li>For Android devices, you can use the "Opt out of Ads Personalization" setting (Settings &gt; Google &gt; Ads &gt; Opt out of Ads Personalization)</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Do Not Track Signals</h2>
              <p>
                Some browsers have a "Do Not Track" feature that signals to websites that you visit that you do not want to have your online activity tracked. Our Service does not currently respond to "Do Not Track" signals. To find out more about "Do Not Track," please visit <a href="http://www.allaboutdnt.com" target="_blank" rel="noopener noreferrer" className="text-[#40d9ed] hover:underline">http://www.allaboutdnt.com</a>.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. How Often Will We Update This Cookie Policy?</h2>
              <p>
                We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
              </p>
              <p className="mt-4">
                The date at the top of this Cookie Policy indicates when it was last updated.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Where Can You Get Further Information?</h2>
              <p>
                If you have any questions about our use of cookies or other technologies, please contact us at:
              </p>
              <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                <p>Email: <a href="mailto:privacy@appispot.com" className="text-[#40d9ed] hover:underline">privacy@appispot.com</a></p>
                <p>Address: 123 Spot Street, San Francisco, CA 94105</p>
                <p>Phone: +1 (555) 123-4567</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <p className="text-gray-600 text-sm">
                By continuing to use our Service, you consent to the use of cookies as described in this Cookie Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;