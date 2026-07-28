import React from 'react'
import { Button } from '../ui/button'

const ButtonGradient = ({text, className}:{text:string, className?: string}) => {
  return (
    <Button className={`bg-gradient-to-b from-green-gradient-from cursor-pointer to-green-gradient-to text-white  ${className || ''}`}>{text}</Button>
  )
}

export default ButtonGradient