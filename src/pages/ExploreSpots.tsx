import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Search, Filter, MapPin, Users, Star, Building2, Warehouse, Briefcase, Music, Sun, Coffee, Wifi, Car, DollarSign, Accessibility, X, ChevronDown, ChevronUp, Sliders, ChevronLeft, ChevronRight, File as Toilet, Heart, Droplet, Flame, Thermometer } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { getSpots } from '../lib/spots';
import { formatCurrency } from '../utils/format';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';
import type { Spot } from '../lib/database.types'; 

const categories = [
  {
    id: 'venue',
    name: 'Venues',
    description: 'Perfect for events and gatherings',
    icon: Warehouse,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'office',
    name: 'Office Spaces',
    description: 'Professional workspaces',
    icon: Briefcase,
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'studio',
    name: 'Studios',
    description: 'Creative and recording spaces',
    icon: Music,
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'outdoor',
    name: 'Outdoor Spaces',
    description: 'Open-air locations',
    icon: Sun,
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'restaurant',
    name: 'Restaurants',
    description: 'Dining and entertainment',
    icon: Coffee,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200',
  },
];

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

const priceRanges = [
  { id: 'budget', name: 'Budget', description: 'Up to $50/hr' },
  { id: 'mid', name: 'Mid-Range', description: '$51-$150/hr' },
  { id: 'premium', name: 'Premium', description: '$150+/hr' },
];

const capacityOptions = [
  { id: 'small', name: 'Small', description: 'Up to 20 people' },
  { id: 'medium', name: 'Medium', description: '21-50 people' },
  { id: 'large', name: 'Large', description: '50+ people' },
];

