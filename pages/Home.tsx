import React, { useMemo, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getOutfits, getProducts } from '../services/mockData';
import { Outfit, Product } from '../types';
import OutfitCard from '../components/OutfitCard';
import ProductCard from '../components/ProductCard';
import SectionHeader from '../components/SectionHeader';
import Button from '../components/Button';
import { ArrowRight, Tag, Clock, Sparkles } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // State for data to ensure we catch updates
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setOutfits(getOutfits());
    setProducts(getProducts());
  }, []);

  // Handle Hash Navigation
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location, outfits, products]); // Re-run when data loads to ensure elements exist

  const trendingOutfits = useMemo(() => outfits.filter(o => o.isTrending).slice(0, 3), [outfits]);
  const featuredProducts = useMemo(() => products.slice(0, 4), [products]);
  
  // Section filters
  const menProducts = useMemo(() => products.filter(p => p.gender === 'Men' || p.gender === 'Unisex').slice(0, 4), [products]);
  const womenProducts = useMemo(() => products.filter(p => p.gender === 'Women' || p.gender === 'Unisex').slice(0, 4), [products]);
  const accessoryProducts = useMemo(() => products.filter(p => p.category === 'Accessories' || p.category === 'Shoes').slice(0, 4), [products]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full bg-stone-900 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000" 
          alt="Fashion Hero" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <div className="max-w-xl animate-fade-in-up">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-widest text-white uppercase border border-white/30 rounded-full bg-white/10 backdrop-blur-sm">
              New Collection 2024
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight mb-6">
              Curated Style,<br />
              <span className="text-brand-gold">Effortless You.</span>
            </h1>
            <p className="text-lg text-stone-300 mb-8 leading-relaxed">
              Discover complete looks styled by experts. Shop individual pieces from your favorite retailers with a single click.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => document.getElementById('looks')?.scrollIntoView({ behavior: 'smooth'})}>
                Explore Looks
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black" size="lg">
                Shop Trends
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        
        {/* Trending Looks */}
        <section id="looks" className="scroll-mt-24">
          <SectionHeader 
            title="Trending Looks" 
            subtitle="Most loved outfits by our community this week."
            action={
              <Button variant="ghost" onClick={() => navigate('/')}>
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            }
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingOutfits.map(outfit => (
              <OutfitCard key={outfit.id} outfit={outfit} />
            ))}
          </div>
        </section>

        {/* Categories / Occasions */}
        <section>
          <SectionHeader title="Shop by Occasion" />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {['Office Wear', 'Casual', 'Party', 'Travel', 'Festive'].map((cat) => (
              <div key={cat} className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer">
                <img 
                  src={`https://source.unsplash.com/random/400x400/?fashion,${cat.toLowerCase().replace(' ', '-')}`} 
                  alt={cat}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                  <h3 className="text-white font-medium text-lg tracking-wide">{cat}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Men's Section */}
        <section id="men" className="scroll-mt-24">
          <SectionHeader title="Men's Collection" subtitle="Refined essentials for the modern man." />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {menProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Women's Section */}
        <section id="women" className="scroll-mt-24">
          <SectionHeader title="Women's Collection" subtitle="Elegance and comfort combined." />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {womenProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Accessories Section */}
        <section id="accessories" className="scroll-mt-24">
          <SectionHeader title="Accessories" subtitle="The perfect finishing touches." />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {accessoryProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Deals Section */}
        <section id="deals" className="bg-red-50 rounded-3xl p-8 md:p-12 scroll-mt-24 border border-red-100">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div>
              <span className="text-red-600 font-bold tracking-widest text-xs uppercase mb-2 block">Limited Time Offer</span>
              <h2 className="text-3xl font-serif font-bold text-stone-900">Season End Sale</h2>
              <p className="text-stone-600 mt-2">Up to 50% off on selected items.</p>
            </div>
            <Button variant="primary" className="mt-4 md:mt-0 bg-red-600 hover:bg-red-700 focus:ring-red-600">
              View All Deals
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             {products.filter(p => p.originalPrice).slice(0, 4).map(product => (
               <ProductCard key={product.id} product={product} />
             ))}
          </div>
        </section>

        {/* Budget Section */}
        <section className="bg-stone-100 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Style on a Budget</h2>
            <p className="text-stone-600">Looking sharp doesn't have to break the bank.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[999, 1499, 2999].map(price => (
              <div key={price} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center cursor-pointer border border-stone-200/50">
                <div className="w-12 h-12 bg-cream-100 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-gold">
                  <Tag className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-stone-900">Under ₹{price}</h3>
                <p className="text-sm text-stone-500 mt-2">Explore {price === 999 ? 'Budget Buys' : price === 1499 ? 'Value Picks' : 'Premium Basics'}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;