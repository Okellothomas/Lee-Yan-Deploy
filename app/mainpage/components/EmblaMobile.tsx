// 'use client'
// import React, { useCallback, useEffect, useState } from 'react';
// import useEmblaCarousel from 'embla-carousel-react';
// import Autoplay from 'embla-carousel-autoplay';
// import Image, { StaticImageData } from 'next/image';
// import imageone from '../../public/images/apply.jpg';
// import { CiCircleChevLeft } from 'react-icons/ci';
// import { CiCircleChevRight } from 'react-icons/ci';
// import { FiArrowRightCircle } from 'react-icons/fi';
// import './embla.css';
// import "./mobilecarouse.css";
// import Link from 'next/link';

// interface CardData {
//   image: StaticImageData;
//   title: string;
//   country: string;
//   description: string;
// }

// interface EmblaCarouselProps {
//   cardsData: CardData[];
// }

// const EmblaMobile: React.FC<EmblaCarouselProps> = ({ cardsData }) => {
//   const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
//   const [selectedIndex, setSelectedIndex] = useState(0);

//   const scrollPrev = useCallback(() => {
//     if (emblaApi) emblaApi.scrollPrev();
//   }, [emblaApi]);

//   const scrollNext = useCallback(() => {
//     if (emblaApi) emblaApi.scrollNext();
//   }, [emblaApi]);

//   useEffect(() => {
//     if (!emblaApi) return;

//     const onSelect = () => {
//       setSelectedIndex(emblaApi.selectedScrollSnap());
//     };

//     onSelect(); // Set initial selected index

//     emblaApi.on('select', onSelect);

//     return () => {
//       if (emblaApi) {
//         emblaApi.off('select', onSelect);
//       }
//     };
//   }, [emblaApi, setSelectedIndex]);

//   // Chunk the cardsData array into groups of three
//   const chunkedCardsData = cardsData.reduce((acc, _, index, array) => {
//     if (index % 3 === 0) {
//       acc.push(array.slice(index, index + 3));
//     }
//     return acc;
//   }, [] as CardData[][]);

//   return (
//     <div className="embla">
//       <div className="embla__viewport" ref={emblaRef}>
//         <div className="embla__container">
//           {chunkedCardsData.map((slide, slideIndex) => (
//             <div key={slideIndex} className="embla__slide grid grid-cols-3 gap-4">
//               {slide.map((card, cardIndex) => (
//                 <div key={cardIndex} className={`grid-cols-1 pb-4 relative ${cardIndex % 2 === 0 ? 'even-card' : 'odd-card'}`}>
//                   <div className="h-[25vh] caro-sel image-carousel-o mx-auto shadow-lg rounded-lg mb-4 relative">
//                     <div className="overlay inset-0 image-main-gb rounded-xl"></div>
//                     <Image src={card.image} alt="Image" className="image-carousel shadow-md rounded-xl object-cover" />
//                   </div>
//                   <div className="relative flex justify-between  embla-last z-10">
//                     <div>
//                     <p className="text-lg font-bold pb-2">{card.country}</p>
//                     <p className="text-sm flex pb-4 gap-4">
//                       {card.description}
//                       {/* <span><Link href="/" className='text-black'><FiArrowRightCircle size={19} /></Link></span> */}
//                     </p>
//                     <Link href="/" className='caroe-embla-link px-5 py-2 text-sm shadow-md rounded-3xl'>Explore</Link>
//                     </div>
//                     <Image src={card.image} alt="Image" className="image-carousel image-carousel-t shadow-lg rounded-lg object-cover" />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="embla__dots">
//         {chunkedCardsData.map((_, index) => (
//           <button
//             key={index}
//             className={`embla__dot ${index === selectedIndex ? 'embla__dot--selected' : ''}`}
//             onClick={() => emblaApi && emblaApi.scrollTo(index * 3)}
//           />
//         ))}
//       </div>
//       <button className="embla__prev text-black pt-3" onClick={scrollPrev}>
//         <CiCircleChevLeft size={32} />
//       </button>
//       <button className="embla__next text-black pt-3" onClick={scrollNext}>
//         <CiCircleChevRight size={32} />
//       </button>
//     </div>
//   );
// };

