import React, { useEffect } from 'react';
import BookingListCard from '../components/BookingListCard';
import useBookingList from '../hooks/useBookingList';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import {useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { 
    fetchBookings,
  } = useBookingList();

  const bookings = useSelector(state => state.bookings.bookings);
  const loading = useSelector(state => state.bookings.loading);

  const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!token) {
//       navigate("/");
//     }
//   }, []);
  
  useEffect(() => {
    fetchBookings();
  }, []); 

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
          Properties Booking Platform
        </h1>
        <div className="w-full sm:w-auto">
          <div className="px-5 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-lg shadow-lg">
            <p className="text-white font-medium">
              <span className="font-bold">Total Bookings:</span> {bookings?.length || 0}
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
        {bookings && bookings.length > 0 ? (
          bookings.map(booking => (
            <BookingListCard
              key={booking.id}
              booking={booking}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-16 text-gray-500 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xl font-medium">No bookings found</p>
            <p className="mt-2">Bookings added to the system will appear here</p>
          </div>
        )}
      </div>
      
    </div>
    </>
  );
};

export default AdminDashboard;