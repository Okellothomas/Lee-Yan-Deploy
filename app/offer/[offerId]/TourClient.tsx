'use client'

import Container from "@/app/components/container/Container";
import ListingReservation from "@/app/components/listing/ListingReservation";
import { categories } from "@/app/components/navbar/Categories";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeUser, safeListing, safeOffer, safeReservation } from "@/app/types";
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
import { BsCalendar2Date } from "react-icons/bs";
import { GiReceiveMoney } from "react-icons/gi";
import { FaArrowsDownToPeople } from "react-icons/fa6";
import { MdOutlineDepartureBoard } from "react-icons/md";
import { FaPlaneArrival } from "react-icons/fa6";
import { FaPersonMilitaryToPerson } from "react-icons/fa6";
import { RiRadioButtonLine } from "react-icons/ri";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PaymentModal from "@/app/components/Modals/PaymentModal";
import { IoIosPeople } from "react-icons/io";
import ListingHead from "@/app/components/listing/ListingHead";
import { MdOutlineCategory } from "react-icons/md";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { IoInformationCircleOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { GiCash } from "react-icons/gi";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

interface TourClientProps {
    reservations?: safeReservation[];
    tour: safeOffer & {
        user: SafeUser
    };
    currentUser?: SafeUser | null;
    locationValue: string;
}

const TourClient: React.FC<TourClientProps> = ({
    tour,
    reservations = [],
    currentUser,
    locationValue
}) => {

    const loginModal = useLoginModal();
    const router = useRouter();

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];

        reservations.forEach((reservations) => {
            const range = eachDayOfInterval({
                start: new Date(reservations.startDate),
                end: new Date(reservations.endDate)
            });

            dates = [...dates, ...range]
        })

        return dates;
    }, [reservations])

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(tour.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);
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
    // const [selectedPaymentAmount, setSelectedPaymentAmount] = useState<number>(tour.price); // State to track the selected payment amount
    const [selectedPaymentAmount, setSelectedPaymentAmount] = useState<number>(Number(tour.price as string));
    const [dataa, setDataa] = useState('')
    const { getByValue } = useCountries();
    const coordinates = getByValue(locationValue)?.latlng;


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
  
    const offers = tour.inclusion || [];
    const displayedOffers = showAll ? offers : offers.slice(0, 7);

    const handleShowMore = () => {
        setShowAll(true);
    };

//   const handleTouristsChange = (event:React.ChangeEvent<HTMLInputElement>) => {
//     setNumberOfTourists(parseInt(event.target.value));
//     setError('');

//     setTotalPrice(tour.price * parseInt(event.target.value))
    
