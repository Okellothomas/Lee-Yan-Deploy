import getCurrentUser from "../actions/getCurrentUsers";
import getListings, { IListingsParams } from "../actions/getListings";
import Container from "../components/container/Container";
import EmptyState from "../components/container/EmptyState";
import ListingCard from "../components/listing/ListingCard";
import Categories from "../components/navbar/Categories";
import Search from "../components/navbar/Search";
import Link from "next/link";
import BookingCard from "../mainpage/components/BookingCard";
import ListingValue from "../components/listing/ListingValue";
import getTours, { IToursParams } from "../actions/getTours";
import TourCard from "../components/listing/TourCard";
import getListingsHotels from "../actions/getListingsHotels";
import { Metadata } from "next";
import TourCardSecondary from "../components/listing/TourCardSecondary";
import getNews from "../aagetMethods/getNews";
import NewsCard from "../aahooks/NewsCard";

// Define the interface for the Home component props
interface HotelPageProps {
    searchParams: IListingsParams; // Search parameters for fetching listings
     tourParams: IToursParams;
}

export const metadata: Metadata =  {
  title: "Hotel",
}

// Home component is defined as an asynchronous function
const DestinationPage = async ({ searchParams, tourParams }: HotelPageProps) => {
  // Fetch listings and current user asynchronously
  let currentUser: any;
    if (searchParams.userId) {
        currentUser = await getCurrentUser();
    }
  const allnews = await getNews(searchParams);
  // const lands = await getNews({ ...searchParams, category: "news", type: "Land" });
  // const property = await getNews({ ...searchParams, category: "news", type: "Property" });
  // const tours = await getTours(tourParams);
  const filteredStays = allnews.filter(listing => listing.category === "news" && listing.type === "Stay");
  const filteredLands = allnews.filter(listing => listing.category === "news" && listing.type === "Land");
  const filteredPropertys = allnews.filter(listing => listing.category === "news" && listing.type === "Property");
  // const filteredListingss = listings.slice(4, 8);
  //  const filteredToursss = tours.filter(tour => tour.tourists.length < tour.guestCount).slice(0, 20);
  // const filteredTourss = tours.filter(tour => tour.tourists.length < tour.guestCount).slice(0, 20);
  // const isEmpty = true;

  // Check if there are no listings, display EmptyState component
  if (allnews.length === 0) {
    return (
      <EmptyState showReset />
    );
  }

  // Render the Home component with the fetched listings
  return (
    <div>
    <div className="all-destinations-main-news flex flex-col items-center justify-center text-lg font-bold">
        <h1 className="text-2xl mt-[52px] text-white"> Terms and Conditions </h1>
      </div>
      <div className="pt-8 pb-0">
      <Container>
       <div className="my-6 items-center bg-neutral-200 p-6 rounded-lg">
            <p>Welcome to Lee-Yan Smart Properties!</p> 
            <div className="text-green-700 h-[2px] py-1">
              <hr />
            </div>
            <p className="text-sm">These terms and conditions outline the rules and regulations for the use of Lee-Yan Smart Properties&apos;s Website, located at <span className="text-green-700 hover:cursor-pointer">https://lee-yansmartproperties.com/</span>.</p>
            <div className="text-green-700 h-[2px] py-1">
              <hr />
            </div>
            <p className="text-sm">By accessing this website we assume you accept these terms and conditions. Do not continue to use Lee-Yan Smart Properties if you do not agree to take all of the terms and conditions stated on this page.</p>
            <div className="text-green-700 h-[2px] py-1">
              <hr />
            </div>
            <p className="text-sm">The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: (Client), (You) and (Your) refers to you, the person log on this website and compliant to the Company&apos;s terms and conditions. (The Company), (Ourselves), (We), (Our) and (Us), refers to our Company. (Party), (Parties), or (Us), refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client&apos;s needs in respect of provision of the Company&apos;s stated services, in accordance with and subject to, prevailing law of ke. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.</p>
            <div className="text-green-700 h-[2px] py-1">
              <hr />
            </div>
            <h4><strong>Cookies</strong></h4>
             <div className="text-green-700 h-[2px] py-1">
              <hr />
            </div>
            <p className="text-sm">We employ the use of cookies. By accessing Lee-Yan Smart Properties, you agreed to use cookies in agreement with the Lee-Yan Smart Properties&apos;s Privacy Policy. </p>
            <div className="text-green-700 h-[2px] py-1">
              <hr />
            </div>
            <p className="text-sm">Most interactive websites use cookies to let us retrieve the user&apos;s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website.</p>
             <div className="text-green-700 h-[2px] py-1">
              <hr />
            </div>
            <h4><strong>License</strong></h4>
             <div className="text-green-700 h-[2px] py-1">
              <hr />
            </div>
            <p className="text-sm">Unless otherwise stated, Lee-Yan Smart Properties and/or its licensors own the intellectual property rights for all material on Lee-Yan Smart Properties. All intellectual property rights are reserved. You may access this from Lee-Yan Smart Properties for your own personal use subjected to restrictions set in these terms and conditions.</p>
             <div className="text-green-700 h-[2px] py-1">
              <hr />
            </div>
            <h4><strong>You must not:</strong></h4>
             <div className="text-green-700 h-[2px] py-1">
              <hr />
            </div>
            <ul className="text-sm">
              <li className="text-sm">Republish material from Lee-Yan Smart Properties</li>
              <li className="text-sm">sub-license material from Lee-Yan Smart Properties</li>
              <li className="text-sm">Reproduce, duplicate or copy material from Lee-Yan Smart Properties</li>
            </ul>
            <div className="text-green-700 h-[2px] py-1">
              <hr />
            </div>
            <p className="text-sm">This Agreement shall begin on the date hereof January 2017</p>
            <div className="text-green-700 h-[2px] py-1">
              <hr />
            </div>
            <p className="text-sm">Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Lee-Yan Smart Properties does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Lee-Yan Smart Properties,its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, Lee-Yan Smart Properties shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.</p>
            <div className="text-green-700 h-[2px] py-1">
              <hr />
            </div>
            <p className="text-sm">Lee-Yan Smart Properties reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.</p>
            <div className="text-green-700 h-[2px] py-1">
              <hr />
            </div>
            <p>You warrant and represent that:</p>
            <div className="text-green-700 h-[2px] py-1">
              <hr />
            </div>
          <ul>
              <li className="text-sm">You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</li>
              <li className="text-sm">The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;</li>
              <li className="text-sm">The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy</li>
              <li className="text-sm">The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>
            </ul>
            <div className="text-green-700 h-[2px] py-1">
              <hr />
            </div>
            <p className="text-sm">You hereby grant Lee-Yan Smart Properties a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.</p>
            <div className="text-green-700 h-[2px] py-1">
              <hr />
            </div>
            <h4><strong>Hyperlinking to our Content</strong></h4>
            <div className="text-green-700 h-[2px] py-1">
              <hr />
            </div>
            <p>The following organizations may link to our Website without prior written approval:</p>
            <div className="text-green-700 h-[2px] py-1">
              <hr />
            </div>
          <ul>
              <li className="text-sm">Search engines;</li>
              <li className="text-sm">News organizations;</li>
              <li className="text-sm">Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and</li>
              <li className="text-sm">System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.</li>
            </ul>
            <div className="text-green-700 h-[2px] py-1">
              <hr />
            </div>
            <p className="text-sm">These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party&apos;s site.</p>
            <div className="text-green-700 h-[2px] py-1">
              <hr />
            </div>
            <p>We may consider and approve other link requests from the following types of organizations:</p>
            <div className="text-green-700 h-[2px] py-1">
              <hr />
            </div>
          <ul>
              <li className="text-sm">commonly-known consumer and/or business information sources;</li>
              <li className="text-sm">dot.com community sites;</li>
              <li className="text-sm">associations or other groups representing charities;</li>
              <li className="text-sm">online directory distributors;</li>
              <li className="text-sm">internet portals;</li>
              <li className="text-sm">accounting, law and consulting firms; and</li>
              <li className="text-sm">educational institutions and trade associations.</li>
            </ul>
            <div className="text-green-700 h-[2px] py-1">
              <hr />
            </div>
            <p className="text-sm">We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of Lee-Yan Smart Properties; and (d) the link is in the context of general resource information.</p>
            <div className="text-green-700 h-[2px] py-1">
              <hr />
            </div>
            <p className="text-sm">These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party&apos;s site.</p>
            <div className="text-green-700 h-[2px] py-1">
              <hr />
            </div>
            <p className="text-sm">If you are one of the organizations listed in paragraph 2 above and are interested in linking to our website, you must inform us by sending an e-mail to Lee-Yan Smart Properties. Please include your name, your organization name, contact information as well as the URL of your site, a list of any URLs from which you intend to link to our Website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.</p>
            <div className="text-green-700 h-[2px] py-1">
              <hr />
            </div>
            <p>Approved organizations may hyperlink to our Website as follows:</p>
            <div className="text-green-700 h-[2px] py-1">
              <hr />
            </div>
            <ul>
                <li className="text-sm">By use of our corporate name; or</li>
                <li className="text-sm">By use of the uniform resource locator being linked to; or</li>
                <li className="text-sm">By use of any other description of our Website being linked to that makes sense within the context and format of content on the linking party&apos;s site.</li>
            </ul>
            <div className="text-green-700 h-[2px] py-1">
              <hr />
            </div>
            <p className="text-sm">No use of Lee-Yan Smart Properties&apos;s logo or other artwork will be allowed for linking absent a trademark license agreement.</p>
            <div className="text-green-700 h-[2px] py-1">
              <hr />
            </div>
            <h4><strong>iFrames</strong></h4>
            <div className="text-green-700 h-[2px] py-1">
              <hr />
            </div>
            <p className="text-sm">Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.</p>
             <div className="text-green-700 h-[2px] py-1">
              <hr />
            </div>
            <h4><strong>Content Liability</strong></h4>
             <div className="text-green-700 h-[2px] py-1">
              <hr />
            </div>
            <p className="text-sm">We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.</p>
             <div className="text-green-700 h-[2px] py-1">
              <hr />
            </div>
            <h4><strong>Reservation of Rights</strong></h4>
             <div className="text-green-700 h-[2px] py-1">
              <hr />
            </div>
            <p className="text-sm">We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it&apos;s linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.</p>
             <div className="text-green-700 h-[2px] py-1">
              <hr />
            </div>
            <h4><strong>Removal of links from our website</strong></h4>
             <div className="text-green-700 h-[2px] py-1">
              <hr />
            </div>
            <p className="text-sm">If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.</p>
             <div className="text-green-700 h-[2px] py-1">
              <hr />
            </div>
            <p className="text-sm">We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.</p>
             <div className="text-green-700 h-[2px] py-1">
              <hr />
            </div>
            <h4><strong>Disclaimer</strong></h4>
             <div className="text-green-700 h-[2px] py-1">
              <hr />
            </div>
            <p className="text-sm">To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:</p>
             <div className="text-green-700 h-[2px] py-1">
              <hr />
            </div>
            <ul>
                <li className="text-sm">limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
                <li className="text-sm">limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
                <li className="text-sm">exclude any of our or your liabilities that may not be excluded under applicable law.</li>
            </ul>
             <div className="text-green-700 h-[2px] py-1">
              <hr />
            </div>
            <p className="text-sm">The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.</p>
             <div className="text-green-700 h-[2px] py-1">
              <hr />
            </div>
            <p className="text-sm">As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.</p>
      </div>
      
     </Container>
        
      </div>
    </div>
  );
};

export default DestinationPage