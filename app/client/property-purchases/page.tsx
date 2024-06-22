import prisma from '@/app/libs/prismadb';
import getCurrentUser from "@/app/actions/getCurrentUsers";
import Container from "@/app/components/container/Container";
import SideBar from "../profile/components/SideBar";
import getmyTours, { ImyToursParams } from "@/app/aagetMethods/getmyTours";
import TourMyCard from "@/app/aahooks/TourMyCard";
import TourClientCard from '@/app/aahooks/TourClientCard';
import RestrictedEmptyState from '@/app/components/container/RestrictedEmptyState';
import getReservations from '@/app/actions/getReservation';
import getPropertyReservation from '@/app/actions/getPropertyReservation';
import PropertyClientCard from '@/app/aahooks/PropertyClientCard';
import ClientPropertyCard from '@/app/aahooks/ClientPropertyCard';

// Define the interface for the Home component props
interface HotelPageProps {
  searchParams: ImyToursParams; // Search parameters for fetching listings
}

// Home component is defined as an asynchronous function
const AdministratorsPage = async ({ searchParams }: HotelPageProps) => {
  try {
    // Fetch the current user
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      // Handle case where currentUser is null
      return <div>Error: Current user not found.</div>;
    }


    const reservations = (await getPropertyReservation({}))
      .filter(reservation => reservation.userId?.includes(currentUser.id) && reservation.Property.type === 'sale');

    // console.log("List all reservations, ",reservations);

    return (
      <div>
        <div className="all-destinations-main-admin-profile flex flex-col items-center justify-center text-lg font-bold">
          <h1 className="color-h1-destinations-main-admin-profile">
            {currentUser.name}
            <span className="color-span-green"></span>
          </h1>
        </div>
        <Container>
          <div className="grid grid-cols-6 gap-10 pt-16">
            <div className="col-span-2">
              <SideBar />
            </div>
            <div className="col-span-4">
              <div className="col-span-4 border-[1px] border-solid border-neutral-300 rounded-lg py-4 px-6">
              <div className="pb-2">
                <h1 className="text-xl font-semibold">My property purchases</h1>
                </div>
               <div className="pt-2 pb-4">
              <hr />
            </div>
              <div className="items-center pb-1">
                {reservations.length === 0 ? (
                  <div>No active property purchases</div>
                ) : (
                  <div className="pt-2 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-8">
                    {reservations.map((reservation: any) => (
                      <ClientPropertyCard
                        currentUser={currentUser ? {
                          ...currentUser,
                          createdAt: currentUser.createdAt.toISOString(),
                          updatedAt: currentUser.updatedAt.toISOString(),
                          emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toISOString() : null
                        } : null} // Pass the current user to each ListingCard
                        key={reservation.id} // Use the reservation ID as the unique key
                        data={reservation} // Pass the reservation data to each ListingCard
                      />
                    ))}
                  </div>
                )}
              </div>
              {/* <AdminInfo userParams={userParams} /> */}
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  } catch (error) {
    console.error("Error:", error);
    // Handle error as needed
    return <div>Error occurred while fetching data.</div>;
  }
};

export default AdministratorsPage;
