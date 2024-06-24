import getCurrentUser from "../actions/getCurrentUsers";
import getListings, { IListingsParams } from "../actions/getListings";
import Container from "../components/container/Container";
import EmptyState from "../components/container/EmptyState";
import ListingCard from "../components/listing/ListingCard";
import Categories from "../components/navbar/Categories";
import Search from "../components/navbar/Search";
import Link from "next/link";
import BookingCard from "../mainpage/components/BookingCard";
import ListingValue from "../components/listing/ListingValue";
import getTours, { IToursParams } from "../actions/getTours";
import TourCard from "../components/listing/TourCard";
import getListingsHotels from "../actions/getListingsHotels";
import { Metadata } from "next";
import TourCardSecondary from "../components/listing/TourCardSecondary";
import getNews from "../aagetMethods/getNews";
import NewsCard from "../aahooks/NewsCard";
import getBlogs from "../aagetMethods/getBlogs";
import BlogsCard from "../aahooks/BlogsCard";
import getGallery from "../aagetMethods/getGallery";

// Define the interface for the Home component props
interface HotelPageProps {
    searchParams: IListingsParams; // Search parameters for fetching listings
     tourParams: IToursParams;
}

export const metadata: Metadata =  {
  title: "Gallery",
}

// Home component is defined as an asynchronous function
const DestinationPage = async ({ searchParams, tourParams }: HotelPageProps) => {
  // Fetch listings and current user asynchronously
  let currentUser: any;
    if (searchParams.userId) {
        currentUser = await getCurrentUser();
    }
  const allnews = await getNews(searchParams);
  // const lands = await getNews({ ...searchParams, category: "news", type: "Land" });
  // const property = await getNews({ ...searchParams, category: "news", type: "Property" });
  // const tours = await getTours(tourParams);
  const filteredStays = allnews.filter(listing => listing.category === "gallery" && listing.type === "Stay");
  const filteredLands = allnews.filter(listing => listing.category === "gallery" && listing.type === "Land");
  const filteredPropertys = allnews.filter(listing => listing.category === "gallery" && listing.type === "Property");
  // const filteredListings = listings.slice(0, 7);
  // const filteredTourss = tours.filter(tour => tour.tourists.length < tour.guestCount).slice(0, 20);
  // const isEmpty = true;

  // Check if there are no listings, display EmptyState component
  if (allnews.length === 0) {
    return (
      <EmptyState showReset />
    );
  }

  // Render the Home component with the fetched listings
  return (
    <div>
     <div className="all-destinations-main-news flex flex-col items-center justify-center text-lg font-bold">
        <h1 className="text-2xl mt-[52px] text-white"> Weekly Galleries </h1>
        {/* <div className="destination-search">
          <Search /> 
        </div> */}
      </div>
      <div className="pt-1 pb-5">
      {filteredStays && filteredStays.length > 0 && (
      <Container>
      <div className="mt-5 flex justify-between items-center">
              <div>
              <h1 className="mb-2 text-2xl font-semibold text-black">Stays Galleries</h1>
                <p className="text-neutral-600">Stays updated: discover the latest trends and news about our properties.</p> 
              </div>
              <div>
                <Link href={{ pathname: '/stays-', query: { type: 'luxurious' }}} className="px-4 py-1 border-[1px] rounded-lg shadow-sm border-neutral-300 border-solid hover:text-green-600">View all</Link>
            </div>
      </div>
      <div className="grid-cols-page-s pt-2 pb-2 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
        {/* Map through the listings array and render ListingCard components */}
        {filteredStays.slice(0,4).map((listing: any) => {
          return (
            <BlogsCard
              currentUser={currentUser ? {
                      ...currentUser,
                      createdAt: currentUser.createdAt.toISOString(),
                      updatedAt: currentUser.updatedAt.toISOString(),
                      emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toISOString() : null
              } : null} // Pass the current user to each ListingCard
              key={listing.id} // Use the listing ID as the unique key
              data={listing} // Pass the listing data to each ListingCard
            />
          );
        })}
        </div>
      </Container>
        )}
      </div>
      <div className="first-card-main pt-1 pb-5">
      {filteredLands && filteredLands.length > 0 && (
      <Container>
        <div className="mt-5 flex justify-between items-center">
              <div>
              <h1 className="mb-2 text-2xl font-semibold text-black">Property Galleries</h1>
                <p className="text-neutral-600">Explore property insights: Latest real estate trends and news for investors.</p> 
              </div>
              <div>
                <Link href={{ pathname: '/stays-', query: { type: 'luxurious' }}} className="px-4 py-1 border-[1px] rounded-lg shadow-sm border-neutral-300 border-solid hover:text-green-600">View all</Link>
            </div>
        </div>
        <div className="grid-cols-page-s mt-2 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
          {filteredLands.slice(0,4).map((listing: any) => {
          return (
            <BlogsCard
              currentUser={currentUser ? {
                      ...currentUser,
                      createdAt: currentUser.createdAt.toISOString(),
                      updatedAt: currentUser.updatedAt.toISOString(),
                      emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toISOString() : null
              } : null} // Pass the current user to each ListingCard
              key={listing.id} // Use the listing ID as the unique key
              data={listing} // Pass the listing data to each ListingCard
            />
          );
        })}
        </div>
      </Container>
      )}
      </div>
      
      <div className="pt-1 pb-5">
      {filteredPropertys && filteredPropertys.length > 0 && (
      <Container>
       <div className="mt-5 flex justify-between items-center">
              <div>
              <h1 className="mb-2 text-2xl font-semibold text-black">Land Galleries</h1>
                <p className="text-neutral-600">Stay informed: Discover latest land trends, opportunities, and market insights.</p> 
              </div>
              <div>
                <Link href={{ pathname: '/stays-', query: { type: 'luxurious' }}} className="px-4 py-1 border-[1px] rounded-lg shadow-sm border-neutral-300 border-solid hover:text-green-600">View all</Link>
            </div>
      </div>
      <div className="grid-cols-page-s pt-2 pb-0 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
        {/* Map through the listings array and render ListingCard components */}
        {filteredPropertys.slice(0,4).map((listing: any) => {
          return (
            <BlogsCard
              currentUser={currentUser ? {
                      ...currentUser,
                      createdAt: currentUser.createdAt.toISOString(),
                      updatedAt: currentUser.updatedAt.toISOString(),
                      emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toISOString() : null
              } : null} // Pass the current user to each ListingCard
              key={listing.id} // Use the listing ID as the unique key
              data={listing} // Pass the listing data to each ListingCard
            />
          );
        })}
        </div>
          </Container>
        )}
      </div>
    </div>
  );
};

export default DestinationPage