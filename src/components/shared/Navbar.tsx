'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ChevronDown, Globe, Menu } from 'lucide-react'
import Image from 'next/image'
import ButtonPrimary from './ButtonPrimary'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathName = usePathname();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services'},
    { label: 'CVs', href: '/cvs-page'},
    { label: 'K10 Plans', href: 'k10plans'},
    { label: 'About', href: '/about'},
  ]

  return (
    <nav className="bg-[#080808]">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={"/"} className="flex items-center gap-3">
            <Image src="/logo.png" alt="K10 Football Logo" width={200} height={200} />
          </Link>

          {/* Center Navigation - Hidden on mobile */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm transition hover:text-green-400 hover:font-medium hover:border-b-2 hover:border-green-400 pb-1 ${link.href === pathName? "text-green-400 font-medium border-b-2 border-green-400 pb-1": ""}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 lg:gap-4">
            <button className="hidden lg:flex items-center gap-1 text-gray-300 hover:text-white transition">
              <Globe className="w-4 h-4" />
              <span className="text-sm">EN</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            <Link href="/login">
              <Button variant="ghost" className="hidden lg:block cursor-pointer hover:shadow-sm shadow-primary text-gray-300 hover:text-white hover:bg-transparent">
                Login
              </Button>
            </Link>
            <ButtonPrimary text="Join Now"  />

            {/* Mobile Menu Button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <button  className="text-gray-300 hover:text-white hover:bg-transparent">
                  <Menu className="w-8 h-8" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 bg-[#1a1a1a] border-gray-700">
                <div className="flex flex-col gap-6 ">
                  <div className='-ml-5 px-6 pt-3'>
                    <Logo />
                  </div>
                  {/* Mobile Navigation Links */}
                  <div className="flex flex-col gap-4 px-6">
                    {navLinks.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`text-sm font-medium transition`}
                      >
                        <Button className='w-full bg-gray-800 hover:bg-green-500'>
                          {link.label}
                        </Button>
                      </Link>
                    ))}
                  </div>

                  {/* Mobile Language Selector */}
                  <div className="flex items-center gap-2 text-gray-300 hover:text-white transition text-sm px-6">
                    <Button className='mx-auto bg-gray-800'>
                      <Globe className="w-4 h-4" />
                    <span>EN</span>
                    <ChevronDown className="w-3 h-3" />
                    </Button>
                  </div>

                  {/* Mobile Action Buttons */}
                  <div className="flex flex-col gap-3 pt-4 border-t border-gray-700 px-6">
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full bg-transparent border-gray-600 hover:bg-green-500 justify-center text-gray-300 hover:text-white">
                        Login
                      </Button>
                    </Link>
                    <ButtonPrimary text="Join Now" className="w-full" />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}


export const Logo = () => {
  return (
    <div className="flex items-center gap-3">
        <Image src="/logo.png" alt="K10 Football Logo" width={200} height={200} />
    </div>
  )
}