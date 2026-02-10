import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOutfits, getProducts } from '../services/mockData';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import { Share2, Heart, AlertCircle, ArrowLeft } from 'lucide-react';

const OutfitDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Use getters for dynamic data
  const outfit = useMemo(() => getOutfits().find(o => o.id === id), [id]);
  
  // Resolve product details for the outfit items
  const outfitProducts = useMemo(() => {
    if (!outfit) return [];
    const allProducts = getProducts();
    return outfit.items.map(itemId => allProducts.find(p => p.id === itemId)).filter(Boolean) as typeof allProducts;
  }, [outfit]);

  const relatedProducts = useMemo(() => getProducts().slice(0, 2), []);

  if (!outfit) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-stone-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-stone-900">Outfit not found</h2>
          <Link to="/" className="text-brand-gold hover:underline mt-2 inline-block">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link to="/" className="inline-flex items-center text-stone-500 hover:text-stone-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Looks
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Main Image */}
          <div className="lg:col-span-7">
            <div className="sticky top-24">
              <div className="rounded-2xl overflow-hidden shadow-lg aspect-[3/4] bg-white relative group">
                <img 
                  src={outfit.mainImage} 
                  alt={outfit.name} 
                  className="w-full h-full object-cover"
                />
                {/* Visual Flair */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-sm border border-white/50">
                    <div className="flex justify-between items-start">
                      <div>
                         <h1 className="text-2xl md:text-3xl font-serif font-bold text-stone-900">{outfit.name}</h1>
                         <p className="text-stone-600 mt-1">{outfit.description}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 transition-colors">
                          <Heart className="h-5 w-5 text-stone-600" />
                        </button>
                        <button className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 transition-colors">
                          <Share2 className="h-5 w-5 text-stone-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Items List */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
              <div className="flex justify-between items-center mb-6 border-b border-stone-100 pb-4">
                <div>
                   <span className="text-sm font-medium text-stone-500 uppercase tracking-wider">Total Look Cost</span>
                   <div className="text-3xl font-bold text-stone-900 mt-1">₹{outfit.totalPrice.toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <span className="block text-sm font-medium text-stone-500 uppercase tracking-wider">{outfitProducts.length} Items</span>
                  <span className="text-xs text-stone-400">ID: {outfit.id}</span>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="font-serif text-xl font-semibold text-stone-900">Shop This Look</h3>
                {outfitProducts.length === 0 && <p className="text-stone-400 text-sm">No individual items linked to this outfit.</p>}
                {outfitProducts.map((product) => (
                  <div key={product.id} className="flex gap-4 group">
                    <div className="w-24 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-stone-100 border border-stone-200">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-stone-900 group-hover:text-brand-dark transition-colors line-clamp-1">{product.name}</h4>
                            <span className="text-xs text-stone-500 font-mono mt-0.5 block">{product.id}</span>
                          </div>
                          <span className="font-bold text-stone-900">₹{product.price.toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-stone-500 mt-1">{product.category}</p>
                      </div>
                      <div className="mt-3">
                         <a 
                            href={product.affiliateLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-4 py-2 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-black transition-colors w-full sm:w-auto"
                         >
                           Buy Now
                         </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-4">You Might Also Like</h3>
              <div className="grid grid-cols-2 gap-4">
                 {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OutfitDetail;