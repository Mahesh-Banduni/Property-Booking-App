import React, { useState } from 'react';
import { Book, Trash2, Mail, PhoneCall, LocateIcon, User } from 'lucide-react';

const BookingListCard = ({ property, onBook }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-4 overflow-hidden">
                {/* Header Section */}
                <div className="flex flex-col space-y-4 sm:space-y-0 justify-between items-start w-full p-4" 
                     onClick={() => setIsExpanded(!isExpanded)}>
                    {/* Property Info Container */}
                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full">
                        <div className="flex items-center gap-4 w-full">
                        {/* Property Image */}
                        <div className="flex-shrink-0">
                            <img 
                                src={booking.property.images[0]} 
                                alt={property.property.name} 
                                className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                            />
                        </div>
                        
                        {/* Property Details */}
                        <div className="flex flex-col space-y-2 flex-grow">
                            <h3 className="font-semibold text-lg text-gray-800">{booking.property.name}</h3>
                            <div className="flex items-center text-sm text-gray-600">
                                <LocateIcon className="w-4 h-4 mr-2" />
                                {booking.property.location}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <div className='left-3.5'></div>
                                <div className='flex flex-col '>
                                <User className="w-4 h-4 mr-2" />
                                Name: {booking.user.name}
                                </div>
                                <div>
                                <Mail className="w-4 h-4 mr-2" />
                                Email: {booking.user.email}
                                </div>
                                <div>
                                <PhoneCall className="w-4 h-4 mr-2" />
                                Phone: {booking.user.mobile}
                                </div>
                                
                            </div>
                        </div>
                        </div>

                    </div>
                    
                </div>
                
                
                </div>
        </>
    );
};

export default BookingListCard;