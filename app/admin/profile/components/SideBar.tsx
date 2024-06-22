'use client'
import { useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import "./sidebar.css";
import { GiBed, GiVikingLonghouse, GiSpookyHouse, GiIceland } from "react-icons/gi";
import { CiImageOn } from "react-icons/ci";
import { BsPersonFillGear } from "react-icons/bs";
import { BsPersonCheck } from "react-icons/bs";
import { MdOutlineRealEstateAgent } from "react-icons/md";
import { ImGift } from "react-icons/im";
import { TbGiftFilled } from "react-icons/tb";
import {LuBed} from "react-icons/lu";
import {GiMushroomHouse} from "react-icons/gi";
import {GiHouseKeys} from "react-icons/gi";
import { GiIsland } from "react-icons/gi";

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
        <Link href="/admin/profile">
          <FaRegUser className="text-neutral-500" size={25} />
        </Link>
        <Link href="/admin/profile" className="sidebar-image">
          Admin personal details
        </Link>
      </div>
      <div className="py-3">
        <hr />
      </div>
      <div className="hover:font-semibold text-md flex cursor-pointer flex-row gap-3 py-4 items-center">
        <Link href="/admin/offers">
          <ImGift className="text-neutral-500" size={25} />
        </Link>
        <Link href="/admin/offers" className="sidebar-image">
          Active offers
        </Link>
      </div>
      <div className="py-3">
        <hr />
      </div>
      <div className="hover:font-semibold text-md flex cursor-pointer flex-row gap-3 py-4 items-center">
        <Link href="/admin/reservations">
          <GiBed className="text-neutral-500" size={25} />
        </Link>
        <Link href="/admin/reservations" className="sidebar-image">
          Active reservations
        </Link>
      </div>
      <div className="py-3">
        <hr />
      </div>
      <div className="hover:font-semibold text-md flex cursor-pointer flex-row gap-3 py-4 items-center">
        <Link href="/admin/property-sales">
          <GiVikingLonghouse className="text-neutral-500" size={25} />
        </Link>
        <Link href="/admin/property-sales" className="sidebar-image">
          Active property sales
        </Link>
      </div>
      <div className="py-3">
        <hr />
      </div>
      <div className="hover:font-semibold text-md flex cursor-pointer flex-row gap-3 py-4 items-center">
        <Link href="/admin/property-rentals">
          <GiSpookyHouse className="text-neutral-500" size={25} />
        </Link>
        <Link href="/admin/property-rentals" className="sidebar-image">
          Active property rentals
        </Link>
      </div>
      <div className="py-3">
        <hr />
      </div>
      <div className="hover:font-semibold text-md flex cursor-pointer flex-row gap-3 py-4 items-center">
        <Link href="/admin/land-sales">
          <GiIceland className="text-neutral-500" size={25} />
        </Link>
        <Link href="/admin/land-sales" className="sidebar-image">
          Active land sales
        </Link>
      </div>
      <div className="py-3">
        <hr />
      </div>
      <div className="hover:font-semibold text-md flex cursor-pointer flex-row gap-3 py-4 items-center">
        <Link href="/admin/offer">
          <TbGiftFilled className="text-neutral-500" size={25} />
        </Link>
        <Link href="/admin/offer" className="sidebar-image">
          All offers
        </Link>
      </div>
      <div className="py-3">
        <hr />
      </div>
      <div className="hover:font-semibold text-md flex cursor-pointer flex-row gap-3 py-4 items-center">
        <Link href="/admin/reservation">
          <LuBed className="text-neutral-500" size={25} />
        </Link>
        <Link href="/admin/reservation" className="sidebar-image">
          All reservations
        </Link>
      </div>
      <div className="py-3">
        <hr />
      </div>
      <div className="hover:font-semibold text-md flex cursor-pointer flex-row gap-3 py-4 items-center">
        <Link href="/admin/propertysales">
          <GiMushroomHouse className="text-neutral-500" size={25} />
        </Link>
        <Link href="/admin/propertysales" className="sidebar-image">
          All property sales
        </Link>
      </div>
      <div className="py-3">
        <hr />
      </div>
      <div className="hover:font-semibold text-md flex cursor-pointer flex-row gap-3 py-4 items-center">
        <Link href="/admin/propertyrentals">
          <GiHouseKeys className="text-neutral-500" size={25} />
        </Link>
        <Link href="/admin/propertyrentals" className="sidebar-image">
          All property rentals
        </Link>
      </div>
      <div className="py-3">
        <hr />
      </div>
      <div className="hover:font-semibold text-md flex cursor-pointer flex-row gap-3 py-4 items-center">
        <Link href="/admin/landsales">
          <GiIsland className="text-neutral-500" size={25} />
        </Link>
        <Link href="/admin/landsales" className="sidebar-image">
          All land sales
        </Link>
      </div>
      <div className="py-3">
        <hr />
      </div>
      <div className="hover:font-semibold text-md flex cursor-pointer flex-row gap-3 py-4 items-center">
        <Link href="/admin/clients">
          <BsPersonCheck className="text-neutral-500" size={25} />
        </Link>
        <Link href="/admin/clients" className="sidebar-image">
          Clients
        </Link>
      </div>
      <div className="py-3">
        <hr />
      </div>
      <div className="hover:font-semibold text-md flex cursor-pointer flex-row gap-3 py-4 items-center">
        <Link href="/admin/administrators">
          <BsPersonFillGear className="text-neutral-500" size={25} />
        </Link>
        <Link href="/admin/administrators" className="sidebar-image">
          Administrators
        </Link>
      </div>
      <div className="py-3">
        <hr />
      </div>
      <div className="hover:font-semibold text-md flex cursor-pointer flex-row gap-3 py-4 items-center">
        <Link href="/admin/agents">
          <MdOutlineRealEstateAgent className="text-neutral-500" size={25} />
        </Link>
        <Link href="/admin/agents" className="sidebar-image">
          Agents
        </Link>
      </div>
    </div>
  );
};

export default ProfilePage;