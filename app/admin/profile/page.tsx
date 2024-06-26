import getCurrentUser from "@/app/actions/getCurrentUsers";
import getListings, { IListingsParams } from "@/app/actions/getListings";
import getTours, { IToursParams } from "@/app/actions/getTours";
import Container from "@/app/components/container/Container";
import ListingCard from "@/app/components/listing/ListingCard";
import Link from "next/link";
import SideBar from "./components/SideBar";
import AdminInfo from "./components/AdminInfo";
import RestrictedEmptyState from "@/app/components/container/RestrictedEmptyState";

// Define the interface for the Home component props
interface HotelPageProps {
    searchParams: IListingsParams; // Search parameters for fetching listings
     tourParams: IToursParams;
}

// Home component is defined as an asynchronous function
const ProfilePage = async ({ searchParams, tourParams }: HotelPageProps) => {
  // Fetch listings and current user asynchronously
    const currentUser = await getCurrentUser();
  // const isEmpty = true;

if(currentUser?.userType !== "admin") {
      // Render link to homepage if the current user is not an admin
      return (
        <RestrictedEmptyState/>
      );
    }
  // Render the Home component with the fetched listings
  return (
    <div>
    <div className="all-destinations-main-admin-profile flex flex-col items-center justify-center text-lg font-bold">
     <h1 className="color-h1-destinations-main-admin-profile">{currentUser?.name}<span className="color-span-green"></span></h1>
      </div>
      <Container>
        <div className="grid grid-cols-6 gap-10 pt-16">
            <div className="col-span-2">
            <SideBar />
            </div>      
          <div className="col-span-4">
          <div className="border-[1px] px-6 py-5 border-solid border-neutral-300 rounded-lg">
            <div className="pb-6">
              <h1 className="text-xl font-semibold">Admin personal details</h1>            
              </div>
              <div className="pb-7">
                <hr />
              </div>
            <div className="flex flex-row justify-between items-center pb-8">
              <p>Full Name</p>
              <p>{ currentUser?.name}</p>            
            </div>
            <hr />
            <div className="flex flex-row justify-between items-center py-8">
              <p>Email</p>
              <p>{ currentUser?.email}</p>            
            </div>
            <hr />
            <div className="flex flex-row justify-between items-center py-8">
              <p>Contact</p>
              <p>{ currentUser?.contact }</p>            
            </div>
            <hr />
            <div className="flex flex-row justify-between items-center py-8">
              <p>County</p>
              <p>{ currentUser?.country }</p>            
            </div>
            <hr />
            </div>  
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProfilePage