'use client'
import { useState } from 'react';
import { GiAfrica } from "react-icons/gi";

interface Product {
  id: number;
  name: string;
  price: number;
  length: number;
}

interface ProductListProps {
  products: Product[];
}

const Continents: React.FC<ProductListProps> = ({ products }) => {
  const [sortOption, setSortOption] = useState<string>('popularity');
  const [sortDirection, setSortDirection] = useState<boolean>(true);
  const [maxPrice, setMaxPrice] = useState<number>(1000);

  const sortedProducts = (): Product[] => {
    const sorted = products
      .filter(product => product.price <= maxPrice)
      .slice()
      .sort((a, b) => {
        const multiplier = sortDirection ? 1 : -1;
        switch (sortOption) {
          case 'priceLowestFirst':
            return multiplier * (a.price - b.price);
          case 'priceHighestFirst':
            return multiplier * (b.price - a.price);
          case 'lengthShortestFirst':
            return multiplier * (a.length - b.length);
          case 'lengthLongestFirst':
            return multiplier * (b.length - a.length);
          default:
            // 'popularity' or default sorting
            return 0;
        }
      });
    return sorted;
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(parseInt(e.target.value));
  };

  return (
    <div className='bg-white outline-none shadow-md py-4 px-2 rounded-xl'>

      <span className=''>Your budget for the offer:</span>
      <div className='py-3'>
        <hr />
      </div>
      <div className='flex flex-col'>
        <p>Ksh 0 - Ksh {maxPrice}</p>
        <input
          type='range'
          min='0'
          max='980000000'
          value={maxPrice}
          onChange={handlePriceChange}
          className='w-full'
        />
      </div>
      <ul>
        {sortedProducts().map((product) => (
          <li key={product.id}>
            {product.name} - Price: ${product.price} - Length: {product.length} units
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Continents;
