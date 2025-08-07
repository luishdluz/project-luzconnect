"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-inner z-40">
      <div className="max-w-7xl mx-auto px-4 py-2 sm:py-3 text-center">
        <p className="text-gray-600 text-xs sm:text-sm">
          &copy; LuzConnect by luishdluz
        </p>
      </div>
    </footer>
  );
}
