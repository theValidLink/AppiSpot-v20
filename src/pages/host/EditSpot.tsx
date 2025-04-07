import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Home, 
  MapPin, 
  Camera, 
  DollarSign, 
  Calendar, 
  Shield, 
  CheckCircle, 
  X, 
  Plus, 
  Wifi, 
  Car, 
  Accessibility, 
  File as Toilet, 
  Heart, 
  Music, 
  Users, 
  Building2, 
  Droplet, 
  Flame, 
  Thermometer,
  Upload,
  Eye,
  Star,
  Info,
  Save
} from 'lucide-react';
import toast from 'react-hot-toast';

// Define amenities
const amenities = [
  { id: 'wifi', name: 'Wifi', icon: Wifi },
  { id: 'parking', name: 'Parking', icon: Car },
  { id: 'accessibility', name: 'Accessibility', icon: Accessibility },
  { id: 'restrooms', name: 'Restroom', icon: Toilet },
  { id: 'pet_friendly', name: 'Pet-friendly', icon: Heart },
  { id: 'noise_friendly', name: 'Noise-friendly', icon: Music },
  { id: 'chairs', name: 'Chairs', icon: Users },
  { id: 'tables', name: 'Tables', icon: Building2 },
  { id: 'pool', name: 'Pool', icon: Droplet },
  { id: 'fire_pit', name: 'Fire Pit', icon: Flame },
  { id: 'hot_tub', name: 'Hot Tub', icon: Thermometer },
];

// Define spot types
const spotTypes = [
  { id: 'venue', name: 'Venue', description: 'Event spaces, halls, ballrooms' },
  { id: 'studio', name: 'Studio', description: 'Creative, photo, recording spaces' },
  { id: 'office', name: 'Office', description: 'Meeting rooms, coworking spaces' },
  { id: 'outdoor', name: 'Outdoor', description: 'Gardens, rooftops, patios' },
  { id: 'restaurant', name: 'Restaurant', description: 'Dining spaces, cafes, bars' },
];

const EditSpot = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    capacity: '',
    squareFootage: '',
    pricePerHour: '',
    selectedAmenities: [] as string[],
    rules: '',
    cancellationPolicy: '24',
    status: 'draft'
  });

  // Load spot data from location state or fetch it
  useEffect(() => {
    if (location.state?.spot) {
      const spot = location.state.spot;
      
      // Convert features to selectedAmenities
      const selectedAmenities = Object.entries(spot.features || {})
        .filter(([_, enabled]) => enabled)
        .map(([key]) => key);
      
      setFormData({
        name: spot.name || '',
        description: spot.description || '',
        type: spot.type || '',
        address: spot.address || '',
        city: spot.city || '',
        state: spot.state || '',
        zipCode: spot.zipCode || '',
        capacity: spot.capacity?.toString() || '',
        squareFootage: spot.squareFootage?.toString() || '',
        pricePerHour: spot.pricePerHour?.toString() || '',
        selectedAmenities,
        rules: spot.rules || '',
        cancellationPolicy: '24',
        status: spot.status || 'draft'
      });

      // Set images
      const allImages = [];
      if (spot.featuredImage) {
        allImages.push(spot.featuredImage);
      }
      if (Array.isArray(spot.galleryImages)) {
        allImages.push(...spot.galleryImages);
      }
      setImages(allImages);
    } else {
      // If no spot data in location state, fetch it or redirect
      toast.error('Spot data not found');
      navigate('/host/spots');
    }
  }, [location.state, id, navigate]);

  // Update progress bar based on current step
  useEffect(() => {
    const totalSteps = 5;
    setProgress((currentStep / totalSteps) * 100);
  }, [currentStep]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleAmenity = (amenityId: string) => {
    setFormData(prev => {
      const selectedAmenities = [...prev.selectedAmenities];
      if (selectedAmenities.includes(amenityId)) {
        return { ...prev, selectedAmenities: selectedAmenities.filter(id => id !== amenityId) };
      } else {
        return { ...prev, selectedAmenities: [...selectedAmenities, amenityId] };
      }
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Simulate image upload
    const newImages = files.map(file => URL.createObjectURL(file));
    setImages(prev => [...prev, ...newImages]);
    toast.success(`${files.length} image${files.length > 1 ? 's' : ''} uploaded successfully`);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (publishNow: boolean = false) => {
    // Validate form
    if (!formData.name || !formData.description || !formData.type || !formData.address || 
        !formData.city || !formData.state || !formData.zipCode || !formData.capacity || 
        !formData.pricePerHour || images.length === 0) {
      toast.error('Please fill in all required fields and upload at least one image');
      return;
    }

    // Determine if this is an update to an existing published spot
    const isPublishedUpdate = formData.status === 'active' && !publishNow;
    
    // Set appropriate success message based on the action
    let successMessage = '';
    if (isPublishedUpdate) {
      successMessage = 'Your spot has been updated successfully!';
    } else if (publishNow) {
      successMessage = 'Your spot has been published successfully!';
    } else {
      successMessage = 'Your changes have been saved as draft';
    }
    
    // Simulate form submission
    toast.success(successMessage);
    navigate('/host/spots');
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  const getSpotTypeName = (typeId: string) => {
    const type = spotTypes.find(t => t.id === typeId);
    return type ? type.name : typeId;
  };

  const renderStars = (rating: number = 5) => {
    return (
      <div className="flex">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" />
        ))}
      </div>
    );
  };

  // Format currency
  const formatCurrency = (amount: string) => {
    const num = parseFloat(amount);
    return isNaN(num) ? '$0.00' : `$${num.toFixed(2)}`;
  };

  const nextStep = () => {
    // Validate current step
    if (currentStep === 1 && (!formData.name || !formData.type)) {
      toast.error('Please provide a name and select a spot type');
      return;
    }
    
    if (currentStep === 2 && (!formData.address || !formData.city || !formData.state || !formData.zipCode)) {
      toast.error('Please provide complete address information');
      return;
    }
    
    if (currentStep === 3 && (!formData.capacity || !formData.pricePerHour)) {
      toast.error('Please provide capacity and price information');
      return;
    }
    
    if (currentStep === 4 && images.length === 0) {
      toast.error('Please upload at least one image');
      return;
    }

    setCurrentStep(prev => Math.min(prev + 1, 5));
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  // Preview component
  const SpotPreview = () => {
    return (
      <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <button 
                onClick={togglePreview}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <div className="text-center">
                <h1 className="text-lg font-semibold text-gray-900">Preview your listing</h1>
              </div>
              <div className="w-6"></div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Image Gallery */}
          <div className="relative mb-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 h-[300px] sm:h-[500px]">
              {/* Main large image */}
              <div className="md:col-span-6 relative h-full">
                <img
                  src={images.length > 0 ? images[0] : "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"}
                  alt="Main"
                  className="w-full h-full object-cover rounded-tl-xl rounded-bl-xl"
                />
              </div>
              
              {/* Right side grid of smaller images */}
              <div className="hidden md:grid md:col-span-6 grid-cols-2 grid-rows-2 gap-2 h-full">
                {[1, 2, 3, 4].map((gridIndex) => {
                  const imageIndex = gridIndex < images.length ? gridIndex : 0;
                  const imageUrl = images[imageIndex] || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200";
                  const isLastImage = gridIndex === 4;
                  const hasMoreImages = images.length > 5;
                  
                  return (
                    <div 
                      key={gridIndex} 
                      className={`relative h-full ${gridIndex === 1 ? 'rounded-tr-xl' : ''} ${gridIndex === 3 ? 'rounded-br-xl' : ''}`}
                    >
                      <img
                        src={imageUrl}
                        alt={`Gallery ${gridIndex}`}
                        className={`w-full h-full object-cover ${gridIndex === 1 ? 'rounded-tr-xl' : ''} ${gridIndex === 3 ? 'rounded-br-xl' : ''}`}
                      />
                      {isLastImage && hasMoreImages && (
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-br-xl">
                          <span className="text-white font-medium">+{images.length - 5} more</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Spot Header */}
              <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{formData.name || "Your Spot Name"}</h1>
                <div className="flex flex-wrap items-center gap-y-2">
                  <div className="flex items-center text-gray-600 mr-4">
                    <MapPin className="h-5 w-5 text-[#40d9ed] mr-1" />
                    <span>{formData.city ? `${formData.city}, ${formData.state}` : "Location"}</span>
                  </div>
                  <div className="flex items-center mr-4">
                    {renderStars(5)}
                    <span className="ml-1 text-gray-600">(New)</span>
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <div className="border-b border-gray-200 pb-8 mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">About this spot</h2>
                <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                  {formData.description || "Your spot description will appear here. Make sure to provide a detailed and engaging description to attract potential guests."}
                </p>
              </div>
              
              {/* Features & Amenities */}
              <div className="border-b border-gray-200 pb-8 mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">What this place offers</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4">
                  {formData.selectedAmenities.map((amenityId) => {
                    const amenity = amenities.find(a => a.id === amenityId);
                    if (!amenity) return null;
                    return (
                      <div key={amenityId} className="flex items-center space-x-4">
                        <amenity.icon className="h-6 w-6 text-[#40d9ed]" />
                        <span className="text-gray-700">{amenity.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Rules */}
              {formData.rules && (
                <div className="border-b border-gray-200 pb-8 mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">House Rules</h2>
                  <p className="text-gray-600">{formData.rules}</p>
                </div>
              )}
            </div>

            <div>
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 sticky top-24">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">
                    {formatCurrency(formData.pricePerHour)}
                    <span className="text-base font-normal text-gray-600">/hour</span>
                  </h2>
                  <div className="flex items-center">
                    {renderStars(5)}
                    <span className="ml-1 text-gray-600">(New)</span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                    <div className="flex items-center text-gray-900">
                      <Users className="h-5 w-5 text-gray-400 mr-2" />
                      <span>{formData.capacity || "0"} guests maximum</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Space</label>
                    <div className="flex items-center text-gray-900">
                      <Building2 className="h-5 w-5 text-gray-400 mr-2" />
                      <span>{formData.squareFootage || "0"} sq ft</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <div className="flex items-center text-gray-900">
                      <Home className="h-5 w-5 text-gray-400 mr-2" />
                      <span>{getSpotTypeName(formData.type)}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full bg-[#40d9ed] text-white py-3 rounded-lg hover:bg-[#26b8a5] transition-colors font-medium"
                  disabled
                >
                  Reserve
                </button>
                
                <p className="text-center text-sm text-gray-500 mt-4">This is a preview. Your spot is not published yet.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {showPreview && <SpotPreview />}
      
      {/* Custom Header - Replaces Navbar */}
      <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button 
              onClick={() => navigate('/host/spots')}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div className="text-center">
              <h1 className="text-lg font-bold text-gray-900">Edit your spot</h1>
            </div>
            <div className="w-6"></div> {/* Empty div for flex alignment */}
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="fixed top-16 left-0 right-0 h-1 bg-gray-200 z-10">
        <div 
          className="h-full bg-[#40d9ed] transition-all duration-500 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="pt-20 pb-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Let's start with the basics</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    What's the name of your spot? <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Downtown Event Space"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-[#40d9ed] focus:border-[#40d9ed] shadow-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What type of spot are you listing? <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {spotTypes.map(type => (
                      <div 
                        key={type.id}
                        onClick={() => setFormData(prev => ({ ...prev, type: type.id }))}
                        className={`p-4 border rounded-xl cursor-pointer transition-all ${
                          formData.type === type.id 
                            ? 'border-[#40d9ed] bg-[#40d9ed]/5 shadow-sm' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                            formData.type === type.id ? 'border-[#40d9ed]' : 'border-gray-300'
                          }`}>
                            {formData.type === type.id && (
                              <div className="w-3 h-3 rounded-full bg-[#40d9ed]"></div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{type.name}</h3>
                            <p className="text-sm text-gray-500">{type.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Describe your spot <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Tell potential guests what makes your spot special..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-[#40d9ed] focus:border-[#40d9ed] shadow-sm"
                    required
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Include details about the space, atmosphere, and what makes it unique.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Location */}
        {currentStep === 2 && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Where's your spot located?</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Street address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Main St"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-[#40d9ed] focus:border-[#40d9ed] shadow-sm"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-[#40d9ed] focus:border-[#40d9ed] shadow-sm"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="State"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-[#40d9ed] focus:border-[#40d9ed] shadow-sm"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="12345"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-[#40d9ed] focus:border-[#40d9ed] shadow-sm"
                    required
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-[#40d9ed] mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Your address is only shared with guests after they book</p>
                      <p className="text-sm text-gray-500 mt-1">
                        We'll show the general area of your spot on the listing page to help guests get an idea of the location.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Capacity & Pricing */}
        {currentStep === 3 && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Capacity and pricing</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
                    Maximum capacity <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="capacity"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleChange}
                      placeholder="0"
                      min="1"
                      className="w-full pl-4 pr-12 py-3 rounded-lg border border-gray-300 focus:ring-[#40d9ed] focus:border-[#40d9ed] shadow-sm"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">people</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="squareFootage" className="block text-sm font-medium text-gray-700 mb-1">
                    Square footage
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="squareFootage"
                      name="squareFootage"
                      value={formData.squareFootage}
                      onChange={handleChange}
                      placeholder="0"
                      min="1"
                      className="w-full pl-4 pr-12 py-3 rounded-lg border border-gray-300 focus:ring-[#40d9ed] focus:border-[#40d9ed] shadow-sm"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">sq ft</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="pricePerHour" className="block text-sm font-medium text-gray-700 mb-1">
                    Price per hour <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      id="pricePerHour"
                      name="pricePerHour"
                      value={formData.pricePerHour}
                      onChange={handleChange}
                      placeholder="0"
                      min="1"
                      step="0.01"
                      className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-300 focus:ring-[#40d9ed] focus:border-[#40d9ed] shadow-sm"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">/hour</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="cancellationPolicy" className="block text-sm font-medium text-gray-700 mb-1">
                    Cancellation policy
                  </label>
                  <select
                    id="cancellationPolicy"
                    name="cancellationPolicy"
                    value={formData.cancellationPolicy}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-[#40d9ed] focus:border-[#40d9ed] shadow-sm"
                  >
                    <option value="24">Flexible (24 hours notice)</option>
                    <option value="48">Moderate (48 hours notice)</option>
                    <option value="72">Strict (72 hours notice)</option>
                  </select>
                  <p className="mt-2 text-sm text-gray-500">
                    This determines how much notice guests need to give before cancelling without penalties.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Photos */}
        {currentStep === 4 && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Add photos of your spot</h2>
              <p className="text-gray-600 mb-6">
                Photos help guests imagine staying at your place. You can start with one and add more after you publish.
              </p>

              {/* Image upload area */}
              <div className="mb-6">
                <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col justify-center items-center bg-gray-50 hover:bg-gray-100 transition-colors">
                  <input
                    type="file"
                    id="image-upload"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <label htmlFor="image-upload" className="cursor-pointer text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Upload your photos</h3>
                    <p className="text-sm text-gray-500 mb-4">Drag and drop or click to browse</p>
                    <p className="text-xs text-gray-400">
                      The first image will be your featured image. You can rearrange them later.
                    </p>
                  </label>
                </div>
              </div>

              {/* Image gallery */}
              {images.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Your photos ({images.length})</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                        <img 
                          src={image} 
                          alt={`Spot image ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="p-2 bg-white text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600 hover:text-white"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                        {index === 0 && (
                          <div className="absolute top-2 left-2 bg-[#40d9ed] text-white text-xs font-medium px-2 py-1 rounded">
                            Featured
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex">
                  <Info className="h-5 w-5 text-yellow-400 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium text-yellow-800">Tips for great spot photos:</h3>
                    <ul className="mt-2 text-sm text-yellow-700 list-disc pl-5 space-y-1">
                      <li>Use high-quality, well-lit photos</li>
                      <li>Show the entire space from different angles</li>
                      <li>Highlight special features and amenities</li>
                      <li>Make sure the space is clean and tidy</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Amenities & Features */}
        {currentStep === 5 && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Amenities and features</h2>
              <p className="text-gray-600 mb-6">
                Let guests know what your spot offers. You can add more amenities after you publish.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">What amenities do you offer?</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {amenities.map(amenity => (
                      <div
                        key={amenity.id}
                        onClick={() => toggleAmenity(amenity.id)}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          formData.selectedAmenities.includes(amenity.id)
                            ? 'border-[#40d9ed] bg-[#40d9ed]/5 shadow-sm'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center mr-3 ${
                            formData.selectedAmenities.includes(amenity.id) ? 'border-[#40d9ed] bg-[#40d9ed]' : 'border-gray-300'
                          }`}>
                            {formData.selectedAmenities.includes(amenity.id) && (
                              <CheckCircle className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <div className="flex items-center">
                            <amenity.icon className="h-5 w-5 text-gray-500 mr-2" />
                            <span className="text-sm font-medium text-gray-900">{amenity.name}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="rules" className="block text-lg font-medium text-gray-900 mb-4">
                    House rules
                  </label>
                  <textarea
                    id="rules"
                    name="rules"
                    rows={4}
                    value={formData.rules}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-[#40d9ed] focus:border-[#40d9ed] shadow-sm"
                    placeholder="List any rules or guidelines for guests using your spot..."
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Clear rules help set expectations with guests and can prevent issues.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-10">
        <div className="max-w-3xl mx-auto flex justify-between">
          {currentStep > 1 ? (
            <div className="flex space-x-3">
              <button
                onClick={prevStep}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              
              {currentStep >= 3 && (
                <button
                  onClick={togglePreview}
                  className="px-6 py-3 border border-[#40d9ed] rounded-lg text-[#40d9ed] hover:bg-[#40d9ed]/5 transition-colors flex items-center"
                >
                  <Eye className="h-5 w-5 mr-2" />
                  Preview
                </button>
              )}
            </div>
          ) : (
            <div></div> // Empty div for spacing
          )}

          {currentStep < 5 ? (
            <button
              onClick={nextStep}
              className="px-6 py-3 bg-[#40d9ed] text-white rounded-lg hover:bg-[#26b8a5] transition-colors font-medium"
            >
              Next
            </button>
          ) : (
            <div className="flex space-x-3">
              {formData.status === 'active' ? (
                <button
                  onClick={() => handleSubmit(false)}
                  className="px-6 py-3 bg-[#40d9ed] text-white rounded-lg hover:bg-[#26b8a5] transition-colors font-medium"
                >
                  <Save className="h-5 w-5 mr-2 inline" />
                  Save Changes
                </button>
              ) : (
                <>
                  <button
                    onClick={() => handleSubmit(false)}
                    className="px-6 py-3 border border-[#40d9ed] text-[#40d9ed] rounded-lg hover:bg-[#40d9ed]/5 transition-colors flex items-center font-medium"
                  >
                    <Save className="h-5 w-5 mr-2" />
                    Save as Draft
                  </button>
                  <button
                    onClick={() => handleSubmit(true)}
                    className="px-6 py-3 bg-[#40d9ed] text-white rounded-lg hover:bg-[#26b8a5] transition-colors font-medium"
                  >
                    Publish
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditSpot;