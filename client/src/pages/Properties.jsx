import React, { useEffect } from 'react';
import PropertyListCard from '../components/PropertyListCard';
import usePropertyList from '../hooks/usePropertyList';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import {useNavigate } from "react-router-dom";

const Properties = () => {
  const navigate = useNavigate();
  const { 
    fetchProperties,
    bookProperty
  } = usePropertyList();

  const properties = useSelector(state => state.properties.properties);
  const loading = useSelector(state => state.properties.loading);

  const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!token) {
//       navigate("/");
//     }
//   }, []);
  
  useEffect(() => {
    fetchProperties();
  }, []);  
 
  const handleBooking = async (propertyId, bookingData) => {
    try {
      const response=await bookProperty(propertyId, bookingData);
      console.log(response);
      if(response?.updatedAt){
      toast.success('Property booked successfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          background: 'white',
          color: '#3C423A',
          border: '2px solid white',
          zIndex: 9999
        },
        progressStyle: {
          background: 'white'
        },
      });
    }

    } catch (error) {
      console.error('Error booking property:', error);
      toast.error('Error booking property. Please try again...', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          background: 'white',
          color: '#3C423A',
          border: '2px solid white',
          zIndex: 9999
        },
        progressStyle: {
          background: 'white'
        },
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-600"></div>
      </div>
    );
  }

  return (
    <>
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center">
          Property Booking Platform
        </h1>
        <div className="w-full sm:w-auto">
          <div className="px-5 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg shadow-lg">
            <p className="text-white font-medium">
              <span className="font-bold">Total Properties:</span> {properties?.length || 0}
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
        {properties && properties.length > 0 ? (
          properties.map(property => (
            <PropertyListCard
              key={property.id}
              property={property}
              onBook={handleBooking}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-16 text-gray-500 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xl font-medium">No properties found</p>
            <p className="mt-2">Properties added to the system will appear here</p>
          </div>
        )}
      </div>
      
    </div>
    </>
  );
};

export default Properties;