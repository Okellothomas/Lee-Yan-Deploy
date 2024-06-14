// import { Metadata } from "next";
// import EmptyState from "@/app/components/container/EmptyState";
// import TourMainCard from "@/app/components/listing/TourMainCard";
// import Container from "@/app/components/container/Container";
// import Sort from "./components/Sort";
// import Contients from "./components/Continents";
// import TourStyles from "./components/TourStyles";
// import TourOperators from "./components/TourOperators";
// import TourSize from "./components/TourSize";
// import Link from "next/link";
// import getTours, {IToursParams} from "@/app/actions/getTours";
// import getCurrentUser from "@/app/actions/getCurrentUsers";
// import getListings, {IListingsParams} from "@/app/actions/getListings";
// import StayMainCard from "@/app/components/listing/StayMainCard";

// // Define the interface for component props
// interface IParams {
//   tourId?: string;
//   tourParams: IListingsParams;
// }

// export const metadata: Metadata =  {
//   title: "Nairobi stays",
// }
// // Define the AllDestinationsPage component as a server component
// export default function AllDestinationsPage({ tourParams }: IParams) {
//   // Fetch data inside the render function (server component behavior)
//   const getToursAndRender = async () => {
//     const tours = await getListings(tourParams);
//     const currentUser = await getCurrentUser(); 
//     const listingsPremium = tours.filter(listing => listing.county && listing.county.toLowerCase() === "kajiado".toLowerCase());
    
//     const PAGE_SIZE = 15;
//     const currentPage = 1;
//     const startIndex = (currentPage - 1) * PAGE_SIZE;
//     const visibleTours = listingsPremium.slice(startIndex, startIndex + PAGE_SIZE);

//     const products: any = [];

//     // Check if there are no listings, display EmptyState component
//     if (visibleTours.length === 0) {
//       return <EmptyState showReset />;
//     }

//     const totalPages = Math.ceil(tours.length / PAGE_SIZE);

//     return (
//       <div>
//         <div className="alldestinations-main flex flex-col items-center justify-center text-lg font-bold">
//           <h1 className="alldestinations-white-main">
//             <span className="text-white">Stays in Nairobi</span>
//           </h1>
//         </div>
//         <Container>
//           <div className="flex flex-row justify-between items-center pt-10 pb-3">
//             <div className="flex font-bold flex-row gap-40 items-center">
//               <div className="items-center py-2 pl-2 pr-6 sm:pr-1 text-start all-destination-filter">
//                 <p className="">Filter Results:</p>
//               </div>
//               <div className="font-semibold text-xl">{visibleTours.length} Properties</div>
//             </div>
//             <div>
//               <Sort products={products} />
//             </div>
//           </div>
//         </Container>
//         <Container>
//           <div className="pt-0 items-start grid grid-cols-5 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-8">
//             <div className="col-span-1 flex flex-col gap-6 all-destination-products">
//               <Contients products={products} />
//               <TourStyles products={products} />
//               <TourOperators products={products} />
//               <TourSize products={products}/>
//             </div>
//             <div className="col-span-4 all-destination-tour-main-card">
//               <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-8 all-destination-tours">
//                 {/* Map through the visible listings array and render ListingCard components */}
//                 {visibleTours.map((tour: any) => (
//                   <StayMainCard
//                     currentUser={currentUser ? {
//                       ...currentUser,
//                       createdAt: currentUser.createdAt.toISOString(),
//                       updatedAt: currentUser.updatedAt.toISOString(),
//                       emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toISOString() : null
//                     } : null} // Pass the current user to each ListingCard
//                     key={tour.id} // Use the listing ID as the unique key
//                     data={tour} // Pass the listing data to each ListingCard
//                   />
//                 ))}
//               </div>
//               {/* Pagination */}
//               <div className="flex justify-center items-center mt-4">
//                 {currentPage > 1 && (
//                   <Link href={`/alldestinations?page=${currentPage - 1}`}>
//                     <p className="mx-2 p-2 bg-gray-500 text-white">Previous</p>
//                   </Link>
//                 )}
//                 {Array.from({ length: totalPages }).map((_, index) => (
//                   <Link key={index} href={`/alldestinations?page=${index + 1}`}>
//                     <p className={`mx-2 p-2 ${currentPage === index + 1 ? "bg-gray-500 text-white" : "bg-gray-300"}`}>
//                       {index + 1}
//                     </p>
//                   </Link>
//                 ))}
//                 {currentPage < totalPages && (
//                   <Link href={`/alldestinations?page=${currentPage + 1}`}>
//                     <p className="mx-2 p-2 bg-gray-500 text-white">Next</p>
//                   </Link>
//                 )}
//               </div>
//             </div>
//           </div>
//         </Container>
//       </div>
//     );
//   };

