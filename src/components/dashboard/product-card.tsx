import React from "react";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  image: string;
  category: string;
  stock: number;
  name: string;
  price: string;
}

export const ProductCard = ({
  image,
  category,
  stock,
  name,
  price,
}: ProductCardProps) => {
  return (
    <div className="bg-[#111111] rounded-3xl border border-white/5 p-4 flex flex-col gap-4 group">
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white/5">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
          <Badge variant="secondary" className="bg-black/60 backdrop-blur-md border-white/10 text-[9px] uppercase font-bold tracking-widest px-2 py-0.5">
            {category}
          </Badge>
          <span className="text-[9px] font-bold text-[#4ADE80] bg-[#4ADE80]/10 px-2 py-0.5 rounded-full border border-[#4ADE80]/20">
            {stock} IN STOCK
          </span>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white uppercase tracking-tight group-hover:text-primary transition-colors font-orbitron">
          {name}
        </h3>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-black text-[#E31B23] font-orbitron">
            ${price}
          </span>
          <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white px-4 py-2 rounded-xl transition-all">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};
