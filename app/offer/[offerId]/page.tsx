// Import statements with consistent paths
import getCurrentUser from "@/app/actions/getCurrentUsers";
import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservation";
import getTourById from "@/app/actions/getTourById";
import getTours, { IToursParams } from "@/app/actions/getTours";
import EmptyState from "@/app/components/container/EmptyState";
import Container from "@/app/components/container/Container";
import TourCard from "@/app/components/listing/TourCard";
import Link from "next/link";
import TourClient from "./TourClient";
import TourCardSecondary from "@/app/components/listing/TourCardSecondary";
import getOfferById from "@/app/actions/getOffersById";

// Define the interface for the TourPage component props
interface IParams {
  // tourId?: string;
  // tourParams: IToursParams;
  offerId?: string;
}

// TourPage component is defined as an asynchronous function
const TourPage = async ({ params }: { params: IParams }) => {
  // const tour = await getTourById(params);
  // const offer = await getOfferById(params);
  const offer = await getOfferById({ offerId: params.offerId });
  // const reservations = await getReservations(params);
  const reservations = await getReservations({ listingId: params.offerId });
  const currentUser = await getCurrentUser();
  // const tours = await getTours(params.tourParams);
  // const filteredTours = tours.filter(tour => tour.tourists.length < tour.guestCount).slice(0, 4);

  // Check if there is no tour, display EmptyState component
  if (!offer) {
    return <EmptyState />;
  }

  return (
    <div>
      {/* Header section */}
      <div className="european-hotel european-hotel-tour flex flex-col items-center justify-center text-lg font-bold">
        <h1 className="color-h1-white">
          {offer.title}
          <span className="color-span-green"></span>
        </h1>
      </div>

      {/* TourClient section */}
      <div className="py-6">
        <TourClient
          tour={offer}
          reservations={reservations}
          currentUser={currentUser ? {
                      ...currentUser,
                      createdAt: currentUser.createdAt.toISOString(),
                      updatedAt: currentUser.updatedAt.toISOString(),
                      emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toISOString() : null
          } : null} // Pass the current user to each ListingCard
        />
      </div>

      {/* Classic Adventure Tours section */}
      {/* {filteredTours && filteredTours.length > 0 && (
        <Container>
          <div className="flex flex-col gap-1 pt-5">
            <h1 className="main-header-black w-full text-center">
              PREMIUM <span className="main-header-gradient">SIMILAR TOURS</span>
            </h1>
            <p className="text-neutral-500 text-sm w-full text-center">
              You viewed the magical {offer.title} tour - continue your luxury adventure with these premium recommendations for similar exotic journeys handpicked just for you.
            </p>
          </div>
          <div className="grid-cols-page-s pt-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
            {filteredTours.map((tour: any) => (
              <TourCardSecondary
                currentUser={currentUser ? {
                  ...currentUser,
                  createdAt: currentUser.createdAt.toISOString(),
                  updatedAt: currentUser.updatedAt.toISOString(),
                  emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toISOString() : null
                } : null} // Pass the current user to each ListingCard
                key={tour.id}
                data={tour}
              />
            ))}
          </div>
          <div className="w-full text-center pt-8">
            <Link
              className="outline-main-btn px-4 hover:bg-slate-400 hover:text-green-400 hover:shadow-md"
              href="/hotels"
            >
              View all similar premium tours
            </Link>
          </div>
        </Container>
      )} */}
        
    </div>
  );
};

export default TourPage;
