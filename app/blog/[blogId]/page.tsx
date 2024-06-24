// Import statements with consistent paths
import getCurrentUser from "@/app/actions/getCurrentUsers";
import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservation";
import getTourById from "@/app/actions/getTourById";
import getTours, { IToursParams } from "@/app/actions/getTours";
import EmptyState from "@/app/components/container/EmptyState";
import Container from "@/app/components/container/Container";
import TourCard from "@/app/components/listing/TourCard";
import Link from "next/link";
import TourCardSecondary from "@/app/components/listing/TourCardSecondary";
import getNewsById from "@/app/actions/getNewsById";
import { IBlogParams } from "@/app/aagetMethods/getBlogs";
import Image from "next/image";
import getOffers, {OffersParams} from "@/app/actions/getOffers";

// Define the interface for the TourPage component props
interface IParams {
  blogId?: string;
  tourParams: IBlogParams;
  offerParams: OffersParams;
}

// TourPage component is defined as an asynchronous function
const TourPage = async ({ params }: { params: IParams }) => {
  const tour = await getNewsById(params);
  // const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();
  const tours = await getTours(params.tourParams);
  const offers = await getOffers(params.offerParams)
  const filteredTours = tours.filter(tour => tour.tourists.length < tour.guestCount).slice(0, 4);

  // Check if there is no tour, display EmptyState component
  if (!tour) {
    return <EmptyState />;
  }

  return (
    <div>
      {/* Header section */}
      <div className="european-hotel european-hotel-tour flex flex-col items-center justify-center text-lg font-bold">
        <h1 className="color-h1-white">
          {tour.title}
          <span className="color-span-green"></span>
        </h1>
      </div>

      <Container>
        <div className="flex flex-col pt-9 gap-2 w-full h-auto mb-2 blog-screen">
               <div className="flex flex-row justify-between items-start gap-1">
                    <div className="pb-3">
                       <span className="font-bold text-2xl">{tour?.title}:</span> <span>{tour?.county}, {tour?.town}</span>
                    </div>
                    <div className="font-semibold text-green-700 text-md pb-3">
                        {tour?.price}
                    </div>
                </div>
                <div className="flex flex-row items-center gap-1">
                    <div className="font-normal pb-3 text-neutral-600 text-justify leading-relaxed">
                        {tour?.description}
                    </div>
                </div>
                <div className="aspect-square sm:h-[45vh] md:h-[50vh] lg:h-[55vh] xl:h-[60vh] 2xl:h-[65vh] w-full blog-images-main relative overflow-hidden rounded-xl">
                    {tour?.imageSrc[0] ? (
                        <Image
                            fill
                            alt="Listing"
                            src={tour?.imageSrc[0]}
                            className="object-cover sm:h-[45vh] md:h-[50vh] lg:h-[55vh] xl:h-[60vh] 2xl:h-[65vh] w-full transition group-hover:scale-110"
                        />
                    ) : tour?.hotelLink !== "" ? (
                        <iframe
                            src={tour?.hotelLink}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="w-full sm:h-[45vh] md:h-[50vh] lg:h-[55vh] xl:h-[60vh] 2xl:h-[65vh]"
                        ></iframe>
                    ) : null}
                </div>
          {tour?.subtitle && tour?.subtitle.length > 0 && (
            <div className="flex flex-row items-center gap-1">
              <div className="font-bold py-3 text-lg text-neutral-800">
                {tour?.subtitle}
              </div>
            </div>
          )}
          {tour?.descriptionone && tour?.descriptionone.length > 0 &&  (
            <div className="flex flex-row items-center gap-1">
              <div className="font-normal pb-3  text-neutral-600 text-justify leading-relaxed">
                {tour?.descriptionone}
              </div>
            </div>
          )}
          {tour?.imageSrc[1] && tour?.imageSrc[1].length > 0 && (
            <div className="aspect-square w-full sm:h-[45vh] md:h-[50vh] lg:h-[55vh] xl:h-[60vh] 2xl:h-[65vh] relative overflow-hidden rounded-xl">
              <Image
                fill
                alt="Listing"
                src={tour?.imageSrc[1] || ""} // Handle null data or imageSrc
                className="object-cover sm:h-[45vh] md:h-[50vh] lg:h-[55vh] xl:h-[60vh] 2xl:h-[65vh] w-full transition group-hover:scale-110"
              />
            </div>
          )}

          {tour?.subtitleone && tour?.subtitleone.length > 0 && (
            <div className="flex flex-row items-center gap-1">
              <div className="font-bold py-3 text-lg text-neutral-800">
                {tour?.subtitleone}
              </div>
            </div>
          )}

          {tour?.descriptiontwo && tour?.descriptiontwo.length > 0 && (
            <div className="flex flex-row items-center gap-1">
              <div className=" pb-3 text-neutral-600 text-justify leading-relaxed">
                {tour?.descriptiontwo}
              </div>
            </div>
          )}

          {tour?.imageSrc[2] && tour?.imageSrc[2].length > 0 && (
            <div className="aspect-square w-full sm:h-[45vh] md:h-[50vh] lg:h-[55vh] xl:h-[60vh] 2xl:h-[65vh] relative overflow-hidden rounded-xl">
              <Image
                fill
                alt="Listing"
                src={tour?.imageSrc[2] || ""} // Handle null data or imageSrc
                className="object-cover sm:h-[45vh] md:h-[50vh] lg:h-[55vh] xl:h-[60vh] 2xl:h-[65vh] w-full transition group-hover:scale-110"
              />
            </div>
          )}

          {tour?.subtitletwo && tour?.subtitletwo.length > 0 && (
            <div className="flex flex-row items-center gap-1">
              <div className="font-bold py-3 text-lg text-neutral-800">
                {tour?.subtitletwo}
              </div>
            </div>
          )}
          {tour?.descriptionthree && tour?.descriptionthree.length > 0 && (
            <div className="flex flex-row items-center gap-1">
              <div className="pb-3 text-neutral-600 text-justify leading-relaxed">
                {tour?.descriptionthree}
              </div>
            </div>
          )}
          {tour?.imageSrc[3] && tour?.imageSrc[3].length > 0 && (
            <div className="aspect-square w-full sm:h-[45vh] md:h-[50vh] lg:h-[55vh] xl:h-[60vh] 2xl:h-[65vh] relative overflow-hidden rounded-xl">
              <Image
                fill
                alt="Listing"
                src={tour?.imageSrc[3] || ""} // Handle null data or imageSrc
                className="object-cover sm:h-[45vh] md:h-[50vh] lg:h-[55vh] xl:h-[60vh] 2xl:h-[65vh] w-full transition group-hover:scale-110"
              />
            </div>
          )}
        
          {tour?.subtitlethree && tour?.subtitlethree.length > 0 && (
            <div className="flex flex-row items-center gap-1">
              <div className="font-bold py-3 text-lg text-neutral-800">
                {tour?.subtitlethree}
              </div>
            </div>
          )}
          
          {tour?.descriptionfour && tour?.descriptionfour.length > 0 && (
            <div className="flex flex-row items-center gap-1">
              <div className="pb-3 text-neutral-600 text-justify leading-relaxed">
                {tour?.descriptionfour}
              </div>
            </div>
          )}
        
          {tour?.imageSrc[4] && tour?.imageSrc[4].length > 0 && (
          <div className="aspect-square w-full sm:h-[45vh] md:h-[50vh] lg:h-[55vh] xl:h-[60vh] 2xl:h-[65vh] relative overflow-hidden rounded-xl">
                  <Image
                      fill
                      alt="Listing"
                      src={tour?.imageSrc[4] || ""} // Handle null data or imageSrc
                      className="object-cover sm:h-[45vh] md:h-[50vh] lg:h-[55vh] xl:h-[60vh] 2xl:h-[65vh] w-full transition group-hover:scale-110"
                  />
              </div>
          )}

          {tour?.subtitlefour && tour?.subtitlefour.length > 0 && (
            <div className="flex flex-row items-center gap-1">
              <div className="font-bold py-3 text-lg text-neutral-800">
                {tour?.subtitlefour}
              </div>
            </div>
          )}
          {tour?.descriptionfive && tour?.descriptionfive.length > 0 && (
            <div className="flex flex-row items-center gap-1">
              <div className="pb-3 text-neutral-600 text-justify leading-relaxed">
                {tour?.descriptionfive}
              </div>
            </div>
          )}

          {tour?.imageSrc[5] && tour?.imageSrc[5].length > 0 && (
            <div className="aspect-square w-full sm:h-[45vh] md:h-[50vh] lg:h-[55vh] xl:h-[60vh] 2xl:h-[65vh] relative overflow-hidden rounded-xl">
              <Image
                fill
                alt="Listing"
                src={tour?.imageSrc[5] || ""} // Handle null data or imageSrc
                className="object-cover sm:h-[45vh] md:h-[50vh] lg:h-[55vh] xl:h-[60vh] 2xl:h-[65vh] w-full transition group-hover:scale-110"
              />
            </div>
          )}
          
          {tour?.subtitlefive && tour?.subtitlefive.length > 0 && (
            <div className="flex flex-row items-center gap-1">
              <div className="font-bold py-3 text-lg text-neutral-800">
                {tour?.subtitlefive}
              </div>
            </div>
          )}
        
          {tour?.descriptionsix && tour?.descriptionsix.length > 0 && (
            <div className="flex flex-row items-center gap-1">
              <div className="pb-3 text-neutral-600 text-justify leading-relaxed">
                {tour?.descriptionsix}
              </div>
            </div>
          )}
          
          {tour?.imageSrc[6] && tour?.imageSrc[6].length > 0 && (
            <div className="aspect-square w-full sm:h-[45vh] md:h-[50vh] lg:h-[55vh] xl:h-[60vh] 2xl:h-[65vh] relative overflow-hidden rounded-xl">
              <Image
                fill
                alt="Listing"
                src={tour?.imageSrc[6] || ""} // Handle null data or imageSrc
                className="object-cover sm:h-[45vh] md:h-[50vh] lg:h-[55vh] xl:h-[60vh] 2xl:h-[65vh] w-full transition group-hover:scale-110"
              />
            </div>
          )}
              <div className="font-semibold text-md mb-2 truncate">
                 <span><Link className="px-6 py-2 border-[1px] border-solid border-green-700 text-green-700 hover:bg-green-700 hover:text-white" href={tour.hotelLink}>View property</Link></span>
              </div>
                <div className="text-green-300 py-3">
                    <hr />
                </div>
            </div>
      </Container>

      {/* Classic Adventure Tours section */}
      {offers && offers.length > 0 && (
        <Container>
         <div className="mt-4 flex justify-between items-center">
              <div>
              <h1 className="mb-2 text-2xl font-bold text-black">Our offer selections</h1>
                <p className="text-neutral-600">More affordable offers you may find amazing</p> 
              </div>
              <div>
                <Link href="/" className="px-4 py-1 border-[1px] rounded-lg shadow-sm border-neutral-300 border-solid hover:text-green-600">View all</Link>
            </div>
           </div>
          <div className="grid-cols-page-s pt-6 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
            {offers.slice(0,4).map((tour: any) => (
              <TourCardSecondary
                currentUser={currentUser ? {
                  ...currentUser,
                  createdAt: currentUser.createdAt.toISOString(),
                  updatedAt: currentUser.updatedAt.toISOString(),
                  emailVerified: currentUser.emailVerified ? currentUser.emailVerified.toISOString() : null
                } : null} // Pass the current user to each ListingCard
                key={tour.id}
                data={tour}
              />
            ))}
          </div>
        </Container>
      )} 
        
    </div>
  );
};

export default TourPage;
