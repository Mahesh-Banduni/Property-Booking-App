import React, { useState, useEffect } from 'react';
import { X, Save, User, Mail, Calendar } from 'lucide-react';

const UserBookForm = ({ property, isOpen, onClose, onBook }) => {
  const [formData, setFormData] = useState({
    bookTillDate:''
  });

  const [dates,setDates]=useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onBook(property.id, formData);
    onClose();
  };

  // Close when clicking outside the modal
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const generateDates = () => {
    const currentDate = new Date();
    const nextDates = [];

    for (let i = 1; i < 11; i++) {
      let futureDate = new Date();
      futureDate.setDate(currentDate.getDate() + i);
      let formattedDate = futureDate.toISOString().split("T")[0]; // YYYY-MM-DD format
      nextDates.push(formattedDate);
    }

    setDates(nextDates);
  };

  useState(() => {
    generateDates();
  }, []);

  // Handle escape key press
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-opacity-80 flex items-center justify-center z-50 p-4 backdrop-blur-sm transition-opacity duration-300"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white rounded-xl w-full max-w-2xl shadow-2xl transform transition-all duration-300 ease-in-out"
        style={{ maxHeight: 'calc(100vh - 2rem)' }}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <User className="w-5 h-5 mr-2 text-emerald-600" />
            Book Property
          </h2>
          <button 
            onClick={onClose} 
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors duration-200 text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 10rem)' }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="space-y-2 md:col-span-2">
                <div className="relative">
                
                <span>Till what date you want to book?</span>
                <div className=''>
                <Calendar className="absolute left-4 top-2/3 transform -translate-y-1/2 text-gray-600" size={20} />
                    <select
                      name="bookTillDate"
                      value={formData.bookTillDate}
                      onChange={handleChange}
                      className="w-full py-3 pl-12 pr-4 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer"
                    >
                      {dates.map((date) => (
                      <option key={date} value={date}>
                      {date}
                      </option>
                      ))}
                    </select>
                    </div>
                </div>
              </div>
            </div>

          </form>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-5 border-t border-gray-100 bg-gray-50 rounded-b-xl">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg hover:from-emerald-700 hover:to-emerald-800 shadow-sm flex items-center transition-all duration-200"
          >
            <Save className="w-4 h-4 mr-2" />
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserBookForm;