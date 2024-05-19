'use client'
import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image, { StaticImageData } from 'next/image';
import { CiCircleChevLeft, CiCircleChevRight } from 'react-icons/ci';
import { FiArrowRightCircle } from 'react-icons/fi';
import Link from 'next/link';
import './embla.css';

interface CardDatas {
  image: StaticImageData;
  title: string;
  country: string;
  description: string;
}

interface EmblaCarouselProps {
  cardsData: CardDatas[];
}

const Emblawebsite: React.FC<EmblaCarouselProps> = ({ cardsData }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [selectedIndex, setSelectedIndex] = useState(0);

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

  // Chunk the cardsData array into groups of six
  const chunkedCardsData = cardsData.reduce((acc, _, index, array) => {
    if (index % 6 === 0) {
      acc.push(array.slice(index, index + 6));
    }
    return acc;
  }, [] as CardDatas[][]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {chunkedCardsData.map((slide, slideIndex) => (
            <div key={slideIndex} className="embla__slide grid grid-cols-6 gap-4">
              {slide.map((card, cardIndex) => (
                <div key={cardIndex} className="grid-cols-1 pb-4 relative">
                  <div className="h-[20vh] w-full mx-auto shadow-lg rounded-lg mb-4 relative">
                    <Link href="/" className='text-black'>
                    <div className="overlay absolute inset-0 bg-black opacity-25 rounded-lg"></div>
                      <Image src={card.image} alt="Image" className="h-full w-full shadow-sm rounded-lg object-cover" />
                    </Link>
                  </div>
                  <div className="text-start relative">
                    <p className="text-sm text-gray-600 pb-1"><Link href="/" className='text-black'>{card.country}</Link></p>
                    <p className="text-sm text-gray-800 pb-1">
                      <Link href="/" className='text-black'>{card.description}</Link>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="embla__dots">
        {chunkedCardsData.map((_, index) => (
          <button
            key={index}
            className={`embla__dot ${index === selectedIndex ? 'embla__dot--selected' : ''}`}
            onClick={() => emblaApi && emblaApi.scrollTo(index)}
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

export default Emblawebsite;
