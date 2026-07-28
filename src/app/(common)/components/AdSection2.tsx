import image from "@/assets/home/adSection2.png"
import Image from 'next/image'

const AdSection2 = () => {
  return (
    <div className="w-full bg-black py-16">
      <div className="container mx-auto px-4">
        <Image src={image} alt="Ad Section Image" className="w-full h-auto rounded-lg mb-8" />
      </div>
    </div>
  )
}

export default AdSection2