'use client'
import Container from "@/app/components/container/Container"
import MainItem from "./MainItem"
import { useRouter } from "next/navigation"
import { BiSolidCar } from "react-icons/bi";
import { IoMdBoat } from "react-icons/io";
import { FaPersonSkiingNordic } from "react-icons/fa6";
import { GiSpeedBoat } from "react-icons/gi";
import { TfiMoreAlt } from "react-icons/tfi";
import { IoSearchOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";

import React, { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import './search.css'
import 'react-datepicker/dist/react-datepicker.css'; // Import CSS for styling
import AutocompleteInput from "@/app/components/forms/AutoCompleteInput";
import Link from "next/link";

 

const SearchMain = () => {
    const router = useRouter();
    const [checkinDate, setCheckinDate] = useState(null);
    const [checkoutDate, setCheckoutDate] = useState(null);

    const numberOfGuestsRef = useRef<HTMLInputElement>(null); 


    const[searchDestination, setSearchDestination]=useState(  {
        country: '',
        city: ''})

    const [options, setOptions] = useState(
      {
      guests: 0,
      rooms: 0}
  )


  
  const [openoptions, setOpenoptions] = useState(false)

    useEffect(()=>{
      console.log("CheckoutDate", checkoutDate)
      console.log("CheckinDate", checkinDate)
    }, [checkinDate, checkoutDate])


    const toggleOptions = () => {
      setOpenoptions(!openoptions)
  };

  const handleOptions = (name: 'guests' | 'rooms', operations: any) => {
      
    const guestsDets = {
        ...options,
        [name]: operations === 'i' ? options[name] + 1 : options[name] - 1,
    }

   

    
   // setTotalPrice(numberOfDays * listing.price*options.guests + options.rooms*(listing.save ||0));


setOptions((prev) => {
    return {
        ...prev,
        [name]: operations === 'i' ? options[name] + 1 : options[name] - 1,
    };
});

};

const inputRef = useRef<HTMLInputElement>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setOpenOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (  
    <div className="shadow-md 2xl:w-[1000px] xl:w-[1000px] border-[1px] border-solid border-neutral-300 bg-white rounded-full py-2 px-4 flex justify-between  items-center gap-2">
              <div className="pl-4 w-auto items-center text-center hover:rounded-full hover:cursor-pointer">
              <div className="flex flex-auto gap-4 items-center w-auto">
                  <IoSearchOutline size={24} className="flex-none" />
                      {/* <input
                          placeholder="Place to go ?"
                          type="text"
                          className="outline-none flex-auto"
                          onChange={(e)=>setSearchDestination(e.target.value)} 
                      />  */}
                      <AutocompleteInput searchDestination={searchDestination} setSearchDestination={setSearchDestination} />
                </div>

              </div>
              <hr className="h-[24px] w-[0.8px] bg-neutral-400 mx-auto"/>
                <div className="px-6 w-auto items-center text-center hover:bg-neutral-200 hover:rounded-full hover:cursor-pointer">
                <p className="text-black">Check In</p>
                <DatePicker selected={checkinDate} onChange={(date) => setCheckinDate(date)} minDate={new Date()} className="px-4 py-2 rounded-md outline-none"/>
              </div>
              <hr className="h-[24px] w-[0.8px] bg-neutral-400 mx-auto"/>
               <div className="px-6 items-center w-auto text-center   hover:rounded-full hover:cursor-pointer">
                 
               <DatePicker
                    selected={checkoutDate}
                    onChange={(date) => setCheckoutDate(date)}
                     minDate={new Date()}
                     className="px-4 py-2 rounded-md outline-none datepicker-label-up"
                    >
                         Checkout Date
                </DatePicker>

                </div>
                <hr className="h-[24px] w-[0.8px] bg-neutral-400 mx-auto"></hr>
               
                    

                <div className="flex flex-col px-2 justify-between item-center gap-1 relative">
               
               
                <div className="flex flex-row items-center mt-2" ref={dropdownRef}>
                    <label htmlFor="guests" className="text-right mr-4 text-gray-500">
                        Guests:
                    </label>
                    <input
                        id="guests"
                        type="text"
                        value={`${options.guests} Guests ${options.rooms} Rooms`}
                        className="shadow border rounded w-auto py-2 px-2 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                        onClick={toggleOptions}
                        ref={inputRef}
                        readOnly
                    />
                </div>
                {openoptions && (
                    <div className="listing-rooms-main-id bg-white p-5 md:p-7 shadow-md absolute top-full left-0 z-10" ref={numberOfGuestsRef}>
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-3">
                                <span className="text-lg">Rooms</span>
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

                            <div className="flex flex-col gap-3">
                                <span className="text-lg">Guests</span>
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
                                        onClick={() => {
                                            handleOptions("guests", "i");
                                            
                                        }}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>






                <div className="px-4 items-center text-center">
                <Link href={{ pathname: '/destination', query: { destination: searchDestination.city, country:searchDestination.country,  
                  checkinDate: checkinDate ? checkinDate.toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  }) : '',
                  checkoutDate: checkoutDate ? checkoutDate.toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  }) : '', } }}>
                <button className="bg-neutral-500 p-[8px] rounded-full"><span className="text-white"><IoSearch size={22} /></span></button>
               </Link>
             </div>
    </div>
  )
}

export default SearchMain