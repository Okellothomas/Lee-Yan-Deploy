// 'use client'
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { images } from "@/utils/constants";

// const Carousel = () => {
//     // Initialize current state to 0
//     let [current, setCurrent] = useState(0);

//     const nextSlide = () => {
//         setCurrent((current + 1) % images.length);
//     }

//     useEffect(() => {
//         const timer = setInterval(() => {
//             nextSlide();
//         }, 9000000000000000); // 1 second interval for image transition

//         // Clear the interval when the component unmounts
//         return () => clearInterval(timer);
//     }, [current, nextSlide]);

//     // Check if the last image is reached and reset to the first one
//     useEffect(() => {
//         if (current === images.length - 1) {
//             setCurrent(0);
//         }
//     }, [current]);

//     // Determine the indices of the images to render
//     const renderIndices = [current, (current + 1) % images.length];

//     return (
//         <div>
//             <div className="carousel-container">
//                 <div className="flex transition ease-out duration-4 carousel-images-main">
//                     {renderIndices.map((index) => (
//                         <div className="block w-full sm:h-[80vh] md:h-[80vh] lg:h-[80vh] xl:h-[80vh] 2xl:h-[80vh] max-2xl:h-[80vh] object-over transition-opacity duration-1000 ease-in-out" key={index}>
//                             {/* Add a div for the overlay */}
//                             {/* <div className="overlay absolute inset-0 bg-black bg-opacity-15"></div> */}
//                             <Image
//                                 // src={images[0].src}
//                                 src="https://res.cloudinary.com/doamgn1l0/image/upload/v1718981750/rfurliahfselsnn86h3g.jpg"
//                                 // src={images[index].src}
//                                 fill={true}
//                                 layout="fill"
//                                 className="carousel-images w-full object-cover"
//                                 alt=""
//                             />
//                             {/* <div className="overlay carousel-images absolute inset-0 bg-black bg-opacity-20"></div> */}
//                             <div className="overlay carousel-images absolute inset-0"></div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Carousel;
'use client'
import Image from "next/image";

const Carousel = () => {
    return (
        <div>
            <div className="carousel-container">
                {/* <div className="carousel-container"></div> */}
                <div className="flex transition ease-out duration-4 carousel-images-main">
                    {/* <div className="flex transition ease-out duration-4 carousel-images-main"></div> */}
                    <div className="block w-full sm:h-[30vh] md:h-[80vh] lg:h-[80vh] xl:h-[80vh] 2xl:h-[80vh] max-2xl:h-[80vh] object-over transition-opacity duration-1000 ease-in-out">
                        {/* <div className="block w-full sm:h-[30vh] md:h-[80vh] lg:h-[80vh] xl:h-[80vh] 2xl:h-[80vh] max-2xl:h-[80vh] object-over transition-opacity duration-1000 ease-in-out"></div> */}
                        <Image
                            src="https://res.cloudinary.com/doamgn1l0/image/upload/v1718981750/rfurliahfselsnn86h3g.jpg"
                            fill={true}
                            layout="fill"
                            className="carousel-images w-full object-cover"
                            // className="carousel-images w-full object-cover"
                            alt=""
                        />
                        <div className="overlay carousel-images absolute inset-0"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Carousel;

