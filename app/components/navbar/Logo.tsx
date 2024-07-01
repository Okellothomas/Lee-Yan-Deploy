'use client'

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import "./navbar.css"
import logo from "../../../public/images/logo.jpeg"

const Logo = () => {

    const router  = useRouter()
    return (
    <div className="flex items-center cursor-pointer gap-2">
     <div className="logo-image-background">
          <Image
          onClick={() => router.push('/')}
          alt="logo"
          height="50"
          width="50"
          src={logo}
          className="cursor-pointer 2xl:h-[50px] 2xl:w-[50px] xl:h-[50px] xl:w-[50px] rounded-full logo-image-background-image"
        />
        </div>
        <div className="text-xl font-bold">
          <div className="items-center">
            <Link href="/">
              {/* <p style={{ maxWidth: "max-content" }}>
                <span className="block">Lee-yan</span>
                <span className="block text-sm software-logo">smart properties</span>
              </p> */}
            </Link>
          </div>
       </div>
    </div>
  )
}

export default Logo