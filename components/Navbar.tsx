import React, { useState } from 'react';
import { Search, User, Menu, X, ShoppingBag, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-serif font-bold tracking-tight text-stone-900">
              LOOKERA
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-stone-600 hover:text-stone-900 text-sm font-medium transition-colors">Home</Link>
            <Link to="/#men" className="text-stone-600 hover:text-stone-900 text-sm font-medium transition-colors">Men</Link>
            <Link to="/#women" className="text-stone-600 hover:text-stone-900 text-sm font-medium transition-colors">Women</Link>
            <Link to="/#accessories" className="text-stone-600 hover:text-stone-900 text-sm font-medium transition-colors">Accessories</Link>
            <Link to="/#deals" className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors">Deals</Link>
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-9 pr-4 py-1.5 bg-stone-50 border border-stone-200 rounded-full text-sm focus:outline-none focus:border-stone-400 w-48 transition-all focus:w-64"
              />
              <Search className="absolute left-3 top-1.5 h-4 w-4 text-stone-400" />
            </div>
            <button className="text-stone-500 hover:text-stone-900 transition-colors">
              <Heart className="h-5 w-5" />
            </button>
            <button onClick={() => navigate('/admin/login')} className="text-stone-500 hover:text-stone-900 transition-colors">
              <User className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-stone-500 hover:text-stone-900 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 text-stone-600 hover:bg-stone-50 rounded-md">Home</Link>
            <Link to="/#men" className="block px-3 py-2 text-stone-600 hover:bg-stone-50 rounded-md">Men</Link>
            <Link to="/#women" className="block px-3 py-2 text-stone-600 hover:bg-stone-50 rounded-md">Women</Link>
            <Link to="/#accessories" className="block px-3 py-2 text-stone-600 hover:bg-stone-50 rounded-md">Accessories</Link>
            <Link to="/#deals" className="block px-3 py-2 text-red-600 hover:bg-stone-50 rounded-md">Deals</Link>
            <div className="pt-4 pb-2">
               <div className="relative px-3">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm w-full"
                />
                <Search className="absolute left-6 top-4.5 h-4 w-4 text-stone-400" />
              </div>
            </div>
            <Link to="/admin/login" className="block px-3 py-2 text-stone-600 hover:bg-stone-50 rounded-md">Admin Login</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;