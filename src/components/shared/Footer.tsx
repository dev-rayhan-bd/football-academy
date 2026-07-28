'use client'

import { Twitter, Instagram, Linkedin, Youtube } from 'lucide-react'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-900 via-[#063D1C] to-slate-950 border-t border-gray-800">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-4 gap-12">
          {/* Left Section - Logo & Description */}
          <div className="col-span-1">
            <div className="flex items-start gap-3 mb-6">
              {/* <div className="w-12 h-12 bg-gradient-to-br from-primary to-green-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                K10
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">K10 FOOTBALL</h3>
                <p className="text-primary text-xs">ANALYSIS CV</p>
              </div> */}
              <Image src="/logo.png" className='-ml-5' alt="K10 Football Logo" width={300} height={200} />
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              The world&apos;s first validated football network connecting players, coaches, and clubs through verified achievements and AI-powered matching.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              <a href="#" className="text-gray-300 hover:text-primary transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold text-sm mb-6">Platform</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-primary text-sm transition">
                  For Players
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary text-sm transition">
                  For Coaches
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary text-sm transition">
                  For Academies
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary text-sm transition">
                  For Agent
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary text-sm transition">
                  For Clubs
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold text-sm mb-6">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-primary text-sm transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary text-sm transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary text-sm transition">
                  Success Stories
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary text-sm transition">
                  API Docs
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold text-sm mb-6">Company</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-primary text-sm transition">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary text-sm transition">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary text-sm transition">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary text-sm transition">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-center">
          <p className="text-white text-sm">
            © 2025 K10 Football. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
