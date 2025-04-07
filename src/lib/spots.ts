import toast from 'react-hot-toast';
import { mockSpots } from './mockData';

export const getSpots = async () => {
  try {
    // For now, return mock data
    // In production, this would fetch from MongoDB
    return mockSpots;
  } catch (error: any) {
    toast.error('Unable to load spots');
    return [];
  }
};

export const getSpot = async (id: string) => {
  try {
    // For now, return mock data
    // In production, this would fetch from MongoDB
    const spot = mockSpots.find(s => s.id === id);
    if (!spot) throw new Error('Spot not found');
    return spot;
  } catch (error: any) {
    toast.error('Unable to load spot details');
    return null;
  }
};

export const createSpot = async (spotData: any) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create a new spot with mock data
    return {
      id: Date.now().toString(),
      ...spotData,
      hostId: 'host-123',
      status: 'active',
      rating: 5,
      totalBookings: 0,
      revenue: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  } catch (error: any) {
    toast.error('Unable to create spot');
    return null;
  }
};