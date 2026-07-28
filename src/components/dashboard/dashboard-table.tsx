"use client";
import React from "react";
import { cn } from "@/lib/utils";

export interface Column<T> {
  header: string;
  key: string;
  render?: (row: T) => React.ReactNode;
  headerClassName?: string;
  cellClassName?: string;
  align?: "left" | "center" | "right";
}

interface DashboardTableProps<T> {
  columns: Column<T>[];
  data: T[];
  className?: string;
  onRowClick?: (row: T) => void;
}

export function DashboardTable<T>({ columns, data, className, onRowClick }: DashboardTableProps<T>) {
  return (
    <div className={cn("border border-white/20 rounded-2xl overflow-hidden", className)}>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-white/5 border-b border-white/20 text-[10px] font-black text-white uppercase tracking-wider">
            {columns.map((col, i) => (
              <th 
                key={col.key} 
                className={cn(
                  "px-6 py-4",
                  i !== columns.length - 1 && "border-r border-white/20",
                  col.align === "center" && "text-center",
                  col.align === "right" && "text-right",
                  col.headerClassName
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/20">
          {data.map((row, rowIndex) => (
            <tr 
              key={rowIndex} 
              onClick={() => onRowClick?.(row)}
              className={cn(
                "hover:bg-white/[0.02] transition-colors",
                onRowClick && "cursor-pointer"
              )}
            >
              {columns.map((col, colIndex) => (
                <td 
                  key={`${rowIndex}-${col.key}`} 
                  className={cn(
                    "px-6 py-5",
                    colIndex !== columns.length - 1 && "border-r border-white/20",
                    col.align === "center" && "text-center",
                    col.align === "right" && "text-right",
                    col.cellClassName
                  )}
                >
                  {col.render ? col.render(row) : (row as any)[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
