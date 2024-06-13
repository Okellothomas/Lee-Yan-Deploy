// 'use client'

// import { Range } from "react-date-range";
// import Calender from "../Inputs/Calender";
// import Button from "../container/Button";
// import React, { useState } from "react";

// interface ListingReservationProps {
//     price: number;
//     dateRange: Range;
//     totalPrice: number;
//     onChangeDate: (value: Range) => void;
//     onSubmit: (payAmount: number) => void;
//     disabled?: boolean;
//     disabledDates: Date[]
//     options: { guests: number; rooms: number };
//     setOptions: React.Dispatch<React.SetStateAction<any>>
//     setError: React.Dispatch<React.SetStateAction<any>>
//     openoptions: boolean;
//     error: string
//     setOpenOptions: React.Dispatch<React.SetStateAction<any>>
//     numberOfGuestsRef: any;
//     handleOptions: (name: 'guests' | 'rooms', operations: any) => void; // Define the handleOptions prop type
//     toggleOptions: () => void; // Define the toggleOptions prop type
// }

// const ListingReservation: React.FC<ListingReservationProps> = ({
//     price,
//     dateRange,
//     totalPrice,
//     onChangeDate,
//     onSubmit,
//     disabled,
//     disabledDates,
//     error,
//     setError,
//     options,
//     setOptions,
//     openoptions,
//     setOpenOptions,
//     numberOfGuestsRef,
//     handleOptions,
//     toggleOptions
// }) => {

//     const [guestsEntered, setGuestsEntered] = useState(false);
//     const [partialPay, setPartialPay] = useState(false);
//     const partialAmount = 100; // Define the partial amount

//     const handlePartialPay = () => {
//         setPartialPay(true);
//         onSubmit(partialAmount); // Call onSubmit with partialAmount
//     }

//     const handleFullPay = () => {
//         setPartialPay(false);
//         onSubmit(totalPrice); // Call onSubmit with totalPrice
//     }

//     return (
//         <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
//             <div className="flex flex-row items-center gap-1 p-4">
//                 <div className="text-2xpl font-semibold">
//                     $ {price}
//                 </div>
//                 <div className="font-light text-neutral-600">
//                     night
//                 </div>
//             </div>
//             <hr />
//             <Calender
//                 value={dateRange}
//                 disabledDates={disabledDates}
//                 onChange={(value) => onChangeDate(value.selection)}
//             />

//             <div className="flex flex-col px-4 justify-between item-center gap-1">
//                 {error && <div className="text-red-400 text-sm pt-1">{error}</div>}
//                 {!guestsEntered && (
//                     <div className="text-gray-700 mt-2">Please enter the number of guests to book</div>
//                 )}
//                 <div className="flex flex-row items-center mt-2">
//                     <label htmlFor="guests" className="text-right mr-4 text-gray-700">
//                         Guests:
//                     </label>
//                     <input
//                         id="guests"
//                         type="text"
//                         value={`${options.guests} Guests ${options.rooms} Rooms`}
//                         className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         onClick={toggleOptions}
//                         readOnly
//                     />
//                 </div>
//                 {openoptions && (
//                     <div className="listing-rooms-main-id bg-white p-5 md:p-7 shadow-md" ref={numberOfGuestsRef}>
//                         <div className="flex flex-col gap-3">
//                             <div className="flex flex-col gap-3">
//                                 <span className="text-lg">Rooms</span>
//                                 <div className="flex gap-3 items-center">
//                                     <button
//                                         className="border rounded-full py-1 px-3 focus:outline-none"
//                                         onClick={() => handleOptions("rooms", "d")}
//                                         disabled={options.rooms <= 0}
//                                     >
//                                         -
//                                     </button>
//                                     <span className="text-xl">{options.rooms}</span>
//                                     <button
//                                         className="border rounded-full py-1 px-3 focus:outline-none"
//                                         onClick={() => handleOptions("rooms", "i")}
//                                     >
//                                         +
//                                     </button>
//                                 </div>
//                             </div>