// export default EmblaMobile;

'use client'

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { CiCircleChevLeft, CiCircleChevRight } from 'react-icons/ci';
import './embla.css';
import './mobilecarouse.css';
import useCountries from '@/app/hooks/useCountries';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { safeReservation, SafeUser, safeOffer } from '@/app/types';

interface ListingCardProps {
  data: safeOffer[] | safeOffer;
  reservation?: safeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const EmblaMobile: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    onSelect(); // Set initial selected index

    emblaApi.on('select', onSelect);

    return () => {
      if (emblaApi) {
        emblaApi.off('select', onSelect);
      }
    };
  }, [emblaApi, setSelectedIndex]);

  // Chunk the data array into groups of three
  const chunkedData = Array.isArray(data)
    ? data.reduce((acc, _, index, array) => {
        if (index % 3 === 0) {
          acc.push(array.slice(index, index + 3));
        }
        return acc;
      }, [] as safeOffer[][])
    : [];

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {chunkedData.map((slide, slideIndex) => (
            <div key={slideIndex} className="embla__slide grid grid-cols-3 gap-4">
              {slide.map((offer, cardIndex) => (
                <div key={cardIndex} className={`grid-cols-1 pb-4 relative ${cardIndex % 2 === 0 ? 'even-card' : 'odd-card'}`}>
                  <div className="h-[25vh] caro-sel image-carousel-o mx-auto shadow-lg rounded-lg mb-4 relative">
                    <div className="overlay inset-0 image-main-gb rounded-xl"></div>
                    <Image src={offer.imageSrc[0]} width={600} height={400} alt="Image" className="image-carousel shadow-md rounded-xl object-cover" />
                  </div>
                  <div className="relative flex justify-between embla-last z-10">
                    <div>
                      <p className="text-lg font-bold pb-2">{offer.title}</p>
                      <p className="text-sm flex pb-4 gap-4">
                        {offer.action}
                      </p>
                      <button
                        onClick={() => router.push(`/offer/${offer.id}`)}
                        className='caroe-embla-link px-5 py-2 text-sm shadow-md rounded-3xl'
                      >
                        Explore
                      </button>
                    </div>
                    <Image src={offer.imageSrc[0]} width={100} height={100} alt="Image" className="image-carousel image-carousel-t shadow-lg rounded-lg object-cover" />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="embla__dots">
        {chunkedData.map((_, index) => (
          <button
            key={index}
            className={`embla__dot ${index === selectedIndex ? 'embla__dot--selected' : ''}`}
            onClick={() => emblaApi && emblaApi.scrollTo(index * 3)}
          />
        ))}
      </div>
      <button className="embla__prev text-black pt-3" onClick={scrollPrev}>
        <CiCircleChevLeft size={32} />
      </button>
      <button className="embla__next text-black pt-3" onClick={scrollNext}>
        <CiCircleChevRight size={32} />
      </button>
    </div>
  );
};

export default EmblaMobile;

// 'use client'

// import React, { useCallback, useEffect, useState } from 'react';
// import useEmblaCarousel from 'embla-carousel-react';
// import Image from 'next/image';
// import { CiCircleChevLeft, CiCircleChevRight } from 'react-icons/ci';
// import './embla.css';
// import './mobilecarouse.css';
// import useCountries from '@/app/hooks/useCountries';
// import { useRouter } from 'next/navigation';
// import { format } from 'date-fns';
// import { safeReservation, SafeUser, safeOffer } from '@/app/types';

// interface ListingCardProps {
//   data: safeOffer;
//   reservation?: safeReservation;
//   onAction?: (id: string) => void;
//   disabled?: boolean;
//   actionLabel?: string;
//   actionId?: string;
//   currentUser?: SafeUser | null;
// }

// const EmblaMobile: React.FC<ListingCardProps> = ({
//   data,
//   reservation,
//   onAction,
//   disabled,
//   actionLabel,
//   actionId = "",
//   currentUser
// }) => {
//   const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const router = useRouter();

//   const scrollPrev = useCallback(() => {
//     if (emblaApi) emblaApi.scrollPrev();
//   }, [emblaApi]);

//   const scrollNext = useCallback(() => {
//     if (emblaApi) emblaApi.scrollNext();
//   }, [emblaApi]);

//   useEffect(() => {
//     if (!emblaApi) return;

//     const onSelect = () => {
//       setSelectedIndex(emblaApi.selectedScrollSnap());
//     };

//     onSelect(); // Set initial selected index

//     emblaApi.on('select', onSelect);

//     return () => {
//       if (emblaApi) {
//         emblaApi.off('select', onSelect);
//       }
//     };
//   }, [emblaApi, setSelectedIndex]);

//   const [cardsData, setCardsData] = useState<ListingCardProps[]>([]);

//   // Fetch data dynamically from the database
//   const fetchData = async () => {
//     try {
//       const response = await fetch('/api/offer');
//       const data = await response.json();
//       setCardsData(data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Chunk the cardsData array into groups of three
//   const chunkedCardsData = cardsData.reduce((acc, _, index, array) => {
//     if (index % 3 === 0) {
//       acc.push(array.slice(index, index + 3));
//     }
//     return acc;
//   }, [] as ListingCardProps[][]);

//   return (
//     <div className="embla">
//       <div className="embla__viewport" ref={emblaRef}>
//         <div className="embla__container">
//           {chunkedCardsData.map((slide, slideIndex) => (
//             <div key={slideIndex} className="embla__slide grid grid-cols-3 gap-4">
//               {slide.map((card, cardIndex) => (
//                 <div key={cardIndex} className={`grid-cols-1 pb-4 relative ${cardIndex % 2 === 0 ? 'even-card' : 'odd-card'}`}>
//                   <div className="h-[25vh] caro-sel image-carousel-o mx-auto shadow-lg rounded-lg mb-4 relative">
//                     <div className="overlay inset-0 image-main-gb rounded-xl"></div>
//                     <Image src={card.data.imageSrc[0]} alt="Image" className="image-carousel shadow-md rounded-xl object-cover" />
//                   </div>
//                   <div className="relative flex justify-between embla-last z-10">
//                     <div>
//                       <p className="text-lg font-bold pb-2">{card.data.days}</p>
//                       <p className="text-sm flex pb-4 gap-4">
//                         {card.data.inclusion[0]}
//                       </p>
//                       <button
//                         onClick={() => router.push(`/offer/${card.data.id}`)}
//                         className='caroe-embla-link px-5 py-2 text-sm shadow-md rounded-3xl'
//                       >
//                         Explore
//                       </button>
//                     </div>
//                     <Image src={card.data.imageSrc[0]} alt="Image" className="image-carousel image-carousel-t shadow-lg rounded-lg object-cover" />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="embla__dots">
//         {chunkedCardsData.map((_, index) => (
//           <button
//             key={index}
//             className={`embla__dot ${index === selectedIndex ? 'embla__dot--selected' : ''}`}
//             onClick={() => emblaApi && emblaApi.scrollTo(index * 3)}
//           />
//         ))}
//       </div>
//       <button className="embla__prev text-black pt-3" onClick={scrollPrev}>
//         <CiCircleChevLeft size={32} />
//       </button>
//       <button className="embla__next text-black pt-3" onClick={scrollNext}>
//         <CiCircleChevRight size={32} />
//       </button>
//     </div>
//   );
// };

// export default EmblaMobile;
