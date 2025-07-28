import React, { useState, useEffect } from 'react';
import { Bell, Menu, X, ShoppingCart, MapPin, Star, Phone, MessageCircle, Bot, Package,
Settings, Users, TrendingUp, AlertTriangle, Check, Send, Home, Search, User, Plus, Eye,
Clock, Truck, Shield, Award, ChevronRight, Facebook, Twitter, Instagram, Linkedin, Mail,
PhoneCall } from 'lucide-react';

// API Configuration
const API_ENDPOINTS = {
  suppliers: '/api/suppliers',
  products: '/api/products', 
  inventory: '/api/inventory',
  groupOrders: '/api/group-orders',
  priceAlerts: '/api/price-alerts',
  communityChat: '/api/community/messages',
  chatbot: '/api/chatbot',
  cart: '/api/cart',
  dashboard: '/api/dashboard/stats'
};

// Custom Hook for API calls
const useAPI = (endpoint, dependencies = []) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error(`API Error for ${endpoint}:`, err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

  return { data, loading, error, refetch: fetchData, setData };
};

// Dashboard Component
const Dashboard = ({ onNavigate }) => {
  const { data: stats, loading } = useAPI(API_ENDPOINTS.dashboard);

  if (loading) {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="bg-gray-200 animate-pulse h-32 rounded-lg"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="bg-gray-200 animate-pulse h-20 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2">à¤¨à¤®à¤¸à¥à¤¤à¥‡! à¤†à¤œ à¤•à¤¾ à¤µà¥à¤¯à¤¾à¤ªà¤¾à¤° à¤•à¥ˆà¤¸à¤¾ à¤šà¤² à¤°à¤¹à¤¾ à¤¹à¥ˆ? ðŸ›’</h2>
        <p className="opacity-90">
          Today's savings: â‚¹{stats.todaySavings || 450} | 
          Active orders: {stats.activeOrders || 3} | 
          New alerts: {stats.newAlerts || 2}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard 
          title="Today's Orders" 
          value={stats.todayOrders || 5} 
          icon={<ShoppingCart className="h-8 w-8 text-blue-600" />}
          color="text-blue-600"
        />
        <StatCard 
          title="Total Savings" 
          value={`â‚¹${stats.totalSavings || 2340}`} 
          icon={<TrendingUp className="h-8 w-8 text-green-600" />}
          color="text-green-600"
        />
        <StatCard 
          title="Active Groups" 
          value={stats.activeGroups || 3} 
          icon={<Users className="h-8 w-8 text-purple-600" />}
          color="text-purple-600"
        />
        <StatCard 
          title="Low Stock Items" 
          value={stats.lowStockItems || 2} 
          icon={<AlertTriangle className="h-8 w-8 text-red-600" />}
          color="text-red-600"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <QuickActionButton 
            icon={<Search className="h-6 w-6 text-blue-600 mb-2" />}
            label="Browse Products"
            onClick={() => onNavigate('products')}
            hoverColor="hover:bg-blue-50 hover:border-blue-300"
          />
          <QuickActionButton 
            icon={<Users className="h-6 w-6 text-green-600 mb-2" />}
            label="Join Group Order"
            onClick={() => onNavigate('groups')}
            hoverColor="hover:bg-green-50 hover:border-green-300"
          />
          <QuickActionButton 
            icon={<Bell className="h-6 w-6 text-yellow-600 mb-2" />}
            label="Price Alerts"
            onClick={() => onNavigate('alerts')}
            hoverColor="hover:bg-yellow-50 hover:border-yellow-300"
          />
          <QuickActionButton 
            icon={<Package className="h-6 w-6 text-purple-600 mb-2" />}
            label="Check Inventory"
            onClick={() => onNavigate('inventory')}
            hoverColor="hover:bg-purple-50 hover:border-purple-300"
          />
        </div>
      </div>

      {/* Recent Activity */}
      <RecentActivity activities={stats.recentActivities || []} />
    </div>
  );
};

export default Dashboard;