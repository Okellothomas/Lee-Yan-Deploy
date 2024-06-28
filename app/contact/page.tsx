'use client'
import toast from "react-hot-toast";
import axios from 'axios';
import Container from "../components/container/Container";
import { useState } from 'react';
import Image from "next/image";
import getOffers, {OffersParams} from "../actions/getOffers";
import getCurrentUser from "../actions/getCurrentUsers";
import EmblaMobile from "../mainpage/components/EmblaMobile";

// interface HomeProps {
//   offerParams: OffersParams; //
// }


const ContactMe =  () => {


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  //  let currentUser: any;
  //   if (offerParams.userId){
  //       currentUser = await getCurrentUser();
  //   }

  // const offers = await getOffers(offerParams);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('/api/mailings/', 
        {
          sender: email,
          subject: "Contact Form Submission",
          message: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\nMessage: ${message}`
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const data = await response.data;
      console.log(data); // handle success message
      toast.success('Message sent successfully!');

      // Reset the form fields
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    } catch (error) {
      console.error(error); // handle error message
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
       <div className="all-destinations-main-about flex flex-col items-center justify-center text-lg font-bold">
        <h1 className="text-3xl font-bold mt-[52px] text-white"> Contact Us </h1>
      </div>
      <div>

          <Container>
            <div className="pt-[60px]">
              <div className="pb-6">
                <h1 className="mb-2 text-2xl font-semibold text-black">Let us hear from you!</h1>
                <p className="text-neutral-600">Got questions? Reach out: We're here to assist your inquiries.</p>
              </div>
            <div className="flex justify-between gap-6">
                
            <form onSubmit={handleSubmit} className="w-[55%] mx-auto border-[1px] border-solid border-neutral-300 shadow-sm px-4 py-3 rounded-lg">
            <div className="mb-2">
              <label className="block text-neutral-700 text-sm font-bold mb-1" htmlFor="name">
                Name
              </label>
              <input 
                id="name" 
                type="text"   
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="shadow appearance-none border bg-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                required 
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="email">
                Email
              </label>
              <input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                required 
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="phone">
                Phone
              </label>
              <input 
                id="phone" 
                type="tel" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                required 
              />
              </div>
              <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="email">
                Subject
              </label>
              <input 
                id="subject" 
                type="text" 
                value={subject} 
                onChange={(e) => setSubject(e.target.value)} 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                required 
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="message">
                Message
              </label>
              <textarea 
                id="message" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                required 
              />
            </div>
            <div className="flex items-center justify-between">
              <button 
                type="submit" 
                className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </div>
            </form>
                  
              <div className="relative w-[43%] group">
                  <div className="relative">
                    <Image
                      height={200}
                      width={200}
                      alt="Listing"
                      src="https://res.cloudinary.com/dqibclcaq/image/upload/v1719485020/f4p4dyoeroifphaay859.jpg"
                      className="object-cover rounded-xl border-t-[5px] border-solid border-green-700 h-auto w-full"
                    />
                    <div className="absolute inset-0 rounded-xl bg-black opacity-60"></div>
                  </div>
                  <Image
                    height={200}
                    width={200}
                    alt="Overlay"
                    src="https://res.cloudinary.com/dqibclcaq/image/upload/v1719485020/f4p4dyoeroifphaay859.jpg"
                    className="absolute top-11 left-12 rounded-xl border-b-[5px] border-solid border-green-700 h-auto w-full transform transition-transform duration-300 group-hover:translate-y-[-10px]"
                  />
                </div>
                  
              </div>
            </div> 
         </Container>
        

        <Container>
            <div className="pt-[60px]">
              <div className="pb-6">
                <h1 className="mb-2 text-2xl font-semibold text-black">You can also contact us through!</h1>
                <p className="text-neutral-600">Feel free to also send us your inquiries and we will promptly provide feedback.</p>
              </div>
            <div className="flex justify-between gap-6">
                
              <div className="w-full flex justify-between rounded-lg gap-6 border-[1px] border-solid border-neutral-300 px-6 py-3">
                <div className="border-[1px] rounded-lg border-solid border-neutral-300 px-3 py-2">
                </div> 
                 <div className="border-[1px] rounded-lg border-solid border-neutral-300 px-3 py-2">
                </div>  
                 <div className="border-[1px] rounded-lg border-solid border-neutral-300 px-3 py-2">
                </div>  
              </div>
                  
              </div>
            </div> 
          </Container>
        
        

        </div>
    </div>
  );
};

export default ContactMe;
