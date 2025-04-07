import React from 'react';
import { Link } from 'react-router-dom';
import { 
  DollarSign, 
  Calendar, 
  Shield, 
  Users, 
  Home, 
  CheckCircle, 
  Camera, 
  Settings, 
  Clock, 
  Building2, 
  Star, 
  ChevronRight,
  ArrowRight
} from 'lucide-react';

const BecomeHost = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative py-20 sm:py-32 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1522158637959-30385a09e0da?auto=format&fit=crop&q=80&w=2070")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Share Your Space, Earn Extra Income
          </h1>
          <p className="text-xl sm:text-2xl text-white mb-8 max-w-3xl mx-auto">
            Turn your venue, studio, or unique space into a profitable business with appiSpot
          </p>
          <Link
            to="/register"
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-[#40d9ed] hover:bg-[#26b8a5] transition-colors"
          >
            Get Started Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Why Host on appiSpot?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join thousands of hosts who are earning extra income by sharing their spaces
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-[#40d9ed]/10 text-[#40d9ed] mb-6">
                <DollarSign className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">$2,500+</h3>
              <p className="text-gray-600">Average monthly earnings for active hosts</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-[#40d9ed]/10 text-[#40d9ed] mb-6">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">15+</h3>
              <p className="text-gray-600">Average bookings per month</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-[#40d9ed]/10 text-[#40d9ed] mb-6">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">4.8/5</h3>
              <p className="text-gray-600">Average host rating from guests</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              List your space in three simple steps and start earning
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="bg-white rounded-xl shadow-sm p-8 relative">
              <div className="absolute -top-6 left-8 h-12 w-12 rounded-full bg-[#40d9ed] text-white flex items-center justify-center text-xl font-bold">1</div>
              <div className="pt-4">
                <Camera className="h-10 w-10 text-[#40d9ed] mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Create Your Listing</h3>
                <p className="text-gray-600 mb-4">
                  Share details about your space, upload photos, set your availability, and establish your pricing.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Add high-quality photos</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Describe amenities and features</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Set competitive hourly rates</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-8 relative">
              <div className="absolute -top-6 left-8 h-12 w-12 rounded-full bg-[#40d9ed] text-white flex items-center justify-center text-xl font-bold">2</div>
              <div className="pt-4">
                <Calendar className="h-10 w-10 text-[#40d9ed] mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Manage Bookings</h3>
                <p className="text-gray-600 mb-4">
                  Review booking requests, communicate with guests, and maintain your calendar.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Accept or decline bookings</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Message guests directly</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Block dates as needed</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-8 relative">
              <div className="absolute -top-6 left-8 h-12 w-12 rounded-full bg-[#40d9ed] text-white flex items-center justify-center text-xl font-bold">3</div>
              <div className="pt-4">
                <DollarSign className="h-10 w-10 text-[#40d9ed] mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">Get Paid</h3>
                <p className="text-gray-600 mb-4">
                  Receive secure payments directly to your bank account after each booking.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Fast, secure payments</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Transparent fee structure</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Detailed earnings reports</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Space Types */}
      <div className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What Spaces Can You List?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Almost any space can be listed on appiSpot. Here are some popular categories:
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group relative overflow-hidden rounded-xl">
              <img 
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200" 
                alt="Event Venue" 
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white mb-2">Event Venues</h3>
                <p className="text-gray-200 text-sm">Ballrooms, banquet halls, and multi-purpose spaces</p>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-xl">
              <img 
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1200" 
                alt="Studios" 
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white mb-2">Studios</h3>
                <p className="text-gray-200 text-sm">Photography, recording, dance, and art studios</p>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-xl">
              <img 
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200" 
                alt="Office Spaces" 
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white mb-2">Office Spaces</h3>
                <p className="text-gray-200 text-sm">Conference rooms, meeting spaces, and co-working areas</p>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-xl">
              <img 
                src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1200" 
                alt="Outdoor Spaces" 
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white mb-2">Outdoor Spaces</h3>
                <p className="text-gray-200 text-sm">Gardens, rooftops, patios, and open-air venues</p>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-xl">
              <img 
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200" 
                alt="Restaurants" 
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white mb-2">Restaurants</h3>
                <p className="text-gray-200 text-sm">Private dining rooms, cafes, and full-service restaurants</p>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-xl">
              <img 
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200" 
                alt="Unique Spaces" 
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white mb-2">Unique Spaces</h3>
                <p className="text-gray-200 text-sm">Galleries, warehouses, lofts, and other distinctive venues</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Host Benefits */}
      <div className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Benefits of Hosting</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover why thousands of hosts choose appiSpot for their venue management
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex items-start mb-6">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-lg bg-[#40d9ed]/10 flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-[#40d9ed]" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Maximize Your Revenue</h3>
                  <p className="text-gray-600">
                    Set your own hourly rates and availability. Our platform helps you optimize pricing based on demand, location, and seasonality.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start mb-6">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-lg bg-[#40d9ed]/10 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-[#40d9ed]" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Flexible Scheduling</h3>
                  <p className="text-gray-600">
                    Rent your space by the hour, allowing for multiple bookings per day. You control when your space is available.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-lg bg-[#40d9ed]/10 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-[#40d9ed]" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Utilize Unused Space</h3>
                  <p className="text-gray-600">
                    Turn your empty or underutilized spaces into income-generating assets without long-term commitments.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex items-start mb-6">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-lg bg-[#40d9ed]/10 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-[#40d9ed]" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Secure Bookings</h3>
                  <p className="text-gray-600">
                    Our platform handles payments, contracts, and insurance verification, giving you peace of mind with every booking.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start mb-6">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-lg bg-[#40d9ed]/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-[#40d9ed]" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Verified Guests</h3>
                  <p className="text-gray-600">
                    All guests are verified through our platform, reducing risks and ensuring quality bookings for your space.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-lg bg-[#40d9ed]/10 flex items-center justify-center">
                    <Settings className="h-6 w-6 text-[#40d9ed]" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Powerful Tools</h3>
                  <p className="text-gray-600">
                    Access a comprehensive dashboard with booking management, messaging, analytics, and financial reporting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What Our Hosts Say</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from hosts who have transformed their spaces into profitable venues
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="flex items-center mb-6">
                {renderStars(5)}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "I've been able to generate significant additional income by renting out my studio space during off-hours. The platform makes it easy to manage bookings and payments."
              </p>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-[#40d9ed] flex items-center justify-center">
                  <span className="text-white font-bold">JD</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">James Davis</h4>
                  <p className="text-sm text-gray-500">Photography Studio Owner</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="flex items-center mb-6">
                {renderStars(5)}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "As a restaurant owner, I was skeptical at first, but listing our private dining room has brought in a whole new revenue stream. The guests are respectful and the process is seamless."
              </p>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-[#40d9ed] flex items-center justify-center">
                  <span className="text-white font-bold">MW</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Maria Wilson</h4>
                  <p className="text-sm text-gray-500">Restaurant Owner</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="flex items-center mb-6">
                {renderStars(5)}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "I've been able to monetize our office conference room during weekends and evenings. The extra income helps offset our overhead costs significantly."
              </p>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-[#40d9ed] flex items-center justify-center">
                  <span className="text-white font-bold">RL</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Robert Lee</h4>
                  <p className="text-sm text-gray-500">Small Business Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get answers to common questions about hosting on appiSpot
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">How much can I earn as a host?</h3>
              <p className="text-gray-600">
                Earnings vary based on your location, space type, amenities, and availability. Many hosts earn between $1,000 to $5,000 per month. Our pricing tool can help you set competitive rates for your area.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What types of spaces can I list?</h3>
              <p className="text-gray-600">
                You can list almost any type of space: event venues, meeting rooms, studios, outdoor areas, restaurants, unique spaces, and more. If you have a space that others might want to use, you can list it!
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">How does payment work?</h3>
              <p className="text-gray-600">
                Guests pay through our secure platform when they book. We hold the payment until 24 hours after the booking is completed, then transfer the funds to your bank account, minus our service fee (typically 15%).
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What about insurance and liability?</h3>
              <p className="text-gray-600">
                We provide a $1 million liability insurance policy for all bookings. However, we recommend hosts maintain their own insurance as well. You can also require security deposits for additional protection.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">How do I handle cancellations?</h3>
              <p className="text-gray-600">
                You set your own cancellation policy (flexible, moderate, or strict). Depending on your policy, guests may receive partial or full refunds for cancellations made within certain timeframes.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What support does appiSpot provide?</h3>
              <p className="text-gray-600">
                We offer 24/7 customer support, host protection insurance, secure payments, dispute resolution, and marketing tools to help you succeed. Our host success team is always available to assist you.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 sm:py-24 bg-[#40d9ed]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Start Hosting?</h2>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
            Join our community of hosts and start earning from your space today
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-[#40d9ed] bg-white hover:bg-gray-100 transition-colors"
            >
              Create Account
            </Link>
            <Link
              to="/list-spot"
              className="inline-flex items-center justify-center px-8 py-4 border border-white text-lg font-medium rounded-md text-white hover:bg-white/10 transition-colors"
            >
              List Your Space
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeHost;

function renderStars(rating: number) {
  return (
    <div className="flex">
      {[...Array(Math.max(0, Math.floor(rating || 0)))].map((_, i) => (
        <Star key={i} className="w-5 h-5 fill-[#FFD700] text-[#FFD700]" />
      ))}
    </div>
  );
}