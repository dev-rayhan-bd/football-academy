"use client";
import React from "react";
import { IconEye, IconPencil, IconTrash, IconHeart, IconShare, IconCheck, IconX, IconDots } from "@tabler/icons-react";

interface TableActionButtonsProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onHeart?: () => void;
  onShare?: () => void;
  onVerify?: () => void;
  onReject?: () => void;
  onDots?: () => void;
  viewColor?: string;
  editColor?: string;
  deleteColor?: string;
  heartColor?: string;
  shareColor?: string;
  verifyColor?: string;
  rejectColor?: string;
  dotsColor?: string;
  isHeartFilled?: boolean;
}

export const TableActionButtons = ({
  onView,
  onEdit,
  onDelete,
  onHeart,
  onShare,
  onVerify,
  onReject,
  onDots,
  viewColor = "text-white/40 hover:text-white border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10",
  editColor = "text-white/40 hover:text-white border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10",
  deleteColor = "text-red-500 hover:text-red-400 border-red-500/20 hover:border-red-500/40 bg-red-500/5 hover:bg-red-500/10",
  heartColor = "text-white/40 hover:text-[#E31B23] border-white/10 hover:border-[#E31B23]/30 bg-white/5 hover:bg-[#E31B23]/10",
  shareColor = "text-white/40 hover:text-white border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10",
  verifyColor = "text-green-500 hover:text-green-400 border-green-500/20 hover:border-green-500/40 bg-green-500/5 hover:bg-green-500/10",
  rejectColor = "text-red-500 hover:text-red-400 border-red-500/20 hover:border-red-500/40 bg-red-500/5 hover:bg-red-500/10",
  dotsColor = "text-white/40 hover:text-white border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10",
  isHeartFilled = false,
}: TableActionButtonsProps) => {
  return (
    <div className="flex justify-center items-center gap-2">
      {onView && (
        <button 
          onClick={onView}
          className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl border transition-all hover:scale-105 ${viewColor}`}
        >
          <IconEye size={18} />
        </button>
      )}
      
      {onVerify && (
        <button 
          onClick={onVerify}
          className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl border transition-all hover:scale-105 ${verifyColor}`}
        >
          <IconCheck size={18} />
        </button>
      )}

      {onReject && (
        <button 
          onClick={onReject}
          className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl border transition-all hover:scale-105 ${rejectColor}`}
        >
          <IconX size={18} />
        </button>
      )}
      
      {onHeart && (
        <button 
          onClick={onHeart}
          className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl border transition-all hover:scale-105 ${heartColor}`}
        >
          <IconHeart size={18} fill={isHeartFilled ? "currentColor" : "none"} />
        </button>
      )}

      {onShare && (
        <button 
          onClick={onShare}
          className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl border transition-all hover:scale-105 ${shareColor}`}
        >
          <IconShare size={18} />
        </button>
      )}
      
      {onEdit && (
        <button 
          onClick={onEdit}
          className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl border transition-all hover:scale-105 ${editColor}`}
        >
          <IconPencil size={18} />
        </button>
      )}

      {onDelete && (
        <button 
          onClick={onDelete}
          className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl border transition-all hover:scale-105 ${deleteColor}`}
        >
          <IconTrash size={18} />
        </button>
      )}

      {onDots && (
        <button 
          onClick={onDots}
          className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl border transition-all hover:scale-105 ${dotsColor}`}
        >
          <IconDots size={18} />
        </button>
      )}
    </div>
  );
};
