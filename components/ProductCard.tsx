import React from 'react';
import { Product } from '../types';
import { Heart, ExternalLink, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-stone-100 flex flex-col h-full">
      <div 
        className="relative aspect-[4/5] overflow-hidden cursor-pointer"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="bg-white p-2 rounded-full shadow-md text-stone-400 hover:text-red-500 hover:bg-red-50 transition-colors">
            <Heart className="h-4 w-4" />
          </button>
        </div>
        {product.originalPrice && (
           <div className="absolute bottom-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
             {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
           </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-1 text-xs text-stone-500 font-medium uppercase tracking-wide">{product.category}</div>
        <h3 
          className="text-sm font-medium text-stone-900 line-clamp-2 cursor-pointer hover:text-brand-dark mb-1"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          {product.name}
        </h3>
        
        {product.rating && (
          <div className="flex items-center mb-2">
            <Star className="h-3 w-3 text-yellow-400 fill-current" />
            <span className="text-xs text-stone-500 ml-1">{product.rating}</span>
          </div>
        )}

        <div className="mt-auto pt-3 flex items-center justify-between border-t border-stone-50">
          <div>
             <span className="text-lg font-bold text-stone-900">₹{product.price.toLocaleString()}</span>
             {product.originalPrice && (
               <span className="text-xs text-stone-400 line-through ml-2">₹{product.originalPrice.toLocaleString()}</span>
             )}
          </div>
          <a 
            href={product.affiliateLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center p-2 rounded-lg bg-stone-900 text-white hover:bg-stone-800 transition-colors"
            title="Buy Now"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;