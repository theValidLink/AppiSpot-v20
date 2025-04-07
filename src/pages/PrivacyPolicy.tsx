import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lock, CheckCircle } from 'lucide-react';

const PrivacyPolicy = () => {
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
            <Lock className="h-8 w-8 text-[#40d9ed] mr-3" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Privacy Policy</h1>
          </div>

          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="text-sm text-gray-500 mb-6">Last Updated: February 1, 2025</p>

            <div className="mb-8">
              <p>
                At appiSpot, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, mobile application, and use our services (collectively, the "Service").
              </p>
              <p className="mt-4">
                Please read this Privacy Policy carefully. By accessing or using the Service, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy. If you do not agree with our policies and practices, please do not use our Service.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
              <p>
                We collect several types of information from and about users of our Service, including:
              </p>
              <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">1.1 Personal Information</h3>
              <p>
                Personal information is data that can be used to identify you individually. This may include:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Contact information (name, email address, phone number, postal address)</li>
                <li>Account credentials (username, password)</li>
                <li>Profile information (profile picture, bio, preferences)</li>
                <li>Payment information (credit card details, billing address)</li>
                <li>Identity verification information (government ID, date of birth)</li>
                <li>Communications with us or other users through our platform</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">1.2 Non-Personal Information</h3>
              <p>
                We also collect non-personal information that does not directly identify you, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Device information (device type, operating system, browser type)</li>
                <li>Usage data (pages visited, time spent on pages, links clicked)</li>
                <li>Location data (IP address, GPS, Wi-Fi access points)</li>
                <li>Cookies and similar tracking technologies</li>
                <li>Aggregated or anonymized data</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. How We Collect Information</h2>
              <p>
                We collect information through various methods, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>Direct Collection:</strong> Information you provide when you register for an account, create or update your profile, list a Spot, make a Booking, communicate with other users, or contact our customer support.</li>
                <li><strong>Automated Collection:</strong> Information collected automatically through cookies, web beacons, and other tracking technologies when you use our Service.</li>
                <li><strong>Third-Party Sources:</strong> Information we may receive from business partners, service providers, identity verification services, and publicly available sources.</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p>
                We use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Providing, maintaining, and improving our Service</li>
                <li>Processing transactions and managing bookings</li>
                <li>Verifying your identity and preventing fraud</li>
                <li>Communicating with you about your account, bookings, and our Service</li>
                <li>Personalizing your experience and providing tailored content</li>
                <li>Analyzing usage patterns to improve our Service</li>
                <li>Enforcing our Terms of Service and other policies</li>
                <li>Complying with legal obligations</li>
                <li>Resolving disputes and troubleshooting problems</li>
                <li>Marketing and promoting our Service (with your consent where required)</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Information Sharing and Disclosure</h2>
              <p>
                We may share your information in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>With Other Users:</strong> When you use our Service, certain information is shared between Hosts and Guests to facilitate bookings and communications.</li>
                <li><strong>Service Providers:</strong> We may share information with third-party vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.</li>
                <li><strong>Business Transfers:</strong> If appiSpot is involved in a merger, acquisition, or sale of all or a portion of its assets, your information may be transferred as part of that transaction.</li>
                <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).</li>
                <li><strong>Protection of Rights:</strong> We may disclose your information to protect the rights, property, or safety of appiSpot, our users, or others.</li>
                <li><strong>With Your Consent:</strong> We may share your information with third parties when you have given us your consent to do so.</li>
              </ul>
              <p className="mt-4">
                We do not sell your personal information to third parties.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When determining how long to retain information, we consider the amount, nature, and sensitivity of the information, the potential risk of harm from unauthorized use or disclosure, and the purposes for which we process the information.
              </p>
              <p className="mt-4">
                When we no longer need to use your information, we will take steps to securely delete or anonymize it. If complete deletion is not possible (for example, because your information has been stored in backup archives), we will securely store your information and isolate it from any further use until deletion is possible.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Your Rights and Choices</h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>Access:</strong> You can request access to the personal information we hold about you.</li>
                <li><strong>Correction:</strong> You can request that we correct inaccurate or incomplete information about you.</li>
                <li><strong>Deletion:</strong> You can request that we delete your personal information in certain circumstances.</li>
                <li><strong>Restriction:</strong> You can request that we restrict the processing of your information in certain circumstances.</li>
                <li><strong>Data Portability:</strong> You can request a copy of your personal information in a structured, commonly used, and machine-readable format.</li>
                <li><strong>Objection:</strong> You can object to our processing of your personal information in certain circumstances.</li>
                <li><strong>Withdrawal of Consent:</strong> Where we rely on your consent to process your personal information, you can withdraw your consent at any time.</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us using the information provided in the "Contact Us" section below. Please note that some of these rights may be limited or not applicable in certain jurisdictions.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage. However, no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
              </p>
              <p className="mt-4">
                We regularly review our security procedures and consider appropriate new security technology and methods. However, despite our efforts, no security measures are perfect or impenetrable. We cannot control the actions of other users with whom you share your information. Therefore, we cannot and do not guarantee that your information will not be viewed by unauthorized persons.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. International Data Transfers</h2>
              <p>
                Your information may be transferred to, and maintained on, computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those in your jurisdiction.
              </p>
              <p className="mt-4">
                If you are located outside the United States and choose to provide information to us, please note that we transfer the information, including personal information, to the United States and process it there. Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.
              </p>
              <p className="mt-4">
                We will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your personal information will take place to an organization or a country unless there are adequate controls in place including the security of your data and other personal information.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Children's Privacy</h2>
              <p>
                Our Service is not intended for children under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us. If we become aware that we have collected personal information from children without verification of parental consent, we take steps to remove that information from our servers.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Third-Party Links and Services</h2>
              <p>
                Our Service may contain links to third-party websites, services, or applications that are not owned or controlled by appiSpot. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You should review the privacy policies of these third-party sites before providing any personal information.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy.
              </p>
              <p className="mt-4">
                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page. Your continued use of the Service after we post any modifications to the Privacy Policy will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Privacy Policy.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">12. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
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
                By using appiSpot, you acknowledge that you have read and understood this Privacy Policy and how we process your personal information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;