//   };
    
     // Function to handle the payment amount selection
    const handlePaymentAmountSelect = (amount: number) => {
        setSelectedPaymentAmount(amount);
    };



    // const handlePaymentComplete = (data: any) => {
    //     // Handle the data passed from PaymentModal
    //     console.log('Payment completed with data:', data);
    //     setDataa(data)
    //     makeReservation(data)
    //     // You can also update the state or trigger other actions
    //     // ...
    //   };

        const handlePaymentComplete = (data: any) => {
        // Handle the data passed from PaymentModal
        console.log('Payment completed with data:', data);
        setDataa(data);
        // You can also update the state or trigger other actions
        // ...
        // Check if payment was successful
        if (data && data.status === 'COMPLETED') {
            // Payment was successful, proceed to make reservation
            makeReservation(data);
        } else {
            // Payment failed or was cancelled
            // Handle accordingly, show error message or take appropriate action
            console.log('Payment failed or cancelled.');
            // Optionally, you can show a toast or error message
            toast.error('Payment failed or was cancelled.');
        }
        };
    
      const makeReservation = (data:any) => {
      
          if (data && data.status === 'COMPLETED') {
      
              {
                  setShowPay(false)
                  console.log("Payment Data", dataa)
                  axios.put(`/api/offers/${tour?.id}`, {
                      from_flag:'reservation',
                      totalPrice: selectedPaymentAmount,
                      startDate: dateRange.startDate,
                      endDate: dateRange.endDate,
                      tourId: tour?.id,
                      paymentDetails: data,
                      userId: currentUser?.id,
                      slots: options.guests, // Include guests count
                    //   tourists: tour ? tour.tourists : [],
                      rooms: options.rooms // Include rooms count
                  })
                      .then(async () => {
                          toast.success('Listing reserved!');

                          setDateRange(initialDateRange);
                          // redirect to /trips
                          try {
                              const response = await axios.post('/api/mailing/',
                  
                                  {
                                      sender: 'Info@devancatours.com',
                                      recipient: 'wanjooo.ken@gmail.com',
                                      subject: "Devance Reservations",
                                      user_name: currentUser?.name,
                                      templateName: 'tour_mail_template',
                                      baseUrl: baseUrl,
                                      mail_body: `This is a sample test mail from Devance Application and these are the reservatio`

                                  },

                                  {
                                      headers: {
                                          'Content-Type': 'application/json'
                                      }
                                  }
                              );
                
                              const data = await response.data;
                              console.log(data); // handle success message
                
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
           } else {
                // Payment data is missing or payment was not successful
                // Show error message or take appropriate action
                // console.log('Error: Payment data is missing or payment was not successful.');
                // // Optionally, you can show a toast or error message
                // toast.error('Error: Payment data is missing or payment was not successful.');
            }
            };


      const onCreateReservation = useCallback(() => {

        console.log(baseUrl)

        if (options.guests <= 0) {
            setError('Specify number of tourists, must be greater than 0.');
            return;
          }
        // if (options.guests > (tour.guestCount - tour.tourists.length)) {
        //     setError(`Available slots not enough for requested slots, only ${tour.guestCount - tour.tourists.length} available`);
        //     return;
        //   }



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
        totalPrice,
        dateRange,
        tour?.id,
        router,
        currentUser,
        loginModal,
   
    ]);
    const Map = dynamic(() => import('../../components/container/Map'), {
        ssr: false
    } )

    // Calucating the price. 
    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            );

            // if (dayCount && tour.price) {
            //     setTotalPrice(dayCount * tour.price);
            // } else {
            //     setTotalPrice(tour.price);
            // }
        }
    }, [dateRange, tour.price])

    const category = useMemo(() => {
        return categories.find((item) =>
        item.label === tour.category);
    }, [tour.category])


    const handleOptions = (name: 'guests' | 'rooms', operations: any) => {
      
            const guestsDets = {
                ...options,
                [name]: operations === 'i' ? options[name] + 1 : options[name] - 1,
            }

            setTotalPrice(tour.price)
      
        setOptions((prev) => {
            return {
                ...prev,
                [name]: operations === 'i' ? options[name] + 1 : options[name] - 1,
            };
        });
        
    };

    const toggleOptions = () => {
        setOpenoptions(!openoptions)
    };



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


