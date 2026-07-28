"use client";
import React, { useState } from "react";
import { 
  IconTrophy,
  IconLoader2
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface StripePaymentModalProps {
  onPay: () => void;
  onBack: () => void;
}

export const StripePaymentModal = ({ onPay, onBack }: StripePaymentModalProps) => {
  const [paymentData, setPaymentData] = useState({ card: "", expiry: "", cvc: "", name: "EDDIE RICCI" });
  const [loading, setLoading] = useState(false);

  const handleCardChange = (val: string) => {
    // Keep only digits, limit to 16
    const digits = val.replace(/\D/g, "").slice(0, 16);
    // Format card number with spaces every 4 digits
    let formatted = "";
    for (let i = 0; i < digits.length; i++) {
      if (i > 0 && i % 4 === 0) formatted += " ";
      formatted += digits[i];
    }
    setPaymentData({ ...paymentData, card: formatted });
  };

  const handleExpiryChange = (val: string) => {
    let cleaned = val.replace(/[^\d/]/g, "");
    if (cleaned.length === 2 && !cleaned.includes("/") && val.length > paymentData.expiry.length) {
      cleaned += "/";
    }
    setPaymentData({ ...paymentData, expiry: cleaned.slice(0, 5) });
  };

  const handleCvcChange = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 3);
    setPaymentData({ ...paymentData, cvc: digits });
  };

  const handleFinalSubmit = () => {
    const rawCard = paymentData.card.replace(/\s/g, "");
    if (rawCard.length === 16 && paymentData.expiry.length === 5 && paymentData.cvc.length === 3) {
      setLoading(true);
      // Simulate Stripe API call
      setTimeout(() => {
        setLoading(false);
        onPay();
      }, 1500);
    }
  };

  const rawCard = paymentData.card.replace(/\s/g, "");
  const isValid = rawCard.length === 16 && paymentData.expiry.length === 5 && paymentData.cvc.length === 3 && paymentData.name.trim();

  return (
    <div className="space-y-10 pb-16 animate-in zoom-in-95 duration-500 max-w-2xl mx-auto">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-[#00FF62]/10 border border-[#00FF62]/20 flex items-center justify-center mx-auto mb-6">
          <IconTrophy size={40} className="text-[#00FF62]" />
        </div>
        <h1 className="text-5xl font-black text-white uppercase italic tracking-tighter font-orbitron">Complete Payment</h1>
        <p className="text-gray-400 italic">Secure professional scouting analysis for $6.99</p>
      </div>

      <div className="p-10 rounded-[40px] border border-white/10 bg-[#0D0D0D] space-y-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8">
          <div className="text-4xl font-black text-[#E31B23] italic tracking-tighter font-orbitron">$6.99</div>
        </div>

        <div className="space-y-6 pt-4">
          <div className="space-y-3">
            <Label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] font-orbitron">
              Card Information
            </Label>
            <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-6 space-y-6 transition-colors">
              <div className="space-y-4">
                <Input 
                  placeholder="Card Number (16 digits)" 
                  className="bg-transparent border-none text-xl font-bold tracking-[0.2em] p-0 focus-visible:ring-0 placeholder:text-gray-700 text-white" 
                  value={paymentData.card}
                  onChange={(e) => handleCardChange(e.target.value)}
                />
                <div className="grid grid-cols-2 gap-8 border-t border-white/5 pt-4">
                  <div className="space-y-1">
                    <Input 
                      placeholder="MM / YY" 
                      className="bg-transparent border-none text-lg font-bold p-0 focus-visible:ring-0 placeholder:text-gray-700 text-white"
                      value={paymentData.expiry}
                      onChange={(e) => handleExpiryChange(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Input 
                      placeholder="CVC" 
                      className="bg-transparent border-none text-lg font-bold p-0 focus-visible:ring-0 placeholder:text-gray-700 text-right text-white"
                      value={paymentData.cvc}
                      onChange={(e) => handleCvcChange(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] font-orbitron">
              Cardholder Name
            </Label>
            <Input 
              className="bg-[#1A1A1A] border-white/10 h-14 rounded-2xl font-bold uppercase tracking-widest text-white transition-colors" 
              value={paymentData.name}
              onChange={(e) => setPaymentData({...paymentData, name: e.target.value})}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Button 
            className="w-full h-16 rounded-2xl bg-[#00FF62] hover:bg-[#00D150] text-black font-black uppercase tracking-widest text-lg transition-all shadow-[0_0_30px_rgba(0,255,98,0.2)] disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed flex items-center justify-center gap-2 font-orbitron"
            onClick={handleFinalSubmit}
            disabled={!isValid || loading}
          >
            {loading ? (
              <>
                <IconLoader2 className="animate-spin" size={20} />
                Processing Payment...
              </>
            ) : (
              "Pay & Submit Details"
            )}
          </Button>
          <Button 
            variant="ghost" 
            className="w-full text-gray-500 hover:text-white font-bold uppercase text-[10px] tracking-widest font-orbitron"
            onClick={onBack}
            disabled={loading}
          >
            Back to Details
          </Button>
        </div>

        <div className="flex items-center justify-center gap-6 text-gray-600 grayscale opacity-40 pt-4">
          <div className="text-[10px] font-black uppercase font-orbitron">Stripe Secured</div>
          <div className="text-[10px] font-black uppercase tracking-tighter italic font-serif">Visa</div>
          <div className="text-[10px] font-black uppercase tracking-tighter italic font-serif">Mastercard</div>
        </div>
      </div>
    </div>
  );
};