//                             <div className="flex flex-col gap-3">
//                                 <span className="text-lg">Guests</span>
//                                 <div className="flex gap-3 items-center">
//                                     <button
//                                         className="border rounded-full py-1 px-3 focus:outline-none"
//                                         onClick={() => handleOptions("guests", "d")}
//                                         disabled={options.guests <= 1}
//                                     >
//                                         -
//                                     </button>
//                                     <span className="text-xl">{options.guests}</span>
//                                     <button
//                                         className="border rounded-full py-1 px-3 focus:outline-none"
//                                         onClick={() => {
//                                             handleOptions("guests", "i");
//                                             setGuestsEntered(true);
//                                         }}
//                                     >
//                                         +
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>

//             {guestsEntered && (
//                 <>
//                     <div className="py-2">
//                       <hr />
//                     </div>

//                     <div className="flex flex-col justify-center item-center gap-3">
//                         <button
//                             className="border-[1px] border-solid border-blue-500 hover:bg-blue-500 px-3 py-2 text-blue-600 rounded-2xl hover:text-white"
//                             onClick={handleFullPay} // Call handleFullPay on full payment button click
//                         >
//                             Pay Full Amount ($ {totalPrice})
//                         </button>
//                         {totalPrice > partialAmount && !partialPay && (
//                             <button
//                                 className="border-[1px] border-solid border-blue-500 hover:bg-blue-500 px-3 py-2 text-blue-600 rounded-2xl hover:text-white"
//                                 onClick={handlePartialPay} // Call handlePartialPay on partial payment button click
//                             >
//                                 Partial Pay($ {partialAmount})
//                             </button>
//                         )}
//                     </div>
//                 </>
//             )}

//             <hr />

//             <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
//                 <div>
//                     Total
//                 </div>
//                 <div>
//                     $ {totalPrice}
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ListingReservation;
'use client'
import React, { useState } from "react";
<<<<<<< HEAD
// import CalendarComponent from "../Inputs/CalendarComponent";
import Button from "../container/Button";
import CalendarComponent from "../Inputs/Calender";
=======
import axios from "axios";
import toast from "react-hot-toast";
>>>>>>> c287d19ade2f206371ec594f1032101e98d72b17

interface ListingReservationProps {
    price: number;
    totalPrice: number;
    onSubmit: (payAmount: number) => void;
    disabled?: boolean;
    disabledDates: Date[];
    options: { guests: number; rooms: number };
    setOptions: React.Dispatch<React.SetStateAction<any>>;
    setError: React.Dispatch<React.SetStateAction<any>>;
    openoptions: boolean;
    error: string;
    setOpenOptions: React.Dispatch<React.SetStateAction<any>>;
    numberOfGuestsRef: any;
<<<<<<< HEAD
    handleOptions: (name: 'guests' | 'rooms', operations: any) => void;
    toggleOptions: () => void;
=======
    handleOptions: (name: 'guests' | 'rooms', operations: any) => void; // Define the handleOptions prop type
    handleUnavailableDates:()=>void;
    toggleOptions: () => void; // Define the toggleOptions prop type
>>>>>>> c287d19ade2f206371ec594f1032101e98d72b17
}

