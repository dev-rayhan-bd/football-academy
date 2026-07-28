"use client";

import React from "react";
import { Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

const plans = [
    {
        name: "Players",
        price: "$19.99",
        features: [
            "Production of analysis materials",
            "Upload videos, photos, and game reports",
            "Exposure of your profile to licensed agents and professional clubs",
            "Transfer of your analysis materials to other clubs"
        ]
    },
    {
        name: "Coaches",
        price: "$19.99",
        features: [
            "Production of analysis materials",
            "Upload videos, photos, courses and certificates",
            "Exposure of your profile to licensed agents and professional clubs",
            "Transfer of your analysis materials to other clubs"
        ]
    },
    {
        name: "Football Agent",
        price: "$89.00",
        features: [
            "Access to all athlete and coach profiles on the platform",
            "Detailed analysis of athletes' materials",
            "Direct contact wth athletes' parents",
            "Faster and More objective pre-field analysis",
            "Promotion of tryouts and events on the platform"
        ]
    },
    {
        name: "Professional Clubs",
        price: "$159.00",
        features: [
            "Access to all athlete and coach profiles on the platform",
            "Detailed analysis of athletes' materials",
            "Direct contact wth athletes' parents",
            "Faster and More objective analysis before sending scouts to the field",
            "Display of club's trials on the platform"
        ]
    },
    {
        name: "Grassroot Clubs",
        price: "$109.90",
        features: [
            "Production of analysis materials for up to 3 coaches and 30 players",
            "Upload videos, photos, and game reports",
            "Exposure of your club profile to licensed agents and professional clubs",
            "Display of your club's trials of the platform",
            "Commission for each game report submitted by an athlete"
        ]
    }
];

export function SuperAdminMembershipPlans() {
    return (
        <div className="p-6 text-white min-h-screen">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-medium mb-2" style={{ fontFamily: "Orbitron, sans-serif" }}>Membership Plans</h1>
                    <p className="text-gray-400 text-sm">Manage subscription plans for all user roles</p>
                </div>
                
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-[#27272a] hover:bg-[#3f3f46] text-white border border-[#3f3f46] rounded-md px-4 py-2 flex items-center gap-2">
                            <Plus className="w-4 h-4" /> Add Plan
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#18181b] border-[#27272a] text-white sm:max-w-[425px] [&>button]:hidden p-6 rounded-xl">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-medium mb-2" style={{ fontFamily: "Orbitron, sans-serif" }}>Add Plan</DialogTitle>
                        </DialogHeader>
                        
                        <div className="space-y-5 mt-2">
                            <div className="space-y-2">
                                <Label className="text-gray-400 font-normal">Plan Name</Label>
                                <Input 
                                    className="bg-[#1e1e20] border-[#2c2c30] text-white h-12 focus-visible:ring-1 focus-visible:ring-gray-500 rounded-lg placeholder:text-gray-500" 
                                    placeholder="Enter Plan Name" 
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <Label className="text-gray-400 font-normal">Plan Category</Label>
                                <div className="flex gap-3">
                                    <Input 
                                        className="bg-[#1e1e20] border-[#2c2c30] text-white h-12 focus-visible:ring-1 focus-visible:ring-gray-500 rounded-lg placeholder:text-gray-500" 
                                        placeholder="Enter Plan Name" 
                                    />
                                    <Button size="icon" className="h-12 w-12 shrink-0 bg-[#1e1e20] hover:bg-[#2c2c30] border border-[#2c2c30] rounded-lg">
                                        <Plus className="w-5 h-5 text-gray-300" />
                                    </Button>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-gray-400 font-normal">Start Date</Label>
                                    <div className="relative">
                                        <Input 
                                            type="text"
                                            defaultValue="10/12/2025"
                                            className="bg-[#1e1e20] border-[#2c2c30] text-white h-12 text-center focus-visible:ring-1 focus-visible:ring-gray-500 rounded-lg" 
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-gray-400 font-normal">End Date</Label>
                                    <div className="relative">
                                        <Input 
                                            type="text"
                                            defaultValue="10/01/2026"
                                            className="bg-[#1e1e20] border-[#2c2c30] text-white h-12 text-center focus-visible:ring-1 focus-visible:ring-gray-500 rounded-lg" 
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-2 pt-1 pb-1">
                                <div className="flex items-center justify-center w-5 h-5 rounded-full border border-gray-400 bg-transparent text-gray-200 cursor-pointer">
                                    <Check className="w-3.5 h-3.5" />
                                </div>
                                <Label className="text-[15px] font-normal text-gray-200 cursor-pointer">Active</Label>
                            </div>
                            
                            <div className="space-y-2 pb-2">
                                <Label className="text-gray-400 font-normal">Plan Price</Label>
                                <Input 
                                    className="bg-[#1e1e20] border-[#2c2c30] text-white h-12 focus-visible:ring-1 focus-visible:ring-gray-500 rounded-lg placeholder:text-gray-500" 
                                    placeholder="Enter Price" 
                                />
                            </div>
                            
                            <div className="flex gap-4 pt-2">
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="flex-1 bg-transparent border-[#3f3f46] text-white hover:bg-[#27272a] hover:text-white h-12 rounded-lg font-normal">
                                        Cancel
                                    </Button>
                                </DialogTrigger>
                                <Button className="flex-1 bg-[#333336] hover:bg-[#4a4a4e] text-white border-0 h-12 rounded-lg font-normal">
                                    Save
                                </Button>
                            </div>
                            
                            <div className="flex items-center space-x-3 pt-1">
                                <Checkbox id="defaultPricing" className="border-gray-500 bg-gray-500 data-[state=checked]:bg-gray-500 data-[state=checked]:text-white h-[18px] w-[18px] rounded-sm" />
                                <Label htmlFor="defaultPricing" className="text-[15px] font-normal text-gray-400 cursor-pointer">Default Pricing</Label>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
                {plans.map((plan, index) => (
                    <div key={index} className="bg-[#0c0c0e] border border-[#222226] rounded-2xl p-6 flex flex-col h-full shadow-lg">
                        <div className="flex justify-center mb-6">
                            <span className="text-[10px] font-medium tracking-widest text-gray-300 px-4 py-1.5 rounded-full border border-[#2a2a30]">
                                ACTIVE
                            </span>
                        </div>
                        
                        <h2 className="text-center text-[22px] font-semibold mb-4 text-white">{plan.name}</h2>
                        
                        <div className="text-center mb-8 flex items-baseline justify-center">
                            <span className="text-4xl font-bold tracking-tight text-white">{plan.price}</span>
                            <span className="text-gray-400 text-sm ml-1 font-medium">/month</span>
                        </div>
                        
                        <div className="flex-grow space-y-5 mb-10">
                            {plan.features.map((feature, idx) => (
                                <div key={idx} className="flex items-start">
                                    <Check className="w-[18px] h-[18px] text-[#22c55e] mr-3 mt-0.5 shrink-0" strokeWidth={3} />
                                    <span className="text-sm text-gray-400 leading-snug">{feature}</span>
                                </div>
                            ))}
                        </div>
                        
                        <div className="mt-auto pt-4 flex justify-center">
                            <div className="flex rounded-full border border-[#2a2a30] overflow-hidden w-full max-w-[220px]">
                                <button className="flex-1 bg-[#27272a] hover:bg-[#3f3f46] text-gray-200 text-sm py-2.5 px-4 transition-colors font-medium">
                                    Edit Plan
                                </button>
                                <button className="flex-1 bg-transparent hover:bg-[#1a1a1c] text-gray-200 text-sm py-2.5 px-4 transition-colors font-medium">
                                    Deactivate
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
