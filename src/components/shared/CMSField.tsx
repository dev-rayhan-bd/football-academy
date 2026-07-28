"use client";
import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, X, PencilIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CMSFieldProps {
  value: string | number;
  onUpdate: (newValue: string | number) => void;
  canEdit: boolean;
  type?: "text" | "number" | "textarea" | "select" | "date" | "combobox";
  options?: string[];
  className?: string;
  inputClassName?: string;
  label?: string;
  isNumeric?: boolean;
  editTrigger?: "click" | "doubleClick";
  hideIcon?: boolean;
  style?: React.CSSProperties;
  showEmojis?: boolean;
}

const EMOJIS = ["⚽", "👀", "🎯", "🧠", "💪", "🌍", "🏆", "🔥", "⚡", "📈", "👏", "🙌", "❤️", "👍"];

export const CMSField = ({
  value,
  onUpdate,
  canEdit,
  type = "text",
  options = [],
  className,
  inputClassName,
  isNumeric = false,
  editTrigger = "click",
  hideIcon = false,
  style,
  showEmojis = false,
}: CMSFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertEmoji = (emoji: string) => {
    const el = textareaRef.current;
    if (!el) return;

    const start = el.selectionStart;
    const end = el.selectionEnd;
    const text = String(tempValue);
    const before = text.substring(0, start);
    const after = text.substring(end);
    const newValue = before + emoji + after;

    setTempValue(newValue);
    
    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + emoji.length, start + emoji.length);
    }, 0);
  };

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  const handleSave = (val?: string | number) => {
    const finalVal = val !== undefined ? val : tempValue;
    onUpdate(isNumeric ? Number(finalVal) : finalVal);
    setIsEditing(false);
    setSearchTerm("");
  };

  const handleCancel = () => {
    setTempValue(value);
    setIsEditing(false);
    setSearchTerm("");
  };

  const filteredOptions = options.filter((opt) => {
    const isHeading = opt.startsWith("--") && opt.endsWith("--");
    if (isHeading) {
      return !searchTerm; // Only show headings if search is empty
    }
    return opt.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (isEditing && canEdit) {
    if (type === "combobox") {
      return (
        <div className={cn("relative flex flex-col gap-1 w-full z-50", className)} style={style}>
          <div className="flex items-center gap-2">
            <Input
              value={searchTerm || String(tempValue)}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className={cn("h-8 text-xs bg-gray-800 border-primary/30 min-w-20", inputClassName)}
              autoFocus
            />
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7 text-red-500 hover:text-red-400 hover:bg-red-500/10"
              onClick={handleCancel}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="absolute top-9 left-0 w-full max-h-40 overflow-y-auto bg-gray-900 border border-gray-800 rounded shadow-xl z-[100]">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt, idx) => {
                const isHeading = opt.startsWith("--") && opt.endsWith("--");
                if (isHeading) {
                  return (
                    <div
                      key={`${opt}-${idx}`}
                      className="px-3 py-1.5 text-[10px] font-bold text-primary bg-black/45 tracking-wider uppercase select-none pointer-events-none border-b border-white/5"
                    >
                      {opt.replace(/--/g, "").trim()}
                    </div>
                  );
                }
                return (
                  <div
                    key={`${opt}-${idx}`}
                    className="px-3 py-2 text-xs hover:bg-primary/20 cursor-pointer text-white"
                    onClick={() => handleSave(opt)}
                  >
                    {opt}
                  </div>
                );
              })
            ) : (
              <div className="px-3 py-2 text-xs text-gray-500">No results</div>
            )}
          </div>
        </div>
      );
    }

    if (type === "select") {
      return (
        <div className={cn("flex items-center gap-2 w-full", className)}>
          <Select
            value={String(tempValue)}
            onValueChange={(val) => handleSave(val)}
          >
            <SelectTrigger className={cn("h-8 text-xs bg-gray-800 border-primary/30 min-w-20", inputClassName)}>
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-800 text-white">
              {options.map((opt) => (
                <SelectItem key={opt} value={opt} className="text-xs hover:bg-primary/20">
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7 text-red-500 hover:text-red-400 hover:bg-red-500/10"
            onClick={handleCancel}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      );
    }

    return (
      <div className={cn("flex flex-col gap-2 w-full relative", className)} style={style}>
        <div className="flex items-start gap-2 w-full">
          <div className="flex-1 relative">
            {type === "textarea" ? (
              <>
                <Textarea
                  ref={textareaRef}
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  className={cn("text-xs bg-gray-800 border-primary/30 min-h-[120px] pr-10", inputClassName)}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Escape") handleCancel();
                  }}
                />
                
                {/* Smile Emoji Button absolute inside the textarea */}
                {showEmojis && (
                  <div className="absolute right-2 top-2 z-30">
                    <button
                      type="button"
                      onClick={() => setShowPicker(!showPicker)}
                      className="w-7 h-7 flex items-center justify-center rounded bg-gray-900 border border-gray-800 hover:bg-gray-700 text-white cursor-pointer active:scale-95 transition-all text-xs"
                      title="Insert Emoji"
                    >
                      😊
                    </button>
                    
                    {/* Floating Emoji Selector Panel */}
                    {showPicker && (
                      <div className="absolute right-0 top-8 bg-gray-950 border border-gray-800 rounded-xl shadow-2xl p-2 grid grid-cols-5 gap-1 z-50 w-44">
                        {EMOJIS.map((emoji) => (
                          <button
                            key={emoji}
                            type="button"
                            onClick={() => insertEmoji(emoji)}
                            className="w-7 h-7 flex items-center justify-center text-base hover:bg-white/10 rounded transition-colors cursor-pointer"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              <Input
                type={type}
                value={
                  type === "date" && String(tempValue).includes("/")
                    ? String(tempValue).split("/").reverse().join("-")
                    : tempValue
                }
                onChange={(e) => {
                  let val = e.target.value;
                  if (type === "date" && val.includes("-")) {
                    val = val.split("-").reverse().join("/");
                  }
                  setTempValue(val);
                }}
                className={cn("h-8 text-xs bg-gray-800 border-primary/30 min-w-20", inputClassName)}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSave();
                  if (e.key === "Escape") handleCancel();
                }}
              />
            )}
          </div>

          <div className="flex flex-col gap-1.5 shrink-0">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-green-500 hover:text-green-400 hover:bg-green-500/10 border border-green-500/20 bg-green-500/5"
              onClick={() => handleSave()}
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-red-500 hover:text-red-400 hover:bg-red-500/10 border border-red-500/20 bg-red-500/5"
              onClick={handleCancel}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group relative flex items-center gap-2 transition-all duration-200",
        canEdit && "cursor-pointer hover:bg-white/5 rounded px-1 -mx-1",
        className
      )}
      style={style}
      onClick={() => canEdit && editTrigger === "click" && setIsEditing(true)}
      onDoubleClick={() => canEdit && editTrigger === "doubleClick" && setIsEditing(true)}
    >
      <span className={cn(
        type !== "textarea" && "truncate",
        type === "textarea" && "whitespace-pre-wrap"
      )}>{value}</span>
      {canEdit && !hideIcon && (
        <PencilIcon className="h-3 w-3 opacity-0 group-hover:opacity-100 text-primary transition-opacity" />
      )}
    </div>
  );
};
