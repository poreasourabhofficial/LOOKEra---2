import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRole, Product, Outfit } from '../types';
import { LayoutDashboard, ShoppingBag, Layers, Users, Settings, LogOut, Plus, Search, BarChart3, Save, X, Trash2 } from 'lucide-react';
import Button from '../components/Button';
import { generateId, getProducts, saveProduct, deleteProduct, getOutfits, saveOutfit, deleteOutfit } from '../services/mockData';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Data State
  const [products, setProducts] = useState<Product[]>([]);
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  
  // UI State
  const [isAdding, setIsAdding] = useState(false);
  const [newItemData, setNewItemData] = useState<Partial<Product & Outfit>>({});

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole') as UserRole;
    if (!storedRole) {
      navigate('/admin/login');
    } else {
      setRole(storedRole);
      // Load data
      setProducts(getProducts());
      setOutfits(getOutfits());
    }
  }, [navigate]);

  useEffect(() => {
    setIsAdding(false);
    setNewItemData({});
  }, [activeTab]);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/admin/login');
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeTab === 'products') {
      const newProduct: Product = {
        id: generateId('PROD'),
        name: newItemData.name || 'New Product',
        category: newItemData.category || 'Uncategorized',
        price: Number(newItemData.price) || 0,
        originalPrice: newItemData.originalPrice ? Number(newItemData.originalPrice) : undefined,
        image: newItemData.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
        affiliateLink: newItemData.affiliateLink || 'https://amazon.com',
        description: newItemData.description || 'No description provided.',
        uploadedBy: 'admin',
        isApproved: true,
        clicks: 0,
        createdAt: new Date().toISOString(),
        rating: 0,
        gender: newItemData.gender as any || 'Unisex'
      };
      const updated = saveProduct(newProduct);
      setProducts(updated);
    } else if (activeTab === 'outfits') {
      const newOutfit: Outfit = {
        id: generateId('OUTFIT'),
        name: newItemData.name || 'New Outfit',
        description: newItemData.description || 'No description provided.',
        mainImage: newItemData.mainImage || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
        items: [],
        totalPrice: Number(newItemData.totalPrice) || 0,
        uploadedBy: 'admin',
        isApproved: true,
        isTrending: false,
        category: newItemData.category as any || 'Casual',
        gender: newItemData.gender as any || 'Unisex',
        clicks: 0,
        createdAt: new Date().toISOString()
      };
      const updated = saveOutfit(newOutfit);
      setOutfits(updated);
    }
    
    setIsAdding(false);
    setNewItemData({});
  };

  const handleDeleteItem = (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      if (activeTab === 'products') {
        const updated = deleteProduct(id);
        setProducts(updated);
      } else if (activeTab === 'outfits') {
        const updated = deleteOutfit(id);
        setOutfits(updated);
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setNewItemData(prev => ({ ...prev, [field]: value }));
  };

  if (!role) return null;

  const isFounder = role === UserRole.FOUNDER;

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, show: isFounder },
    { id: 'products', label: 'Products', icon: ShoppingBag, show: true },
    { id: 'outfits', label: 'Outfits', icon: Layers, show: true },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, show: isFounder },
    { id: 'employees', label: 'Employees', icon: Users, show: isFounder },
    { id: 'settings', label: 'Settings', icon: Settings, show: isFounder },
  ];

  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-stone-900 text-stone-300 flex flex-col fixed h-full z-10">
        <div className="p-6">
          <h2 className="text-2xl font-serif font-bold text-white tracking-wide">LOOKERA</h2>
          <div className="mt-2 text-xs font-mono bg-stone-800 inline-block px-2 py-1 rounded text-stone-400">
            {role} PORTAL
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {menuItems.filter(item => item.show).map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id 
                  ? 'bg-stone-800 text-white' 
                  : 'hover:bg-stone-800/50 hover:text-white'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-stone-800">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-stone-800 hover:text-red-300 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-stone-900 capitalize">{activeTab}</h1>
            <div className="flex space-x-4">
               {(activeTab === 'products' || activeTab === 'outfits') && !isAdding && (
                 <Button onClick={() => setIsAdding(true)}>
                   <Plus className="h-4 w-4 mr-2" /> Add {activeTab === 'products' ? 'Product' : 'Outfit'}
                 </Button>
               )}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 min-h-[500px]">
            
            {activeTab === 'dashboard' && isFounder && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-stone-50 p-6 rounded-xl border border-stone-100">
                   <h3 className="text-stone-500 text-sm font-medium uppercase">Total Revenue (Affiliate)</h3>
                   <p className="text-3xl font-bold text-stone-900 mt-2">₹1,24,500</p>
                   <span className="text-green-600 text-sm font-medium">+12% from last month</span>
                </div>
                <div className="bg-stone-50 p-6 rounded-xl border border-stone-100">
                   <h3 className="text-stone-500 text-sm font-medium uppercase">Total Clicks</h3>
                   <p className="text-3xl font-bold text-stone-900 mt-2">15,420</p>
                </div>
                <div className="bg-stone-50 p-6 rounded-xl border border-stone-100">
                   <h3 className="text-stone-500 text-sm font-medium uppercase">Active Products</h3>
                   <p className="text-3xl font-bold text-stone-900 mt-2">{products.length}</p>
                </div>

                <div className="col-span-3 mt-8">
                  <h3 className="text-lg font-bold text-stone-900 mb-4">Recent Activity</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-stone-200">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Item</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Clicks</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-stone-200">
                        {products.slice(0, 5).map((prod) => (
                          <tr key={prod.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-stone-900">{prod.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">Product</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">Active</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">{prod.clicks}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Add Item Form */}
            {isAdding && (
              <div className="mb-8 p-6 bg-stone-50 rounded-xl border border-stone-200 animate-in fade-in slide-in-from-top-4">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-stone-900">Add New {activeTab === 'products' ? 'Product' : 'Outfit'}</h3>
                  <button onClick={() => setIsAdding(false)} className="text-stone-400 hover:text-stone-600">
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <form onSubmit={handleAddItem} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">Name</label>
                      <input 
                        required
                        type="text" 
                        className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-brand-dark outline-none"
                        placeholder="e.g. Classic White Shirt"
                        onChange={(e) => handleInputChange('name', e.target.value)}
                      />
                    </div>
                    
                    {activeTab === 'products' && (
                       <>
                        <div>
                          <label className="block text-sm font-medium text-stone-700 mb-1">Price (₹)</label>
                          <input 
                            required
                            type="number" 
                            className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-brand-dark outline-none"
                            placeholder="e.g. 1299"
                            onChange={(e) => handleInputChange('price', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-stone-700 mb-1">Original Price (Optional)</label>
                          <input 
                            type="number" 
                            className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-brand-dark outline-none"
                            placeholder="e.g. 2499"
                            onChange={(e) => handleInputChange('originalPrice', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-stone-700 mb-1">Affiliate Link</label>
                          <input 
                            type="url" 
                            className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-brand-dark outline-none"
                            placeholder="https://..."
                            onChange={(e) => handleInputChange('affiliateLink', e.target.value)}
                          />
                        </div>
                       </>
                    )}

                    {activeTab === 'outfits' && (
                       <div>
                          <label className="block text-sm font-medium text-stone-700 mb-1">Total Price Estimate (₹)</label>
                          <input 
                            required
                            type="number" 
                            className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-brand-dark outline-none"
                            placeholder="e.g. 5000"
                            onChange={(e) => handleInputChange('totalPrice', e.target.value)}
                          />
                        </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">Category</label>
                      <select 
                        className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-brand-dark outline-none"
                        onChange={(e) => handleInputChange('category', e.target.value)}
                      >
                         <option value="">Select Category</option>
                         {activeTab === 'products' ? (
                           ['Shirts', 'Pants', 'Shoes', 'Accessories', 'Outerwear', 'Dresses'].map(c => <option key={c} value={c}>{c}</option>)
                         ) : (
                           ['Casual', 'Formal', 'Party', 'Travel', 'Festive', 'Office Wear'].map(c => <option key={c} value={c}>{c}</option>)
                         )}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">Gender</label>
                      <select 
                        className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-brand-dark outline-none"
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                      >
                         <option value="Unisex">Unisex</option>
                         <option value="Men">Men</option>
                         <option value="Women">Women</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-stone-700 mb-1">Image URL</label>
                      <input 
                        type="url" 
                        className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-brand-dark outline-none"
                        placeholder="https://..."
                        onChange={(e) => handleInputChange(activeTab === 'products' ? 'image' : 'mainImage', e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-stone-700 mb-1">Description</label>
                      <textarea 
                        className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-brand-dark outline-none h-24"
                        placeholder="Product description..."
                        onChange={(e) => handleInputChange('description', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-4 pt-4 border-t border-stone-200">
                    <Button type="button" variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
                    <Button type="submit">
                      <Save className="h-4 w-4 mr-2" /> Save {activeTab === 'products' ? 'Product' : 'Outfit'}
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* Tables */}
            {!isAdding && activeTab === 'products' && (
              <div>
                <div className="flex mb-4">
                  <div className="relative flex-1">
                    <input 
                      type="text" 
                      placeholder="Search products by Name or ID..." 
                      className="w-full pl-10 pr-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:border-brand-dark"
                    />
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-stone-200">
                    <thead className="bg-stone-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Gender</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-stone-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-stone-200">
                      {products.map((prod) => (
                        <tr key={prod.id} className="hover:bg-stone-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0 bg-stone-100 rounded-md overflow-hidden">
                                <img className="h-10 w-10 object-cover" src={prod.image} alt="" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-stone-900 line-clamp-1">{prod.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500 font-mono">{prod.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-900">₹{prod.price}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">{prod.gender}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                               <button 
                                onClick={() => handleDeleteItem(prod.id)}
                                className="text-stone-400 hover:text-red-600 p-1"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

             {!isAdding && activeTab === 'outfits' && (
              <div>
                <div className="flex mb-4">
                  <div className="relative flex-1">
                    <input 
                      type="text" 
                      placeholder="Search outfits..." 
                      className="w-full pl-10 pr-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:border-brand-dark"
                    />
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-stone-200">
                    <thead className="bg-stone-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Outfit</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Total Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Items</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-stone-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-stone-200">
                      {outfits.map((outfit) => (
                        <tr key={outfit.id} className="hover:bg-stone-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0 bg-stone-100 rounded-md overflow-hidden">
                                <img className="h-10 w-10 object-cover" src={outfit.mainImage} alt="" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-stone-900 line-clamp-1">{outfit.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">{outfit.category}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-900">₹{outfit.totalPrice}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">{outfit.items.length}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                               <button 
                                onClick={() => handleDeleteItem(outfit.id)}
                                className="text-stone-400 hover:text-red-600 p-1"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab !== 'dashboard' && activeTab !== 'products' && activeTab !== 'outfits' && (
              <div className="text-center py-20 text-stone-400">
                <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Module under construction</p>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;