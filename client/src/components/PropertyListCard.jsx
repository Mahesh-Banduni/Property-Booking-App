import React, { useState } from 'react';
import { Book, Trash2, Mail, PhoneCall, LocateIcon } from 'lucide-react';
import PropertyBookForm from './PropertyBookForm';

const PropertyListCard = ({ property, onBook }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isBookModalOpen, setIsBookModalOpen] = useState(false);

    const handleBook = (e) => {
        e.stopPropagation();
        setIsBookModalOpen(true);
    };

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
                                src={property.images[0]} 
                                alt={property.name} 
                                className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                            />
                        </div>
                        
                        {/* Property Details */}
                        <div className="flex flex-col space-y-2 flex-grow">
                            <h3 className="font-semibold text-lg text-gray-800">{property.name}</h3>
                            <div className="flex items-center text-sm text-gray-600">
                                <LocateIcon className="w-4 h-4 mr-2" />
                                {property.location}
                            </div>
                        </div>
                        </div>

                        {/* Action Buttons - Desktop View */}
                        <div className="flex sm:flex justify-items-end space-x-2">
                            <button 
                                onClick={handleBook}
                                className="flex items-center justify-center px-3 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors shadow-sm"
                            >
                                <Book className="w-4 h-4 mr-2" />
                                Book
                            </button>
                        </div>
                    </div>
                    
                </div>
                
                
                </div>

            {/* Book Modal */}
            <PropertyBookForm
                property={property}
                isOpen={isBookModalOpen}
                onClose={() => setIsBookModalOpen(false)}
                onBook={onBook}
            />
        </>
    );
};

export default PropertyListCard;