//   const calculateTotalPrice = () => {
//     return options.guests * tour.price + options.rooms ;
//   };

  return (
    <Container>
          <div className="max-w-sreen-lg mx-auto">
              <div className="flex flex-col mt-6 gap-6">
                  <ListingHead
                      title={tour.title}
                      imageSrc={tour.imageSrc}
                      id={tour.id}
                      town={tour.town}
                      currentUser={currentUser}
                  /> 
                  {/* <div className="grid grid-cols-1 md:grid-cols-7 md:grid-10 mt-6">    */}
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5">
                      <div className="order-first-second-first col-span-3 flex flex-col gap-7"> 
                          <div className="flex gap-1 items-start justify-start text-lg text-neutral-800">
                              <span className="font-bold">{tour.title}, </span> <span>in {tour.county},</span> <span>{ tour.town}</span>
                          </div> 
                          
                        <div className="border-[1px] mt-[13px] border-solid flex items-center gap-[13px] py-4 px-1 border-neutral-300 h-auto w-full rounded-lg">
                              {tour.category !== '' && (
                                  <div className="flex flex-row justify-between">
                                      <div className="flex flex-row items-center gap-2"> <span className="text-orange-500"><MdOutlineCategory size={23} /></span><span className="text-md">Catogry: </span></div> <span className="text-neutral-500">{tour.category}</span>
                                  </div>
                              )}
                              {tour.days !== '' && (
                                  <div className="flex flex-row justify-between">
                                      <div className="flex flex-row items-center gap-2"> <span className="text-blue-500"><BsCalendar2Date size={23} /></span><span className="text-md">Duration: </span></div> <span className="text-neutral-500">{tour.days}</span>
                                  </div>
                              )}
                              {tour.subtitle !== '' && (
                                  <div className="flex flex-row justify-between">
                                      <div className="flex flex-row items-center gap-2"> <span className="text-lime-600"><CiGift size={23} /></span><span className="text-md">Property: </span></div><span className="text-neutral-500">{tour.subtitle}</span>
                                  </div>
                              )}
                              {/* {tour.category !== '' && (
                                  <div className="flex flex-row justify-between">
                                      <div className="flex flex-row items-center gap-2"> <span className="text-neutral-600"><IoIosPeople size={23} /></span><span className="text-md">Rooms: </span></div><span className="text-neutral-500">{tour.category}</span>
                                  </div>
                              )}                         */}
                          </div>

                    <div className="flex flex-col gap-5 items-start border-[1px] border-solid pt-3 pb-1 px-4 border-neutral-300 h-auto w-full rounded-lg">
                          
                        <div className="flex w-full flex-row items-center justify-between">
                                  <div className="flex flex-row items-center gap-2">
                                      <span className="text-neutral-500"><BiCategoryAlt size={ 23} /></span> <span>Offer Type</span>
                                  </div> 
                                 <div>
                                      <span>{tour.type }</span>
                                </div>
                              </div>
                            {/* <div className="py-1 w-full">
                            <hr />
                            </div> */}
                        
                        {/* <div className="flex w-full flex-row items-center justify-between">
                                  <div className="flex flex-row items-center gap-2">
                                      <span className="text-red-500"><FaPlaneArrival size={ 23} /></span> <span>End/Return</span>
                                  </div> 
                                  <div>
                                      <span>{tour.action }</span>
                                  </div>
                              </div>
                              <div className="py-1 w-full">
                            <hr />
                              </div> */}
                        
                        {/* <div className="flex w-full flex-row items-center justify-between">
                              <div className="flex flex-row items-center gap-2">
                                <span className="text-green-500"><GiWorld size={23 } /></span><span>Countries Explored:</span> 
                              </div>
                              <div>
                                 <span>{tour.days}</span>
                              </div>
                          </div>
                          <div className="px-1 w-full">
                          <hr />
                          </div> */}

                       {/* <div className="flex w-full flex-row items-center justify-between">
                                  <div className="flex flex-row items-center gap-2">
                                      <span className="text-orange-500"><FaPersonMilitaryToPerson size={ 23} /></span> <span>Tour Operator:</span>
                                  </div> 
                                  <div>
                                      <span>{tour.category }</span>
                                  </div>
                              </div>   */}
                        
                        {/* <div className="px-1 w-full">
                          <hr />
                          </div>

                       <div className="flex w-full flex-row items-center justify-between">
                                  <div className="flex flex-row items-center gap-2">
                                      <span className="text-lime-500"><IoIosPeople size={ 23} /></span> <span>Number Of Tourists:</span>
                                  </div> 
                                  <div>
                                      <span>{tour.offerprice }</span>
                                  </div>
                              </div>   */}
                        <div>
                                  
                        </div>
                          </div>
                
                          {tour.inclusion && tour.inclusion?.length > 0 && (
                              <div className="flex flex-col gap-5 items-start border-[1px] border-solid py-4 px-4 border-neutral-300 h-auto w-full rounded-lg">
                          
                                  <div className="flex w-full flex-row items-center justify-between">
                                      <div className="flex flex-row items-center gap-2">
                                          <span className="text-xl font-bold">Offer</span>
                                      </div>
                                  </div>
                                  <div className="py-1 w-full">
                                      <hr />
                                  </div>
                        
                                  <div className="flex w-full flex-row items-center justify-between">
                                      <div>
                                          <span className="text-md text-justify text-neutral-600">{tour.action}</span>
                                      </div>
                                  </div>
                                  <div>
                                  
                                  </div>
                              </div>
                          )}
                          

                     <div className="flex flex-col gap-5 items-start border-[1px] border-solid py-4 px-4 border-neutral-300 h-auto w-full rounded-lg">
                          
                        <div className="flex w-full flex-row items-center justify-between">
                                  <div className="flex flex-row items-center gap-2">
                                     <span className="text-xl font-bold">What is included in the Offer</span>
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
                    {/* {tour.action && tour.action.length > 0 && (
                              <div className="flex h-[65vh] flex-col gap-5 items-start border-[1px] border-solid py-4 px-4 border-neutral-300 w-full rounded-lg">
                                  <iframe
                                      src={tour?.action? tour?.action : ''}
                                      title="YouTube video player"
                                      frameBorder="0"
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                      allowFullScreen
                                      className="w-full h-full"
                                  ></iframe>
                              </div>
                     )}     */}
                  </div>

                      <div className="order-first-second order-first-second-one col-span-2" style={{ position: 'sticky', top: '10vh' }}>
                          <div className="border-neutral-300 pt-4 px-4 border-solid w-full rounded-lg h-auto border-[1px]" style={{ position: 'sticky', top: '10vh' }}>
                          <div className="flex flex-row px-4 justify-between item-center gap-3">
                              <div className="flex flex-row gap-3 justify-between items-center">
                                 <span className="text-blue-400"><GiTakeMyMoney size={23 } /></span><span>Price</span> 
                              </div>
                              <div className="flex flex-row gap-3 justify-between items-center">
                                 <span>Ksh. {tour.price}</span> <span></span>
                              </div>
                          </div>
                          <div className="px-4 py-3">
                          <hr />
                          </div>
                          <div className="flex flex-row px-4 justify-between item-center gap-3">
                              <div className="flex flex-row gap-3 justify-between items-center">
                                 <span className="text-green-400"><GiCash size={23 } /></span><span>Offer Price</span> 
                              </div>
                              <div className="flex flex-row gap-3 justify-between items-center">
                                 <span>Ksh. {tour.offerprice}</span> 
                              </div>
                          </div>
                          <div className="px-4 py-3">
                          <hr />
                          </div>
                          {/* <div className="flex flex-row px-4 justify-between item-center gap-3">
                              <div className="flex flex-row gap-3 justify-between items-center">
                                <span className="text-red-400"><ImLocation2 size={23 } /></span><span>Tour Ends</span> 
                              </div>
                              <div className="flex flex-row gap-3 justify-between items-center">
                                 <span>{tour.action}</span>
                              </div>
                          </div> */}
                          <div className="px-4 py-3">
                          </div>
                          {/* <TourInfo
                           locationValue={tour.category} /> */}
                          
                          <div className="px-4 py-3">
                          </div>
                          {/* <div className="flex flex-row px-4 justify-between item-center gap-3">
                              <div className="flex flex-row gap-3 justify-between items-center">
                                <span className="text-red-400"><GiTakeMyMoney size={23 } /></span><span>Price per person:</span> 
                              </div>
                              <div className="flex flex-row gap-3 justify-between items-center">
                                 <span>${tour.price}</span>
                              </div>
                          </div>
                          <div className="px-4 py-3">
                          <hr />
                          </div> */}
                          {/* {tour.action !== 0 && (
                              <div className="flex flex-row px-4 justify-between items-center gap-3">
                                  <div className="flex flex-row gap-3 justify-between items-center">
                                      <span className="text-green-400"><GiCash size={23} /></span><span>Price per room:</span>
                                  </div>
                                  <div className="flex flex-row gap-3 justify-between items-center">
                                      <span>${tour.action}</span>
                                  </div>
                              </div>
                          )} */}
                          {/* {tour.price !== 0 && (
                          <div className="px-4 py-3">
                          <hr />
                          </div>
                          )} */}
                          {/* {tour.offerprice !== 0 && (
                              <div className="flex flex-row px-4 justify-between item-center gap-3">
                                  <div className="flex flex-row gap-3 justify-between items-center">
                                      <span className="text-yellow-400"><GiReceiveMoney size={23} /></span><span>Save per person:</span>
                                  </div>
                                 
                                  <div className="flex flex-row gap-3 justify-between items-center">
                                      <span>${tour.offerprice}</span>
                                  </div>
                              </div>
                          )}
                          {tour.price !== 0 && (
                              <div className="px-4 py-3">
                                  <hr />
                              </div>
                          )} */}

        <div className="flex flex-col px-4 justify-between items-center gap-1">
        {error && <div className="text-red-400 text-sm pt-1">{error}</div>}
        <div className="flex flex-row items-center mt-2">
            <label htmlFor="guests" className="text-right mr-4 text-gray-700">
                Tourists:
            </label>
            <input
                id="guests"
                type="text"
                value={`${options.guests} Tourists`}
                // value={`${options.guests} Guests ${options.rooms} Rooms`}
                className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onClick={toggleOptions}
            />
        </div>

        {openoptions && (
            <div className="bg-white p-2 md:p-2 shadow-md w-full"> {/* Remove absolute positioning */}
                <div className="flex flex-col gap-3">
                    <div className="flex flex-row gap-3">
                        <span className="text-lg">Hotel Rooms(Optional): </span>
                        <div className="flex gap-3 items-center">
                            <button
                                className="border rounded-full py-1 px-3 focus:outline-none"
                                onClick={() => handleOptions("rooms", "d")}
                                disabled={options.rooms <= 0}
                            >
                                -
                            </button>
                            <span className="text-xl">{options.rooms}</span>
                            <button
                                className="border rounded-full py-1 px-3 focus:outline-none"
                                onClick={() => handleOptions("rooms", "i")}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-row gap-3">
                        <span className="text-lg">Tourists: </span>
                        <div className="flex gap-3 items-center">
                            <button
                                className="border rounded-full py-1 px-3 focus:outline-none"
                                onClick={() => handleOptions("guests", "d")}
                                disabled={options.guests <= 1}
                            >
                                -
                            </button>
                            <span className="text-xl">{options.guests}</span>
                            <button
                                className="border rounded-full py-1 px-3 focus:outline-none"
                                onClick={() => handleOptions("guests", "i")}
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}


        <hr />

        <div className="flex flex-col justify-center item-center gap-3">
             {options.guests > 0 && (
        <>
          {/* Conditionally render PayPal button only if requested slots are available */}
          {/* {options.guests <= (tour.guestCount - tour.tourists.length) ? (
            <button
              className="border-[1px] border-solid border-blue-500 hover:bg-blue-500 px-3 py-2 text-blue-600 rounded-2xl hover:text-white"
              onClick={() => {
                handlePaymentAmountSelect(calculateTotalPrice()); // Calculate total price including guests and rooms
                makeReservation(null); // Make reservation including guests and rooms count, pass null as data
                setShowPay(true); // Show payment modal
              }}
            >
              Pay Full Amount (${calculateTotalPrice()})
            </button>
          ) : (
            <div className="text-red-500">Tourists Slots available not enough for the number slots requested</div>
          )} */}
          
                                          {/* Button to pay $100 */}
         {/* {calculateTotalPrice() > 100 && options.guests <= (tour.guestCount - tour.tourists.length) ? (
            <button
                className="border-[1px] border-solid border-blue-500 hover:bg-blue-500 px-3 py-2 text-blue-600 rounded-2xl hover:text-white"
                onClick={() => {
                handlePaymentAmountSelect(100); // Select $100 predefined amount
                makeReservation(null); // Make reservation including guests and rooms count, pass null as data
                setShowPay(true); // Show payment modal
                }}
            >
                Book With $100
            </button>
            ) : (
            <div className="text-red-500"></div>
            )} */}
        </>
      )}
      {options.guests === 0 && (
        <div className="text-red-500">Please specify the number of tourists to place an order.</div>
      )}
        </div>
    </div>
             
        {showPay && <PayPalScriptProvider options={{ clientId: "ATNgosIlt76LLJdYbZjqNuhdI31gc3H_pV7mQa6h4CJ20Xz0F_O2zCDVlD_Xt91iHmftZ3cB4J2kiHS3" }}>
         {/* {showPay && <PayPalScriptProvider options={{ clientId: "AZ_ycPr5s3mAA-Xboaqc9ft8hHiaChcr42aZIauAYl3Ax0CDig8L3uc-V0P2Mgx70nQD4p7XKcTbCLBB" }}> */}
                              {/* <PaymentModal setShowPayModal={setShowPay} onPaymentComplete={handlePaymentComplete} totalPrice={totalPrice.toString()}/> */}
                              
                  <PaymentModal 
                        setShowPayModal={setShowPay} 
                        onPaymentComplete={handlePaymentComplete} 
                        totalPrice={selectedPaymentAmount.toString()} 
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