'use client'
import useCountries from "@/app/hooks/useCountries";
import { SafeUser, safeReservation, safePropertyReservation, safeOffer, safeLandReservation, safeOfferReservation } from "@/app/types";
import { Listing, Reservation } from "@prisma/client"
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from 'date-fns';
import Image from "next/image";
import HeartButton from "../components/container/HeartButton";
import Button from "../components/container/Button";
import { safeTour, safeListing } from "@/app/types";
import prisma from '@/app/libs/prismadb';
import toast, { useToaster } from "react-hot-toast";
import axios from "axios";


interface ListingCardProps {
    data: safeOffer;
    reservation?: safeOffer;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

const AllOfferCard: React.FC<ListingCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = "",
    currentUser
}) => {
    const router = useRouter();
    const { getByValue } = useCountries();
    // const location = getByValue(data?.locationValue || ""); // Handle null locationValue
    const toaster = useToaster();


    // console.log(
    //     "More of the data available", data
    // )

    const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        if (disabled) {
            return;
        }

        onAction?.(actionId);
    }, [onAction, actionId, disabled])

    // const price = useMemo(() => {
    //     if (reservation) {
    //         return reservation.totalPrice;
    //     }

    //     return data?.price || 0; // Handle null data or price
    // }, [reservation, data?.price])

    // const reservationDate = useMemo(() => {
    //     if (!reservation) {
    //         return null;
    //     }

    //     const start = new Date(reservation.startDate || "");
    //     const end = new Date(reservation.endDate || "");

    //     return `${format(start, 'pp')} - ${format(end, 'pp')}`
    // }, [reservation])

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        console.log("button clicked");
    try {
        const response = await axios.delete(`/api/offer/${data?.id}`, {
            method: 'DELETE',
        });
        console.log("try is working")
        toast.success("Land deleted successfully")
        router.push("/")
    } catch (error) {
        console.error(error);
        console.log('Failed to delete tour. Please try again.');
    }
};

// console.log("All the User data", data)
    
function formatDate(dateString: any) {
  const date = new Date(dateString);
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}


  return (
      <div
        onClick={() => router.push(`/offer/${data?.id || ""}`)} // Handle null data or id
        className="col-span-1 cursor-pointer group"
      >
          <div className="flex flex-col gap-2 w-full main-image-small-screen border-[1px] border-solid border-neutral-300 pb-1 rounded-xl">
              <div className="aspect-square w-full h-[25vh] relative overflow-hidden rounded-t-xl">
                  <Image
                      fill
                      alt="Listing"
                      src={data?.imageSrc[0] || ""} // Handle null data or imageSrc sure one 
                      className="object-cover h-[25vh] w-full transition group-hover:scale-110 main-image-small-screen"
                  />
                  
              </div>
              <div className="font-semibold text-md mx-2 truncate max-w-[15rem]">
                 <span>{data.title}</span> 
              </div>
              <hr />
              <div className="flex justify-between mx-2 items-center">
                 {/* <div className="font-light text-neutral-500 text-sm">
               <span className="text-neutral-800">Client:</span> {data?.user.name} 
              </div> */}
              <div className="font-light mx-2 text-neutral-500 text-sm">
                <span className="text-neutral-800">Location:</span> {data.county}, {data.town}
              </div> 
              </div>
              <hr />
              <div className="flex justify-between mx-2 items-center">
                 <div className="font-light text-neutral-500 text-sm">
                <span className="text-neutral-800">Price:</span> Ksh. {data.price}
              </div>
              <div className="font-light text-neutral-500 text-sm">
                  <span className="text-neutral-800">Offer price:</span> Ksh. {data.offerprice}
              </div> 
              </div>
              <hr />
              {/* <div className="flex justify-between mx-2 items-center">
                 <div className="font-light text-neutral-500 text-sm">
                <span className="text-neutral-800">Client email:</span> {data?.user.email}
              </div>
              <div className="font-light text-neutral-500 text-sm">
                  <span className="text-neutral-800">Client contact:</span> {data?.user.contact}
              </div> 
              </div>
              <hr /> */}
              <div className="flex justify-between mx-2 items-center">
              {/* <div className="font-light text-neutral-500 text-sm">
                 <span className="text-neutral-800">Check In:</span>: { formatDate(data.startDate)}
              </div>
              <div className="font-light text-neutral-500 text-sm">
                  <span className="text-neutral-800">Check Out:</span> { formatDate(data.endDate)}
              </div>  */}
              </div>
              {/* <div className="flex flex-row items-center gap-1">
                  <div className="text-sm">
                    {data.depStart} to {data.depEnd}
                  </div>
              </div> */}

              
              {onAction && actionLabel && (
                  <Button
                      disabled={disabled}
                      small
                      label={actionLabel}
                      onClick={handleCancel}
                  />
              )}
          </div>   
          <div className="flex flex-row items-center gap-1">
                 <div className="hidden invisible font-semibold">
                    <button className="outline-main-btn" onClick={handleDelete}>Delete</button>
                </div>
         </div>
    </div>
  )
}

export default AllOfferCard;