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



const Suppliers = () => {
  const { data: suppliers, loading, error } = useAPI(API_ENDPOINTS.suppliers);

  const handleCall = async (phoneNumber) => {
    // API call to log phone call
    try {
      await fetch('/api/suppliers/call-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, timestamp: new Date() })
      });
    } catch (err) {
      console.error('Failed to log call:', err);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Verified Suppliers</h2>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <MapPin className="h-4 w-4 inline mr-2" />
            Near Me
          </button>
        </div>
      </div>
      
      <div className="grid gap-6">
        {suppliers.map(supplier => (
          <SupplierCard 
            key={supplier.id} 
            supplier={supplier} 
            onCall={handleCall}
          />
        ))}
      </div>
    </div>
  );
};

export default SuppliersPage;
