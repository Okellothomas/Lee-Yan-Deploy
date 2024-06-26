// Import Prisma models (Listing, Reservation, User) from the "@prisma/client" module
import { Listing, Reservation, User, Property, Land, County, Tour, Blog, OffersReservation, Offers, PropertyRreservation, LandReservation } from "@prisma/client";

// Define a type 'safeListing' that is a modification of the 'Listing' type
export type safeListing = Omit<
    Listing, // Original Listing type
    "createdAt" // Omit the 'createdAt' property
    > & {
    createdAt: string; // Replace 'createdAt' property with a string type
}

export type safeTour = Omit<
    Tour, // Original Listing type
    "createdAt" // Omit the 'createdAt' property
    > & {
    createdAt: string; // Replace 'createdAt' property with a string type
}


export type safeBlog = Omit<
    Blog, // Original Listing type
    "createdAt" // Omit the 'createdAt' property
    > & {
    createdAt: string; // Replace 'createdAt' property with a string type
}

export type safeLand = Omit<
    Land, // Original Listing type
    "createdAt" // Omit the 'createdAt' property
    > & {
    createdAt: string; // Replace 'createdAt' property with a string type
}

export type safeCounty = Omit<
    County, // Original Listing type
    "createdAt" // Omit the 'createdAt' property
    > & {
    createdAt: string; // Replace 'createdAt' property with a string type
}

export type safeProperty = Omit<
    Property, // Original Listing type
    "createdAt" // Omit the 'createdAt' property
    > & {
    createdAt: string; // Replace 'createdAt' property with a string type
}

export type safeOffer = Omit<
    Offers, // Original Listing type
    "createdAt" // Omit the 'createdAt' property
    > & {
    createdAt: string; // Replace 'createdAt' property with a string type
}

// Define a type 'safeReservation' that is a modification of the 'Reservation' type
export type safePropertyReservation = Omit<
    PropertyRreservation, // Original Reservation type
    "createdAt" |  "property" // Omit specified properties
    > & {
    createdAt: string; // Replace 'createdAt' property with a string type
    property: safeProperty; // Replace 'listing' property with a 'safeListing' type
}

export type safeLandReservation = Omit<
    LandReservation, // Original Reservation type
    "createdAt" |  "property" // Omit specified properties
    > & {
    createdAt: string; // Replace 'createdAt' property with a string type
    property: safeLand; // Replace 'listing' property with a 'safeListing' type
}

export type safeOfferReservation = Omit<
    OffersReservation, // Original Reservation type
    "createdAt" |  "offer" // Omit specified properties
    > & {
    createdAt: string; // Replace 'createdAt' property with a string type
    offer: safeOffer; // Replace 'listing' property with a 'safeListing' type
}

export type safeReservation = Omit<
    Reservation, // Original Reservation type
    "createdAt" | "startDate" | "endDate" | "listing" // Omit specified properties
    > & {
    createdAt: string; // Replace 'createdAt' property with a string type
    startDate: string; // Replace 'startDate' property with a string type
    endDate: string; // Replace 'endDate' property with a string type
    listing: safeListing; // Replace 'listing' property with a 'safeListing' type
    numberOfGuests:number;
    numberOfRooms:number;
}

// Define a type 'SafeUser' that is a modification of the 'User' type 
export type SafeUser = Omit<
    User, // Original User type
    "createdAt" | "updatedAt" | "emailVerified" | "userType" // Omit specified properties
> & {
    createdAt: string; // Replace 'createdAt' property with a string type
    updatedAt: string; // Replace 'updatedAt' property with a string type
    emailVerified: string | null; // Replace 'emailVerified' property with a string or null type
    userType: string | null; // Add the 'userType' property with a string type
};

