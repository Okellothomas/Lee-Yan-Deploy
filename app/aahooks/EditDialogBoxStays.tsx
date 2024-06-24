import React, { ReactNode, useEffect, useState } from 'react';
import "./editdialogs.css"
import { SafeUser, safeListing, safeReservation, safeTour } from '../types';
import getUsers, { IUsersParams } from '../actions/getUsers';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
interface DialogBoxProps {
    searchParams?: IUsersParams;
    data: safeListing;
    reservation?: safeReservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    users?:any; 
    
    currentUser?: SafeUser | null;
    isOpen: boolean;
    onClose: () => void;

    
  }


  const EditDialogBoxStays: React.FC<DialogBoxProps> = ({ isOpen, onClose, data }) => {
    const [formData, setFormData] = useState(data);

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault(); // Prevent the default form submission behavior
      console.log("UPDATE FORM DATA--->", formData);
      makeUpdate()
      // Add your logic to handle form submission (e.g., send data to backend, update state, etc.)
    };

    const makeUpdate = () => {
     
              axios.put(`/api/stays/${data?.id}`, {
                   anUpdate:true,
                 formData}
              )
                  .then(async () => {
                      toast.success('Hotel/House update successful!');
    
                     // setDateRange(initialDateRange);
                      // redirect to /trips
                     
                    router.push('/admin/profile');
                  }).catch(() => {
                      toast.error('Something went wrong')
                  }).finally(() => {
                      setIsLoading(false);
                      onClose()
                  })
          
       } 
        


    const handleChildClick = () => {
      onClose();
    };

      // console.log("Data to edi>>>>>>>t", data)


                 