//   // Return the result of the render function
//   return getToursAndRender();
// }
// 'use client'
import React from "react";
import { Metadata } from "next";
import EmptyState from "@/app/components/container/EmptyState";
import StayMainCard from "@/app/components/listing/StayMainCard";
import Container from "@/app/components/container/Container";
import Sort from "./components/Sort";
import Continents from "./components/Continents";
import TourStyles from "./components/TourStyles";
import TourOperators from "./components/TourOperators";
import TourSize from "./components/TourSize";
import Link from "next/link";
import getCurrentUser from "@/app/actions/getCurrentUsers";
import getListings, { IListingsParams } from "@/app/actions/getListings";
// import { useSearchParams } from 'next/navigation';

interface IParams {
  tourId?: string;
  tourParams: IListingsParams;
  county?: string; // Make county optional
}

export default function Stay({ tourParams, county, tourId }: IParams) {

  // const searchParams = useSearchParams();

  // const county = searchParams ? searchParams.get('county') : null;

  console.log("the county our country we should have it", county);
  console.log("the county our country we should have it", tourId);

  const getToursAndRender = async () => {
    const tours = await getListings(tourParams);
    const currentUser = await getCurrentUser();
    const normalizedCounty = county ? county.toLowerCase() : ""; // Normalize county safely
    console.log("normalizedCounty: ", normalizedCounty);
    const listingsPremium = tours.filter(listing => listing.county && listing.county.toLowerCase() === normalizedCounty);

    const PAGE_SIZE = 15;
    const currentPage = 1;
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const visibleTours = listingsPremium.slice(startIndex, startIndex + PAGE_SIZE);

    const products: any = [];

    if (visibleTours.length === 0) {
      return <EmptyState showReset />;
    }

    const totalPages = Math.ceil(tours.length / PAGE_SIZE);

    return (
      <div>
        <div className="alldestinations-main flex flex-col items-center justify-center text-lg font-bold">
          <h1 className="alldestinations-white-main">
            <span className="text-white">Stays in {county || "Nairobi"}</span>
          </h1>
        </div>
        <Container>
          <div className="flex flex-row justify-between items-center pt-10 pb-3">
            <div className="flex font-bold flex-row gap-40 items-center">
              <div className="items-center py-2 pl-2 pr-6 sm:pr-1 text-start all-destination-filter">
                <p className="">Filter Results:</p>
              </div>
              <div className="font-semibold text-xl">{visibleTours.length} Properties</div>
            </div>
            <div>
              <Sort products={products} />
            </div>
          </div>
        </Container>
        <Container>
          <div className="pt-0 items-start grid grid-cols-5 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-8">
            <div className="col-span-1 flex flex-col gap-6 all-destination-products">
              <Continents products={products} />
              <TourStyles products={products} />
              <TourOperators products={products} />
              <TourSize products={products} />
            </div>
            <div className="col-span-4 all-destination-tour-main-card">
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-8 all-destination-tours">
                {visibleTours.map((tour: any) => (
                  <StayMainCard
                    currentUser={currentUser ? {
                      ...currentUser,
                      createdAt: currentUser.createdAt.toISOString(),
                      updatedAt: currentUser.updatedAt.toISOString(),
                      emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toISOString() : null
                    } : null}
                    key={tour.id}
                    data={tour}
                  />
                ))}
              </div>
              <div className="flex justify-center items-center mt-4">
                {currentPage > 1 && (
                  <Link href={`/stay?page=${currentPage - 1}&county=${county}`}>
                    <p className="mx-2 p-2 bg-gray-500 text-white">Previous</p>
                  </Link>
                )}
                {Array.from({ length: totalPages }).map((_, index) => (
                  <Link key={index} href={`/stay?page=${index + 1}&county=${county}`}>
                    <p className={`mx-2 p-2 ${currentPage === index + 1 ? "bg-gray-500 text-white" : "bg-gray-300"}`}>
                      {index + 1}
                    </p>
                  </Link>
                ))}
                {currentPage < totalPages && (
                  <Link href={`/stay?page=${currentPage + 1}&county=${county}`}>
                    <p className="mx-2 p-2 bg-gray-500 text-white">Next</p>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  };

  return getToursAndRender();
}



// import { Metadata } from "next";
// import EmptyState from "@/app/components/container/EmptyState";
// import StayMainCard from "@/app/components/listing/StayMainCard";
// import Container from "@/app/components/container/Container";
// import Sort from "./components/Sort";
// import Contients from "./components/Continents";
// import TourStyles from "./components/TourStyles";
// import TourOperators from "./components/TourOperators";
// import TourSize from "./components/TourSize";
// import Link from "next/link";
// import getTours, { IToursParams } from "@/app/actions/getTours";
// import getCurrentUser from "@/app/actions/getCurrentUsers";
// import getListings, { IListingsParams } from "@/app/actions/getListings";

// interface IParams {
//   tourId?: string;
//   tourParams: IListingsParams;
//   county?: string; // Add county prop
// }

// export const metadata: Metadata = {
//   title: "Nairobi stays",
// };

// export default function AllDestinationsPage({ tourParams, county }: IParams) {
//   const getToursAndRender = async () => {
//     const tours = await getListings(tourParams);
//     const currentUser = await getCurrentUser();
//     const listingsPremium = tours.filter(
//       (listing) => listing.county && listing.county.toLowerCase() === county?.toLowerCase()
//     );


//     console.log("Main county", county)

//     const PAGE_SIZE = 15;
//     const currentPage = 1;
//     const startIndex = (currentPage - 1) * PAGE_SIZE;
//     const visibleTours = listingsPremium.slice(startIndex, startIndex + PAGE_SIZE);

//     const products: any = [];

//     if (visibleTours.length === 0) {
//       return <EmptyState showReset />;
//     }

//     const totalPages = Math.ceil(tours.length / PAGE_SIZE);

//     return (
//       <div>
//         <div className="alldestinations-main flex flex-col items-center justify-center text-lg font-bold">
//           <h1 className="alldestinations-white-main">
//             <span className="text-white">Stays in {county}</span>
//           </h1>
//         </div>
//         <Container>
//           <div className="flex flex-row justify-between items-center pt-10 pb-3">
//             <div className="flex font-bold flex-row gap-40 items-center">
//               <div className="items-center py-2 pl-2 pr-6 sm:pr-1 text-start all-destination-filter">
//                 <p className="">Filter Results:</p>
//               </div>
//               <div className="font-semibold text-xl">{visibleTours.length} Properties</div>
//             </div>
//             <div>
//               <Sort products={products} />
//             </div>
//           </div>
//         </Container>
//         <Container>
//           <div className="pt-0 items-start grid grid-cols-5 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-8">
//             <div className="col-span-1 flex flex-col gap-6 all-destination-products">
//               <Contients products={products} />
//               <TourStyles products={products} />
//               <TourOperators products={products} />
//               <TourSize products={products} />
//             </div>
//             <div className="col-span-4 all-destination-tour-main-card">
//               <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-8 all-destination-tours">
//                 {visibleTours.map((tour: any) => (
//                   <StayMainCard
//                     currentUser={currentUser ? {
//                       ...currentUser,
//                       createdAt: currentUser.createdAt.toISOString(),
//                       updatedAt: currentUser.updatedAt.toISOString(),
//                       emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toISOString() : null
//                     } : null}
//                     key={tour.id}
//                     data={tour}
//                   />
//                 ))}
//               </div>
//               <div className="flex justify-center items-center mt-4">
//                 {currentPage > 1 && (
//                   <Link href={`/stay?county=${county}&page=${currentPage - 1}`}>
//                     <p className="mx-2 p-2 bg-gray-500 text-white">Previous</p>
//                   </Link>
//                 )}
//                 {Array.from({ length: totalPages }).map((_, index) => (
//                   <Link key={index} href={`/stay?county=${county}&page=${index + 1}`}>
//                     <p className={`mx-2 p-2 ${currentPage === index + 1 ? "bg-gray-500 text-white" : "bg-gray-300"}`}>
//                       {index + 1}
//                     </p>
//                   </Link>
//                 ))}
//                 {currentPage < totalPages && (
//                   <Link href={`/stay?county=${county}&page=${currentPage + 1}`}>
//                     <p className="mx-2 p-2 bg-gray-500 text-white">Next</p>
//                   </Link>
//                 )}
//               </div>
//             </div>
//           </div>
//         </Container>
//       </div>
//     );
//   };

//   return getToursAndRender();
// }


// import { Metadata } from "next";
// import EmptyState from "@/app/components/container/EmptyState";
// import StayMainCard from "@/app/components/listing/StayMainCard";
// import Container from "@/app/components/container/Container";
// import Sort from "./components/Sort";
// import Contients from "./components/Continents";
// import TourStyles from "./components/TourStyles";
// import TourOperators from "./components/TourOperators";
// import TourSize from "./components/TourSize";
// import Link from "next/link";
// import getTours, { IToursParams } from "@/app/actions/getTours";
// import getCurrentUser from "@/app/actions/getCurrentUsers";
// import getListings, { IListingsParams } from "@/app/actions/getListings";
// import { useSearchParams } from 'next/navigation';

// interface IParams {
//   tourId?: string;
//   tourParams: IListingsParams;
// }

// export const metadata: Metadata = {
//   title: "Nairobi stays",
// }

// const PAGE_SIZE = 15;

// const AllDestinationsPage: React.FC<IParams> = ({ tourParams }) => {
//   const searchParams = useSearchParams();
//   const county = searchParams ? searchParams.get('county') : null;
  
//   console.log("No county found", county);

//   const getToursAndRender = async () => {

  

//     const tours = await getListings(tourParams);
//     const currentUser = await getCurrentUser();

//     const listingsPremium = tours.filter(listing => listing.county && listing.county.toLowerCase() === (county as string).toLowerCase());
//     const currentPage = 1;
//     const startIndex = (currentPage - 1) * PAGE_SIZE;
//     const visibleTours = listingsPremium.slice(startIndex, startIndex + PAGE_SIZE);

//     const products: any = [];

//     if (visibleTours.length === 0) {
//       return <EmptyState showReset />;
//     }

//     const totalPages = Math.ceil(listingsPremium.length / PAGE_SIZE);

//     return (
//       <div>
//         <div className="alldestinations-main flex flex-col items-center justify-center text-lg font-bold">
//           <h1 className="alldestinations-white-main">
//             <span className="text-white">Stays in {county}</span>
//           </h1>
//         </div>
//         <Container>
//           <div className="flex flex-row justify-between items-center pt-10 pb-3">
//             <div className="flex font-bold flex-row gap-40 items-center">
//               <div className="items-center py-2 pl-2 pr-6 sm:pr-1 text-start all-destination-filter">
//                 <p className="">Filter Results:</p>
//               </div>
//               <div className="font-semibold text-xl">{visibleTours.length} Properties</div>
//             </div>
//             <div>
//               <Sort products={products} />
//             </div>
//           </div>
//         </Container>
//         <Container>
//           <div className="pt-0 items-start grid grid-cols-5 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-8">
//             <div className="col-span-1 flex flex-col gap-6 all-destination-products">
//               <Contients products={products} />
//               <TourStyles products={products} />
//               <TourOperators products={products} />
//               <TourSize products={products} />
//             </div>
//             <div className="col-span-4 all-destination-tour-main-card">
//               <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-8 all-destination-tours">
//                 {visibleTours.map((tour: any) => (
//                   <StayMainCard
//                     currentUser={currentUser ? {
//                       ...currentUser,
//                       createdAt: currentUser.createdAt.toISOString(),
//                       updatedAt: currentUser.updatedAt.toISOString(),
//                       emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toISOString() : null
//                     } : null}
//                     key={tour.id}
//                     data={tour}
//                   />
//                 ))}
//               </div>
//               <div className="flex justify-center items-center mt-4">
//                 {currentPage > 1 && (
//                   <Link href={`/stay?county=${county}&page=${currentPage - 1}`}>
//                     <p className="mx-2 p-2 bg-gray-500 text-white">Previous</p>
//                   </Link>
//                 )}
//                 {Array.from({ length: totalPages }).map((_, index) => (
//                   <Link key={index} href={`/stay?county=${county}&page=${index + 1}`}>
//                     <p className={`mx-2 p-2 ${currentPage === index + 1 ? "bg-gray-500 text-white" : "bg-gray-300"}`}>
//                       {index + 1}
//                     </p>
//                   </Link>
//                 ))}
//                 {currentPage < totalPages && (
//                   <Link href={`/stay?county=${county}&page=${currentPage + 1}`}>
//                     <p className="mx-2 p-2 bg-gray-500 text-white">Next</p>
//                   </Link>
//                 )}
//               </div>
//             </div>
//           </div>
//         </Container>
//       </div>
//     );
//   };

//   return getToursAndRender();
// };

// export default AllDestinationsPage;
