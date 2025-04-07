import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Star, Edit2, Camera, LogOut, MessageSquare, ChevronRight, Ban, Clock, Shield, Check, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

// Mock user data
const mockUser = {
  id: 'USER001',
  name: 'John Smith',
  email: 'john.s@example.com',
  role: 'admin',
  status: 'active',
  joinDate: '2024-01-15',
  lastLogin: '2025-02-19T10:30:00',
  verificationStatus: 'verified',
  phone: '+1 (555) 123-4567',
  location: 'New York, NY',
  permissions: [
    'manage_users',
    'manage_spots',
    'manage_bookings',
    'manage_payments',
    'view_reports'
  ],
  recentActivity: [
    {
      type: 'login',
      description: 'Logged in from New York, NY',
      timestamp: '2025-02-19T10:30:00'
    },
    {
      type: 'user_update',
      description: 'Updated user profile for Sarah Johnson',
      timestamp: '2025-02-18T15:45:00'
    },
    {
      type: 'spot_approval',
      description: 'Approved new spot: "Luxury Penthouse Suite"',
      timestamp: '2025-02-18T14:30:00'
    },
    {
      type: 'refund_processed',
      description: 'Processed refund #REF005 for $320.00',
      timestamp: '2025-02-18T11:15:00'
    }
  ],
  messages: [
    {
      id: 1,
      sender: 'admin',
      content: 'Welcome to the admin team! Let me know if you need any help getting started.',
      timestamp: '2024-01-15T09:30:00'
    },
    {
      id: 2,
      sender: 'user',
      content: 'Thanks! I\'m excited to join the team.',
      timestamp: '2024-01-15T10:00:00'
    },
    {
      id: 3,
      sender: 'admin',
      content: 'Great! I\'ve assigned you to handle the new spot approvals for this week.',
      timestamp: '2024-01-15T10:15:00'
    }
  ]
};

const AdminUserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState<'suspend' | 'activate' | null>(null);
  const [showEditRoleDialog, setShowEditRoleDialog] = useState(false);
  const [selectedRole, setSelectedRole] = useState(mockUser.role);

  const handleAction = (action: 'suspend' | 'activate') => {
    toast.success(`User ${action}d successfully`);
    setShowConfirmDialog(null);
  };

  const handleRoleChange = () => {
    toast.success(`User role updated to ${selectedRole}`);
    setShowEditRoleDialog(false);
  };

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    toast.success('Message sent successfully');
    setMessage('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'support':
        return 'bg-blue-100 text-blue-800';
      case 'host':
        return 'bg-green-100 text-green-800';
      case 'guest':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/admin/users')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Users
        </button>

        {/* User Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center">
              <div className="h-16 w-16 rounded-full bg-[#2DD4BF] flex items-center justify-center">
                <span className="text-white text-xl font-medium">
                  {mockUser.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-gray-900">{mockUser.name}</h1>
                <div className="flex items-center space-x-4 mt-1">
                  <span className={`px-2 py-1 text-sm font-semibold rounded-full ${getStatusColor(mockUser.status)}`}>
                    {mockUser.status.charAt(0).toUpperCase() + mockUser.status.slice(1)}
                  </span>
                  <span className={`px-2 py-1 text-sm font-semibold rounded-full ${getRoleColor(mockUser.role)}`}>
                    {mockUser.role.charAt(0).toUpperCase() + mockUser.role.slice(1)}
                  </span>
                  <span className="text-gray-500">
                    Member since {new Date(mockUser.joinDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 lg:mt-0 flex flex-wrap gap-3">
              <button
                onClick={() => setShowEditRoleDialog(true)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Edit2 className="h-5 w-5 mr-2" />
                Edit Role
              </button>
              {mockUser.status === 'active' ? (
                <button
                  onClick={() => setShowConfirmDialog('suspend')}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                >
                  <Ban className="h-5 w-5 mr-2" />
                  Suspend User
                </button>
              ) : (
                <button
                  onClick={() => setShowConfirmDialog('activate')}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  <Check className="h-5 w-5 mr-2" />
                  Activate User
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* User Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">User Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-900">{mockUser.email}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-gray-900">{mockUser.phone}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-gray-900">{mockUser.location}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Last Login</p>
                    <p className="text-gray-900">{new Date(mockUser.lastLogin).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Permissions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Permissions</h2>
              <div className="flex flex-wrap gap-2">
                {mockUser.permissions.map((permission, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[#2DD4BF]/10 text-[#2DD4BF] rounded-full text-sm font-medium capitalize"
                  >
                    {permission.replace('_', ' ')}
                  </span>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-6">
                {mockUser.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-[#2DD4BF] flex items-center justify-center">
                        <Clock className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                      <p className="mt-1 text-xs text-gray-500">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Role Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Role Information</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Current Role</p>
                    <p className="text-gray-900 capitalize">{mockUser.role}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Role Assigned</p>
                    <p className="text-gray-900">{new Date(mockUser.joinDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Form */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Send Message</h2>
              <form onSubmit={handleMessageSubmit}>
                <div className="mb-4">
                  <label htmlFor="message" className="sr-only">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-[#2DD4BF] focus:border-[#2DD4BF] resize-none"
                    placeholder="Type your message..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2DD4BF] hover:bg-[#26b8a5]"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Message
                </button>
              </form>

              {/* Message History */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900 mb-4">Message History</h3>
                <div className="space-y-4">
                  {mockUser.messages.map((msg) => (
                    <div key={msg.id} className="flex items-start space-x-3">
                      <div className={`h-8 w-8 rounded-full ${
                        msg.sender === 'admin' ? 'bg-[#2DD4BF]' : 'bg-gray-100'
                      } flex items-center justify-center`}>
                        <span className={`${
                          msg.sender === 'admin' ? 'text-white' : 'text-gray-600'
                        } text-sm font-medium`}>
                          {msg.sender === 'admin' ? 'A' : 'U'}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-sm text-gray-900">{msg.content}</p>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                          {new Date(msg.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Role Dialog */}
      {showEditRoleDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Change User Role</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Role
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full border-gray-300 rounded-lg focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
              >
                <option value="admin">Admin</option>
                <option value="support">Support</option>
                <option value="host">Host</option>
                <option value="guest">Guest</option>
              </select>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowEditRoleDialog(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleRoleChange}
                className="px-4 py-2 text-sm font-medium text-white bg-[#2DD4BF] hover:bg-[#26b8a5] rounded-md"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 text-center mb-2">
              {showConfirmDialog === 'suspend' ? 'Suspend User' : 'Activate User'}
            </h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              {showConfirmDialog === 'suspend'
                ? 'Are you sure you want to suspend this user? They will not be able to access the platform.'
                : 'Are you sure you want to activate this user? They will regain access to the platform.'}
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmDialog(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAction(showConfirmDialog)}
                className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
                  showConfirmDialog === 'suspend'
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {showConfirmDialog === 'suspend' ? 'Yes, suspend' : 'Yes, activate'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserDetails;