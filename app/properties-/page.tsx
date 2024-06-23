'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import EmptyState from "@/app/components/container/EmptyState";
import StayMainCard from "@/app/components/listing/StayMainCard";
import Container from "@/app/components/container/Container";
import { useSearchParams } from 'next/navigation';
import CountyMainCard from "@/app/components/listing/CountyMainCard";
import Loader from "../components/container/Loader";
import CountyMainProperty from "../components/listing/CountyMainProperty";

interface IParams {
  tourId?: string;
  tourParams: any;
  county?: string; // Make county optional
}

export default function Stay({ tourParams }: IParams) {
  const searchParams = useSearchParams();
  const county = searchParams ? searchParams.get('county') : null;
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(12); // Initial visible count
  const [filters, setFilters] = useState({
    town: [],
    category: [],
    type: [],
    county: [],
    offers: [],
    ratings: [],
    amenities: []
  });
  const [sortOrder, setSortOrder] = useState(''); // State for sorting order
  const [expandedFilters, setExpandedFilters] = useState({
    town: false,
    category: false,
    type: false,
    county: false,
    offers: false,
    ratings: false,
    amenities: false,
  });

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get('/api/property', { params: { ...tourParams, type: 'sale' } });
        setTours(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [tourParams]);

  if (loading) return <div><Loader /></div>;
  if (error) return <div>Error: {error.message}</div>;

 const normalizedCounty = county ? county.toLowerCase() : ""; // Normalize county safely
 const listingsPremium = tours//.filter(listing => listing.county && listing.county.toLowerCase() === normalizedCounty);

  const filteredTours = listingsPremium.filter(tour => {
    return (
      (filters.town.length === 0 || filters.town.includes(tour.town)) &&
      (filters.county.length === 0 || filters.county.includes(tour.county)) &&
      (filters.category.length === 0 || filters.category.includes(tour.category)) &&
      (filters.type.length === 0 || filters.type.includes(tour.type)) &&
      (filters.offers.length === 0 || tour.offers.some(offer => filters.offers.includes(offer))) &&
      (filters.amenities.length === 0 || tour.amenities.some(offer => filters.amenities.includes(offer))) &&
      (filters.ratings.length === 0 || filters.ratings.includes(tour.ratings))
    );
  });

  const sortedTours = filteredTours.sort((a, b) => {
    if (sortOrder === 'lowest') {
      return a.price - b.price;
    } else if (sortOrder === 'highest') {
      return b.price - a.price;
    }
    return 0;
  });

  const visibleTours = sortedTours.slice(0, visibleCount);

  const towns = Array.from(new Set(listingsPremium.map(tour => tour.town)));
  const counties = Array.from(new Set(listingsPremium.map(tour => tour.county)));
  const categories = Array.from(new Set(listingsPremium.map(tour => tour.category)));
  const types = Array.from(new Set(listingsPremium.map(tour => tour.type)));
  const offers = Array.from(new Set(listingsPremium.flatMap(tour => tour.offers)));
  const amenities = Array.from(new Set(listingsPremium.flatMap(tour => tour.amenities)));
  const ratings = Array.from(new Set(listingsPremium.map(tour => tour.ratings)));

  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => {
      const currentFilters = prevFilters[filterType];
      if (currentFilters.includes(value)) {
        return { ...prevFilters, [filterType]: currentFilters.filter(item => item !== value) };
      } else {
        return { ...prevFilters, [filterType]: [...currentFilters, value] };
      }
    });
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const toggleExpand = (filterType) => {
    setExpandedFilters(prevState => ({ ...prevState, [filterType]: !prevState[filterType] }));
  };

  if (visibleTours.length === 0) {
    return <EmptyState showReset />;
  }

  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 12);
  };

  const renderFilters = (items, filterType) => {
    const visibleItems = expandedFilters[filterType] ? items : items.slice(0, 10);
    return (
      <div className="border-[1px] border-solid border-neutral-300 rounded-lg px-4 py-6">
        <h3 className="font-semibold">{filterType.charAt(0).toUpperCase() + filterType.slice(1)}</h3>
        <div className="py-1">
          <hr />
        </div>
        {visibleItems.map(item => (
          <div className="flex pt-1 items-center justify-start" key={item}>
            <label className="flex items-center">
              <input
                type="checkbox"
                value={item}
                className="mr-2 h-[20px] w-[20px]"
                onChange={() => handleFilterChange(filterType, item)}
              />
              <span className="mr-1">{item}</span>
            </label>
          </div>
        ))}
        {items.length > 10 && (
          <button className="text-green-700 hover:text-blue-700" onClick={() => toggleExpand(filterType)}>
            {expandedFilters[filterType] ? 'View Less' : 'View More'}
          </button>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="alldestinations-main flex flex-col items-center justify-center text-lg font-bold">
        <h1 className="alldestinations-white-main">
          <span className="text-white">Exclusive  {county || "properties"} on sales</span>
        </h1>
      </div>
      <Container>
        <div className="flex flex-row justify-between items-center pt-10 pb-3">
          <div className="flex font-bold flex-row gap-40 items-center">
            <div className="items-center py-2 pl-2 pr-6 sm:pr-1 text-start all-destination-filter">
              <p className="">Filter Results:</p>
            </div>
            <div className="font-semibold text-lg">{visibleTours.length} Properties</div>
          </div>
          <div>
            <select className="border-[1px] border-solid border-neutral-300 px-4 py-1 rounded-lg" onChange={handleSortChange} value={sortOrder}>
              <option value="">Sort by price</option>
              <option value="lowest">Price: Lowest to Highest</option>
              <option value="highest">Price: Highest to Lowest</option>
            </select>
          </div>
        </div>
      </Container>
      <Container>
        <div className="pt-0 items-start grid grid-cols-5 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-8">
          <div className="col-span-1 flex flex-col gap-6 all-destination-products">
            <div className="mt-2">{renderFilters(counties, 'county')}</div>
            <div className="mt-2">{renderFilters(towns, 'town')}</div>
            <div className="mt-2">{renderFilters(categories, 'category')}</div>
            <div className="mt-2">{renderFilters(amenities, 'amenities')}</div>
            {/* <div className="mt-2">{renderFilters(ratings, 'ratings')}</div> */}
            <div className="mt-2 sticky top-0">
              {renderFilters(types, 'type')}
            </div>
           </div>
           <div className="col-span-4 all-destination-tour-main-card">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-8 all-destination-tours">
              {visibleTours.map((tour: any) => (
                <CountyMainProperty
                  key={tour.id}
                  data={tour}
                />
              ))}
            </div>
            {visibleCount < filteredTours.length && (
              <div className="flex justify-center items-center mt-4">
                <button
                  onClick={loadMore}
                  className="mx-2 px-10 py-3 text-md border-[1px] border-solid border-green-900 text-green-900 hover:bg-green-900 rounded-lg hover:text-white"
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}