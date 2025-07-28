<<<<<<< HEAD
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

// Products Component
const Products = ({ onAddToCart }) => {
  const { data: products, loading, error } = useAPI(API_ENDPOINTS.products);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleAddToCart = async (product) => {
    try {
      await fetch(API_ENDPOINTS.cart, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
          action: 'add'
        })
      });
      onAddToCart(product);
    } catch (err) {
      console.error('Failed to add to cart:', err);
    }
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Product Catalog</h2>
        <div className="flex space-x-2">
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="all">All Categories</option>
            <option value="vegetables">Vegetables</option>
            <option value="grains">Grains</option>
            <option value="spices">Spices</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};


export default Products;