
import getCurrentUser from "./actions/getCurrentUsers";
import getListings, { IListingsParams } from "./actions/getListings";
import getTours, { IToursParams } from "./actions/getTours";
import Carousel from "./components/container/Carousel";
import Container from "./components/container/Container";
import EmptyState from "./components/container/EmptyState";
import Banner from "./mainpage/components/Banner";
import SearchMain from "./mainpage/components/SearchMain";
import ListingCardMain from "./components/listing/ListingCardMain";
import TourCardSecondary from "./components/listing/TourCardSecondary";
import EmblaMobile from "./mainpage/components/EmblaMobile";


import imagebook from "../public/images/maint.jpg"
import imageone from "../public/images/a.jpg"
import imagetwo from "../public/images/a.png"
import imagethree from "../public/images/ab.jpg"
import imagefour from "../public/images/ac.png"
import imagefive from "../public/images/adventure.jpeg"
import imagesix from "../public/images/agentina.jpg"
import Stay from "./mainpage/components/Stays";
import Emblawebsite from "./mainpage/components/Emblawebsite";
import "./main.css"
import TourCardLists from "./components/listing/TourCardLists";
import Image from "next/image"
import Link from "next/link"
import TourPriceCardMain from "./components/listing/TourPriceCardMain";
import ListingCardSecondary from "./components/listing/ListingCardSecondary";
import ListingTartiary from "./components/listing/ListingTartiary";
import getOffers, {OffersParams} from "./actions/getOffers";

// Define the interface for the Home component props
interface HomeProps {
  searchParams: IListingsParams; // Search parameters for fetching listings
  tourParams: IToursParams;
  offerParams: OffersParams; //
}

// Home component is defined as an asynchronous function
const Home = async ({ searchParams, tourParams, offerParams }: HomeProps) => {


const cardsDatas = [
  {
    image: imageone,
    title: 'AmzonCorp',
    country: 'Meru',
    description: '100 properties',
  },
  {
    image: imagetwo,
    title: 'Devancatour',
    country: 'Diani',
    description: '40 properties',
  },
  {
    image: imagesix,
    title: 'AmzonCorp',
    country: 'Kisii',
    description: '140 properties',
  },
  {
    image: imagefour,
    title: 'Title 4',
    country: 'Naivasha',
    description: '20 properties',
  },
  {
    image: imagefive,
    title: 'Title 5',
    country: 'Kakamega',
    description: '30 properties',
  },
  {
    image: imagesix,
    title: 'Title 6',
    country: 'Homabay',
    description: '10 properties',
  },
  {
    image: imageone,
    title: 'Title 7',
    country: 'Machakos',
    description: '30 properties',
    },
  {
    image: imagesix,
    title: 'Title 8',
    country: 'Garisa',
    description: '10 properties',
    },
  {
    image: imageone,
    title: 'Title 9',
    country: 'Kirinyaga',
    description: '64 properties',
  },
  {
    image: imageone,
    title: 'AmzonCorp',
    country: 'Meru',
    description: '100 properties',
  },
  {
    image: imagetwo,
    title: 'Devancatour',
    country: 'Diani',
    description: '40 properties',
  },
  {
    image: imagesix,
    title: 'AmzonCorp',
    country: 'Kisii',
    description: '140 properties',
  },
  {
    image: imagefour,
    title: 'Title 4',
    country: 'Naivasha',
    description: '20 properties',
  },
  {
    image: imagefive,
    title: 'Title 5',
    country: 'Kakamega',
    description: '30 properties',
  },
  {
    image: imagesix,
    title: 'Title 6',
    country: 'Homabay',
    description: '10 properties',
  },
  {
    image: imageone,
    title: 'Title 7',
    country: 'Machakos',
    description: '30 properties',
    },
  {
    image: imagesix,
    title: 'Title 8',
    country: 'Garisa',
    description: '10 properties',
    },
  {
    image: imageone,
    title: 'Title 9',
    country: 'Kirinyaga',
    description: '64 properties',
  },
];

  // Fetch listings and current user asynchronously
  let currentUser: any;
    if (searchParams.userId) {
        currentUser = await getCurrentUser();
    }
  const listings = await getListings(searchParams);

  const offers = await getOffers(offerParams);


  const tours: any = await getTours(tourParams);

  const filteredTours = tours.filter((tour: any) => tour.tourists.length < tour.guestCount).slice(0, 4);

  const filteredTourss = tours.filter((tour: any) => tour.tourists.length < tour.guestCount).slice(1, 20);

  const filteredToursss = tours.filter((tour: any) => tour.tourists.length < tour.guestCount).slice(0, 20);


  if (listings.length === 0 && tours.length === 0) {
    return (
      <EmptyState showReset />
    );
  }

  return (
    <div>
    <div className="w-full carousel-main-div-carousel">
        <Carousel />
      </div>
      <Container>
      <div className="carousel-main-div banner-btn-r relative flex flex-col justify-start items-start">
        <Banner />
        </div>
      </Container>
      <div className="flex items-center justify-center">
      <Container>
      <div className="SearchMain-page w-full text-center rounded-full">
        <SearchMain />
      </div>
      </Container>
      </div>
      <div className="flex items-center mt-6 justify-center">
        {offers && Array.isArray(offers) && offers.length > 0 && (
    <Container>
      <div className="mt-5">
        <div className="my-3">
          <h1 className="mb-2 text-2xl font-bold text-black">Great deals</h1>
          <p className="text-neutral-600">Premium deals and offers for you</p>
        </div>
        <EmblaMobile
          data={offers}
          currentUser={
            currentUser
              ? {
                  ...currentUser,
                  createdAt: currentUser.createdAt.toISOString(),
                  updatedAt: currentUser.updatedAt.toISOString(),
                  emailVerified: currentUser.emailVerified
                    ? currentUser.emailVerified.toISOString()
                    : null,
                }
              : null
          }
        />
      </div>
    </Container>
  )}
      </div>
      <div className="mt-7">
       <Container>
          <div className="mt-8">
            <div className="my-3">
              <h1 className="mb-2 text-2xl font-bold text-black">Top premium destinations</h1>
              <p className="text-neutral-600">Our top rated luxurious places to stay have a lot to offer</p>  
            </div> 
            <Stay />  
          </div>   
        </Container>
      </div>
      <div className="flex items-center mt-6 pb-6 justify-center">
       <Container>
          <div className="mt-5">
            <div className="my-3 flex justify-between items-center">
              <div>
              <h1 className="mb-2 text-2xl font-bold text-black">Exclusive Properties</h1>
              <p className="text-neutral-600">From Castle to Villas, select an exclusive place to stay</p>
              </div>  
              <div>
                <Link href="/" className="px-4 py-1 border-[1px] rounded-lg shadow-sm border-neutral-300 border-solid hover:text-green-600">View all</Link>
              </div>
            </div> 
            <Emblawebsite cardsData={cardsDatas} />  
          </div>   
        </Container>
      </div>

      {/* <div className="first-card-main pt-1 pb-9">
      {filteredTours && filteredTours.length > 0 && (
        <Container>
            <div className="mt-9 flex justify-between items-center">
              <div>
              <h1 className="mb-2 text-2xl font-bold text-black">Luxurious Properties</h1>
                <p className="text-neutral-600">From Castle to Villas, select an exclusive place to stay</p> 
              </div>
              <div>
                <Link href="/" className="px-4 py-1 border-[1px] rounded-lg shadow-sm border-neutral-300 border-solid hover:text-green-600">View all</Link>
              </div>
          </div> 
          <div className="grid-cols-page-s pt-6 pb-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
            {filteredTours.map((tour: any) => (
              <TourCardSecondary
                currentUser={currentUser ? {
                  ...currentUser,
                  createdAt: currentUser.createdAt.toISOString(),
                  updatedAt: currentUser.updatedAt.toISOString(),
                  emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toISOString() : null
                } : null} // Pass the current user to each ListingCard
                key={tour.id} // Use the listing ID as the unique key
                data={tour} // Pass the listing data to each ListingCard
              />
            ))} 
          </div>
        </Container>
      )}
      </div> */}

    <div className="first-card-main pt-1 pb-9">
      {listings && listings.length > 0 && (
      <Container>
        <div className="mt-9 flex justify-between items-center">
              <div>
              <h1 className="mb-2 text-2xl font-bold text-black">Luxurious Properties</h1>
                <p className="text-neutral-600">Find amazing high-end places to stay, discover your dream palace</p> 
              </div>
              <div>
                <Link href="/" className="px-4 py-1 border-[1px] rounded-lg shadow-sm border-neutral-300 border-solid hover:text-green-600">View all</Link>
              </div>
        </div>
        <div className="grid-cols-page-s mt-6 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
          {listings.slice(0, 4).map((listing: any) => (
            <ListingCardSecondary
              currentUser={currentUser ? {
                ...currentUser,
                createdAt: currentUser.createdAt.toISOString(),
                updatedAt: currentUser.updatedAt.toISOString(),
                emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toISOString() : null
              } : null} // Pass the current user to each ListingCard
              key={listing.id} // Use the listing ID as the unique key
              data={listing} // Pass the listing data to each ListingCard
            />
          ))}
        </div>
      </Container>
     )}
    </div>

    <div className="pt-1 pb-9">
      {listings && listings.length > 0 && (
      <Container>
        <div className="mt-9 flex justify-between items-center">
              <div>
                <h1 className="mb-2 text-2xl font-bold text-black">Book our prime unique properties</h1>
                <p className="text-neutral-600">Book from our top rated properties for unforgettable stay</p> 
              </div>
              <div>
                <Link href="/" className="px-4 py-1 border-[1px] rounded-lg shadow-sm border-neutral-300 border-solid hover:text-green-600">View all</Link>
              </div>
        </div> 
        <div className="grid-cols-page-s pt-6 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
          {listings.slice(0, 4).map((listing: any) => (
            <ListingCardMain
              currentUser={currentUser ? {
                ...currentUser,
                createdAt: currentUser.createdAt.toISOString(),
                updatedAt: currentUser.updatedAt.toISOString(),
                emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toISOString() : null
              } : null} // Pass the current user to each ListingCard
              key={listing.id} // Use the listing ID as the unique key
              data={listing} // Pass the listing data to each ListingCard
            />
          ))}
        </div>
      </Container>
     )}
    </div>
      
    {/* <div className="pt-1 pb-9">
      {filteredTours && filteredTours.length > 0 && (
        <Container>
          <div className="mt-9 flex justify-between items-center">
              <div>
                <h1 className="mb-2 text-2xl font-bold text-black">Book our prime unique properties</h1>
                <p className="text-neutral-600">Book from our top rated properties for unforgettable stay</p> 
              </div>
              <div>
                <Link href="/" className="px-4 py-1 border-[1px] rounded-lg shadow-sm border-neutral-300 border-solid hover:text-green-600">View all</Link>
              </div>
          </div> 
          <div className="grid-cols-page-s pt-6 pb-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
            {filteredTours.map((tour: any) => (
              <TourPriceCardMain
                currentUser={currentUser ? {
                  ...currentUser,
                  createdAt: currentUser.createdAt.toISOString(),
                  updatedAt: currentUser.updatedAt.toISOString(),
                  emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toISOString() : null
                } : null} // Pass the current user to each ListingCard
                key={tour.id} // Use the listing ID as the unique key
                data={tour} // Pass the listing data to each ListingCard
              />
            ))} 
          </div>
        </Container>
      )}
      </div> */}
      
    <div className="pt-1 pb-6">
      {filteredTours && filteredTours.length > 0 && (
        <Container>
            <div className="flex justify-between items-center">
              <div>
              <h1 className="mb-2 text-2xl font-bold text-black">Exclusive comfort</h1>
              <p className="text-neutral-600">Luxurious sanctuaries you will find comfortable</p> 
              </div>  
              <div>
                <Link href="/" className="px-4 py-1 border-[1px] rounded-lg shadow-sm border-neutral-300 border-solid hover:text-green-600">View all</Link>
              </div>
          </div> 
          <div className="grid-cols-page-s mt-6 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
          {listings.slice(0, 4).map((listing: any) => (
            <ListingTartiary
              currentUser={currentUser ? {
                ...currentUser,
                createdAt: currentUser.createdAt.toISOString(),
                updatedAt: currentUser.updatedAt.toISOString(),
                emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toISOString() : null
              } : null} // Pass the current user to each ListingCard
              key={listing.id} // Use the listing ID as the unique key
              data={listing} // Pass the listing data to each ListingCard
            />
          ))}
        </div>
        </Container>
      )}
    </div>

    <div className="pt-1 pb-9">
      {filteredTourss && filteredTourss.length > 0 && (
        <Container>
          <div className="">
              <h1 className="mb-2 text-2xl font-bold text-black">Trending destinations you will love</h1>
              <p className="text-neutral-600">Explore in-demand holiday properties, enjoy exciting places to stay.</p>  
          </div> 
          <div className="grid-cols-page-s pt-4 pb-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-5 2xl:grid-cols-5 gap-8">
            {filteredTourss.map((tour: any) => (
              <TourCardLists
                currentUser={currentUser ? {
                  ...currentUser,
                  createdAt: currentUser.createdAt.toISOString(),
                  updatedAt: currentUser.updatedAt.toISOString(),
                  emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toISOString() : null
                } : null} // Pass the current user to each ListingCard
                key={tour.id} // Use the listing ID as the unique key
                data={tour} // Pass the listing data to each ListingCard
              />
            ))} 
          </div>
        </Container>
      )}
      </div>

     <div className="pt-1 pb-0">
        <Container>
          <div className="border flex justify-start gap-9 items-center border-solid border-neutral-400 py-10 px-11 rounded-xl shadow-sm">
            <div>
              <Image src={imagebook} alt=""  className="h-[230px] w-[230px] shadow-md rounded-br-full rounded-t-full"/>
            </div>
            <div>
              <h3 className="pb-5 font-bold text-2xl">Get great discounts</h3>
              <p className="pb-5 text-neutral-600">Book now and save 8% plus while the offers still last.</p>
              <div className="flex justify-start items-center gap-9">
                <Link href="/" className="bg-green-500 px-6 py-2 rounded-3xl">Sign Up</Link>
                <Link href="/" className="bg-green-500 px-6 py-2 rounded-3xl">Login</Link>
              </div>
            </div>
          </div>
        </Container>
    </div>


    </div>
  );
};

export default Home;

