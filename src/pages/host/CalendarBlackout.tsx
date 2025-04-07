import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Info, Save, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

// Define types for blackout dates
interface BlackoutDate {
  id: string;
  spotId: string;
  date: string;
  reason: string;
}

// Mock data for spots
const mockSpots = [
  { id: 'SP001', name: 'Downtown Event Space' },
  { id: 'SP002', name: 'Creative Studio' },
  { id: 'SP003', name: 'Rooftop Garden' }
];

// Mock data for existing blackout dates
const mockBlackoutDates: BlackoutDate[] = [
  { id: 'BD001', spotId: 'SP001', date: '2025-03-15', reason: 'Maintenance' },
  { id: 'BD002', spotId: 'SP001', date: '2025-03-16', reason: 'Maintenance' },
  { id: 'BD003', spotId: 'SP002', date: '2025-03-20', reason: 'Private event' }
];

const CalendarBlackout = () => {
  const [currentMonth, setCurrentMonth] = useState(() => new Date());
  const [selectedSpot, setSelectedSpot] = useState('');
  const [blackoutDates, setBlackoutDates] = useState<BlackoutDate[]>(mockBlackoutDates);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [blackoutReason, setBlackoutReason] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Get days in month for calendar
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days: (number | null)[] = Array(42).fill(null);
    
    for (let i = 0; i < daysInMonth; i++) {
      days[i + startingDay] = i + 1;
    }

    return days;
  };

  // Navigate to previous month
  const handlePrevMonth = () => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  // Navigate to next month
  const handleNextMonth = () => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  // Check if a date is already blacked out
  const isDateBlackedOut = (day: number) => {
    if (!selectedSpot) return false;
    
    const date = new Date(currentMonth);
    date.setDate(day);
    const dateString = date.toISOString().split('T')[0];
    
    return blackoutDates.some(bd => 
      bd.spotId === selectedSpot && bd.date === dateString
    );
  };

  // Check if a date is selected for blackout
  const isDateSelected = (day: number) => {
    const date = new Date(currentMonth);
    date.setDate(day);
    const dateString = date.toISOString().split('T')[0];
    
    return selectedDates.includes(dateString);
  };

  // Toggle date selection
  const toggleDateSelection = (day: number) => {
    if (!selectedSpot) {
      toast.error('Please select a spot first');
      return;
    }
    
    const date = new Date(currentMonth);
    date.setDate(day);
    const dateString = date.toISOString().split('T')[0];
    
    // Check if date is already blacked out
    if (isDateBlackedOut(day)) {
      // If in editing mode, allow removing existing blackout dates
      if (isEditing) {
        setBlackoutDates(prev => prev.filter(bd => 
          !(bd.spotId === selectedSpot && bd.date === dateString)
        ));
        toast.success(`Removed blackout for ${dateString}`);
      } else {
        toast.error('This date is already blacked out');
      }
      return;
    }
    
    // Toggle selection
    setSelectedDates(prev => {
      if (prev.includes(dateString)) {
        return prev.filter(d => d !== dateString);
      } else {
        return [...prev, dateString];
      }
    });
  };

  // Save blackout dates
  const saveBlackoutDates = () => {
    if (!selectedSpot) {
      toast.error('Please select a spot');
      return;
    }
    
    if (selectedDates.length === 0) {
      toast.error('Please select at least one date');
      return;
    }
    
    if (!blackoutReason.trim()) {
      toast.error('Please provide a reason for blackout');
      return;
    }
    
    // Create new blackout dates
    const newBlackoutDates = selectedDates.map(date => ({
      id: `BD${Math.random().toString(36).substring(2, 9)}`,
      spotId: selectedSpot,
      date,
      reason: blackoutReason
    }));
    
    // Add to existing blackout dates
    setBlackoutDates(prev => [...prev, ...newBlackoutDates]);
    
    // Reset form
    setSelectedDates([]);
    setBlackoutReason('');
    
    toast.success(`${selectedDates.length} dates have been blacked out`);
  };

  // Clear all selected dates
  const clearSelectedDates = () => {
    setSelectedDates([]);
  };

  // Get blackout dates for selected spot
  const getSpotBlackoutDates = () => {
    if (!selectedSpot) return [];
    return blackoutDates.filter(bd => bd.spotId === selectedSpot);
  };

  // Delete a blackout date
  const deleteBlackoutDate = (id: string) => {
    setBlackoutDates(prev => prev.filter(bd => bd.id !== id));
    toast.success('Blackout date removed');
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Group blackout dates by reason
  const groupedBlackoutDates = () => {
    const spotDates = getSpotBlackoutDates();
    const grouped: Record<string, BlackoutDate[]> = {};
    
    spotDates.forEach(bd => {
      if (!grouped[bd.reason]) {
        grouped[bd.reason] = [];
      }
      grouped[bd.reason].push(bd);
    });
    
    return grouped;
  };

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Calendar Blackout</h1>
        <p className="mt-1 text-sm text-gray-500">
          Mark dates as unavailable for booking
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Calendar */}
        <div className="lg:col-span-2 space-y-6">
          {/* Spot Selection */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <label htmlFor="spot-select" className="block text-sm font-medium text-gray-700 mb-2">
              Select Spot
            </label>
            <select
              id="spot-select"
              value={selectedSpot}
              onChange={(e) => {
                setSelectedSpot(e.target.value);
                setSelectedDates([]);
                setIsEditing(false);
              }}
              className="w-full border-gray-300 rounded-lg focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
            >
              <option value="">Select a spot</option>
              {mockSpots.map(spot => (
                <option key={spot.id} value={spot.id}>{spot.name}</option>
              ))}
            </select>
          </div>

          {/* Calendar */}
          {selectedSpot && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Select Dates to Block</h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`px-3 py-1 text-sm rounded-md ${
                      isEditing 
                        ? 'bg-[#2DD4BF] text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {isEditing ? 'Editing Mode' : 'Edit Mode'}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={handlePrevMonth}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-600" />
                </button>
                
                <div className="text-lg font-medium text-gray-900">
                  {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </div>
                
                <button
                  onClick={handleNextMonth}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              <div className="mb-6">
                <div className="grid grid-cols-7 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-sm font-medium text-gray-500 text-center">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-1">
                  {getDaysInMonth(currentMonth).map((day, index) => {
                    if (!day) return <div key={index} className="p-2" />;
                    
                    const isBlackedOut = isDateBlackedOut(day);
                    const isSelected = isDateSelected(day);
                    
                    return (
                      <button
                        key={index}
                        onClick={() => toggleDateSelection(day)}
                        className={`
                          p-2 h-12 text-sm rounded-md flex items-center justify-center
                          ${isBlackedOut 
                            ? 'bg-red-100 text-red-800 hover:bg-red-200' 
                            : isSelected
                              ? 'bg-[#2DD4BF] text-white hover:bg-[#26b8a5]'
                              : 'hover:bg-gray-100'}
                        `}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center space-x-2 mb-4">
                <div className="w-4 h-4 bg-red-100 rounded-sm"></div>
                <span className="text-sm text-gray-600">Blacked out</span>
                
                <div className="w-4 h-4 bg-[#2DD4BF] rounded-sm ml-4"></div>
                <span className="text-sm text-gray-600">Selected</span>
              </div>

              {selectedDates.length > 0 && (
                <div className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="blackout-reason" className="block text-sm font-medium text-gray-700 mb-2">
                      Reason for Blackout
                    </label>
                    <input
                      type="text"
                      id="blackout-reason"
                      value={blackoutReason}
                      onChange={(e) => setBlackoutReason(e.target.value)}
                      className="w-full border-gray-300 rounded-lg focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
                      placeholder="e.g., Maintenance, Private event, etc."
                    />
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-gray-900">Selected Dates ({selectedDates.length})</h3>
                      <button
                        onClick={clearSelectedDates}
                        className="text-sm text-red-600 hover:text-red-800"
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="max-h-32 overflow-y-auto">
                      {selectedDates.map(date => (
                        <div key={date} className="text-sm text-gray-600 py-1">
                          {formatDate(date)}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={saveBlackoutDates}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2DD4BF] hover:bg-[#26b8a5]"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Blackout Dates
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column - Blackout Dates List */}
        <div className="space-y-6">
          {selectedSpot && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Blackout Dates for {mockSpots.find(s => s.id === selectedSpot)?.name}
              </h2>
              
              {getSpotBlackoutDates().length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500">No blackout dates set</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {Object.entries(groupedBlackoutDates()).map(([reason, dates]) => (
                    <div key={reason} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                      <h3 className="font-medium text-gray-900 mb-2">{reason}</h3>
                      <div className="space-y-2">
                        {dates.map(bd => (
                          <div key={bd.id} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                            <span className="text-sm text-gray-600">{formatDate(bd.date)}</span>
                            <button
                              onClick={() => deleteBlackoutDate(bd.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Help Box */}
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex">
              <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-blue-800">About Calendar Blackout</h3>
                <div className="mt-2 text-sm text-blue-700 space-y-1">
                  <p>• Select a spot to manage its availability</p>
                  <p>• Click on dates to mark them as unavailable</p>
                  <p>• Add a reason for the blackout period</p>
                  <p>• Use Edit Mode to remove existing blackout dates</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarBlackout;