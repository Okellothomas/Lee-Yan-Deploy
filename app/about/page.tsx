import getListings, { IListingsParams } from "../actions/getListings";
import Container from "../components/container/Container";
import Link from "next/link";
import getTours, { IToursParams } from "../actions/getTours";
import { Metadata } from "next";
import stay from "../../public/images/naivaha.jpg"
import land from "../../public/images/lend5.jpg"
import sale from "../../public/images/bq.png"
import offer from "../../public/images/ps1.jpeg"
import offers from "../../public/images/mainback.jpg"
import Image from "next/image";


// Define the interface for the Home component props
interface HotelPageProps {
    searchParams: IListingsParams; // Search parameters for fetching listings
    tourParams: IToursParams;
}

export const metadata: Metadata = {
  title: "Hotel",
}

// Home component is defined as an asynchronous function
const DestinationPage = async ({ searchParams, tourParams }: HotelPageProps) => {

  // Render the Home component with the fetched listings
  return (
    <div>
      <div className="all-destinations-main-about flex flex-col items-center justify-center text-lg font-bold">
        <h1 className="text-3xl font-bold mt-[52px] text-white"> About Us </h1>
      </div>
      <div className="pt-8 pb-0">
        <div>
          <Container>
            <div className="pb-[92px]">
              <div className="pb-6">
                <h1 className="mb-2 text-2xl font-semibold text-black">Stay collections</h1>
                <p className="text-neutral-600">We offer curated handpicked selection of exceptional accommodations stays and experiences.</p>
              </div>
              <div className="flex justify-between gap-2">
                <div className="relative w-[44%] group">
                  <div className="relative">
                    <Image
                      height={200}
                      width={200}
                      alt="Listing"
                      src="https://res.cloudinary.com/dqibclcaq/image/upload/v1719464130/i5xpwcxv6q3gaaaovtfb.png"
                      className="object-cover rounded-xl border-t-[5px] border-solid border-green-700 h-auto w-full"
                    />
                    <div className="absolute inset-0 rounded-xl bg-black opacity-60"></div>
                  </div>
                  <Image
                    height={200}
                    width={200}
                    alt="Overlay"
                    src="https://res.cloudinary.com/dqibclcaq/image/upload/v1719464130/i5xpwcxv6q3gaaaovtfb.png"
                    className="absolute top-11 left-12 rounded-xl border-b-[5px] border-solid border-green-700   h-auto w-full transform transition-transform duration-300 group-hover:translate-y-[-10px]"
                  />
                </div>
                <div className="w-[50%]">
                  <p className="text-justify leading-9 mb-4">Lee-Yan Smart Properties offers a curated selection of exceptional accommodations designed to cater to your accommodation needs. From chic urban apartments in bustling towns centers to cozy countryside cottages, luxurious beachfront villas, and rustic mountain cabins, we offer a diverse range of options. Our collection includes boutique hotels, spacious family homes, romantic getaways for couples, and unique stays like treehouses and houseboats. Each property in our collection is handpicked to ensure comfort, style, and unforgettable experiences, no matter your preference or destination.</p>
                  <Link href="/stay-s" className="px-6 py-2 mt-6 text-green-700 rounded-xl border-[1px] border-solid border-green-700 hover:bg-green-700 hover:text-white">View all stays</Link>
                </div>
              </div>
            </div> 
          </Container>  
        </div>
        <div className="first-card-main pt-10 pb-[92px]">
          <Container>
            <div className="">
              <div className="pb-6">
                <h1 className="mb-2 text-2xl font-semibold text-black">Property rentals collections</h1>
                <p className="text-neutral-600">Explore our diverse rental options of top-quality properties.</p>
              </div>
              <div className="flex justify-between gap-2">
                <div className="w-[50%]">
                  <p className="text-justify leading-9 mb-4">Lee-Yan Smart Properties offers a curated selection of exceptional accommodations designed to cater to your accommodation needs. From chic urban apartments in bustling towns centers to cozy countryside cottages, luxurious beachfront villas, and rustic mountain cabins, we offer a diverse range of options. Our collection includes boutique hotels, spacious family homes, romantic getaways for couples, and unique stays like treehouses and houseboats. Each property in our collection is handpicked to ensure comfort, style, and unforgettable experiences, no matter your preference or destination.</p>
                  <Link href="/properties" className="px-6 py-2 mt-6 text-green-700 rounded-xl border-[1px] border-solid border-green-700 hover:bg-green-700 hover:text-white">View all property rentals</Link>
                </div>
                <div className="relative w-[47%] group">
                  <div className="relative">
                    <Image
                      height={200}
                      width={200}
                      alt="Listing"
                      src="https://res.cloudinary.com/dqibclcaq/image/upload/v1719427038/ttaudr3g5uguub9w3d1j.jpg"
                      className="object-cover rounded-xl border-t-[5px] border-solid border-green-700 h-auto w-full"
                    />
                    <div className="absolute inset-0 rounded-xl bg-black opacity-60"></div>
                  </div>
                  <Image
                    height={200}
                    width={200}
                    alt="Overlay"
                    src="https://res.cloudinary.com/dqibclcaq/image/upload/v1719427038/ttaudr3g5uguub9w3d1j.jpg"
                    className="absolute top-11 left-12 rounded-xl border-b-[5px] border-solid border-green-700   h-auto w-full transform transition-transform duration-300 group-hover:translate-y-[-10px]"
                  />
                </div>
              </div>
            </div> 
          </Container>  
        </div>
        <div>
          <Container>
            <div className="pt-10 pb-[92px]">
              <div className="pb-6">
                <h1 className="mb-2 text-2xl font-semibold text-black">Land Collections</h1>
                <p className="text-neutral-600">Prime parcels: Explore our diverse selection of exceptional land opportunities.</p>
              </div>
              <div className="flex justify-between gap-2">
                <div className="relative w-[44%] group">
                  <div className="relative">
                    <Image
                      height={200}
                      width={200}
                      alt="Listing"
                      src="https://res.cloudinary.com/dqibclcaq/image/upload/v1719427153/amejr1c4iqsl8kbgkkc5.jpg"
                      className="object-cover rounded-xl border-t-[5px] border-solid border-green-700 h-auto w-full"
                    />
                    <div className="absolute inset-0 rounded-xl bg-black opacity-60"></div>
                  </div>
                  <Image
                    height={200}
                    width={200}
                    alt="Overlay"
                    src="https://res.cloudinary.com/dqibclcaq/image/upload/v1719427153/amejr1c4iqsl8kbgkkc5.jpg"
                    className="absolute top-11 left-12 rounded-xl border-b-[5px] border-solid border-green-700   h-auto w-full transform transition-transform duration-300 group-hover:translate-y-[-10px]"
                  />
                </div>
                <div className="w-[50%]">
                  <p className="text-justify leading-9 mb-4">We feature a diverse array of prime parcels for discerning investors and developers. Our portfolio includes picturesque countryside acreage, fertile agricultural plots, and strategically located urban lots primed for development. From expansive beachfront properties to serene mountain retreats, we offer land suitable for various purposes. Whether you&lsquo;re looking to build a residential community, commercial complex, or private estate, our collection has the perfect canvas for your vision. Each parcel in our Land Collections is carefully selected for its potential, location, and value, ensuring exceptional opportunities for growth and investment.</p>
                  <Link href="/land" className="px-6 py-2 mt-6 text-green-700 rounded-xl border-[1px] border-solid border-green-700 hover:bg-green-700 hover:text-white">View all land collections</Link>
                </div>
              </div>
            </div> 
          </Container>  
        </div>
        <div className="first-card-main pt-10 pb-[92px]">
          <Container>
            <div className="">
              <div className="pb-6">
                <h1 className="mb-2 text-2xl font-semibold text-black">Property sales collections</h1>
                <p className="text-neutral-600">Premium properties for sale: Explore our diverse selection of exceptional homes.</p>
              </div>
              <div className="flex justify-between gap-2">
                <div className="w-[50%]">
                  <p className="text-justify leading-9 mb-4">We also feature an impressive array of exceptional homes and investments. Our diverse portfolio includes modern city apartments, spacious suburban houses, and luxurious beachfront villas. From cozy starter homes to expansive family estates, we offer properties to suit every lifestyle and budget. Our collection also features unique finds such as charming countryside cottages, sleek penthouses with panoramic views, and historic townhouses full of character. Each property in our sales collection is carefully selected for its quality, location, and potential, ensuring valuable opportunities for homeowners and investors alike.</p>
                  <Link href="/properties" className="px-6 py-2 mt-6 text-green-700 rounded-xl border-[1px] border-solid border-green-700 hover:bg-green-700 hover:text-white">View all property sales</Link>
                </div>
                <div className="relative w-[47%] group">
                  <div className="relative">
                    <Image
                      height={200}
                      width={200}
                      alt="Listing"
                      src="https://res.cloudinary.com/dqibclcaq/image/upload/v1719427212/hnunwzhklfyz66aexf8u.jpg"
                      className="object-cover rounded-xl border-t-[5px] border-solid border-green-700 h-auto w-full"
                    />
                    <div className="absolute inset-0 rounded-xl bg-black opacity-60"></div>
                  </div>
                  <Image
                    height={200}
                    width={200}
                    alt="Overlay"
                    src="https://res.cloudinary.com/dqibclcaq/image/upload/v1719427212/hnunwzhklfyz66aexf8u.jpg"
                    className="absolute top-11 left-12 rounded-xl border-b-[5px] border-solid border-green-700   h-auto w-full transform transition-transform duration-300 group-hover:translate-y-[-10px]"
                  />
                </div>
              </div>
            </div> 
          </Container>  
        </div>
        <div>
          <Container>
            <div className="py-10">
              <div className="pb-6">
                <h1 className="mb-2 text-2xl font-semibold text-black">Offer Collections</h1>
                <p className="text-neutral-600">Exclusive deals: Explore our curated selection of special property opportunities.</p>
              </div>
              <div className="flex justify-between gap-2">
                <div className="relative w-[44%] group">
                  <div className="relative">
                    <Image
                      height={200}
                      width={200}
                      alt="Listing"
                      src="https://res.cloudinary.com/dqibclcaq/image/upload/v1719427178/exkchi4blmmj6i7g165o.jpg"
                      className="object-cover rounded-xl border-t-[5px] border-solid border-green-700 h-auto w-full"
                    />
                    <div className="absolute inset-0 rounded-xl bg-black opacity-60"></div>
                  </div>
                  <Image
                    height={200}
                    width={200}
                    alt="Overlay"
                    src="https://res.cloudinary.com/dqibclcaq/image/upload/v1719427178/exkchi4blmmj6i7g165o.jpg"
                    className="absolute top-11 left-12 rounded-xl border-b-[5px] border-solid border-green-700   h-auto w-full transform transition-transform duration-300 group-hover:translate-y-[-10px]"
                  />
                </div>
                <div className="w-[50%]">
                  <p className="text-justify leading-9 mb-4">For stays, enjoy discounted rates on luxurious vacation rentals, from beachfront villas to urban apartments. Our property sales offers include reduced prices on select homes, from cozy condos to spacious family houses. Take advantage of special rates on long-term rentals, ranging from city lofts to suburban residences. For land enthusiasts, we offer limited-time deals on prime parcels, including urban lots and rural acreage. Each offer in our collection represents unparalleled value, carefully curated to meet various needs and budgets.</p>
                  <Link href="/offers" className="px-6 py-2 mt-6 text-green-700 rounded-xl border-[1px] border-solid border-green-700 hover:bg-green-700 hover:text-white">View all land collections</Link>
                </div>
              </div>
            </div> 
          </Container>  
        </div>
      </div>
    </div>
  );
};

export default DestinationPage;