const ExploreSpots = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [spots, setSpots] = useState<Spot[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: searchParams.get('type') || '',
    priceRange: '',
    capacity: '',
    rating: '',
    location: '',
    amenities: [] as string[],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [spotsPerPage, setSpotsPerPage] = useState(9);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState({
    price: true,
    capacity: true,
    rating: true,
    amenities: true
  });

  const currentCategory = useMemo(() => {
    return categories.find(cat => cat.id === filters.type);
  }, [filters.type]);

  const fetchSpots = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getSpots();
      setSpots(data);
    } catch (error) {
      // Error is already handled by the spots service
      setSpots([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSpots();
  }, [fetchSpots]);

  const filteredSpots = useMemo(() => {
    const searchTermLower = searchTerm.toLowerCase();
    
    return spots.filter(spot => {
      // Search filter
      const matchesSearch = searchTerm === '' || [
        spot.name,
        spot.description,
        spot.city,
        spot.state
      ].some(field => field?.toLowerCase().includes(searchTermLower));
      
      // Type filter
      const matchesType = !filters.type || spot.type === filters.type;
      
      // Capacity filter
      const matchesCapacity = !filters.capacity || (
        filters.capacity === 'small' ? spot.capacity <= 20 :
        filters.capacity === 'medium' ? spot.capacity > 20 && spot.capacity <= 50 :
        filters.capacity === 'large' ? spot.capacity > 50 : true
      );

      // Price filter
      const matchesPrice = !filters.priceRange || (
        filters.priceRange === 'budget' ? spot.pricePerHour <= 50 :
        filters.priceRange === 'mid' ? spot.pricePerHour > 50 && spot.pricePerHour <= 150 :
        filters.priceRange === 'premium' ? spot.pricePerHour > 150 : true
      );

      // Rating filter
      const matchesRating = !filters.rating || (
        spot.rating >= parseInt(filters.rating)
      );

      // Location filter
      const matchesLocation = !filters.location || (
        spot.city.toLowerCase().includes(filters.location.toLowerCase()) ||
        spot.state.toLowerCase().includes(filters.location.toLowerCase())
      );
      
      // Amenities filter
      const matchesAmenities = filters.amenities.length === 0 || 
        filters.amenities.every(amenity => 
          spot.features && spot.features[amenity as keyof typeof spot.features]
        );

      return matchesSearch && matchesType && matchesCapacity && matchesPrice && 
             matchesRating && matchesLocation && matchesAmenities;
    });
  }, [spots, searchTerm, filters]);

  const renderStars = useCallback((rating: number = 5) => {
    return (
      <div className="flex">
        {[...Array(Math.min(5, Math.floor(rating || 0)))].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" />
        ))}
      </div>
    );
  }, []);

  const handleFilterChange = useCallback((key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    
    // Update URL params for category filter
    if (key === 'type') {
      if (value) {
        setSearchParams({ type: value });
      } else {
        searchParams.delete('type');
        setSearchParams(searchParams);
      }
    }
  }, [searchParams, setSearchParams]);

  const toggleAmenity = useCallback((amenity: string) => {
    setFilters(prev => {
      const amenities = [...prev.amenities];
      if (amenities.includes(amenity)) {
        return { ...prev, amenities: amenities.filter(a => a !== amenity) };
      } else {
        return { ...prev, amenities: [...amenities, amenity] };
      }
    });
  }, []);

  // Get current spots for pagination
  const indexOfLastSpot = currentPage * spotsPerPage;
  const indexOfFirstSpot = indexOfLastSpot - spotsPerPage;
  const currentSpots = filteredSpots.slice(indexOfFirstSpot, indexOfLastSpot);
  const totalPages = Math.ceil(filteredSpots.length / spotsPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Go to next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      // Scroll to top of results
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Go to previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      // Scroll to top of results
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const toggleFilter = (section: keyof typeof expandedFilters) => {
    setExpandedFilters(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      type: '',
      priceRange: '',
      capacity: '',
      rating: '',
      location: '',
      amenities: []
    });
    
    // Update URL params
    searchParams.delete('type');
    setSearchParams(searchParams);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.priceRange) count++;
    if (filters.capacity) count++;
    if (filters.rating) count++;
    if (filters.location) count++;
    count += filters.amenities.length;
    return count;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Header */}
        {currentCategory && (
          <div className="mb-8">
            <div className="relative h-48 rounded-lg overflow-hidden mb-4">
              <img
                src={currentCategory.image}
                alt={currentCategory.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center space-x-2 text-white mb-2">
                  {React.createElement(currentCategory.icon, { className: "h-6 w-6" })}
                  <h1 className="text-2xl sm:text-3xl font-bold">{currentCategory.name}</h1>
                </div>
                <p className="text-gray-200">{currentCategory.description}</p>
              </div>
            </div>
          </div>
        )}

        {/* Categories Bar */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex space-x-2 min-w-max pb-2">
            <button
              onClick={() => handleFilterChange('type', '')}
              className={`px-4 py-2 rounded-full transition-colors ${
                !filters.type
                  ? 'bg-[#40d9ed] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Spots
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleFilterChange('type', category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                  filters.type === category.id
                    ? 'bg-[#40d9ed] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <category.icon className="h-4 w-4" />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8 lg:hidden">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search by name, location, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#40d9ed] focus:border-transparent"
                />
              </div>
            </div>

            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters {getActiveFilterCount() > 0 && `(${getActiveFilterCount()})`}
            </button>
          </div>
        </div>

        {/* Mobile Filters Modal */}
        {showMobileFilters && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowMobileFilters(false)}></div>
            <div className="absolute inset-y-0 right-0 max-w-full flex">
              <div className="relative w-screen max-w-md">
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-500"
                      onClick={() => setShowMobileFilters(false)}
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="flex-1 p-4">
                    {/* Price Range */}
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Price Range</h3>
                      <div className="space-y-3">
                        {priceRanges.map((range) => (
                          <div key={range.id} className="flex items-center">
                            <input
                              id={`mobile-price-${range.id}`}
                              name="price-range"
                              type="radio"
                              checked={filters.priceRange === range.id}
                              onChange={() => handleFilterChange('priceRange', range.id)}
                              className="h-4 w-4 text-[#40d9ed] focus:ring-[#40d9ed] border-gray-300"
                            />
                            <label htmlFor={`mobile-price-${range.id}`} className="ml-3 text-sm text-gray-700">
                              <span className="font-medium">{range.name}</span> <span className="text-gray-500">({range.description})</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Capacity */}
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Capacity</h3>
                      <div className="space-y-3">
                        {capacityOptions.map((option) => (
                          <div key={option.id} className="flex items-center">
                            <input
                              id={`mobile-capacity-${option.id}`}
                              name="capacity"
                              type="radio"
                              checked={filters.capacity === option.id}
                              onChange={() => handleFilterChange('capacity', option.id)}
                              className="h-4 w-4 text-[#40d9ed] focus:ring-[#40d9ed] border-gray-300"
                            />
                            <label htmlFor={`mobile-capacity-${option.id}`} className="ml-3 text-sm text-gray-700">
                              <span className="font-medium">{option.name}</span> <span className="text-gray-500">({option.description})</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Rating</h3>
                      <div className="space-y-3">
                        {[4, 3, 2].map((rating) => (
                          <div key={rating} className="flex items-center">
                            <input
                              id={`mobile-rating-${rating}`}
                              name="rating"
                              type="radio"
                              checked={filters.rating === rating.toString()}
                              onChange={() => handleFilterChange('rating', rating.toString())}
                              className="h-4 w-4 text-[#40d9ed] focus:ring-[#40d9ed] border-gray-300"
                            />
                            <label htmlFor={`mobile-rating-${rating}`} className="ml-3 text-sm text-gray-700 flex items-center">
                              {`${rating}+`} <Star className="h-4 w-4 ml-1 fill-[#FFD700] text-[#FFD700]" />
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Amenities</h3>
                      <div className="space-y-3">
                        {amenities.map((amenity) => (
                          <div key={amenity.id} className="flex items-center">
                            <input
                              id={`mobile-amenity-${amenity.id}`}
                              name={`amenity-${amenity.id}`}
                              type="checkbox"
                              checked={filters.amenities.includes(amenity.id)}
                              onChange={() => toggleAmenity(amenity.id)}
                              className="h-4 w-4 text-[#40d9ed] focus:ring-[#40d9ed] border-gray-300 rounded"
                            />
                            <label htmlFor={`mobile-amenity-${amenity.id}`} className="ml-3 text-sm text-gray-700 flex items-center">
                              <amenity.icon className="h-4 w-4 mr-2 text-gray-500" />
                              {amenity.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Location */}
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Location</h3>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="City or state"
                          value={filters.location}
                          onChange={(e) => handleFilterChange('location', e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#40d9ed] focus:border-[#40d9ed]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border-t border-gray-200 flex justify-between">
                    <button
                      type="button"
                      className="text-gray-500 hover:text-gray-700"
                      onClick={clearAllFilters}
                    >
                      Clear all
                    </button>
                    <button
                      type="button"
                      className="bg-[#40d9ed] text-white px-4 py-2 rounded-lg hover:bg-[#26b8a5] transition-colors"
                      onClick={() => setShowMobileFilters(false)}
                    >
                      Show results ({filteredSpots.length})
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content with Sidebar */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                {getActiveFilterCount() > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-[#40d9ed] hover:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Price Range */}
              <div className="mb-6 border-b border-gray-200 pb-6">
                <button 
                  className="flex items-center justify-between w-full text-left mb-4"
                  onClick={() => toggleFilter('price')}
                >
                  <h3 className="text-md font-medium text-gray-900">Price Range</h3>
                  {expandedFilters.price ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                
                {expandedFilters.price && (
                  <div className="space-y-3">
                    {priceRanges.map((range) => (
                      <div key={range.id} className="flex items-center">
                        <input
                          id={`price-${range.id}`}
                          name="price-range"
                          type="radio"
                          checked={filters.priceRange === range.id}
                          onChange={() => handleFilterChange('priceRange', range.id)}
                          className="h-4 w-4 text-[#40d9ed] focus:ring-[#40d9ed] border-gray-300"
                        />
                        <label htmlFor={`price-${range.id}`} className="ml-3 text-sm text-gray-700">
                          <span className="font-medium">{range.name}</span> <span className="text-gray-500">({range.description})</span>
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Capacity */}
              <div className="mb-6 border-b border-gray-200 pb-6">
                <button 
                  className="flex items-center justify-between w-full text-left mb-4"
                  onClick={() => toggleFilter('capacity')}
                >
                  <h3 className="text-md font-medium text-gray-900">Capacity</h3>
                  {expandedFilters.capacity ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                
                {expandedFilters.capacity && (
                  <div className="space-y-3">
                    {capacityOptions.map((option) => (
                      <div key={option.id} className="flex items-center">
                        <input
                          id={`capacity-${option.id}`}
                          name="capacity"
                          type="radio"
                          checked={filters.capacity === option.id}
                          onChange={() => handleFilterChange('capacity', option.id)}
                          className="h-4 w-4 text-[#40d9ed] focus:ring-[#40d9ed] border-gray-300"
                        />
                        <label htmlFor={`capacity-${option.id}`} className="ml-3 text-sm text-gray-700">
                          <span className="font-medium">{option.name}</span> <span className="text-gray-500">({option.description})</span>
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Rating */}
              <div className="mb-6 border-b border-gray-200 pb-6">
                <button 
                  className="flex items-center justify-between w-full text-left mb-4"
                  onClick={() => toggleFilter('rating')}
                >
                  <h3 className="text-md font-medium text-gray-900">Rating</h3>
                  {expandedFilters.rating ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                
                {expandedFilters.rating && (
                  <div className="space-y-3">
                    {[4, 3, 2].map((rating) => (
                      <div key={rating} className="flex items-center">
                        <input
                          id={`rating-${rating}`}
                          name="rating"
                          type="radio"
                          checked={filters.rating === rating.toString()}
                          onChange={() => handleFilterChange('rating', rating.toString())}
                          className="h-4 w-4 text-[#40d9ed] focus:ring-[#40d9ed] border-gray-300"
                        />
                        <label htmlFor={`rating-${rating}`} className="ml-3 text-sm text-gray-700 flex items-center">
                          {`${rating}+`} <Star className="h-4 w-4 ml-1 fill-[#FFD700] text-[#FFD700]" />
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Amenities */}
              <div className="mb-6 border-b border-gray-200 pb-6">
                <button 
                  className="flex items-center justify-between w-full text-left mb-4"
                  onClick={() => toggleFilter('amenities')}
                >
                  <h3 className="text-md font-medium text-gray-900">Amenities</h3>
                  {expandedFilters.amenities ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                
                {expandedFilters.amenities && (
                  <div className="space-y-3">
                    {amenities.map((amenity) => (
                      <div key={amenity.id} className="flex items-center">
                        <input
                          id={`amenity-${amenity.id}`}
                          name={`amenity-${amenity.id}`}
                          type="checkbox"
                          checked={filters.amenities.includes(amenity.id)}
                          onChange={() => toggleAmenity(amenity.id)}
                          className="h-4 w-4 text-[#40d9ed] focus:ring-[#40d9ed] border-gray-300 rounded"
                        />
                        <label htmlFor={`amenity-${amenity.id}`} className="ml-3 text-sm text-gray-700 flex items-center">
                          <amenity.icon className="h-4 w-4 mr-2 text-gray-500" />
                          {amenity.name}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Location */}
              <div>
                <h3 className="text-md font-medium text-gray-900 mb-4">Location</h3>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="City or state"
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#40d9ed] focus:border-[#40d9ed]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Desktop Search Bar */}
            <div className="hidden lg:flex items-center justify-between bg-white rounded-lg shadow-md p-4 mb-8">
              <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search by name, location, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#40d9ed] focus:border-transparent"
                />
              </div>
              <div className="ml-4 text-sm text-gray-500">
                {filteredSpots.length} {filteredSpots.length === 1 ? 'spot' : 'spots'} found
              </div>
            </div>

            {/* Results Count - Mobile */}
            <div className="lg:hidden flex items-center justify-between mb-4">
              <div className="text-sm text-gray-500">
                {filteredSpots.length} {filteredSpots.length === 1 ? 'spot' : 'spots'} found
              </div>
              <button
                onClick={() => setShowMobileFilters(true)}
                className="flex items-center text-sm text-gray-700"
              >
                <Sliders className="h-4 w-4 mr-1" />
                Filters {getActiveFilterCount() > 0 && `(${getActiveFilterCount()})`}
              </button>
            </div>

            {/* Active Filters */}
            {getActiveFilterCount() > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {filters.priceRange && (
                  <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                    <span>{priceRanges.find(r => r.id === filters.priceRange)?.name}</span>
                    <button 
                      onClick={() => handleFilterChange('priceRange', '')}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
                {filters.capacity && (
                  <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                    <span>{capacityOptions.find(c => c.id === filters.capacity)?.name}</span>
                    <button 
                      onClick={() => handleFilterChange('capacity', '')}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
                {filters.rating && (
                  <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                    <span>{filters.rating}+ Stars</span>
                    <button 
                      onClick={() => handleFilterChange('rating', '')}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
                {filters.location && (
                  <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                    <span>Location: {filters.location}</span>
                    <button 
                      onClick={() => handleFilterChange('location', '')}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
                {filters.amenities.map(amenity => (
                  <div key={amenity} className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                    <span>{amenities.find(a => a.id === amenity)?.name}</span>
                    <button 
                      onClick={() => toggleAmenity(amenity)}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {filteredSpots.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <Building2 className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">No spots found</h3>
                <p className="mt-2 text-gray-600">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                  {currentSpots.map((spot) => (
                    <div
                      key={spot.id}
                      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 mb-4"
                    >
                      <Link to={`/spots/${spot.id}`} className="block relative w-full h-48">
                        <img
                          src={spot.featuredImage || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"}
                          alt={spot.name}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          loading="lazy"
                          fetchpriority="low"
                        />
                        <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition-opacity duration-300" />
                      </Link>

                      <div className="p-6">
                        <div className="flex items-start gap-1 text-[#40d9ed] mb-2">
                          <MapPin className="h-5 w-5 flex-shrink-0" />
                          <span className="font-medium">{spot.city || 'Unknown location'}</span>
                        </div>

                        {renderStars(spot.rating)}

                        <div className="mt-3 space-y-2 text-gray-600">
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 flex-shrink-0" />
                            <span className="text-sm">{spot.squareFootage || 'N/A'} sq. ft.</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 flex-shrink-0" />
                            <span className="text-sm">Max. Attendees: {spot.capacity}</span>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="text-xl font-bold text-[#40d9ed]">
                            {formatCurrency(spot.pricePerHour)}<span className="text-sm font-normal">/hr</span>
                          </div>
                          <Link
                            to={`/spots/${spot.id}`}
                            className="px-4 py-2 bg-[#40d9ed] text-white rounded-md hover:bg-[#26b8a5] transition-colors"
                          >
                            BOOK NOW
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className="p-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Previous page"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      
                      <div className="hidden sm:flex space-x-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => {
                          // Show first page, last page, current page, and pages around current page
                          if (
                            number === 1 || 
                            number === totalPages || 
                            (number >= currentPage - 1 && number <= currentPage + 1)
                          ) {
                            return (
                              <button
                                key={number}
                                onClick={() => paginate(number)}
                                className={`px-4 py-2 rounded-md ${
                                  currentPage === number
                                    ? 'bg-[#40d9ed] text-white'
                                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                }`}
                              >
                                {number}
                              </button>
                            );
                          }
                          
                          // Show ellipsis for skipped pages
                          if (
                            (number === 2 && currentPage > 3) ||
                            (number === totalPages - 1 && currentPage < totalPages - 2)
                          ) {
                            return <span key={number} className="px-2 py-2">...</span>;
                          }
                          
                          return null;
                        })}
                      </div>
                      
                      {/* Mobile pagination indicator */}
                      <div className="sm:hidden px-4 py-2 text-sm text-gray-700">
                        Page {currentPage} of {totalPages}
                      </div>
                      
                      <button
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Next page"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Results count */}
                <div className="mt-4 text-center text-sm text-gray-500">
                  Showing {indexOfFirstSpot + 1}-{Math.min(indexOfLastSpot, filteredSpots.length)} of {filteredSpots.length} spots
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreSpots;