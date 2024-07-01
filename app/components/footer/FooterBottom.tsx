import Image from "next/image";
import Link from "next/link";
import { FaYoutube } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { BsThreads } from "react-icons/bs";
import { FaTiktok } from "react-icons/fa6";

const FooterBottom = () => {
  return (
    <div className="flex flex-row justify-between items-center text-black py-5">
      <div className="text-md footer-main-texts">
        All rights reserved Lee-Yan Smart Properties &copy;2024
      </div>
      <div className="flex flex-row gap-7 text-neutral-600 footer-main-texts-main-s justify-end items-center">
        <Link href="https://wa.me/254708443787" target="_blank"><IoLogoWhatsapp size={27} /></Link>
        <Link href="https://www.instagram.com/leeyan.smartproperties1?igsh=MWF4cTZsaWRsM2dycA==" target="_blank"><AiFillInstagram size={27} /></Link>
        <Link href="https://www.tiktok.com/@leeyan.smartproperties1?_t=8nGu3P74zH3&_r=1" target="_blank"><FaTiktok size={27} /></Link>
        <Link href="https://www.facebook.com/lebrandedealers?mibextid=ZbWKwL" target="_blank"><FaFacebookF size={27} /></Link>
        <Link href="https://www.youtube.com/@leeyan.smartproperties1" target="_blank"><FaYoutube size={27} /></Link>
        {/* <Link href="https://www.instagram.com/devancatours?utm_source=qr&igsh=MTQ2ZXozeTExOXQxcQ==" target="_blank"><AiFillInstagram size={27} /></Link>
        <Link href="https://chat.whatsapp.com/FaQxPk0LG9KAA7L8w4JA6E" target="_blank"><IoLogoWhatsapp size={27} /></Link>
        <Link href="https://twitter.com/DevancaTours" target="_blank"><FaXTwitter size={27} /></Link> */}
      </div>
    </div>
  );
};

export default FooterBottom;
