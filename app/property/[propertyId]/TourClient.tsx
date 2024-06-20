'use client'

import Container from "@/app/components/container/Container";
import ListingReservation from "@/app/components/listing/ListingReservation";
import { categories } from "@/app/components/navbar/Categories";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeUser, safeListing, safeOffer, safeReservation, safeProperty, safePropertyReservation } from "@/app/types";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Range } from "react-date-range";
import toast from "react-hot-toast";
import { safeTour } from "@/app/types";
import TourHead from "@/app/components/listing/TourHead";
import TourInfo from "@/app/components/listing/TourInfo";
import { SlCalender } from "react-icons/sl";
import dynamic from "next/dynamic";
import { CiGift } from "react-icons/ci";
import useCountries from "@/app/hooks/useCountries";
import { SlLocationPin } from "react-icons/sl";
import { ImLocation2 } from "react-icons/im";
import { GiWorld } from "react-icons/gi";
import { GiTakeMyMoney } from "react-icons/gi";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PaymentModal from "@/app/components/Modals/PaymentModal";
import { FaWhatsapp } from "react-icons/fa";
 import { FiPhoneCall } from "react-icons/fi";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { IoInformationCircleOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { GiCash } from "react-icons/gi";
import {MdOutlineMeetingRoom} from "react-icons/md";
import {MdOutlineBathtub} from "react-icons/md";
import {MdOutlineBedroomParent} from "react-icons/md";
import { PiToiletBold } from "react-icons/pi";
import { MdPhotoSizeSelectSmall } from "react-icons/md";
import { MdOutlineEventAvailable } from "react-icons/md";
import { IoCarSportOutline } from "react-icons/io5";
 import { FaMoneyBillTrendUp } from "react-icons/fa6";
import Dialog from "@/app/components/listing/Dialog";
import ListingHead from "@/app/components/listing/ListingHead";

// const initialDateRange = {
//     startDate: new Date(),
//     endDate: new Date(),
//     key: 'selection'
// }

interface TourClientProps {
    reservations?: safePropertyReservation[];
    property: safeProperty & {
        user: SafeUser
    };
    currentUser?: SafeUser | null;
}

const TourClient: React.FC<TourClientProps> = ({
    property,
    reservations = [],
    currentUser,
}) => {

    const loginModal = useLoginModal();
    const router = useRouter();

    // const disabledDates = useMemo(() => {
    //     let dates: Date[] = [];

    //     reservations.forEach((reservations) => {
    //         const range = eachDayOfInterval({
    //             start: new Date(reservations.startDate),
    //             end: new Date(reservations.endDate)
    //         });

    //         dates = [...dates, ...range]
    //     })

    //     return dates;
    // }, [reservations])

    const [isLoading, setIsLoading] = useState(false);
    // const [totalPrice, setTotalPrice] = useState(property.price);
    // const [dateRange, setDateRange] = useState<Range>(initialDateRange);
    const [isOpen, setIsOpen] = useState(false); 
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [isOpen4, setIsOpen4] = useState(false);
    const [isOpen5, setIsOpen5] = useState(false);
    const [isOpen6, setIsOpen6] = useState(false);
    const [isOpen7, setIsOpen7] = useState(false);
    const [isOpen8, setIsOpen8] = useState(false);
    const [isOpen9, setIsOpen9] = useState(false);
    const [isOpen10, setIsOpen10] = useState(false);
    const [isOpen11, setIsOpen11] = useState(false);
    const [isOpen12, setIsOpen12] = useState(false);
    const [isOpen13, setIsOpen13] = useState(false);
    const [isOpen14, setIsOpen14] = useState(false);
    const [isOpen15, setIsOpen15] = useState(false);
    const [isOpen16, setIsOpen16] = useState(false);
    const [isOpen17, setIsOpen17] = useState(false);
    const [isOpen18, setIsOpen18] = useState(false);
    const [showPay, setShowPay] = useState(false)
    // const [selectedPaymentAmount, setSelectedPaymentAmount] = useState<number>(property?.price); // State to track the selected payment amount
    // const [selectedPaymentAmount, setSelectedPaymentAmount] = useState<number>(Number(property?.price as string));
    const [dataa, setDataa] = useState('')
    // const { getByValue } = useCountries();
    // const coordinates = getByValue(locationValue)?.latlng;


    const [numberOfTourists, setNumberOfTourists] = useState(0);
    const [error, setError] = useState('');
    const baseUrl = typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : '';   //Wanna ge the base url of the current app

    const [options, setOptions] = useState(
        {
        guests: 0,
        rooms: 0}
    )

    const [openoptions, setOpenoptions] = useState(false)
    const numberOfGuestsRef = useRef<HTMLInputElement>(null);


    const [showAll, setShowAll] = useState(false);
  
    const offers = property.amenities || [];
    const displayedOffers = showAll ? offers : offers.slice(0, 7);
    console.log("display all offers", offers);
    const handleShowMore = () => {
        setShowAll(true);
    };

    const [itExpanded, setItExpanded] = useState(false);

    const ToggleExpands = () => {
        setItExpanded(!itExpanded);
    };
    


      const onCreateReservation = useCallback(() => {

        console.log(baseUrl)

        if (options.guests <= 0) {
            setError('Specify number of tourists, must be greater than 0.');
            return;
          }



        if (!currentUser) {
            return loginModal.onOpen()
        }

       
        try {
            setShowPay(true)
        } catch (error) {
            console.log(error)
        }
       setIsLoading(true);
    }

  , [
        // totalPrice,
        // dateRange,
        property?.id,
        router,
        currentUser,
        loginModal,
   
    ]);
    const Map = dynamic(() => import('../../components/container/Map'), {
        ssr: false
    } )



    const handleClickOutside = (event: { target: any; }) => {
        if (numberOfGuestsRef.current && !numberOfGuestsRef.current.contains(event.target)) {
            setOpenoptions(false);
        }
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    
    const [partialPay, setPartialPay] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [marking, setMarking] = useState(false);

    const partialAmount = 1000;

    const handlePartialPay = () => {
        setPartialPay(true);
        // onSubmit(partialAmount);
        handlePaymentComplete()
        setOpenDialog(false);
    }

    const handleFullPay = () => {
        setPartialPay(false);
        // onSubmit(totalPrice);
        handlePaymentComplete()
        setOpenDialog(false);
    }

    const handleReserve = () => {
        setOpenDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }


    const handlePaymentComplete = async() => {
        // Handle the data passed from PaymentModal
        // console.log('Payment completed with data:', data);
        // setDataa(data)

        // const merchantId = data?.Body?.stkCallback.MerchantRequestID
        // if(merchantId)
        //     {
        //         const response = await axios.delete("/api/mpesa/callback", {
        //             params: { transactionRef: JSON.stringify({merchantRequestId: merchantId})  },
        //             headers: {
        //               'Content-Type': 'application/json'
        //             }
        //           });
        //     }
        // makeReservation(data)
        if (!currentUser) {
            return loginModal.onOpen()
        }

        makeReservation()

      };
      
      const makeReservation = () =>
      {
        const data2 =  {
            "Body": {
                "stkCallback": {
                    "MerchantRequestID": "12345-67890-12345",
                    "CheckoutRequestID": "abcdefghijklmnopqrstuvwxyz",
                    "ResultCode": 0,
                    "ResultDesc": "The service was accepted successfully",
                    "CallbackMetadata": {
                        "Item": [
                            {
                                "Name": "Amount",
                                "Value": 100
                            },
                            {
                                "Name": "MpesaReceiptNumber",
                                "Value": "ABCDEFGHIJ"
                            },
                            {
                                "Name": "Balance",
                                "Value": 0
                            },
                            {
                                "Name": "TransactionDate",
                                "Value": "2023-04-26 12:30:00"
                            },
                            {
                                "Name": "PhoneNumber",
                                "Value": "254712345678"
                            }
                        ]
                    }
                }
            }
        }
       {
        setShowPay(false)
        console.log("Payment Data",dataa)
              axios.post('/api/propertyreservations', {
                  // totalPrice,  //for totalPrice
                  // startDate: dateRange.startDate,
                  // endDate: dateRange.endDate,
                  propertyId: property?.id,
                  paymentDetails: data2,
                  userId: currentUser?.id,
                  // guestDetails: options
              })
                  .then(async () => {
                      toast.success('Listing reserved!');

                      // setDateRange(initialDateRange);
                      // redirect to /trips
                      try {
                          //     const response = await axios.post('/api/mailing/', 
                  
                          //       {sender:'Info@devancatours.com',
                          //              recipient:'wanjooo.ken@gmail.com',
                          //              subject:"Devance Reservations",
                          //              user_name:currentUser?.name,
                          //              templateName: 'mail_template',
                          //              mail_body:This is a sample test mail from Devance Application and these are the reservatio

                          //                 },

                          //                 {
                          //                     headers: {
                          //                         'Content-Type': 'application/json'
                          //                     }
                          //                 }
                          //     );
                
                          //     const data = await response.data;
                          //     console.log(data); // handle success message
                
                            } catch (error) {
                              console.error(error); // handle error message
                      }
                //router.push('/trips');
            }).catch(() => {
                toast.error('Something went wrong')
            }).finally(() => {
                setIsLoading(false);
            })
    }
      }

  return (
    <Container>
          <div className="max-w-sreen-lg mx-auto">
              <div className="flex flex-col mt-6 gap-6">
                  <ListingHead
                      title={property.title}
                      imageSrc={property.imageSrc}
                      id={property.id}
                      town={property.town}
                      currentUser={currentUser}
                  /> 
                  {/* <div className="grid grid-cols-1 md:grid-cols-7 md:grid-10 mt-6">    */}
                  <div className="grid grid-cols-1 gap-8 mt-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5">
                      <div className="order-first-second-first col-span-3 flex flex-col gap-7"> 
                          <div className="flex gap-1 items-start justify-start text-lg text-neutral-800">
                              <span className="font-bold">{property.title}, </span> <span>in {property.county},</span> <span>{ property.town}</span>
                          </div> 
    
                        <div className="border-[1px] mt-[13px] border-solid flex items-center gap-[13px] py-4 px-1 border-neutral-300 h-auto w-full rounded-lg">
                              {property.roomCount !== 0 && (
                                  <div className="flex flex-row justify-between">
                                      <div className="flex flex-row items-center gap-2"> <span className="text-orange-500"><MdOutlineMeetingRoom size={23} /></span><span className="text-md">Rooms: </span></div> <span className="text-neutral-500">{property.roomCount}</span>
                                  </div>
                              )}
                              {property.bathRoomCount !== 0 && (
                                  <div className="flex flex-row justify-between">
                                      <div className="flex flex-row items-center gap-2"> <span className="text-blue-500"><MdOutlineBathtub size={23} /></span><span className="text-md">Bathrooms: </span></div> <span className="text-neutral-500">{property.bathRoomCount}</span>
                                  </div>
                              )}
                              {property.bedRoomCount !== 0 && (
                                  <div className="flex flex-row justify-between">
                                      <div className="flex flex-row items-center gap-2"> <span className="text-lime-600"><MdOutlineBedroomParent size={23} /></span><span className="text-md">Bedrooms: </span></div><span className="text-neutral-500">{property.bedRoomCount}</span>
                                  </div>
                              )}
                              {property.toiletCount !== 0 && (
                                  <div className="flex flex-row justify-between">
                                      <div className="flex flex-row items-center gap-2"> <span className="text-neutral-600"><PiToiletBold  size={23} /></span><span className="text-md">Washrooms: </span></div><span className="text-neutral-500">{property.toiletCount}</span>
                                  </div>
                              )}
                          </div>


                    <div className="flex flex-col gap-5 items-start border-[1px] border-solid py-4 px-4 border-neutral-300 h-auto w-full rounded-lg">
                          
                        <div className="flex w-full flex-row items-center justify-between">
                                  <div className="flex flex-row items-center gap-2">
                                     <span className="text-xl font-bold">Property Info!</span>
                                  </div>
                              </div>
                            <div className="py-1 w-full">
                            <hr />
                            </div>
                    
                            <div className="flex w-full flex-row items-center justify-between">
                                  <div className="flex flex-row items-center gap-2">
                                      <span className="text-neutral-500"><BiCategoryAlt size={ 23} /></span> <span>Property type</span>
                                  </div> 
                                 <div>
                                      <span>{property.type }</span>
                                </div>
                              </div>
                              
                            <div className="py-1 w-full">
                            <hr />
                            </div>
                              
                            <div className="flex w-full flex-row items-center justify-between">
                                  <div className="flex flex-row items-center gap-2">
                                      <span className="text-neutral-500"><MdPhotoSizeSelectSmall size={ 23} /></span> <span>Property size</span>
                                  </div> 
                                 <div>
                                      <span>{property.size }</span>
                                </div>
                              </div>

                            <div className="py-1 w-full">
                            <hr />
                            </div>
                              
                            <div className="flex w-full flex-row items-center justify-between">
                                  <div className="flex flex-row items-center gap-2">
                                      <span className="text-neutral-500"><MdOutlineEventAvailable size={ 23} /></span> <span>Property availability</span>
                                  </div> 
                                 <div>
                                      <span>{property.availability }</span>
                                </div>
                              </div>
                              
                            <div className="py-1 w-full">
                            <hr />
                            </div>
                              
                            <div className="flex w-full flex-row items-center justify-between">
                                  <div className="flex flex-row items-center gap-2">
                                      <span className="text-neutral-500"><IoCarSportOutline size={ 23} /></span> <span>Parking space</span>
                                  </div> 
                                 <div>
                                      <span>{property.parking_space }</span>
                                </div>
                              </div>
                            
                            <div className="py-1 w-full">
                            <hr />
                            </div>
                             
                            <div className="flex w-full flex-row items-center justify-between">
                                  <div className="flex flex-row items-center gap-2">
                                      <span className="text-neutral-500"><FaMoneyBillTrendUp size={ 23} /></span> <span>Property deal</span>
                                  </div> 
                                 <div>
                                      <span>{property.deal }</span>
                                </div>
                            </div>
                              
                        <div>           
                        </div>
                          </div> 
            

                     <div className="flex flex-col gap-5 items-start border-[1px] border-solid py-4 px-4 border-neutral-300 h-auto w-full rounded-lg">
                          
                        <div className="flex w-full flex-row items-center justify-between">
                                  <div className="flex flex-row items-center gap-2">
                                     <span className="text-xl font-bold">Amenities</span>
                                  </div>
                              </div>
                            <div className="py-1 w-full">
                            <hr />
                            </div>
                            { offers.length > 0 && (
                            <div>
                            {displayedOffers.map((offer, index) => (
                            <div key={index} className="flex flex-col gap-2 justify-start">
                                <span className="text-neutral-500 flex flex-row gap-3 justify-start">
                                <span className="text-neutral-700"><IoCheckmarkDoneCircleOutline size={23} /></span>
                                {offer}
                                <span className="text-neutral-400"><IoInformationCircleOutline size={23} /></span>
                                    </span>
                                <div className="pb-2 text-neutral-500">
                                <hr />
                                </div>
                            </div>
                            ))}
                            {!showAll && offers.length > 7 && (
                            <button onClick={handleShowMore} className="text-blue-500 mt-2">
                                Show More
                            </button>
                            )}
                        </div>
                        )}
                              
                        <div>           
                        </div>
                          </div>  
                          

                        {property.amenities && property.amenities?.length > 0 && (
                              <div className="flex flex-col gap-5 items-start border-[1px] border-solid py-4 px-4 border-neutral-300 h-auto w-full rounded-lg">
                          
                                  <div className="flex w-full flex-row items-center justify-between">
                                      <div className="flex flex-row items-center gap-2">
                                          <span className="text-xl font-bold">Overview</span>
                                      </div>
                                  </div>
                                  <div className="py-1 w-full">
                                      <hr />
                                  </div>
                        
                                  {property.overview !== "" && (
                                    <div className="flex flex-row justify-between">
                                        <span className={`text-neutral-500 ${itExpanded ? '' : 'line-clamp-4'}`}>
                                            {property.overview} {!itExpanded && (
                                            <button onClick={ToggleExpands} className="text-blue-600 ml-2">
                                                Read more
                                            </button>
                                            )}
                                        </span>
                                    </div>
                                )}
                                  <div>
                                  
                                  </div>
                              </div>
                          )}
                          
                  </div>

                      <div className="order-first-second order-first-second-one col-span-2" style={{ position: 'sticky', top: '10vh' }}>
                          <div className="border-neutral-300 pt-4 px-4 bg-white border-solid w-full rounded-lg h-auto border-[1px]" style={{ position: 'sticky', top: '10vh' }}>
                          <div className="flex flex-row px-4 justify-between item-center gap-3">
                              <div className="flex flex-row gap-3 justify-between items-center">
                                 <span className="text-red-400"><GiTakeMyMoney size={23 } /></span><span>Price</span> 
                              </div>
                              <div className="flex flex-row gap-3 justify-between items-center">
                                 <span className="text-red-400 line-through">Ksh. {property.price}</span> <span></span>
                              </div>
                          </div>
                          <div className="px-4 py-3">
                          <hr />
                          </div>
                          <div className="flex flex-row px-4 justify-between item-center gap-3">
                              <div className="flex flex-row gap-3 justify-between items-center">
                                 <span className="text-orange-400"><GiCash size={23 } /></span><span>Offer Price</span> 
                              </div>
                              <div className="flex flex-row gap-3 justify-between items-center">
                                 <span>Ksh. {property.offerPrice}</span> 
                              </div>
                          </div>
                          <div className="px-4 py-3">
                          <hr />
                              </div>
                           <div className="flex flex-row mx-6 py-1 hover:cursor-pointer justify-center items-center border-[1px] border-solid border-green-500 rounded-lg gap-3">
                              <div className="flex flex-row gap-3 justify-center items-center">
                                 <span className="text-green-400"><FaWhatsapp size={24 } /></span>
                              </div>
                            </div>
                          <div className="px-4 py-3">
                          <hr />
                              </div>
                          <div className="flex flex-row mx-6 py-1 hover:cursor-pointer justify-center items-center border-[1px] border-solid border-blue-500 rounded-lg gap-3">
                              <div className="flex flex-row gap-3 justify-center items-center">
                                 <span className="text-blue-400"><FiPhoneCall size={24 } /></span> 
                              </div>
                          </div>
                          <div className="px-4 py-3">
                          <hr />
                              </div>
                         <div onClick={handleReserve}  className="flex flex-row mx-6 py-1 hover:cursor-pointer justify-center items-center border-[1px] bg-green-700 text-white border-solid border-neutral-400 rounded-lg gap-3">
                              <div className="flex flex-row gap-3 justify-between items-center">
                                 <span className="font-bold text-lg">Reserve</span> 
                              </div>
                          </div>

                        <Dialog
                                open={openDialog}
                                onClose={handleCloseDialog}
                            >
                                <h2 className="text-xl font-bold mb-4">Confirm Your Booking</h2>
                                <p>Please choose your payment option.</p>
                                <div className="mt-4 flex flex-col justify-end gap-4">
                                    <button className="border-[1px] border-solid border-green-400 rounded-lg px-4 py-2" onClick={handleFullPay} color="primary">
                                        Pay Full Amount of Ksh. {property.price}
                                    </button>
                                    {property.price > partialAmount && (
                                        <button className="border-[1px] border-solid border-green-400 rounded-lg px-4 py-2" onClick={handlePartialPay} color="primary" autoFocus>
                                            Reserve with Ksh. {partialAmount}
                                        </button>
                                    )}
                                    <button onClick={handleCloseDialog} color="secondary">
                                        Cancel
                                    </button>
                                </div>
                        </Dialog>
                              
                          <div className="px-4 py-3">
                          <hr />
                          </div>

        <div className="flex flex-col px-4 justify-between items-center gap-1">
        
        <hr />

        <div className="flex flex-col justify-center item-center gap-3">
             {options.guests > 0 && (
        <>
         
        </>
      )}
        </div>
    </div>
             
        {showPay && <PayPalScriptProvider options={{ clientId: "ATNgosIlt76LLJdYbZjqNuhdI31gc3H_pV7mQa6h4CJ20Xz0F_O2zCDVlD_Xt91iHmftZ3cB4J2kiHS3" }}>
         {/* {showPay && <PayPalScriptProvider options={{ clientId: "AZ_ycPr5s3mAA-Xboaqc9ft8hHiaChcr42aZIauAYl3Ax0CDig8L3uc-V0P2Mgx70nQD4p7XKcTbCLBB" }}> */}
                              {/* <PaymentModal setShowPayModal={setShowPay} onPaymentComplete={handlePaymentComplete} totalPrice={totalPrice.toString()}/> */}
                              
                  <PaymentModal 
                        setShowPayModal={setShowPay} 
                        onPaymentComplete={handlePaymentComplete} 
                        totalPrice={property.price.toString()} 
                    />
                          </PayPalScriptProvider>}
                    </div>
                      </div> 
                  </div>
              </div>
        </div>
    </Container>
  )
}

export default TourClient