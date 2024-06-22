import React, { ReactNode, useEffect, useState } from 'react';
import "./editdialogs.css"
import { SafeUser, safeOffer, safeReservation, safeTour } from '../types';
import getUsers, { IUsersParams } from '../actions/getUsers';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
interface DialogBoxProps {
    searchParams?: IUsersParams;
    data: safeOffer;
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


  const EditDialogBoxOffer: React.FC<DialogBoxProps> = ({ isOpen, onClose, data }) => {
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
     
              axios.put(`/api/offers/${data?.id}`, 
                  // from_flag:'update',
                 formData
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


  return (
    <div className="dialog-overlay-edits" onClick={onClose}>
      <div className="dialog-edits" onClick={(e) => e.stopPropagation()}>
        <button className="close-button-edits" onClick={handleChildClick}>X</button>

        <div className="editFormContainer-edits">
    <form className="edit-tour-form-edits h-auto" onSubmit={handleSubmit}>
      <h2>Edit Offer</h2>
           
 {/* title       
 days             
 category    
 type            
 subtitle       
 county      
 town        
 inclusion       
 price       
 offerprice   */}
       
      <div className="form-groups-container-edits h-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4">

      <div className="form-group-edits">
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" 
        value={formData.title}
        onChange={handleChange}
        name="title"/>
        {/** Add error message container here if needed */}
      </div>
     
      <div className="form-group-edits">
        <label htmlFor="subtitle">Subtitle:</label>
        <input type="text" id="subtitle" 
        onChange={handleChange}
        value={formData.subtitle || ''}
        name="subtitle" />
        {/** Add error message container here if needed */}
       </div>
              
    <div className="form-group-edits">
        <label htmlFor="days">Days:</label>
        <input type="text" 
        id="days" 
        value={formData?.days || ''}
        name="days"
        onChange={handleChange} />
        {/** Add error message container here if needed */}
      </div>

              
     <div className="form-group-edits">
        <label htmlFor="category">Category:</label>
        <input type="text" id="category" 
        onChange={handleChange}
        value={formData.category || ''}
        name="category" />
        {/** Add error message container here if needed */}
      </div>
      <div className="form-group-edits">
        <label htmlFor="type">Type:</label>
        <input type="number" id="save" value={formData.type || 0} onChange={handleChange} name="type" />
        {/** Add error message container here if needed */}
      </div>
      <div className="form-group-edits">
        <label htmlFor="price">Price:</label>
        <input type="text" id="price" 
        onChange={handleChange}
        value={formData.price || ''}
        name="price" />
        {/** Add error message container here if needed */}
      </div>

      <div className="form-group-edits">
        <label htmlFor="offerprice">Offer Price:</label>
        <input type="text" id="hotelLink" value={formData.offerprice || ''} onChange={handleChange} name="offerprice" />

        {/** Add error message container here if needed */}
      </div>
      <div className="form-group-edits">
        <label htmlFor="country">County:</label>
        <input type="text" id="county" 
        onChange={handleChange}
        value={formData.county || ''}
        name="county" />
        {/** Add error message container here if needed */}
      </div>

      <div className="form-group-edits">
        <label htmlFor="town">Town:</label>
        <input type="text" id="town" 
        onChange={handleChange}
        value={formData.town || ''}
        name="town" />
        {/** Add error message container here if needed */}
      </div>
     
      <div className="form-group-edits">
        <label htmlFor="inclusion">Price Per Night ($):</label>
        <input type="number" id="inclusion" value={formData.inclusion || 0} onChange={handleChange} name="inclusion" />
        {/** Add error message container here if needed */}
      </div>
      



      {/* <div className="form-group-edits">
        <label htmlFor="roomCount">Rooms Count:</label>
        <input type="number" id="roomCount" 
        onChange={handleChange}
        value={formData.roomCount || 0}  name="roomCount" min="0" />
        {/** Add error message container here if needed *
      </div>
      <div className="form-group-edits">
        <label htmlFor="guestCount">Guests Count:</label>
        <input type="number" id="guestCount" 
        onChange={handleChange}
        value={formData.guestCount || 0}  name="guestCount" min="0" />
        {/** Add error message container here if needed *
      </div>
      <div className="form-group-edits">
        <label htmlFor="hostName">Host Name:</label>
        <input type="text" id="hostName" 
        onChange={handleChange}
        value={formData.hostName || ''} name="hostName" />
        {/** Add error message container here if needed *
      </div>
      <div className="form-group-edits">
        <label htmlFor="cohostName">Cohost Name:</label>
        <input type="text" id="cohostName" 
        onChange={handleChange}
        value={formData.cohostName || ''} name="cohostName"/>
        {/** Add error message container here if needed *
              </div>
      <div className="form-group-edits">
        <label htmlFor="hostContact">Host Contact:</label>
        <input type="text" id="hostContact" 
        onChange={handleChange}
        value={formData.hostContact || ''} name="hostContact" />
        {/** Add error message container here if needed *
      </div>
      <div className="form-group-edits">
        <label htmlFor="overView">Overview:</label>
        <input type="text" id="overView" 
        onChange={handleChange}
        value={formData.overView  || ''} name="overView" />
        {/** Add error message container here if needed *
      </div> */}
    
              
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

export default EditDialogBoxOffer