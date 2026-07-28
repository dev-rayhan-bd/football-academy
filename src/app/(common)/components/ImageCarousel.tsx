import Image, { StaticImageData } from "next/image";
import Marquee from "react-fast-marquee";
import image1 from "@/assets/home/clogo1.png"
import image2 from "@/assets/home/clogo2.png"
import image3 from "@/assets/home/clogo3.png"
import image4 from "@/assets/home/clogo4.png"
import image5 from "@/assets/home/clogo5.png"
import image6 from "@/assets/home/clogo6.png"



interface CarouselImage {
  id: number;
  src: string | StaticImageData;
  alt: string;
}

const DUMMY_IMAGES: CarouselImage[] = [
    {
        id: 1,
        src: image6,
        alt: "Club Logo 1",
    },
    {
        id: 2,
        src: image5,
        alt: "Club Logo 2",
    },
    {
        id: 3,
        src: image4,
        alt: "Club Logo 3",
    },
    {
        id: 4,
        src: image3,
        alt: "Club Logo 4",
    },
    {
        id: 5,
        src: image2,
        alt: "Club Logo 5",
    },
    {
        id: 6,
        src: image1,
        alt: "Club Logo 6",

    }
];


const ImageCarousel = () => {
  return (
    <section className="w-full bg-black py-12">
      <div className="w-full overflow-hidden">
        <Marquee speed={50} gradient gradientColor="#000000" gradientWidth={100}>
          {DUMMY_IMAGES.map((image) => (
            <div
              key={image.id}
              className="flex-shrink-0 w-60 h-32 relative bg-black flex items-center justify-center  mx-4"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={150}
                height={100}
                className="object-contain p-4"
                unoptimized
              />
            </div>
          ))}
          {DUMMY_IMAGES.map((image) => (
            <div
              key={image.id}
              className="flex-shrink-0 w-40 h-32 relative bg-black flex items-center justify-center  mx-4"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={150}
                height={100}
                className="object-contain p-4"
                unoptimized
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  )
}

export default ImageCarousel