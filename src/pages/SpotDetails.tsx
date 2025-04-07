import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Users, Star, Building2, Calendar, Clock, Shield, Wifi, Car, Coffee, Music, Accessibility, File as Toilet, X, DollarSign, Menu, Heart, Share2, Award, CheckCircle, MessageSquare, Grid } from 'lucide-react';
import { getSpot } from '../lib/spots';
import { formatCurrency } from '../utils/format';
import toast from 'react-hot-toast';
import ImageCarousel from '../components/ImageCarousel';
import ImageViewer from '../components/ImageViewer';
import type { Spot } from '../lib/database.types';

interface Spot {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  capacity: number;
  pricePerHour: number;
  type: string;
  features: {
    parking: boolean;
    wifi: boolean;
    accessibility: boolean;
    kitchen: boolean;
    sound_system: boolean;
    restrooms: boolean;
  };
  amenities: string[];
  rules: string;
  featured_image: string | null;
  square_footage: number;
  rating: number;
  gallery_images?: string[];
  opening_hours?: {
    [key: string]: string;
  };
}

const SpotDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [spot, setSpot] = useState<Spot | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('10:00');
  const [endTime, setEndTime] = useState<string>('12:00');
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [guestCount, setGuestCount] = useState('1');
  const [eventType, setEventType] = useState('');
  const [showMobileBooking, setShowMobileBooking] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');
  
  // Favorite functionality
  const [isFavorite, setIsFavorite] = useState(false);

  const openingHours = {
    'Sunday': '10:00:00 - 18:00:00',
    'Monday': '10:00:00 - 18:00:00',
    'Tuesday': '10:00:00 - 18:00:00',
    'Wednesday': '10:00:00 - 18:00:00',
    'Thursday': '10:00:00 - 18:00:00',
    'Friday': '10:00:00 - 18:00:00',
    'Saturday': '10:00:00 - 18:00:00'
  };

  const recommendedFor = [
    'Birthday Party',
    'Gathering',
    'Baby Shower',
    'Wellness'
  ];

  const spotRules = [
    'No Smoking',
    'No Alcohol',
    'No Drugs',
    'No Littering',
    'No Sleeping in Vehicle',
    'No Selling of Alcohol',
    'No Overcrowding'
  ];

  const reviews = [
    {
      id: 1,
      author: 'John Smith',
      avatar: 'JS',
      rating: 5,
      date: '2025-01-15',
      comment: 'Amazing venue! Perfect for our corporate event. The space was clean, well-equipped, and exactly as described. The host was very responsive and accommodating. Would definitely book again!'
    },
    {
      id: 2,
      author: 'Sarah Johnson',
      avatar: 'SJ',
      rating: 4,
      date: '2025-01-10',
      comment: 'Great space with excellent amenities. The location was convenient and the parking was ample. Only giving 4 stars because the WiFi was a bit spotty during our event, but otherwise everything was perfect.'
    },
    {
      id: 3,
      author: 'Michael Brown',
      avatar: 'MB',
      rating: 5,
      date: '2025-01-05',
      comment: 'Hosted my birthday party here and it was fantastic! The space is even better than the pictures show. Plenty of room for all our guests and the sound system was top-notch. Highly recommend!'
    }
  ];

  const hostDetails = {
    name: 'George Samuel',
    joinDate: '2023-01-15',
    responseTime: 'Within an hour',
    responseRate: '98%',
    bio: "Hi, I'm George! I've been hosting on appiSpot for over 2 years and love helping people find the perfect space for their events. I own several unique venues across the city and take pride in maintaining them to the highest standards.",
    languages: ['English', 'Spanish'],
    verifications: ['ID', 'Email', 'Phone']
  };

  const cancellationPolicy = {
    type: 'Flexible',
    fullRefund: '24 hours before check-in',
    description: 'Cancel up to 24 hours before check-in and get a full refund. If you cancel within 24 hours of check-in, the booking is non-refundable.'
  };

  // Toggle favorite
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? 'Removed from wishlist' : 'Added to wishlist');
  };

  // Share functionality
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: spot?.name,
        text: `Check out this amazing spot: ${spot?.name}`,
        url: window.location.href,
      }).catch(err => {
        toast.success('Link copied to clipboard!');
        navigator.clipboard.writeText(window.location.href);
      });
    } else {
      toast.success('Link copied to clipboard!');
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
  };

  const allImages = useMemo(() => {
    if (!spot) return [];
    const images = [];
    if (spot.featured_image) {
      images.push(spot.featured_image);
    }
    if (Array.isArray(spot.gallery_images)) {
      images.push(...spot.gallery_images);
    }
    return images;
  }, [spot]);

  useEffect(() => {
    fetchSpotDetails();
  }, [id]);

  const fetchSpotDetails = async () => {
    try {
      const data = await getSpot(id!);
      setSpot({
        ...data,
        rating: 5,
        gallery_images: Array.isArray(data.gallery_images) ? data.gallery_images : []
      });
    } catch (error: any) {
      toast.error('Error loading spot details');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = useCallback((rating: number) => {
    // Ensure rating is a valid number between 0 and 5
    const validRating = Math.min(Math.max(0, rating || 0), 5);
    return (
      <div className="flex">
        {[...Array(Math.floor(validRating))].map((_, i) => (
          <Star key={i} className="w-4 h-4 sm:h-5 sm:w-5 fill-[#FFD700] text-[#FFD700]" />
        ))}
        {[...Array(5 - Math.floor(validRating))].map((_, i) => (
          <Star key={`empty-${i}`} className="w-4 h-4 sm:h-5 sm:w-5 text-gray-300" />
        ))}
      </div>
    );
  }, []);

  const calculateTotalHours = useMemo(() => {
    if (!startTime || !endTime) return 0;
    
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    
    let hours = endHour - startHour;
    const minutes = endMinute - startMinute;
    
    // Adjust for minutes
    hours += minutes / 60;
    
    // If end time is earlier than start time, assume it's the next day
    if (hours < 0) {
      hours += 24;
    }
    
    return Math.max(0, hours);
  }, [startTime, endTime]);

  const calculateTotalCost = useMemo(() => {
    if (!spot) return 0;
    const hours = calculateTotalHours;
    return spot.pricePerHour * hours;
  }, [spot, calculateTotalHours]);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!spot) return;
    
    // Validate form
    if (!selectedDate || !startTime || !endTime || !guestCount || !eventType) {
      toast.error('Please fill in all booking details');
      return;
    }
    
    // Create booking details object to pass to payment page
    const bookingDetails = {
      spotId: spot.id,
      spotName: spot.name,
      spotLocation: `${spot.city}, ${spot.state}`,
      spotImage: spot.featured_image || "https://images.unsplash.com/photo-1497366216548-37526070297c",
      date: new Date(selectedDate).toLocaleDateString('en-US', { 
        weekday: 'long',
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      startTime,
      endTime,
      guests: parseInt(guestCount),
      eventType,
      hours: calculateTotalHours,
      pricePerHour: spot.pricePerHour,
      totalPrice: calculateTotalCost
    };
    
    // Navigate to payment page with booking details
    navigate('/payment', { state: { bookingDetails } });
  };

  const tabs = ['Overview', 'Rules & Info', 'Reviews', 'Host Details', 'Cancellation Policy'];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2DD4BF]"></div>
      </div>
    );
  }

  if (!spot) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Spot not found</h2>
          <p className="mt-2 text-gray-600">The spot you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-sm text-gray-500">
            <Link to="/" className="hover:text-[#40d9ed]">Home</Link> / 
            <Link to="/explore" className="hover:text-[#40d9ed] mx-2">Explore</Link> / 
            <span className="text-gray-900">{spot.name}</span>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="px-4 sm:px-6 lg:px-8 mb-10">
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 h-[300px] sm:h-[500px]">
              {/* Main large image - takes up half the width on desktop */}
              <div className="md:col-span-6 relative h-full">
                <img
                  src={spot?.featured_image || "https://images.unsplash.com/photo-1497366216548-37526070297c"}
                  alt="Main"
                  className="w-full h-full object-cover cursor-pointer rounded-tl-xl rounded-bl-xl"
                  onClick={() => {
                    setSelectedImageIndex(0);
                    setShowImageViewer(true);
                  }}
                />
              </div>
              
              {/* Right side grid of smaller images */}
              <div className="hidden md:grid md:col-span-6 grid-cols-2 grid-rows-2 gap-2 h-full">
                {[0, 1, 2, 3].map((gridIndex) => {
                  const imageIndex = gridIndex + 1;
                  const imageUrl = allImages[imageIndex] || "https://images.unsplash.com/photo-1497366216548-37526070297c";
                  const isLastImage = gridIndex === 3;
                  const hasMoreImages = allImages.length > 5;
                  
                  return (
                    <div 
                      key={gridIndex} 
                      className={`relative h-full ${gridIndex === 1 ? 'rounded-tr-xl' : ''} ${gridIndex === 3 ? 'rounded-br-xl' : ''}`}
                    >
                      <img
                        src={imageUrl}
                        alt={`Gallery ${gridIndex + 1}`}
                        className={`w-full h-full object-cover cursor-pointer ${gridIndex === 1 ? 'rounded-tr-xl' : ''} ${gridIndex === 3 ? 'rounded-br-xl' : ''}`}
                        onClick={() => {
                          setSelectedImageIndex(imageIndex);
                          setShowImageViewer(true);
                        }}
                      />
                      {isLastImage && hasMoreImages && (
                        <div 
                          className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center cursor-pointer rounded-br-xl"
                          onClick={() => setShowImageViewer(true)}
                        >
                          <span className="text-white font-medium">+{allImages.length - 5} more</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="absolute top-4 right-4 flex space-x-3">
              <button
                onClick={handleShare}
                className="p-2.5 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                aria-label="Share"
              >
                <Share2 className="h-5 w-5 text-gray-800" />
              </button>
              <button
                onClick={toggleFavorite}
                className={`p-2.5 ${isFavorite ? 'bg-red-500' : 'bg-white'} rounded-full shadow-md hover:bg-gray-100 transition-colors`}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? 'text-white' : 'text-gray-700'} ${isFavorite ? 'fill-red-500' : ''}`} />
              </button>
            </div>
            
            {/* View all photos button */}
            <div className="absolute bottom-4 right-4">
              <button
                onClick={() => setShowImageViewer(true)}
                className="px-4 py-2.5 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors text-sm font-medium flex items-center"
              >
                <Grid className="h-4 w-4 mr-2" />
                Show all photos
              </button>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg lg:hidden z-20">
          <button
            onClick={() => setShowMobileBooking(!showMobileBooking)}
            className="w-full bg-[#2DD4BF] text-white py-3 rounded-md font-medium flex items-center justify-center space-x-2"
          >
            <span>{showMobileBooking ? 'Hide Booking Form' : 'Book Now'}</span>
            <span className="font-bold">{formatCurrency(spot?.pricePerHour || 0)}/hr</span>
          </button>
        </div>

        {showMobileBooking && (
          <div className="fixed inset-0 bg-white z-30 lg:hidden overflow-y-auto">
            <div className="p-4">
              <button
                onClick={() => setShowMobileBooking(false)}
                className="absolute top-4 right-4 p-2"
              >
                <X className="h-6 w-6" />
              </button>
              <div className="pt-8">
                <div className="bg-white rounded-lg p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-2xl font-bold text-[#2DD4BF]">
                      {formatCurrency(spot.pricePerHour)}<span className="text-sm font-normal">/hour</span>
                    </div>
                    {renderStars(spot.rating)}
                  </div>

                  <form onSubmit={handleBooking} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Check in</label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full border-gray-300 rounded-md focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Start time</label>
                        <input
                          type="time"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          className="w-full border-gray-300 rounded-md focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">End time</label>
                        <input
                          type="time"
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                          className="w-full border-gray-300 rounded-md focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Guests ({spot.capacity} max)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max={spot.capacity}
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                        className="w-full border-gray-300 rounded-md focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        What are you planning for?
                      </label>
                      <select
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        className="w-full border-gray-300 rounded-md focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
                        required
                      >
                        <option value="">Select event type</option>
                        <option value="wedding">Wedding</option>
                        <option value="baby_shower">Baby Shower</option>
                        <option value="birthday">Birthday Party</option>
                        <option value="corporate">Corporate Event</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">${spot.pricePerHour} × {calculateTotalHours} hours</span>
                        <span className="font-bold text-gray-900">{formatCurrency(calculateTotalCost)}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm mt-2 pt-2 border-t border-gray-200">
                        <span className="text-gray-600 font-medium">Total amount</span>
                        <span className="font-bold text-gray-900">{formatCurrency(calculateTotalCost)}</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#40d9ed] text-white py-3 rounded-lg hover:bg-[#26b8a5] transition-colors font-medium"
                    >
                      Reserve
                    </button>
                  </form>
                  
                  <p className="text-center text-sm text-gray-500 mt-4">You won't be charged yet</p>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700">Highly rated host</span>
                      <CheckCircle className="h-5 w-5 text-[#40d9ed]" />
                    </div>
                    <p className="text-sm text-gray-600">
                      {hostDetails.name} has received 5-star ratings from 95% of recent guests.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 lg:pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2">
              {/* Spot Header */}
              <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{spot.name}</h1>
                <div className="flex flex-wrap items-center gap-y-2">
                  <div className="flex items-center text-gray-600 mr-4">
                    <MapPin className="h-5 w-5 text-[#40d9ed] mr-1" />
                    <span>{`${spot.city}, ${spot.state}`}</span>
                  </div>
                  <div className="flex items-center mr-4">
                    {renderStars(spot.rating)}
                    <span className="ml-1 text-gray-600">(20 reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-[#40d9ed] mr-1" />
                    <span className="text-gray-600">Superhost</span>
                  </div>
                </div>
              </div>
              
              {/* Tabs Navigation */}
              <div className="border-b border-gray-200 mb-8">
                <nav className="-mb-px flex space-x-8 overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab
                          ? 'border-[#40d9ed] text-[#40d9ed]'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>
              
              {/* Tab Content */}
              <div className="mb-12">
                {activeTab === 'Overview' && (
                  <div className="space-y-8">
                    {/* Key Details */}
                    <div className="border-b border-gray-200 pb-8">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Check in</h4>
                          <p className="mt-1 text-base font-medium">10:00 AM</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Check out</h4>
                          <p className="mt-1 text-base font-medium">12:00 PM</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Capacity</h4>
                          <p className="mt-1 text-base font-medium">{spot.capacity} guests</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Size</h4>
                          <p className="mt-1 text-base font-medium">{spot.square_footage} sq ft</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Host */}
                    <div className="border-b border-gray-200 pb-8">
                      <div className="flex items-center space-x-4">
                        <div className="h-14 w-14 rounded-full bg-[#40d9ed] flex items-center justify-center">
                          <span className="text-white text-lg font-semibold">GS</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">Hosted by {hostDetails.name}</h3>
                          <p className="text-gray-600">Host since {new Date(hostDetails.joinDate).toLocaleDateString()}</p>
                          <div className="flex items-center mt-1">
                            <CheckCircle className="h-4 w-4 text-[#40d9ed] mr-1" />
                            <span className="text-sm text-gray-600">Superhost</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <div className="border-b border-gray-200 pb-8">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">About this spot</h2>
                      <p className="text-gray-600 whitespace-pre-line leading-relaxed">{spot.description}</p>
                    </div>
                    
                    {/* Features & Amenities */}
                    <div className="border-b border-gray-200 pb-8">
                      <h2 className="text-xl font-semibold text-gray-900 mb-6">What this place offers</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4">
                        {Object.entries(spot.features).map(([key, enabled]) => {
                          if (!enabled) return null;
                          const Icon = {
                            wifi: Wifi,
                            parking: Car,
                            kitchen: Coffee,
                            sound_system: Music,
                            accessibility: Accessibility,
                            restrooms: Toilet
                          }[key];
                          return (
                            <div key={key} className="flex items-center space-x-4">
                              {Icon && <Icon className="h-6 w-6 text-[#40d9ed]" />}
                              <span className="text-gray-700 capitalize">{key.replace('_', ' ')}</span>
                            </div>
                          );
                        })}
                        {spot.amenities?.map((amenity, index) => (
                          <div key={index} className="flex items-center space-x-4">
                            <Shield className="h-6 w-6 text-[#40d9ed]" />
                            <span className="text-gray-700">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Recommended For */}
                    <div className="border-b border-gray-200 pb-8">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommended for</h2>
                      <div className="flex flex-wrap gap-2">
                        {recommendedFor.map((item, index) => (
                          <span key={index} className="px-3 py-1 bg-[#40d9ed]/10 text-[#40d9ed] rounded-full text-sm">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Availability */}
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">Availability</h2>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="font-medium text-gray-900 mb-3">Operating hours</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2">
                          <div className="space-y-2">
                            {Object.entries(openingHours).map(([day, hours]) => {
                              const [start, end] = hours.split(' - ');
                              return (
                                <div key={day} className="flex items-center text-gray-600">
                                  <span className="font-medium w-24">{day}</span>
                                  <span className="flex-1">{formatTime(start)} -
                                  {formatTime(end)}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'Rules & Info' && (
                  <div className="space-y-8">
                    {/* House Rules */}
                    <div className="border-b border-gray-200 pb-8">
                      <h2 className="text-xl font-semibold text-gray-900 mb-6">House rules</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4">
                        {spotRules.map((rule, index) => (
                          <div key={index} className="flex items-center space-x-4">
                            <CheckCircle className="h-5 w-5 text-[#40d9ed]" />
                            <span className="text-gray-700">{rule}</span>
                          </div>
                        ))}
                        {spot.rules && (
                          <div className="flex items-center space-x-4 sm:col-span-2">
                            <CheckCircle className="h-5 w-5 text-[#40d9ed]" />
                            <span className="text-gray-700">{spot.rules}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Additional Information */}
                    <div className="border-b border-gray-200 pb-8">
                      <h2 className="text-xl font-semibold text-gray-900 mb-6">Additional Information</h2>
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium text-gray-900 mb-2">Check-in process</h3>
                          <p className="text-gray-600">
                            You'll receive detailed check-in instructions after your booking is confirmed.
                          </p>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 mb-2">Insurance</h3>
                          <p className="text-gray-600">
                            All bookings include liability coverage for any damages or accidents that may occur during your event.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'Reviews' && (
                  <div className="space-y-8">
                    <div className="border-b border-gray-200 pb-8">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">Reviews</h2>
                        <div className="flex items-center">
                          {renderStars(spot.rating)}
                          <span className="ml-2 text-gray-600">(20 reviews)</span>
                        </div>
                      </div>
                      <div className="space-y-6">
                        {reviews.map((review) => (
                          <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                            <div className="flex items-center mb-4">
                              <div className="h-10 w-10 rounded-full bg-[#40d9ed] flex items-center justify-center text-white font-medium">
                                {review.avatar}
                              </div>
                              <div className="ml-4">
                                <h4 className="font-medium text-gray-900">{review.author}</h4>
                                <div className="flex items-center mt-1">
                                  {renderStars(review.rating)}
                                  <span className="ml-2 text-sm text-gray-500">
                                    {new Date(review.date).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-600">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'Host Details' && (
                  <div className="space-y-8">
                    <div className="border-b border-gray-200 pb-8">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="h-16 w-16 rounded-full bg-[#40d9ed] flex items-center justify-center">
                          <span className="text-white text-xl font-semibold">GS</span>
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold text-gray-900">About {hostDetails.name}</h2>
                          <p className="text-gray-600">Host since {new Date(hostDetails.joinDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-medium text-gray-900 mb-2">Bio</h3>
                          <p className="text-gray-600">{hostDetails.bio}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <h3 className="font-medium text-gray-900 mb-2">Response time</h3>
                            <p className="text-gray-600">{hostDetails.responseTime}</p>
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 mb-2">Response rate</h3>
                            <p className="text-gray-600">{hostDetails.responseRate}</p>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 mb-2">Languages</h3>
                          <div className="flex flex-wrap gap-2">
                            {hostDetails.languages.map((language, index) => (
                              <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                                {language}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 mb-2">Verified info</h3>
                          <div className="space-y-2">
                            {hostDetails.verifications.map((verification, index) => (
                              <div key={index} className="flex items-center text-gray-600">
                                <CheckCircle className="h-5 w-5 text-[#40d9ed] mr-2" />
                                <span>{verification} verified</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'Cancellation Policy' && (
                  <div className="space-y-8">
                    <div className="border-b border-gray-200 pb-8">
                      <h2 className="text-xl font-semibold text-gray-900 mb-6">
                        {cancellationPolicy.type} cancellation policy
                      </h2>
                      <div className="space-y-6">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-start space-x-4">
                            <Shield className="h-6 w-6 text-[#40d9ed] mt-1" />
                            <div>
                              <h3 className="font-medium text-gray-900">Full refund</h3>
                              <p className="text-gray-600 mt-1">
                                Cancel up to {cancellationPolicy.fullRefund} to get a full refund.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 mb-2">Cancellation details</h3>
                          <p className="text-gray-600">{cancellationPolicy.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Booking Form - Desktop */}
            <div className="hidden lg:block">
              <div className="sticky top-8">
                <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-2xl font-bold text-[#2DD4BF]">
                      {formatCurrency(spot.pricePerHour)}<span className="text-sm font-normal">/hour</span>
                    </div>
                    {renderStars(spot.rating)}
                  </div>

                  <form onSubmit={handleBooking} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Check in</label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full border-gray-300 rounded-md focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Start time</label>
                        <input
                          type="time"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          className="w-full border-gray-300 rounded-md focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">End time</label>
                        <input
                          type="time"
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                          className="w-full border-gray-300 rounded-md focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Guests ({spot.capacity} max)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max={spot.capacity}
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                        className="w-full border-gray-300 rounded-md focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        What are you planning for?
                      </label>
                      <select
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        className="w-full border-gray-300 rounded-md focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
                        required
                      >
                        <option value="">Select event type</option>
                        <option value="wedding">Wedding</option>
                        <option value="baby_shower">Baby Shower</option>
                        <option value="birthday">Birthday Party</option>
                        <option value="corporate">Corporate Event</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">${spot.pricePerHour} × {calculateTotalHours} hours</span>
                        <span className="font-bold text-gray-900">{formatCurrency(calculateTotalCost)}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm mt-2 pt-2 border-t border-gray-200">
                        <span className="text-gray-600 font-medium">Total amount</span>
                        <span className="font-bold text-gray-900">{formatCurrency(calculateTotalCost)}</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#40d9ed] text-white py-3 rounded-lg hover:bg-[#26b8a5] transition-colors font-medium"
                    >
                      Reserve
                    </button>
                  </form>
                  
                  <p className="text-center text-sm text-gray-500 mt-4">You won't be charged yet</p>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700">Highly rated host</span>
                      <CheckCircle className="h-5 w-5 text-[#40d9ed]" />
                    </div>
                    <p className="text-sm text-gray-600">
                      {hostDetails.name} has received 5-star ratings from 95% of recent guests.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotDetails;