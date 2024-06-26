'use client'
import toast from "react-hot-toast";
import axios from 'axios';
import Container from "../components/container/Container";
import { useState } from 'react';

const ContactMe = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('/api/mailings/', 
        {
          sender: email,
          subject: "Contact Form Submission",
          message: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
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
      <Container>
        <div className="pt-8 pb-0">
          <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input 
                id="name" 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                required 
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
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
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
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
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
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
        </div>
      </Container>
    </div>
  );
};

export default ContactMe;
;
