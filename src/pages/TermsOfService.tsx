import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, CheckCircle } from 'lucide-react';

const TermsOfService = () => {
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
            <Shield className="h-8 w-8 text-[#40d9ed] mr-3" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Terms of Service</h1>
          </div>

          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="text-sm text-gray-500 mb-6">Last Updated: February 1, 2025</p>

            <div className="mb-8">
              <p>
                Welcome to appiSpot. These Terms of Service ("Terms") govern your use of the appiSpot website, mobile applications, and services (collectively, the "Service"). By accessing or using the Service, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use the Service.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p>
                By creating an account, accessing, or using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms, as well as our Privacy Policy and Cookie Policy, which are incorporated herein by reference.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Definitions</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>"appiSpot"</strong> (or "we," "our," or "us") refers to the company operating the Service.</li>
                <li><strong>"User"</strong> (or "you" or "your") refers to any individual who accesses or uses the Service.</li>
                <li><strong>"Host"</strong> refers to a User who lists a Spot on the Service.</li>
                <li><strong>"Guest"</strong> refers to a User who books a Spot through the Service.</li>
                <li><strong>"Spot"</strong> refers to a venue, space, or location listed on the Service for booking.</li>
                <li><strong>"Booking"</strong> refers to a reservation of a Spot made through the Service.</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Account Registration</h2>
              <p>
                To use certain features of the Service, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
              </p>
              <p className="mt-4">
                You are responsible for safeguarding your password and for all activities that occur under your account. You agree to notify appiSpot immediately of any unauthorized use of your account or any other breach of security.
              </p>
              <p className="mt-4">
                appiSpot reserves the right to disable any user account at any time if, in our opinion, you have failed to comply with these Terms or if we believe your account may pose a security risk.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Host Terms</h2>
              <p>
                As a Host, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Provide accurate and complete information about your Spot, including amenities, capacity, and availability.</li>
                <li>Ensure your Spot is clean, safe, and as described in your listing.</li>
                <li>Respond promptly to booking requests and communications from Guests.</li>
                <li>Honor confirmed bookings and provide the Spot as described.</li>
                <li>Comply with all applicable laws, regulations, and tax requirements related to your Spot and hosting activities.</li>
                <li>Maintain appropriate insurance coverage for your Spot.</li>
              </ul>
              <p className="mt-4">
                appiSpot reserves the right to remove any listing that violates these Terms or that we determine, in our sole discretion, is harmful to the Service, Users, or third parties.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Guest Terms</h2>
              <p>
                As a Guest, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Provide accurate information when making a Booking.</li>
                <li>Use the Spot only for the purpose stated in your Booking and in accordance with the Host's rules.</li>
                <li>Treat the Spot and any furnishings or equipment with care and respect.</li>
                <li>Leave the Spot in the same condition as you found it.</li>
                <li>Comply with all applicable laws and regulations while using the Spot.</li>
                <li>Communicate promptly with the Host regarding any issues or concerns.</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Bookings and Payments</h2>
              <p>
                Bookings are subject to availability and acceptance by the Host. A Booking is not confirmed until the Host accepts it and the Guest completes payment.
              </p>
              <p className="mt-4">
                Payment for Bookings is processed through our third-party payment processors. By making a Booking, you authorize appiSpot to charge the payment method you provide.
              </p>
              <p className="mt-4">
                appiSpot charges service fees to both Hosts and Guests for use of the Service. These fees are non-refundable and will be displayed before you complete a transaction.
              </p>
              <p className="mt-4">
                Hosts are responsible for setting their own prices and cancellation policies, which will be displayed on their listing.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Cancellations and Refunds</h2>
              <p>
                Cancellation policies are set by Hosts and vary by listing. Please review the cancellation policy for a Spot before making a Booking.
              </p>
              <p className="mt-4">
                If a Host cancels a confirmed Booking, the Guest will receive a full refund of all fees paid.
              </p>
              <p className="mt-4">
                If a Guest cancels a confirmed Booking, the refund amount will depend on the Host's cancellation policy and the timing of the cancellation.
              </p>
              <p className="mt-4">
                appiSpot reserves the right to issue refunds at our discretion, including in cases where:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>A Host fails to provide the Spot as described.</li>
                <li>The Spot is not clean, safe, or otherwise unsuitable for use.</li>
                <li>The Host or Guest violates these Terms.</li>
                <li>Extenuating circumstances (as defined in our Extenuating Circumstances Policy) prevent a Guest from using a Spot.</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Prohibited Activities</h2>
              <p>
                You agree not to engage in any of the following prohibited activities:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Violating any applicable laws or regulations.</li>
                <li>Infringing on the rights of others, including intellectual property rights.</li>
                <li>Posting or transmitting content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable.</li>
                <li>Impersonating any person or entity or falsely stating or otherwise misrepresenting your affiliation with a person or entity.</li>
                <li>Interfering with or disrupting the Service or servers or networks connected to the Service.</li>
                <li>Using the Service for any illegal or unauthorized purpose.</li>
                <li>Using the Service to book a Spot for illegal activities.</li>
                <li>Attempting to gain unauthorized access to other users' accounts or any part of the Service.</li>
                <li>Using the Service to send unsolicited communications or spam.</li>
                <li>Collecting or harvesting user data without consent.</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Intellectual Property</h2>
              <p>
                The Service and its original content, features, and functionality are owned by appiSpot and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
              </p>
              <p className="mt-4">
                You may not copy, modify, create derivative works of, publicly display, publicly perform, republish, or transmit any of the material on our Service without prior written consent.
              </p>
              <p className="mt-4">
                By posting content on the Service, you grant appiSpot a non-exclusive, worldwide, royalty-free license to use, modify, publicly display, publicly perform, reproduce, and distribute such content on and through the Service.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, appiSpot and its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Your access to or use of or inability to access or use the Service.</li>
                <li>Any conduct or content of any third party on the Service.</li>
                <li>Any content obtained from the Service.</li>
                <li>Unauthorized access, use, or alteration of your transmissions or content.</li>
              </ul>
              <p className="mt-4">
                In no event shall our total liability to you for all claims arising from or relating to these Terms or your use of the Service exceed the amount paid by you to appiSpot during the twelve (12) month period preceding the event giving rise to the liability, or one hundred dollars ($100), whichever is greater.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Indemnification</h2>
              <p>
                You agree to defend, indemnify, and hold harmless appiSpot and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including without limitation reasonable attorney fees and costs, arising out of or in any way connected with your access to or use of the Service, your violation of these Terms, or your violation of any rights of another.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">12. Termination</h2>
              <p>
                We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
              </p>
              <p className="mt-4">
                If you wish to terminate your account, you may simply discontinue using the Service or contact us to request account deletion.
              </p>
              <p className="mt-4">
                All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">13. Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.
              </p>
              <p className="mt-4">
                Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">14. Dispute Resolution</h2>
              <p>
                Any dispute arising from or relating to these Terms or the Service will be resolved through binding arbitration in accordance with the American Arbitration Association's rules. The arbitration will be conducted in San Francisco, California, unless you and appiSpot agree otherwise.
              </p>
              <p className="mt-4">
                You agree that any dispute resolution proceedings will be conducted only on an individual basis and not in a class, consolidated, or representative action. If for any reason a claim proceeds in court rather than in arbitration, you and appiSpot waive any right to a jury trial.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">15. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page and updating the "Last Updated" date.
              </p>
              <p className="mt-4">
                Your continued use of the Service after any such changes constitutes your acceptance of the new Terms. If you do not agree to the new Terms, you must stop using the Service.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">16. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                <p>Email: <a href="mailto:legal@appispot.com" className="text-[#40d9ed] hover:underline">legal@appispot.com</a></p>
                <p>Address: 123 Spot Street, San Francisco, CA 94105</p>
                <p>Phone: +1 (555) 123-4567</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <p className="text-gray-600 text-sm">
                By using appiSpot, you acknowledge that you have read and understood these Terms of Service and agree to be bound by them.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;