import  { useRouter } from "next/navigation"
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Link from "next/link";
import useLoginModal from "@/app/hooks/useLoginModal";

const FooterMiddle = () => {
  const router = useRouter();
  const signUpModal = useRegisterModal()
  const loginModal  = useLoginModal()

  return (
      <div className="flex text-black justify-between items-center pt-3 pb-5 gap-6 md:text-md">
      <div className="footermiddle-large">
          <p className="text-xl font-semibold mb-4">Explore</p>
          <div onClick={() => router.push("/")} className="mb-3 font-[300] hover:underline cursor-pointer">Home</div>
          <div onClick={() => router.push("/blogs")} className="mb-3 font-[300] hover:underline cursor-pointer">Blogs</div> 
          <div onClick={() => router.push("/news")} className="mb-3 font-[300] hover:underline cursor-pointer">News</div> 
          <div onClick={() => router.push("/gallery")} className="mb-3 font-[300] hover:underline cursor-pointer">Gallery</div> 
          <div onClick={() => loginModal.onOpen()} className="mb-3 font-[300] hover:underline cursor-pointer">Sign in</div> 
      </div>

      <div className="footermiddle-large">
         <p className="text-xl font-semibold mb-4">Quick Links</p>
          <div onClick={() => router.push("/stay-s")} className="mb-3 hover:underline cursor-pointer">Stays</div> 
          <div onClick={() => router.push("/properties-")} className="mb-3 hover:underline cursor-pointer">Property sales</div> 
          <div onClick={() => router.push("/properties")} className="mb-3 hover:underline cursor-pointer">Property rentals</div> 
          <div onClick={() => router.push("/land")} className="mb-3 hover:underline cursor-pointer">Land sales</div>
          <div onClick={() => router.push("/offers")} className="mb-3 hover:underline cursor-pointer">Offers</div> 
      </div>

      <div className="footermiddle-large">
         <p className="text-xl font-semibold mb-4">Company</p>
          <div onClick={() => router.push("/about")} className="mb-3 hover:underline cursor-pointer">About us</div> 
          <div onClick={() => router.push("/contact")} className="mb-3 hover:underline cursor-pointer">Contact us</div> 
          <div onClick={() => router.push("/policy")} className="mb-3 hover:underline cursor-pointer">Privacy policy</div> 
          <div onClick={() => router.push("/terms")} className="mb-3 hover:underline cursor-pointer">Terms and conditions</div>
          <div onClick={() => signUpModal.onOpen()} className="mb-3 hover:underline cursor-pointer">Sign up</div> 
      </div>

      <div className="footermiddle-large">
        <p className="text-xl font-semibold mb-4">Services</p>
        <div className="mb-3 hover:underline cursor-pointer"><Link href={{ pathname: '/services', query: { category: 'Villa' } }}>Villas</Link></div>
        <div className="mb-3 hover:underline cursor-pointer"><Link href={{ pathname: '/services', query: { category: 'Hotel' } }}>Hotels</Link></div>
        <div className="mb-3 hover:underline cursor-pointer"><Link href={{ pathname: '/services', query: { category: 'Apartment' } }}>Apartments</Link></div>
        <div className="mb-3 hover:underline cursor-pointer"><Link href={{ pathname: '/services', query: { category: 'Resort' } }}>Resorts</Link></div>
        <div className="mb-3 hover:underline cursor-pointer"><Link href={{ pathname: '/services', query: { category: 'Guesthouse' }}}>Guest houses</Link></div>
      </div>

      <div className="footermiddle-small">
        <div className="">
          <p className="text-xl font-semibold mb-4">Explore</p>
          <div onClick={() => router.push("/")} className="mb-3 font-[300] hover:underline cursor-pointer">Home</div>
          <div onClick={() => router.push("/blogs")} className="mb-3 font-[300] hover:underline cursor-pointer">Blogs</div> 
          <div onClick={() => router.push("/news")} className="mb-3 font-[300] hover:underline cursor-pointer">News</div> 
          <div onClick={() => router.push("/gallery")} className="mb-3 font-[300] hover:underline cursor-pointer">Gallery</div> 
          <div onClick={() => loginModal.onOpen()} className="mb-3 font-[300] hover:underline cursor-pointer">Sign in</div> 
      </div>

      <div>
         <p className="text-xl font-semibold mb-4">Quick Links</p>
          <div onClick={() => router.push("/stay-s")} className="mb-3 hover:underline cursor-pointer">Stays</div> 
          <div onClick={() => router.push("/properties-")} className="mb-3 hover:underline cursor-pointer">Property sales</div> 
          <div onClick={() => router.push("/properties")} className="mb-3 hover:underline cursor-pointer">Property rentals</div> 
          <div onClick={() => router.push("/land")} className="mb-3 hover:underline cursor-pointer">Land sales</div>
          <div onClick={() => router.push("/offers")} className="mb-3 hover:underline cursor-pointer">Offers</div> 
      </div>
      </div>
      <div className="footermiddle-small">
        <div>
         <p className="text-xl font-semibold mb-4">Quick Links</p>
          <div onClick={() => router.push("/stay-s")} className="mb-3 hover:underline cursor-pointer">Stays</div> 
          <div onClick={() => router.push("/properties-")} className="mb-3 hover:underline cursor-pointer">Property sales</div> 
          <div onClick={() => router.push("/properties")} className="mb-3 hover:underline cursor-pointer">Property rentals</div> 
          <div onClick={() => router.push("/land")} className="mb-3 hover:underline cursor-pointer">Land sales</div>
          <div onClick={() => router.push("/offers")} className="mb-3 hover:underline cursor-pointer">Offers</div> 
      </div>

      <div>
         <p className="text-xl font-semibold mb-4">Company</p>
          <div onClick={() => router.push("/about")} className="mb-3 hover:underline cursor-pointer">About us</div> 
          <div onClick={() => router.push("/contact")} className="mb-3 hover:underline cursor-pointer">Contact us</div> 
          <div onClick={() => router.push("/policy")} className="mb-3 hover:underline cursor-pointer">Privacy policy</div> 
          <div onClick={() => router.push("/terms")} className="mb-3 hover:underline cursor-pointer">Terms and conditions</div>
          <div onClick={() => signUpModal.onOpen()} className="mb-3 hover:underline cursor-pointer">Sign up</div> 
      </div>
      </div>
    </div>
  )
}

export default FooterMiddle