const ListingReservation: React.FC<ListingReservationProps> = ({
    price,
    totalPrice,
    onSubmit,
    disabled,
    disabledDates,
    error,
    setError,
    options,
    setOptions,
    openoptions,
    setOpenOptions,
    numberOfGuestsRef,
    handleOptions,
    handleUnavailableDates,
    toggleOptions
}) => {

    const [selectedDates, setSelectedDates] = useState<Date[]>([]);
    const [guestsEntered, setGuestsEntered] = useState(false);
    const [partialPay, setPartialPay] = useState(false);
    const partialAmount = 100;

    const handlePartialPay = () => {
        setPartialPay(true);
        onSubmit(partialAmount);
    };

    const handleFullPay = () => {
        setPartialPay(false);
        onSubmit(totalPrice);
    };

    const disableSelectedDates = () => {
        setSelectedDates([]);
    };


    return (
        <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
            <div className="flex flex-row items-center gap-1 p-4">
                <div className="text-2xpl font-semibold">
                    $ {price}
                </div>
                <div className="font-light text-neutral-600">
                    night
                </div>
            </div>
            <hr />
            <CalendarComponent
                selectedDates={selectedDates}
                onChange={setSelectedDates}
                disabledDates={disabledDates}
            />

            <div className="flex flex-col px-4 justify-between item-center gap-1">
                {error && <div className="text-red-400 text-sm pt-1">{error}</div>}
                <button
                                        className="border rounded-full py-1 px-3 focus:outline-none"
                                        onClick={handleUnavailableDates}
                                        
                                    >
                                        Mark selected dates unavailable
                                    </button>
                {!guestsEntered && (
                    <div className="text-gray-700 mt-2">Please enter the number of guests to book</div>
                )}
                <div className="flex flex-row items-center mt-2">
                    <label htmlFor="guests" className="text-right mr-4 text-gray-700">
                        Guests:
                    </label>
                    <input
                        id="guests"
                        type="text"
                        value={`${options.guests} Guests ${options.rooms}`}
                        className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onClick={toggleOptions}
                        readOnly
                    />
                </div>
                {openoptions && (
                    <div className="listing-rooms-main-id bg-white p-5 md:p-7 shadow-md" ref={numberOfGuestsRef}>
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
                                            setGuestsEntered(true);
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

            {guestsEntered && (
                <>
                    <div className="py-2">
                      <hr />
                    </div>

                    <div className="flex flex-col justify-center item-center gap-3">
                        <button
                            className="border-[1px] border-solid border-blue-500 hover:bg-blue-500 px-3 py-2 text-blue-600 rounded-2xl hover:text-white"
                            onClick={handleFullPay}
                        >
                            Pay Full Amount ($ {totalPrice})
                        </button>
                        {totalPrice > partialAmount && !partialPay && (
                            <button
                                className="border-[1px] border-solid border-blue-500 hover:bg-blue-500 px-3 py-2 text-blue-600 rounded-2xl hover:text-white"
                                onClick={handlePartialPay}
                            >
                                Partial Pay($ {partialAmount})
                            </button>
                        )}
                    </div>
                </>
            )}

            <button
                className="mt-4 mb-4 ml-4 mr-4 p-2 bg-red-500 text-white rounded"
                onClick={disableSelectedDates}
                disabled={selectedDates.length === 0}
            >
                Disable Selected Dates
            </button>

            <hr />

            <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
                <div>
                    Total
                </div>
                <div>
                    $ {totalPrice}
                </div>
            </div>
        </div>
    );
};

export default ListingReservation;




// 'use client';

// import React, { useState, useEffect, useRef } from "react";
// import "react-dates/lib/css/_datepicker.css";
// import Button from "../container/Button";
// import getCurrentUser from "@/app/actions/getCurrentUsers";
// import { DateRangePicker, RangeKeyDict } from 'react-date-range';
// import { Range } from 'react-date-range';
// import moment, { Moment } from 'moment';

// interface ListingReservationProps {
//     price: number;
//     dateRange: Range;
//     totalPrice: number;
//     onChangeDate: (value: Range) => void;
//     onSubmit: (payAmount: number) => void;
//     disabled?: boolean;
//     disabledDates: Date[];
//     options: { guests: number; rooms: number };
//     setOptions: React.Dispatch<React.SetStateAction<any>>;
//     setError: React.Dispatch<React.SetStateAction<any>>;
//     openoptions: boolean;
//     error: string;
//     setOpenOptions: React.Dispatch<React.SetStateAction<any>>;
//     numberOfGuestsRef: React.RefObject<HTMLDivElement>;
//     handleOptions: (name: 'guests' | 'rooms', operations: any) => void;
//     toggleOptions: () => void;
// }

// const ListingReservation: React.FC<ListingReservationProps> = ({
//     price,
//     dateRange,
//     totalPrice,
//     onChangeDate,
//     onSubmit,
//     disabled,
//     disabledDates,
//     error,
//     setError,
//     options,
//     setOptions,
//     openoptions,
//     setOpenOptions,
//     numberOfGuestsRef,
//     handleOptions,
//     toggleOptions
// }) => {
//     const [currentUser, setCurrentUser] = useState<any>(null);
//     const [startDate, setStartDate] = useState<Moment | null>(null);
//     const [endDate, setEndDate] = useState<Moment | null>(null);
//     const [focusedInput, setFocusedInput] = useState<"startDate" | "endDate" | null>(null);
//     const [selectedDates, setSelectedDates] = useState<Moment[]>([]);
//     const [guestsEntered, setGuestsEntered] = useState(false);
//     const [partialPay, setPartialPay] = useState(false);
//     const partialAmount = 100; // Define the partial amount

//     useEffect(() => {
//         const fetchCurrentUser = async () => {
//             const user: any = await getCurrentUser();
//             setCurrentUser(user);
//             if (user.userType === "admin" || user.userType === "operator") {
//                 setSelectedDates(disabledDates.map(date => moment(date)));
//             }
//         };
//         fetchCurrentUser();
//     }, [disabledDates]);

//     const handleDatesChange = (ranges: RangeKeyDict) => {
//         const { selection } = ranges;
//         const { startDate, endDate } = selection;

//         if (currentUser?.userType !== "admin" && currentUser?.userType !== "operator") {
//             const startMoment = moment(startDate);
//             const endMoment = moment(endDate);
//             setStartDate(startMoment);
//             setEndDate(endMoment);

//             if (startMoment && endMoment) {
//                 const dates: Moment[] = [];
//                 let currentDate = startMoment.clone();
//                 while (currentDate.isSameOrBefore(endMoment, 'day')) {
//                     dates.push(currentDate.clone());
//                     currentDate.add(1, 'days');
//                 }
//                 setSelectedDates(dates);
//                 onChangeDate({ startDate: startMoment.toDate(), endDate: endMoment.toDate(), key: 'selection' });
//             }
//         }
//     };

//     const handleDateClick = (date: Moment) => {
//         if (currentUser?.userType !== "admin" && currentUser?.userType !== "operator") {
//             const updatedDates = selectedDates.some(d => d.isSame(date, 'day'))
//                 ? selectedDates.filter(d => !d.isSame(date, 'day'))
//                 : [...selectedDates, date];
//             setSelectedDates(updatedDates);
//             onChangeDate({ startDate: updatedDates[0].toDate(), endDate: updatedDates[updatedDates.length - 1].toDate(), key: 'selection' });
//         }
//     };

//     const isDayBlocked = (day: Moment) => {
//         return selectedDates.some(date => date.isSame(day, 'day'));
//     };

//     const handlePartialPay = () => {
//         setPartialPay(true);
//         onSubmit(partialAmount); // Call onSubmit with partialAmount
//     };

//     const handleFullPay = () => {
//         setPartialPay(false);
//         onSubmit(totalPrice); // Call onSubmit with totalPrice
//     };

//     return (
//         <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
//             <div className="flex flex-row items-center gap-1 p-4">
//                 <div className="text-2xl font-semibold">
//                     $ {price}
//                 </div>
//                 <div className="font-light text-neutral-600">
//                     night
//                 </div>
//             </div>
//             <hr />
//             <div className="p-4">
//                 <DateRangePicker
//                     ranges={[{ startDate: startDate?.toDate(), endDate: endDate?.toDate(), key: 'selection' }]}
//                     onChange={handleDatesChange}
//                     focusedRange={focusedInput ? [0, focusedInput === 'startDate' ? 0 : 1] : [0, 0]}
//                     onRangeFocusChange={(focusedRange) => {
//                         setFocusedInput(focusedRange[1] === 0 ? 'startDate' : 'endDate');
//                     }}
//                     disabledDates={disabledDates}
//                     numberOfMonths={1}
//                     minDate={new Date()}
//                     rangeColors={["#3ecf8e"]}
//                 />
//             </div>

//             <div className="flex flex-col px-4 justify-between item-center gap-1">
//                 {error && <div className="text-red-400 text-sm pt-1">{error}</div>}
//                 {!guestsEntered && (
//                     <div className="text-gray-700 mt-2">Please enter the number of guests to book</div>
//                 )}
//                 <div className="flex flex-row items-center mt-2">
//                     <label htmlFor="guests" className="text-right mr-4 text-gray-700">
//                         Guests:
//                     </label>
//                     <input
//                         id="guests"
//                         type="text"
//                         value={`${options.guests} Guests ${options.rooms} Rooms`}
//                         className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         onClick={toggleOptions}
//                         readOnly
//                     />
//                 </div>
//                 {openoptions && (
//                     <div className="listing-rooms-main-id bg-white p-5 md:p-7 shadow-md" ref={numberOfGuestsRef}>
//                         <div className="flex flex-col gap-3">
//                             <div className="flex flex-col gap-3">
//                                 <span className="text-lg">Rooms</span>
//                                 <div className="flex gap-3 items-center">
//                                     <button
//                                         className="border rounded-full py-1 px-3 focus:outline-none"
//                                         onClick={() => handleOptions("rooms", "d")}
//                                         disabled={options.rooms <= 0}
//                                     >
//                                         -
//                                     </button>
//                                     <span className="text-xl">{options.rooms}</span>
//                                     <button
//                                         className="border rounded-full py-1 px-3 focus:outline-none"
//                                         onClick={() => handleOptions("rooms", "i")}
//                                     >
//                                         +
//                                     </button>
//                                 </div>
//                             </div>

//                             <div className="flex flex-col gap-3">
//                                 <span className="text-lg">Guests</span>
//                                 <div className="flex gap-3 items-center">
//                                     <button
//                                         className="border rounded-full py-1 px-3 focus:outline-none"
//                                         onClick={() => handleOptions("guests", "d")}
//                                         disabled={options.guests <= 1}
//                                     >
//                                         -
//                                     </button>
//                                     <span className="text-xl">{options.guests}</span>
//                                     <button
//                                         className="border rounded-full py-1 px-3 focus:outline-none"
//                                         onClick={() => {
//                                             handleOptions("guests", "i");
//                                             setGuestsEntered(true);
//                                         }}
//                                     >
//                                         +
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>

//             {guestsEntered && (
//                 <>
//                     <div className="py-2">
//                       <hr />
//                     </div>

//                     <div className="flex flex-col justify-center item-center gap-3">
//                         <button
//                             className="border-[1px] border-solid border-blue-500 hover:bg-blue-500 px-3 py-2 text-blue-600 rounded-2xl hover:text-white"
//                             onClick={handleFullPay} // Call handleFullPay on full payment button click
//                         >
//                             Pay Full Amount ($ {totalPrice})
//                         </button>
//                         {totalPrice > partialAmount && !partialPay && (
//                             <button
//                                 className="border-[1px] border-solid border-blue-500 hover:bg-blue-500 px-3 py-2 text-blue-600 rounded-2xl hover:text-white"
//                                 onClick={handlePartialPay} // Call handlePartialPay on partial payment button click
//                             >
//                                 Partial Pay($ {partialAmount})
//                             </button>
//                         )}
//                     </div>
//                 </>
//             )}

//             <hr />

//             <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
//                 <div>
//                     Total
//                 </div>
//                 <div>
//                     $ {totalPrice}
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ListingReservation;
