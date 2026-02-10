import React from 'react';
import { Outfit } from '../types';
import { ArrowRight, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface OutfitCardProps {
  outfit: Outfit;
}

const OutfitCard: React.FC<OutfitCardProps> = ({ outfit }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
      onClick={() => navigate(`/outfit/${outfit.id}`)}
    >
      <div className="aspect-[3/4] w-full overflow-hidden">
        <img 
          src={outfit.mainImage} 
          alt={outfit.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 transition-opacity" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <div className="flex items-center space-x-2 text-xs font-medium text-stone-300 mb-2 uppercase tracking-wider">
          <span>{outfit.category}</span>
          <span className="w-1 h-1 rounded-full bg-stone-400" />
          <span>{outfit.gender}</span>
        </div>
        <h3 className="text-xl font-serif font-bold mb-1">{outfit.name}</h3>
        <p className="text-sm text-stone-300 mb-4 line-clamp-1">{outfit.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
             <div className="flex items-center space-x-1 text-sm text-stone-200 bg-white/10 px-2 py-1 rounded backdrop-blur-sm">
                <Layers className="h-3 w-3" />
                <span>{outfit.items.length} Items</span>
             </div>
             <div className="font-semibold">₹{outfit.totalPrice.toLocaleString()}</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutfitCard;