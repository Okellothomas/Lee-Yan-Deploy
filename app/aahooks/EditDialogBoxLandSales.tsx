import React, { ReactNode, useEffect, useState } from 'react';
import "./editdialogs.css"
import { SafeUser, safeListing, safeReservation, safeTour } from '../types';
import getUsers, { IUsersParams } from '../actions/getUsers';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
interface DialogBoxProps {
    searchParams?: IUsersParams;
    data: safeProperty;
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


  const EditDialogBoxLandSales: React.FC<DialogBoxProps> = ({ isOpen, onClose, data }) => {
    const [formData, setFormData] = useState(data);

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()
  
    // const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    //   const { name, value } = event.target;
    //   setFormData({ ...formData, [name]: value });
    // };
  

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = event.target;
    
      if (type === "checkbox" && event.target instanceof HTMLInputElement) {
        const { checked } = event.target;
    
        if (name === "amenities") {
          // Handle amenities checkbox
          const updatedAmenities = checked
            ? [...formData.amenities, value]
            : formData.amenities.filter(amenity => amenity !== value);
    
          setFormData({ ...formData, amenities: updatedAmenities });
        } else {
          // Handle other checkboxes
          setFormData({ ...formData, [name]: checked });
        }
      } else {
        // Handle text and number inputs
        setFormData({ ...formData, [name]: value });
      }
    };


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault(); // Prevent the default form submission behavior
      console.log("UPDATE FORM DATA--->", formData);
      makeUpdate()
      // Add your logic to handle form submission (e.g., send data to backend, update state, etc.)
    };

    const makeUpdate = () => {
     
              axios.put(`/api/lands/${data?.id}`, 
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
      <h2>Edit Hotel/House Listing</h2>
      <div className="form-groups-container-edits h-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4">


      {/* id              String  
title           String /
county          String?
town            String?
size            String?
category        String?

type            String?
deal            String? 
covered_area    String? 
price           Int?

booked          String?

offerPrice      Int? // 
titleDeed       String? 
overview        String?
  */}
      

      <div className="form-group-edits">
  <label htmlFor="title">Title:</label>
  <input type="text" id="title" 
  value={formData.title}
  onChange={handleChange}
  name="title"/>
</div>

<div className="form-group-edits">
  <label htmlFor="county">County:</label>
  <input type="text" id="county" 
  value={formData.county || ""}
  onChange={handleChange}
  name="county"/>
</div>

<div className="form-group-edits">
  <label htmlFor="town">Town:</label>
  <input type="text" id="town" 
  value={formData.town || ""}
  onChange={handleChange}
  name="town"/>
</div>

<div className="form-group-edits">
  <label htmlFor="size">Size:</label>
  <input type="text" id="size" 
  value={formData.size || ""}
  onChange={handleChange}
  name="size"/>
</div>

<div className="form-group-edits">
  <label htmlFor="category">Category:</label>
  <input type="text" id="category" 
  value={formData.category || ""}
  onChange={handleChange}
  name="category"/>
</div>

<div className="form-group-edits">
  <label htmlFor="type">Type:</label>
  <input type="text" id="type" 
  value={formData.type || ""}
  onChange={handleChange}
  name="type"/>
</div>

<div className="form-group-edits">
  <label htmlFor="deal">Deal:</label>
  <input type="text" id="deal" 
  value={formData.deal || ""}
  onChange={handleChange}
  name="deal"/>
</div>

<div className="form-group-edits">
  <label htmlFor="covered_area">Covered Area:</label>
  <input type="text" id="covered_area" 
  value={formData.covered_area || ""}
  onChange={handleChange}
  name="covered_area"/>
</div>

<div className="form-group-edits">
  <label htmlFor="price">Price:</label>
  <input type="number" id="price" 
  value={formData.price || ""}
  onChange={handleChange}
  name="price"/>
</div>

<div className="form-group-edits">
  <label htmlFor="booked">Booked:</label>
  <input type="text" id="booked" 
  value={formData.booked || ""}
  onChange={handleChange}
  name="booked"/>
</div>

<div className="form-group-edits">
  <label htmlFor="offerPrice">Offer Price:</label>
  <input type="number" id="offerPrice" 
  value={formData.offerPrice || ""}
  onChange={handleChange}
  name="offerPrice"/>
</div>

<div className="form-group-edits">
  <label htmlFor="titleDeed">Title Deed:</label>
  <input type="text" id="titleDeed" 
  value={formData.titleDeed || ""}
  onChange={handleChange}
  name="titleDeed"/>
</div>

<div className="form-group-edits">
  <label htmlFor="overview">Overview:</label>
  <input type="text" id="overview" 
  value={formData.overview || ""}
  onChange={handleChange}
  name="overview"/>
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

export default EditDialogBoxLandSales