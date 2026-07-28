import React from "react";
import { IconChevronLeft, IconX } from "@tabler/icons-react";

interface DashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: string;
}

export const DashboardModal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  showBackButton,
  onBack,
  children,
  footer,
  maxWidth = "max-w-5xl",
}: DashboardModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      
      {/* Modal Container */}
      <div className={`relative w-full ${maxWidth} h-full max-h-[90vh] bg-[#000000] rounded-[40px] border border-white/10 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300`}>
        
        {/* Header */}
        <div className="p-8 md:p-10 pb-6 flex items-start justify-between gap-6 border-b border-white/5">
          <div className="flex items-start gap-6">
            {(showBackButton || onBack) && (
              <button 
                onClick={onBack || onClose}
                className="mt-2 text-white/40 hover:text-white transition-colors"
              >
                <IconChevronLeft size={24} />
              </button>
            )}
            <div>
              <h2 className="text-3xl md:text-4xl font-black uppercase text-white font-orbitron tracking-tight leading-none">
                {title}
              </h2>
              {subtitle && (
                <p className="text-white/60 font-bold uppercase tracking-widest text-[11px] mt-2">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-all shrink-0"
          >
            <IconX size={20} />
          </button>
        </div>

        {/* Body - Scrollable */}
        <div className="flex-1 overflow-y-auto p-8 md:p-10 pt-6 custom-scrollbar">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="p-8 md:p-10 border-t border-white/5 bg-black/50 backdrop-blur-sm">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
