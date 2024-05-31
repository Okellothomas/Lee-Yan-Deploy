import getTours from '@/app/actions/getTours';
import { safeTour } from '@/app/types';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';

// Define the Tour interface
interface Tour {
  country: string;
  city: string;
  // Add other properties as needed
}

const countryList = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  // Add more countries here
];

interface AutocompleteInputProps {
  searchDestination:{city:string, country:string};
  setSearchDestination:React.Dispatch<React.SetStateAction<CityCountry>>;
}

interface CityCountry {
  city: string;
  country: string;
}


const AutocompleteInput: React.FC<AutocompleteInputProps> = ({searchDestination, setSearchDestination}) => {
  const [countries, setCountries] = useState<string[]>([]);
  const [cityCountry, setCityCountry] = useState<string[]>([]);
 const [filteredCountries, setFilteredCountries] = useState<CityCountry[]>([]);

 //const [filteredCountries, setFilteredCountries] = useState<string[]>(countryList);

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
    // Fetch the tours data
    axios
    .get<Tour[]>('/api/listings')
    .then((response) => {
      console.log("cities response", response) 
      const listings = response.data;
      // Extract the unique countries from the tours data
      const uniqueCountries = [...new Set(listings.map((listing) => listing.city))];

      const uniqueCityCountries = [...new Set(
        listings.map((listing) => ({
          city: listing.city,
          country: listing.country,
        }))
      )];


      setCityCountry(uniqueCityCountries) 
      setCountries(uniqueCountries);
    })
    .catch((error) => console.error(error));
    // getTours({})
    //   .then((tours) => {
    //     // Extract the unique countries from the tours data
    //     const uniqueCountries = [...new Set(tours.map((tour) => tour.country))].filter((country): country is string => country !== null);
    //     setCountries(uniqueCountries);
    //     console.log('Unique Countries', uniqueCountries)
    //   })
    //   .catch((error) => console.error(error));
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
    
    //const exactMatch = cityCountry.find((citCoun) => citCoun.city.toLowerCase() === inputValue);
  //setSearchDestination(exactMatch || {city:''});

    const filtered = countries.filter((country) =>
      country.toLowerCase().includes(inputValue.toLowerCase())
    );

  
    const filteredCityCountries = cityCountry.filter((cityCountry) => {
      const searchTerm = inputValue.toLowerCase();
      return (
        cityCountry.city.toLowerCase().includes(searchTerm) ||
        cityCountry.country.toLowerCase().includes(searchTerm)
      );
    });
    // setFilteredCountries(filtered);
  setSearchDestination(filteredCityCountries.length > 0 ? {country: filteredCityCountries[0].country, city: filteredCityCountries[0].city}: {city:inputValue, country:''});
    setFilteredCountries(filteredCityCountries);
  };

  const handleInputFocus = () => {
    setShowDropdown(true);
  };

  const handleInputBlur = () => {
    setShowDropdown(false);
  };

  const handleCountryClick = (city:string, country: string) => {
    setInputValue(city);
    setSearchDestination({country: country, city:city})
    setShowDropdown(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        placeholder="Enter a country"
        ref={inputRef}
        // className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        className="w-full px-4 py-2 rounded-md outline-none"

      />
      {showDropdown && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
          <ul className="py-2">
            {filteredCountries.map((country, index) => (
              <li
                key={index}
                onClick={() => handleCountryClick(country.city, country.country)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                 {country.city}, <span className="text-gray-500">{country.country}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AutocompleteInput;