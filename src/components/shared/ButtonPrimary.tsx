import React from 'react'
import { Button } from '../ui/button'

const ButtonPrimary = ({text, className}:{text:string, className?: string}) => {
  return (
    <Button className={`!bg-primary text-black cursor-pointer  px-5  ${className || ''}`}>{text}</Button>
  )
}

export default ButtonPrimary