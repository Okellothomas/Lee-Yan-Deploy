// import axios from 'axios';
// import React, { useState, useEffect, useRef } from 'react';
// import { IoLocationSharp } from "react-icons/io5";

// // Define the Tour interface
// interface Stay {
//   county: string;
//   town: string;
//   // Add other properties as needed
// }

// interface AutocompleteInputProps {
//   searchDestination: { town: string; county: string };
//   setSearchDestination: React.Dispatch<React.SetStateAction<CityCountry>>;
// }

// interface CityCountry {
//   town: string;
//   county: string;
// }

// const AutocompleteInput: React.FC<AutocompleteInputProps> = ({ searchDestination, setSearchDestination }) => {
//   const [countries, setCountries] = useState<string[]>([]);
//   const [cityCountry, setCityCountry] = useState<CityCountry[]>([]);
//   const [filteredCountries, setFilteredCountries] = useState<CityCountry[]>([]);
//   const [inputValue, setInputValue] = useState<string>('');
//   const [showDropdown, setShowDropdown] = useState<boolean>(false);
//   const inputRef = useRef<HTMLInputElement>(null);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node) &&
//         inputRef.current &&
//         !inputRef.current.contains(event.target as Node)
//       ) {
//         setShowDropdown(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   useEffect(() => {
//     // Fetch the tours data
//     axios
//       .get<Stay[]>('/api/stays')
//       .then((response) => {
//         const listings = response.data;

//         const uniqueCityCounties = Array.from(
//           new Map(listings.map(listing => [`${listing.town}-${listing.county}`, listing])).values()
//         );

//         setCityCountry(uniqueCityCounties);
//         setFilteredCountries(uniqueCityCounties);
//       })
//       .catch((error) => console.error(error));
//   }, []);

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const inputValue = event.target.value;
//     setInputValue(inputValue);

//     const filteredCityCountries = cityCountry.filter((cityCountry) => {
//       const searchTerm = inputValue.toLowerCase();
//       return (
//         cityCountry.town.toLowerCase().includes(searchTerm) ||
//         cityCountry.county.toLowerCase().includes(searchTerm)
//       );
//     });

//     setSearchDestination(filteredCityCountries.length > 0 ? { county: filteredCityCountries[0].county, town: filteredCityCountries[0].town } : { town: inputValue, county: inputValue });
//     setFilteredCountries(filteredCityCountries);
//   };

//   const handleInputFocus = () => {
//     setShowDropdown(true);
//   };

//   const handleCountryClick = (town: string, county: string) => {
//     setInputValue(`${town}, ${county}`);
//     setSearchDestination({ county, town });
//     setShowDropdown(false);
//   };

//   return (
//     <div ref={dropdownRef} className="relative">
//       <input
//         type="text"
//         value={inputValue}
//         onChange={handleInputChange}
//         onFocus={handleInputFocus}
//         placeholder="Search destinations"
//         ref={inputRef}
//         className="w-full px-4 py-2 rounded-md outline-none"
//       />
//       {showDropdown && (
//         <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
//           <ul className="py-2">
//             {filteredCountries.slice(0 , 5).map((country, index) => (
//               <div className='flex py-[7px] px-2 hover:bg-neutral-100 flex-row gap-1 items-center'>
//                 <div className='text-neutral-400'>
//                   <IoLocationSharp size={37} />
//                 </div>
//                 <div>
//                 <li
//                 key={index}
//                 onClick={() => handleCountryClick(country.town, country.county)}
//                 className="flex flex-col items-start justify-start"
//                  >
//                  <span>{country.town},</span> <span className="text-gray-500 text-sm">{country.county}</span>
//               </li>
//                 </div>
//               </div>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AutocompleteInput;

import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { IoLocationSharp } from "react-icons/io5";

// Define the Stay interface
interface Stay {
  county: string;
  town: string;
  // Add other properties as needed
}

interface AutocompleteInputProps {
  searchDestination: { town: string; county: string };
  setSearchDestination: React.Dispatch<React.SetStateAction<CityCountry>>;
}

interface CityCountry {
  town: string;
  county: string;
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({ searchDestination, setSearchDestination }) => {
  const [countries, setCountries] = useState<string[]>([]);
  const [cityCountry, setCityCountry] = useState<CityCountry[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<CityCountry[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
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
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Fetch the stays data
    axios
      .get<Stay[]>('/api/stays')
      .then((response) => {
        const listings = response.data;

        const uniqueCityCounties = Array.from(
          new Map(listings.map(listing => [`${listing.town}-${listing.county}`, listing])).values()
        );

        setCityCountry(uniqueCityCounties);
        setFilteredCountries(uniqueCityCounties);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);

    const filteredCityCountries = cityCountry.filter((cityCountry) => {
      const searchTerm = inputValue.toLowerCase();
      return (
        cityCountry.town.toLowerCase().includes(searchTerm) ||
        cityCountry.county.toLowerCase().includes(searchTerm)
      );
    });

    setSearchDestination(filteredCityCountries.length > 0 ? { county: filteredCityCountries[0].county, town: filteredCityCountries[0].town } : { town: inputValue, county: inputValue });
    setFilteredCountries(filteredCityCountries);
  };

  const handleInputFocus = () => {
    setShowDropdown(true);
  };

  const handleCountryClick = (town: string, county: string) => {
    setInputValue(`${town}, ${county}`);
    setSearchDestination({ county, town });
    setShowDropdown(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        placeholder="Search destinations"
        ref={inputRef}
        className="w-full px-4 py-2 rounded-md outline-none"
      />
      {showDropdown && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
          <ul className="py-2">
            {filteredCountries.slice(0, 5).map((country, index) => (
              <div key={`${country.town}-${country.county}`} className='flex py-[7px] px-2 hover:bg-neutral-100 flex-row gap-1 items-center'>
                <div className='text-neutral-400'>
                  <IoLocationSharp size={37} />
                </div>
                <div>
                  <li
                    key={index}
                    onClick={() => handleCountryClick(country.town, country.county)}
                    className="flex flex-col items-start justify-start"
                  >
                    <span>{country.town},</span> <span className="text-gray-500 text-sm">{country.county}</span>
                  </li>
                </div>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AutocompleteInput;




