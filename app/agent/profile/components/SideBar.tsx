'use client'
import { useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import "./sidebar.css";
import { GiBed, GiVikingLonghouse, GiSpookyHouse, GiIceland } from "react-icons/gi";
import { CiImageOn } from "react-icons/ci";
import { GoGift } from "react-icons/go";
import { TfiGift } from "react-icons/tfi";
import { RiHotelBedLine } from "react-icons/ri";
import { MdOutlineRealEstateAgent } from "react-icons/md";
import { TbBuildingWarehouse } from "react-icons/tb";
import { FaLandMineOn } from "react-icons/fa6";

const ProfilePage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
      handleUpload(file);
    }
  };

  const handleUpload = async (file: File) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const response = await axios.post("/api/user", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        setProfileImage(response.data.imageUrl);
      } else {
        console.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="border-[2px] bg-white sidebar-image-main rounded-xl px-5">
      <div className="w-full flex justify-center text-center items-center py-5">
        <label className="cursor-pointer">
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="rounded-full w-24 h-24 object-cover" />
          ) : (
            <FaCircleUser className="text-neutral-500" size={60} />
          )}
          <input 
            type="file" 
            onChange={handleFileChange} 
            className="hidden" 
          />
        </label>
      </div>
      <div className="py-3">
        <hr />
      </div>
      <div className="hover:font-semibold text-md flex cursor-pointer flex-row gap-3 py-4 items-center">
        <Link href="/agent/profile">
          <FaRegUser className="text-neutral-500" size={25} />
        </Link>
        <Link href="/agent/profile" className="sidebar-image">
          Personal details
        </Link>
      </div>
      <div className="py-3">
        <hr />
      </div>
      <div className="hover:font-semibold text-md flex cursor-pointer flex-row gap-3 py-4 items-center">
        <Link href="/agent/offers">
          <GoGift className="text-neutral-500" size={25} />
        </Link>
        <Link href="/agent/offers" className="sidebar-image">
          My offers
        </Link>
      </div>
      <div className="py-3">
        <hr />
      </div>
      <div className="hover:font-semibold text-md flex cursor-pointer flex-row gap-3 py-4 items-center">
        <Link href="/agent/reservations">
          <GiBed className="text-neutral-500" size={25} />
        </Link>
        <Link href="/agent/reservations" className="sidebar-image">
          My reservations
        </Link>
      </div>
      <div className="py-3">
        <hr />
      </div>
      <div className="hover:font-semibold text-md flex cursor-pointer flex-row gap-3 py-4 items-center">
        <Link href="/agent/property-sales">
          <GiVikingLonghouse className="text-neutral-500" size={25} />
        </Link>
        <Link href="/agent/property-sales" className="sidebar-image">
          My property sales
        </Link>
      </div>
      <div className="py-3">
        <hr />
      </div>
      <div className="hover:font-semibold text-md flex cursor-pointer flex-row gap-3 py-4 items-center">
        <Link href="/agent/property-rentals">
          <GiSpookyHouse className="text-neutral-500" size={25} />
        </Link>
        <Link href="/agent/property-rentals" className="sidebar-image">
          My property rentals
        </Link>
      </div>
      <div className="py-3">
        <hr />
      </div>
      <div className="hover:font-semibold text-md flex cursor-pointer flex-row gap-3 py-4 items-center">
        <Link href="/agent/land-sales">
          <GiIceland className="text-neutral-500" size={25} />
        </Link>
        <Link href="/agent/land-sales" className="sidebar-image">
          My land sales
        </Link>
      </div>
      <div className="py-3">
        <hr />
      </div>
      <div className="hover:font-semibold text-md flex cursor-pointer flex-row gap-3 py-4 items-center">
        <Link href="/agent/offer">
          <TfiGift className="text-neutral-500" size={25} />
        </Link>
        <Link href="/agent/offer" className="sidebar-image">
          Active offers
        </Link>
      </div>
      <div className="py-3">
        <hr />
      </div>
      <div className="hover:font-semibold text-md flex cursor-pointer flex-row gap-3 py-4 items-center">
        <Link href="/agent/reservation">
          <RiHotelBedLine className="text-neutral-500" size={25} />
        </Link>
        <Link href="/agent/reservation" className="sidebar-image">
          Active reservations
        </Link>
      </div>
      <div className="py-3">
        <hr />
      </div>
      <div className="hover:font-semibold text-md flex cursor-pointer flex-row gap-3 py-4 items-center">
        <Link href="/agent/landsales">
          <FaLandMineOn className="text-neutral-500" size={25} />
        </Link>
        <Link href="/agent/landsales" className="sidebar-image">
          Active land sales
        </Link>
      </div>
      <div className="py-3">
        <hr />
      </div>
      <div className="hover:font-semibold text-md flex cursor-pointer flex-row gap-3 py-4 items-center">
        <Link href="/agent/propertysales">
          <MdOutlineRealEstateAgent className="text-neutral-500" size={25} />
        </Link>
        <Link href="/agent/propertysales" className="sidebar-image">
          Active property sales
        </Link>
      </div>
      <div className="py-3">
        <hr />
      </div>
      <div className="hover:font-semibold text-md flex cursor-pointer flex-row gap-3 py-4 items-center">
        <Link href="/agent/propertyrentals">
          <TbBuildingWarehouse className="text-neutral-500" size={25} />
        </Link>
        <Link href="/agent/propertyrentals" className="sidebar-image">
          Active property rentals
        </Link>
      </div>
    </div>
  );
};

export default ProfilePage;

