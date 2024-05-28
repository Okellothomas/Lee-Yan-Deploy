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

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import CSS for styling



const SearchMain = () => {
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState(null);

  return (  
    <div className="shadow-md 2xl:w-[850px] xl:w-[850px] border-[1px] border-solid border-neutral-300 bg-white rounded-full py-2 px-4 flex justify-between items-center gap-2">
              <div className="pl-4 items-center text-center hover:rounded-full hover:cursor-pointer">
                <p className="text-black">Where</p>
                <input type="text" placeholder="Search a place to stay" className="border-none outline-none" />
                

              </div>
              <hr className="h-[24px] w-[0.8px] bg-neutral-400 mx-auto"/>
                <div className="px-6 items-center text-center hover:bg-neutral-200 hover:rounded-full hover:cursor-pointer">
                <p className="text-black">Check In</p>
                <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
              </div>
              <hr className="h-[24px] w-[0.8px] bg-neutral-400 mx-auto"/>
               <div className="px-6 items-center text-center  hover:bg-neutral-200 hover:rounded-full hover:cursor-pointer">
                 <p className="text-black">Check out</p>
                 <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
                </div>
                <hr className="h-[24px] w-[0.8px] bg-neutral-400 mx-auto"></hr>
                <div className="px-6 items-center text-center  hover:bg-neutral-200 hover:rounded-full hover:cursor-pointer">
                 <p className="text-black">Who</p>
                <p className="text-neutral-400">Add guests</p>
                </div>
                <div className="px-4 items-center text-center">
                <button className="bg-neutral-500 p-[8px] rounded-full"><span className="text-white"><IoSearch size={22} /></span></button>
             </div>
    </div>
  )
}

export default SearchMain