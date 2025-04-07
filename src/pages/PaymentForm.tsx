import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, CreditCard, Calendar, Clock, MapPin, Users, DollarSign, Shield, CheckCircle } from 'lucide-react';
import { formatCurrency } from '../utils/format';
import toast from 'react-hot-toast';

const PaymentForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingDetails = location.state?.bookingDetails;
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('new-card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expMonth: '',
    expYear: '',
    cvc: '',
    saveCard: true
  });

  // If no booking details were passed, redirect to home
  if (!bookingDetails) {
    navigate('/');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Payment successful! Your booking is confirmed.');
      navigate('/guest/bookings');
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const calculateServiceFee = () => {
    return bookingDetails.totalPrice * 0.10; // 10% service fee
  };

  const calculateTaxes = () => {
    return bookingDetails.totalPrice * 0.08; // 8% tax
  };

  const calculateTotal = () => {
    return bookingDetails.totalPrice + calculateServiceFee() + calculateTaxes();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to booking details
        </button>

        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Complete your booking</h1>
          <p className="mt-2 text-gray-600">You're just one step away from confirming your reservation</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h2>
              
              <div className="space-y-6">
                {/* Payment Method Selection */}
                <div className="space-y-4">
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="new-card"
                      checked={paymentMethod === 'new-card'}
                      onChange={() => setPaymentMethod('new-card')}
                      className="h-4 w-4 text-[#40d9ed] focus:ring-[#40d9ed] border-gray-300"
                    />
                    <span className="text-gray-900">Pay with a new card</span>
                  </label>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="saved-card"
                      checked={paymentMethod === 'saved-card'}
                      onChange={() => setPaymentMethod('saved-card')}
                      className="h-4 w-4 text-[#40d9ed] focus:ring-[#40d9ed] border-gray-300"
                    />
                    <span className="text-gray-900">Pay with a saved card</span>
                  </label>
                </div>

                {/* New Card Form */}
                {paymentMethod === 'new-card' && (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                        Name on card
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#40d9ed] focus:border-[#40d9ed]"
                        placeholder="John Smith"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Card number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <CreditCard className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#40d9ed] focus:border-[#40d9ed]"
                          placeholder="4242 4242 4242 4242"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-1">
                        <label htmlFor="expMonth" className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry month
                        </label>
                        <select
                          id="expMonth"
                          name="expMonth"
                          value={formData.expMonth}
                          onChange={handleChange}
                          className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#40d9ed] focus:border-[#40d9ed]"
                          required
                        >
                          <option value="">MM</option>
                          {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                            <option key={month} value={month.toString().padStart(2, '0')}>
                              {month.toString().padStart(2, '0')}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-span-1">
                        <label htmlFor="expYear" className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry year
                        </label>
                        <select
                          id="expYear"
                          name="expYear"
                          value={formData.expYear}
                          onChange={handleChange}
                          className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#40d9ed] focus:border-[#40d9ed]"
                          required
                        >
                          <option value="">YY</option>
                          {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
                            <option key={year} value={year.toString().slice(-2)}>
                              {year}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-span-1">
                        <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">
                          CVC
                        </label>
                        <input
                          type="text"
                          id="cvc"
                          name="cvc"
                          value={formData.cvc}
                          onChange={handleChange}
                          className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#40d9ed] focus:border-[#40d9ed]"
                          placeholder="123"
                          maxLength={4}
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center">
                      <input
                        id="saveCard"
                        name="saveCard"
                        type="checkbox"
                        checked={formData.saveCard}
                        onChange={handleChange}
                        className="h-4 w-4 text-[#40d9ed] focus:ring-[#40d9ed] border-gray-300 rounded"
                      />
                      <label htmlFor="saveCard" className="ml-2 block text-sm text-gray-700">
                        Save this card for future bookings
                      </label>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-[#40d9ed] hover:bg-[#26b8a5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#40d9ed] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          <>Complete Payment</>
                        )}
                      </button>
                    </div>
                  </form>
                )}

                {/* Saved Card Selection */}
                {paymentMethod === 'saved-card' && (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <label className="flex items-center p-4 border border-gray-300 rounded-lg hover:border-[#40d9ed] cursor-pointer">
                        <input
                          type="radio"
                          name="savedCard"
                          value="card1"
                          defaultChecked
                          className="h-4 w-4 text-[#40d9ed] focus:ring-[#40d9ed] border-gray-300"
                        />
                        <div className="ml-3 flex-1">
                          <p className="text-gray-900 font-medium">Visa •••• 4242</p>
                          <p className="text-sm text-gray-500">Expires 12/2025</p>
                        </div>
                      </label>

                      <label className="flex items-center p-4 border border-gray-300 rounded-lg hover:border-[#40d9ed] cursor-pointer">
                        <input
                          type="radio"
                          name="savedCard"
                          value="card2"
                          className="h-4 w-4 text-[#40d9ed] focus:ring-[#40d9ed] border-gray-300"
                        />
                        <div className="ml-3 flex-1">
                          <p className="text-gray-900 font-medium">Mastercard •••• 5555</p>
                          <p className="text-sm text-gray-500">Expires 08/2024</p>
                        </div>
                      </label>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-[#40d9ed] hover:bg-[#26b8a5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#40d9ed] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          <>Complete Payment</>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Secure Payment</h2>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Shield className="h-8 w-8 text-[#40d9ed]" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-gray-900">Your payment is secure</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    We use secure transmission and encrypted storage to protect your personal information. We never store your full card details on our servers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Booking Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                    <img 
                      src={bookingDetails.spotImage} 
                      alt={bookingDetails.spotName} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-900">{bookingDetails.spotName}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {bookingDetails.spotLocation}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-700">{bookingDetails.date}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-700">{bookingDetails.startTime} - {bookingDetails.endTime}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-700">{bookingDetails.guests} guests</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{bookingDetails.hours} hours x {formatCurrency(bookingDetails.pricePerHour)}</span>
                    <span className="text-gray-900">{formatCurrency(bookingDetails.totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service fee</span>
                    <span className="text-gray-900">{formatCurrency(calculateServiceFee())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxes</span>
                    <span className="text-gray-900">{formatCurrency(calculateTaxes())}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between font-semibold">
                    <span className="text-gray-900">Total</span>
                    <span className="text-[#40d9ed]">{formatCurrency(calculateTotal())}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Free cancellation until 24 hours before</h4>
                    <p className="mt-1 text-xs text-gray-500">
                      After that, you'll be charged the full amount if you cancel.
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

export default PaymentForm;