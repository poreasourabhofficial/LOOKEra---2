import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProducts } from '../services/mockData';
import Button from '../components/Button';
import { ArrowLeft, Star, ShieldCheck, Truck, ExternalLink } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // Use getProducts() instead of static MOCK_PRODUCTS
  const product = useMemo(() => getProducts().find(p => p.id === id), [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-stone-900">Product not found</h2>
          <Link to="/" className="text-brand-gold hover:underline mt-2 inline-block">Return to Shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-stone-500 hover:text-stone-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Shop
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Image Gallery (Mock single image for now) */}
            <div className="bg-stone-100 relative aspect-square md:aspect-auto">
              <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
            </div>

            {/* Product Info */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="mb-2 flex items-center space-x-4">
                <span className="px-3 py-1 bg-stone-100 text-stone-600 rounded-full text-xs font-bold uppercase tracking-wider">
                  {product.category}
                </span>
                <span className="text-xs text-stone-400 font-mono">{product.id}</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4">{product.name}</h1>
              
              <div className="flex items-center space-x-4 mb-6">
                 <div className="flex items-center text-yellow-400">
                    {[1,2,3,4,5].map(star => <Star key={star} className={`h-5 w-5 ${star <= (product.rating || 0) ? 'fill-current' : 'text-stone-200'}`} />)}
                 </div>
                 <span className="text-sm text-stone-500">({product.reviews || 0} reviews)</span>
              </div>

              <div className="flex items-end space-x-4 mb-8">
                <span className="text-4xl font-bold text-stone-900">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-xl text-stone-400 line-through mb-1">₹{product.originalPrice.toLocaleString()}</span>
                )}
                {product.originalPrice && (
                  <span className="text-sm font-bold text-green-600 mb-2">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>

              <p className="text-stone-600 leading-relaxed mb-8">
                {product.description}
              </p>

              <div className="space-y-4">
                <a 
                  href={product.affiliateLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <Button size="lg" fullWidth className="h-14 text-lg">
                    Buy Now on {product.affiliateLink.includes('amazon') ? 'Amazon' : product.affiliateLink.includes('flipkart') ? 'Flipkart' : 'Merchant'} <ExternalLink className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 text-sm text-stone-600">
                  <ShieldCheck className="h-5 w-5 text-stone-400" />
                  <span>Quality Verified</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-stone-600">
                  <Truck className="h-5 w-5 text-stone-400" />
                  <span>Fast Delivery Partner</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;