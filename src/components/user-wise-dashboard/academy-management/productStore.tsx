"use client";

import React, { useState } from "react";
import { DashboardModal } from "@/components/dashboard/dashboard-modal";
import { 
  IconPlus, 
  IconChevronDown, 
  IconUpload,
  IconSearch,
  IconFilter,
  IconArrowLeft,
  IconBox
} from "@tabler/icons-react";

const products = [
  {
    id: 1,
    name: "Home Jersey",
    category: "Jerseys",
    price: "$45",
    stock: "24 in stock",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 2,
    name: "Training Kit",
    category: "Kits",
    price: "$35",
    stock: "18 in stock",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 3,
    name: "Football Boots",
    category: "Accessories",
    price: "$85",
    stock: "12 in stock",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 4,
    name: "Goalkeeper Gloves",
    category: "Accessories",
    price: "$30",
    stock: "8 in stock",
    image: "https://images.unsplash.com/photo-1518005020250-675f0403172c?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 5,
    name: "Away Jersey",
    category: "Jerseys",
    price: "$45",
    stock: "20 in stock",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: 6,
    name: "Training Shorts",
    category: "Kits",
    price: "$25",
    stock: "30 in stock",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=400"
  }
];

export const ProductStoreManagement = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<string[]>(["XS", "S", "M", "XL"]);
  const [selectedColors, setSelectedColors] = useState<string[]>(["Black", "White", "Red"]);

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev => prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black uppercase text-white font-orbitron tracking-tight leading-none">Product Store</h1>
          <p className="text-white/60 font-bold uppercase tracking-widest text-[11px] mt-2">Manage store inventory and orders</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-[#E31B23] hover:bg-[#C2181F] text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-[#E31B23]/20"
        >
          <IconPlus size={20} />
          <span className="text-sm font-bold uppercase tracking-widest">Add Product</span>
        </button>
      </div>

      {/* Main Container */}
      <div className="bg-[#0A0A0A] rounded-[32px] border border-white/5 p-8 flex flex-col gap-8 shadow-2xl">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-black uppercase text-white font-orbitron">All Products</h2>
          <div className="flex gap-3">
            {["Category", "Stock Status", "Price Range"].map((filter) => (
              <button key={filter} className="bg-white/5 border border-white/15 px-5 py-2.5 rounded-xl text-[11px] font-bold text-white/60 hover:text-white flex items-center gap-2 transition-all">
                {filter}
                <IconChevronDown size={14} />
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-[#111111] rounded-[32px] border border-white/15 p-6 flex flex-col gap-6 hover:border-white/25 transition-all shadow-xl group relative overflow-hidden">
              {/* Product Image Area */}
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-black relative group-hover:scale-[1.02] transition-transform duration-500">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-[9px] font-black text-white/80 uppercase tracking-widest border border-white/10">
                    {product.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-[#4ADE80]/10 backdrop-blur-md px-3 py-1 rounded-lg text-[9px] font-black text-[#4ADE80] uppercase tracking-widest border border-[#4ADE80]/20">
                    {product.stock}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-black uppercase text-white font-orbitron leading-tight">{product.name}</h3>
                <div className="flex justify-between items-center">
                  <p className="text-2xl font-black text-[#E31B23] font-orbitron">{product.price}</p>
                  <button className="bg-white/5 hover:bg-white/10 border border-white/15 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-all">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Product Modal */}
      <DashboardModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Product"
        subtitle="Add a new item to the uniform store"
        showBackButton
        footer={
          <div className="flex gap-4 w-full">
            <button 
              onClick={() => setShowAddModal(false)}
              className="flex-1 py-4 rounded-xl border border-white/30 text-sm font-bold text-white hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
            <button className="flex-[2] py-4 rounded-xl bg-[#E31B23] hover:bg-[#C2181F] text-sm font-bold text-white flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#E31B23]/20">
              <IconBox size={20} />
              Add Product
            </button>
          </div>
        }
      >
        <div className="space-y-10">
          {/* Product Information */}
          <div className="space-y-6 bg-[#0A0A0A] border border-white/15 rounded-[32px] p-8">
            <h3 className="text-xl font-black uppercase text-white font-orbitron">Product Information</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Product Name <span className="text-[#E31B23]">*</span>
                </label>
                <textarea placeholder="e.g., Official Home Jersey 2024" className="w-full bg-[#111111] border border-white/15 rounded-xl py-4 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all resize-none h-24" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                    Category <span className="text-[#E31B23]">*</span>
                  </label>
                  <div className="relative">
                    <select className="w-full bg-[#111111] border border-white/15 rounded-xl py-4 px-4 text-sm text-white/40 appearance-none focus:outline-none focus:border-white/25 transition-all cursor-pointer">
                      <option>Select an option</option>
                    </select>
                    <IconChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase tracking-widest text-white/60">SKU (Stock Keeping Unit)</label>
                  <input type="text" placeholder="e.g., JER-HOME-2024" className="w-full bg-[#111111] border border-white/15 rounded-xl py-4 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all" />
                  <p className="text-[9px] text-white/20 font-bold uppercase tracking-widest mt-1">Leave blank to auto-generate</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="space-y-6 bg-[#0A0A0A] border border-white/15 rounded-[32px] p-8">
            <h3 className="text-xl font-black uppercase text-white font-orbitron">Pricing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Regular Price <span className="text-[#E31B23]">*</span>
                </label>
                <div className="relative">
                  <input type="text" placeholder="0.00" className="w-full bg-[#111111] border border-white/15 rounded-xl py-4 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60">Sale Price</label>
                <div className="relative">
                  <input type="text" placeholder="0.00" className="w-full bg-[#111111] border border-white/15 rounded-xl py-4 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all" />
                </div>
                <p className="text-[9px] text-white/20 font-bold uppercase tracking-widest mt-1">Leave blank if not on sale</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-6 bg-[#0A0A0A] border border-white/15 rounded-[32px] p-8">
            <h3 className="text-xl font-black uppercase text-white font-orbitron">Description</h3>
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                Product Description <span className="text-[#E31B23]">*</span>
              </label>
              <textarea placeholder="Describe the product features, materials, care instructions, etc." className="w-full bg-[#111111] border border-white/15 rounded-xl py-4 px-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/25 transition-all resize-none h-32" />
            </div>
          </div>

          {/* Available Sizes */}
          <div className="space-y-6 bg-[#0A0A0A] border border-white/15 rounded-[32px] p-8">
            <h3 className="text-xl font-black uppercase text-white font-orbitron">Available Sizes</h3>
            <div className="space-y-4">
              <p className="text-[11px] font-bold text-white/20 uppercase tracking-widest">Select all sizes available for this product</p>
              <div className="flex flex-wrap gap-3">
                {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                  <button 
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`px-6 py-3 rounded-xl border transition-all text-[11px] font-black uppercase tracking-widest ${
                      selectedSizes.includes(size)
                      ? "bg-[#E31B23] border-[#E31B23] text-white shadow-lg shadow-[#E31B23]/20"
                      : "bg-[#1A1A1A] border-white/10 text-white/40 hover:border-white/25"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Available Colors */}
          <div className="space-y-6 bg-[#0A0A0A] border border-white/15 rounded-[32px] p-8">
            <h3 className="text-xl font-black uppercase text-white font-orbitron">Available Colors</h3>
            <div className="space-y-4">
              <p className="text-[11px] font-bold text-white/20 uppercase tracking-widest">Select all colors available for this product</p>
              <div className="flex flex-wrap gap-3">
                {["Black", "White", "Red", "Blue", "Green", "Yellow"].map((color) => (
                  <button 
                    key={color}
                    onClick={() => toggleColor(color)}
                    className={`px-6 py-3 rounded-xl border transition-all text-[11px] font-black uppercase tracking-widest ${
                      selectedColors.includes(color)
                      ? "bg-[#E31B23] border-[#E31B23] text-white shadow-lg shadow-[#E31B23]/20"
                      : "bg-[#1A1A1A] border-white/10 text-white/40 hover:border-white/25"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Inventory Management */}
          <div className="space-y-6 bg-[#0A0A0A] border border-white/15 rounded-[32px] p-8">
            <h3 className="text-xl font-black uppercase text-white font-orbitron">Inventory Management</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                  Stock Quantity <span className="text-[#E31B23]">*</span>
                </label>
                <input type="text" placeholder="0" className="w-full bg-[#111111] border border-white/15 rounded-xl py-4 px-4 text-sm text-white focus:outline-none focus:border-white/25 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60">Minimum Stock Level</label>
                <input type="text" placeholder="0" className="w-full bg-[#111111] border border-white/15 rounded-xl py-4 px-4 text-sm text-white focus:outline-none focus:border-white/25 transition-all" />
                <p className="text-[9px] text-white/20 font-bold uppercase tracking-widest mt-1 text-center">Alert when stock falls below this level</p>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-white/60">Max Order Quantity</label>
                <input type="text" placeholder="0" className="w-full bg-[#111111] border border-white/15 rounded-xl py-4 px-4 text-sm text-white focus:outline-none focus:border-white/25 transition-all" />
                <p className="text-[9px] text-white/20 font-bold uppercase tracking-widest mt-1 text-center">Maximum per customer</p>
              </div>
            </div>
          </div>

          {/* Product Image */}
          <div className="space-y-6 bg-[#0A0A0A] border border-white/15 rounded-[32px] p-8">
            <h3 className="text-xl font-black uppercase text-white font-orbitron">Product Image</h3>
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-white/60">Upload Image</label>
              <div className="w-full border-2 border-dashed border-white/15 rounded-[32px] p-12 flex flex-col items-center justify-center gap-4 hover:border-white/25 transition-all cursor-pointer bg-white/[0.01]">
                <IconUpload size={32} className="text-white/20" />
                <p className="text-sm font-bold text-white/60">Click to upload or drag and drop image/*</p>
                <p className="text-[9px] text-white/20 font-bold uppercase tracking-widest">Recommended: Square image, at least 800x800 pixels</p>
              </div>
            </div>
          </div>

          {/* Product Status */}
          <div className="space-y-6 bg-[#0A0A0A] border border-white/15 rounded-[32px] p-8">
            <h3 className="text-xl font-black uppercase text-white font-orbitron">Product Status</h3>
            <div className="space-y-4">
              <div className="bg-[#111111] border border-white/15 rounded-2xl p-6 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-black text-white uppercase tracking-widest mb-1">Active / Available for Purchase</p>
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Product will be visible and available in the store</p>
                </div>
                <div className="w-12 h-6 bg-[#E31B23] rounded-full relative p-1 cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full ml-auto" />
                </div>
              </div>
              <div className="bg-[#111111] border border-white/15 rounded-2xl p-6 flex items-center justify-between opacity-40">
                <div>
                  <p className="text-[11px] font-black text-white uppercase tracking-widest mb-1">Featured Product</p>
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Display this product in featured sections</p>
                </div>
                <div className="w-12 h-6 bg-white/10 rounded-full relative p-1 cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardModal>
    </div>
  );
};

export default ProductStoreManagement;