// title            
// hotelLink                       
// category         
// roomCount        
// bathRoomCount    
// guestCount       
// bedcount         
// bedroomCount     
// childrenCount    
// funActivities    
// meals                      
// hostExperience   
// county           
// town             
// type                     
// booked           
// bedroom          
// beds             
// offers                            
// price            
// offerPrice       
// hostName                  
// joinDate         
// hostType         
// hostEmail        
// hostContact      
// distance         
// overView         

                     

  return (
    <div className="dialog-overlay-edits" onClick={onClose}>
      <div className="dialog-edits" onClick={(e) => e.stopPropagation()}>
        <button className="close-button-edits" onClick={handleChildClick}>X</button>

        <div className="editFormContainer-edits">
    <form className="edit-tour-form-edits h-auto" onSubmit={handleSubmit}>
      <h2>Edit Hotel/House Listing</h2>
      <div className="form-groups-container-edits h-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4">

      <div className="form-group-edits">
    <label htmlFor="title">Title:</label>
    <input type="text" id="title" 
    value={formData.title}
    onChange={handleChange}
    name="title"/>
</div>

<div className="form-group-edits">
    <label htmlFor="hotelLink">Hotel Link:</label>
    <input type="text" id="hotelLink" 
    value={formData.hotelLink}
    onChange={handleChange}
    name="hotelLink"/>
</div>

<div className="form-group-edits">
    <label htmlFor="category">Category:</label>
    <input type="text" id="category" 
    value={formData.category}
    onChange={handleChange}
    name="category"/>
</div>

<div className="form-group-edits">
    <label htmlFor="roomCount">Room Count:</label>
    <input type="number" id="roomCount" 
    value={formData.roomCount}
    onChange={handleChange}
    name="roomCount"/>
</div>

<div className="form-group-edits">
    <label htmlFor="bathRoomCount">Bathroom Count:</label>
    <input type="number" id="bathRoomCount" 
    value={formData.bathRoomCount}
    onChange={handleChange}
    name="bathRoomCount"/>
</div>

<div className="form-group-edits">
    <label htmlFor="guestCount">Guest Count:</label>
    <input type="number" id="guestCount" 
    value={formData.guestCount}
    onChange={handleChange}
    name="guestCount"/>
</div>

<div className="form-group-edits">
    <label htmlFor="bedCount">Bed Count:</label>
    <input type="number" id="bedCount" 
    value={formData.bedCount}
    onChange={handleChange}
    name="bedCount"/>
</div>

<div className="form-group-edits">
    <label htmlFor="bedroomCount">Bedroom Count:</label>
    <input type="number" id="bedroomCount" 
    value={formData.bedroomCount}
    onChange={handleChange}
    name="bedroomCount"/>
</div>

<div className="form-group-edits">
    <label htmlFor="childrenCount">Children Count:</label>
    <input type="number" id="childrenCount" 
    value={formData.childrenCount}
    onChange={handleChange}
    name="childrenCount"/>
</div>

<div className="form-group-edits">
    <label htmlFor="funActivities">Fun Activities:</label>
    <input type="text" id="funActivities" 
    value={formData.funActivities}
    onChange={handleChange}
    name="funActivities"/>
</div>

<div className="form-group-edits">
    <label htmlFor="meals">Meals:</label>
    <input type="text" id="meals" 
    value={formData.meals}
    onChange={handleChange}
    name="meals"/>
</div>

<div className="form-group-edits">
    <label htmlFor="hostExperience">Host Experience:</label>
    <input type="text" id="hostExperience" 
    value={formData.hostExperience}
    onChange={handleChange}
    name="hostExperience"/>
</div>

<div className="form-group-edits">
    <label htmlFor="county">County:</label>
    <input type="text" id="county" 
    value={formData.county}
    onChange={handleChange}
    name="county"/>
</div>

<div className="form-group-edits">
    <label htmlFor="town">Town:</label>
    <input type="text" id="town" 
    value={formData.town}
    onChange={handleChange}
    name="town"/>
</div>

<div className="form-group-edits">
    <label htmlFor="type">Type:</label>
    <input type="text" id="type" 
    value={formData.type}
    onChange={handleChange}
    name="type"/>
</div>

{/* <div className="form-group-edits">
    <label htmlFor="booked">Booked:</label>
    <input type="checkbox" id="booked" 
    checked={formData.booked}
    onChange={handleChange}
    name="booked"/>
</div> */}

<div className="form-group-edits">
    <label htmlFor="bedroom">Bedroom:</label>
    <input type="text" id="bedroom" 
    value={formData.bedroom}
    onChange={handleChange}
    name="bedroom"/>
</div>

{/* <div className="form-group-edits">
    <label htmlFor="beds">Beds:</label>
    <input type="number" id="beds" 
    value={formData.beds}
    onChange={handleChange}
    name="beds"/>
</div> */}

<div className="form-group-edits">
    <label htmlFor="offers">Offers:</label>
    <input type="text" id="offers" 
    value={formData.offers}
    onChange={handleChange}
    name="offers"/>
</div>

<div className="form-group-edits">
    <label htmlFor="price">Price:</label>
    <input type="number" id="price" 
    value={formData.price}
    onChange={handleChange}
    name="price"/>
</div>

<div className="form-group-edits">
    <label htmlFor="offerPrice">Offer Price:</label>
    <input type="number" id="offerPrice" 
    value={formData.offerPrice}
    onChange={handleChange}
    name="offerPrice"/>
</div>

<div className="form-group-edits">
    <label htmlFor="hostName">Host Name:</label>
    <input type="text" id="hostName" 
    value={formData.hostName}
    onChange={handleChange}
    name="hostName"/>
</div>

<div className="form-group-edits">
    <label htmlFor="joinDate">Join Date:</label>
    <input type="date" id="joinDate" 
    value={formData.joinDate}
    onChange={handleChange}
    name="joinDate"/>
</div>

<div className="form-group-edits">
    <label htmlFor="hostType">Host Type:</label>
    <input type="text" id="hostType" 
    value={formData.hostType}
    onChange={handleChange}
    name="hostType"/>
</div>

<div className="form-group-edits">
    <label htmlFor="hostEmail">Host Email:</label>
    <input type="email" id="hostEmail" 
    value={formData.hostEmail}
    onChange={handleChange}
    name="hostEmail"/>
</div>

<div className="form-group-edits">
    <label htmlFor="hostContact">Host Contact:</label>
    <input type="text" id="hostContact" 
    value={formData.hostContact}
    onChange={handleChange}
    name="hostContact"/>
</div>

<div className="form-group-edits">
    <label htmlFor="distance">Distance:</label>
    <input type="number" id="distance" 
    value={formData.distance}
    onChange={handleChange}
    name="distance"/>
</div>

<div className="form-group-edits">
    <label htmlFor="overView">Overview:</label>
    <input type="text" id="overView" 
    value={formData.overView}
    onChange={handleChange}
    name="overView"/>
</div>

    
              
      </div>
      <div className="form-group-edits">
          <button type="submit">Save Changes</button>
      </div>
    </form>
        </div>
    </div>
    </div>
    
  )
}

export default EditDialogBoxStays