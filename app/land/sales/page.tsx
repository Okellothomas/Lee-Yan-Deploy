import getCurrentUser from "../../actions/getCurrentUsers";
import getListings, { IListingsParams } from "../../actions/getListings";
import Container from "../../components/container/Container";
import Link from "next/link";
import getTours, { IToursParams } from "../../actions/getTours";
import { Metadata } from "next";
import EmblaLands from "@/app/mainpage/components/EmblaLands";
import getCounties, {CountiesParams} from "@/app/actions/getCounties";
import getLands, {LandParams} from "@/app/actions/getLands.";
import LandCardMain from "@/app/components/listing/LandCardMain";
import LandCardSecondary from "@/app/components/listing/LandCardSecondary";
import PropertyTartiary from "@/app/components/listing/PropertyTartiary";
import LandTartiaryList from "@/app/components/listing/LandTartiaryList";
import getLandReservation from "@/app/actions/getLandReservation";
import EmptyState from "@/app/components/container/EmptyState";

// Define the interface for the Home component props
interface HotelPageProps {
  searchParams: IListingsParams; // Search parameters for fetching listings
  tourParams: IToursParams;
  countyParams: CountiesParams;
  landParams: LandParams;
}

export const metadata: Metadata =  {
  title: "Land sales",
}

// Home component is defined as an asynchronous function
const DestinationPage = async ({ searchParams, tourParams, countyParams, landParams }: HotelPageProps) => {
  // Fetch listings and current user asynchronously

  let currentUser: any;
    if (searchParams.userId) {
        currentUser = await getCurrentUser();
    }
  // const listings = await getListingsHotels({ ...searchParams, hotel: "hotel" });
  const tours = await getTours(tourParams);
  const counties = await getCounties(countyParams);
  const allLands = await getLands(landParams);
  
  const lands = allLands.filter(property => property.landReservation.length === 0);
  const landPremium = lands.filter(property => property.deal === "premium");
  const landTrending = lands.filter(property => property.deal === "exclusive");
  const LandHot = lands.filter(property => property.deal === "prime");
  const filteredTours = tours.filter(tour => tour.tourists.length < tour.guestCount).slice(0, 4);
  const filteredTourss = tours.filter(tour => tour.tourists.length < tour.guestCount).slice(0, 20);
  // const isEmpty = true; 
  console.log("Landsssss", lands)
  // Check if there are no listings, display EmptyState component
  if (lands.length && lands.length === 0) {
    return (
      <EmptyState showReset />
    );
  }

  // Render the Home component with the fetched listings
  return (
    <div>
    <div className="all-land-sales flex flex-col items-center justify-center banner-btn-m text-lg font-bold">
        <h1 className="mb-3">PRIME PARCELS OF LAND FOR SALE</h1> 
        <h2 className="">Discounted premium properties available</h2> 
        {/* <div className="destination-search">
          <Search /> 
        </div> */}
      </div>
      <div className="flex items-center pb-6 justify-center">
      {lands && lands.length > 0 && (
       <Container>
          <div className="mt-11">
            <div className="my-3 flex justify-between items-center">
              <div>
              <h1 className="mb-2 text-2xl font-bold text-black">Premium plots on sale</h1>
              <p className="text-neutral-600">Land investment opportunities await, invest in prime locations.</p>  
              </div>  
              <div>
                <Link href="/land" className="px-4 py-1 border-[1px] rounded-lg shadow-sm border-neutral-300 border-solid hover:text-green-600">View all</Link>
              </div>
            </div>
            <EmblaLands
              data={counties}
              datas={lands}
              currentUser={
              currentUser
              ? {
                  ...currentUser,
                  createdAt: currentUser.createdAt.toISOString(),
                  updatedAt: currentUser.updatedAt.toISOString(),
                  emailVerified: currentUser.emailVerified
                    ? currentUser.emailVerified.toISOString()
                    : null,
                }
              : null
          } /> 
          </div>   
          </Container>
        )}
      </div>
      <div className="pt-1 pb-9">
      {landPremium && landPremium.length > 0 && (
        <Container>
          <div className="mt-3 mb-3 flex justify-between items-center">
              <div>
              <h1 className="mb-2 text-2xl font-bold text-black">Buy our unique plots</h1>
              <p className="text-neutral-600">Exclusive parcels, seize incomparable land investment opportunities.</p>  
              </div>  
              <div>
                <Link href={{ pathname: '/land-', query: { deal: 'premium' }}} className="px-4 py-1 border-[1px] rounded-lg shadow-sm border-neutral-300 border-solid hover:text-green-600">View all</Link>
              </div>
            </div>  
          <div className="grid-cols-page-s pt-3 pb-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
            {landPremium.slice(0,4).map((tour: any) => (
              <LandCardMain
                currentUser={currentUser ? {
                  ...currentUser,
                  createdAt: currentUser.createdAt.toISOString(),
                  updatedAt: currentUser.updatedAt.toISOString(),
                  emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toISOString() : null
                } : null} // Pass the current user to each ListingCard
                key={tour.id} // Use the listing ID as the unique key
                data={tour} // Pass the listing data to each ListingCard
              />
            ))} 
          </div>
        </Container>
      )}
      </div>
     <div className="first-card-main pt-1 pb-6">
      {landTrending && landTrending.length > 0 && (
        <Container>
          <div className="mt-9 mb-3 flex justify-between items-center">
              <div>
              <h1 className="mb-0 text-2xl font-bold text-black">Exclusive land offerings</h1>
              <p className="text-neutral-600">Prime real estate gems, elevate your investment portfolio</p>    
              </div>  
              <div>
                <Link href={{ pathname: '/land-', query: { deal: 'exclusive' }}} className="px-4 py-1 border-[1px] rounded-lg shadow-sm border-neutral-300 border-solid hover:text-green-600">View all</Link>
              </div>
            </div>   
          <div className="grid-cols-page-s pt-3 pb-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
            {landTrending.slice(0,4).map((tour: any) => (
              <PropertyTartiary
                currentUser={currentUser ? {
                  ...currentUser,
                  createdAt: currentUser.createdAt.toISOString(),
                  updatedAt: currentUser.updatedAt.toISOString(),
                  emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toISOString() : null
                } : null} // Pass the current user to each ListingCard
                key={tour.id} // Use the listing ID as the unique key
                data={tour} // Pass the listing data to each ListingCard
              />
            ))} 
          </div>
        </Container>
      )}
      </div>
      
    <div className="pt-1 pb-2">
      {LandHot && LandHot.length > 0 && (
        <Container>
          <div className="mt-9 mb-3 flex justify-between items-center">
              <div>
              <h1 className="mb-2 text-2xl font-bold text-black">Prime real estate gems</h1>
              <p className="text-neutral-600">Remarkable selections available, embrace unmatched potential</p>     
              </div>  
              <div>
                <Link href={{ pathname: '/land-', query: { deal: 'prime' }}} className="px-4 py-1 border-[1px] rounded-lg shadow-sm border-neutral-300 border-solid hover:text-green-600">View all</Link>
              </div>
            </div>  
          <div className="grid-cols-page-s pt-3 pb-0 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
            {LandHot.slice(0,4).map((tour: any) => (
              <LandCardSecondary
                currentUser={currentUser ? {
                  ...currentUser,
                  createdAt: currentUser.createdAt.toISOString(),
                  updatedAt: currentUser.updatedAt.toISOString(),
                  emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toISOString() : null
                } : null} // Pass the current user to each ListingCard
                key={tour.id} // Use the listing ID as the unique key
                data={tour} // Pass the listing data to each ListingCard
              />
            ))} 
          </div>
        </Container>
      )}
      </div>

      <div className="pt-1">
      {lands && lands.length > 0 && (
          <Container>
          <div className="mt-3 flex justify-between items-center">
              <div>
              <h1 className="mb-0 text-2xl font-bold text-black">Buy our top-tier plots</h1>
              <p className="text-neutral-600">One-of-a-kind offerings - acquire premium real estate land!</p>   
              </div>  
              <div>
                <Link href="/land" className="px-4 py-1 border-[1px] rounded-lg shadow-sm border-neutral-300 border-solid hover:text-green-600">View all</Link>
              </div>
          </div>
          <div className="pt-3 pb-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-5 2xl:grid-cols-5 gap-4">
            <LandTartiaryList
              currentUser={currentUser ? {
                ...currentUser,
                createdAt: currentUser.createdAt.toISOString(),
                updatedAt: currentUser.updatedAt.toISOString(),
                emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toISOString() : null
              } : null} // Pass the current user to each ListingCard
              data={counties}
              datas={lands}
            />
          </div>
        </Container>
      )}
      </div>
    </div>
  );
};

export default DestinationPage