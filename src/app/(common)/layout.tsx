import { Footer } from '@/components/shared/Footer'
import { Navbar } from '@/components/shared/Navbar'
import React from 'react'

const Layout = ({children}: { children: React.ReactNode }) => {
  return (
    <div className='min-h-screen flex flex-col justify-between'>
        <Navbar/>
        <main className='flex-1'>{children}</main>
        <Footer/>
    </div>
  )
}

export default Layout