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
        county: '',
        town: ''})

    const [options, setOptions] = useState(
      {
      adults: 1,
      children:0,
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

  const handleOptions = (name: 'adults' |'children' | 'rooms', operations: any) => {
      
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
        setOpenoptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (  
    <div className="shadow-md 2xl:w-[900px] xl:w-[900px] border-[1px] border-solid border-neutral-300 bg-white rounded-full py-2 px-4 flex justify-center items-center">
              <div className="pl-4 w-auto items-center text-center hover:rounded-full hover:cursor-pointer">
              <div className="flex flex-auto gap-4 items-center w-auto">
                  {/* <IoSearchOutline size={24} className="flex-none" /> */}
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
                <div className="w-auto items-center text-center hover:rounded-full hover:cursor-pointer">
                <label htmlFor="checkin-date" className="text-md hover:cursor-pointer">Check In</label>
                <DatePicker id="checkin-date" autoComplete="off" selected={checkinDate} onChange={(date) => setCheckinDate(date)} placeholderText="Add date in" minDate={new Date()} className="hover:cursor-pointer outline-none text-center rounded-bl-lg rounded-br-lg items-center"/>
                </div>
              <hr className="h-[24px] w-[0.8px] bg-neutral-400 mx-auto"/>
               <div className="items-center w-auto text-center  hover:rounded-full hover:cursor-pointer">
              <label htmlFor="checkout-date" className="text-md hover:cursor-pointer">Check Out</label>
              <DatePicker
                   id="checkout-date"
                    selected={checkoutDate}
                    onChange={(date) => setCheckoutDate(date)}
                    minDate={new Date()}
                    placeholderText="Add date out"
                    autoComplete="off"
                    className="hover:cursor-pointer outline-none text-center rounded-bl-lg rounded-br-lg items-center"
                    >
                </DatePicker>
                </div>
                <hr className="h-[24px] w-[0.8px] bg-neutral-400 mx-auto"></hr>
                <div className="flex flex-col px-2 justify-between item-center gap-1 relative">
               
               
                <div className="flex flex-row items-center mt-2 " ref={dropdownRef}>
                    {/* <label htmlFor="guests" className="text-right mr-4 text-gray-500">   shadow border rounded
                        Guests:
                    </label> */}
                    <input
                        id="guests"
                        type="text"
                        value={`${options.adults} adults ${options.children} children ${options.rooms} Rooms`}
                        className="w-auto py-2 px-2 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
                        onClick={toggleOptions}
                        ref={inputRef}
                        readOnly
                    />
                
                {openoptions && (
                    <div className="listing-rooms-main-id bg-white p-5 md:p-7 shadow-md absolute top-full left-0 z-10" ref={numberOfGuestsRef}>
                        <div className="flex flex-col gap-3">
                            

                            <div className="flex flex-row gap-3">
                                <span className="text-lg">Adults  </span>
                                <div className="flex gap-3 items-center">
                                    <button
                                        className="border border-#FDAB08 rounded-full py-1 px-3 focus:outline-none"
                                        onClick={() => handleOptions("adults", "d")}
                                        disabled={options.adults <= 1}
                                    >
                                        -
                                    </button>
                                    <span className="text-xl">{options.adults}</span>
                                    <button
                                        className="border border-#FDAB08 rounded-full py-1 px-3 focus:outline-none"
                                        onClick={() => {
                                            handleOptions("adults", "i");
                                            
                                        }}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-row gap-3">
                                <span className="text-lg">Children</span>
                                <div className="flex gap-3 items-center">
                                    <button
                                        className="border rounded-full py-1 px-3 focus:outline-none"
                                        onClick={() => handleOptions("children", "d")}
                                        disabled={options.children <= 0}
                                    >
                                        -
                                    </button>
                                    <span className="text-xl">{options.children}</span>
                                    <button
                                        className="border rounded-full py-1 px-3 focus:outline-none"
                                        onClick={() => handleOptions("children", "i")}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-row gap-3">
                                <span className="text-lg">Rooms   </span>
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
                        </div>
                    </div>
                )}
                </div>
            </div>






                <div className="px-4 items-center text-center">
                <Link href={{ pathname: '/destination', query: { destination: searchDestination.town, county:searchDestination?.county,adults:options.adults, children:options.children, rooms:options.rooms,  
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