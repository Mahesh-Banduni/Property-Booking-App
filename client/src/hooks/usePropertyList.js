import { setProperties, setError, setLoading, setSelectedProperty } from '../store/propertySlice';
import axiosInstance from '../utils/AxiosInstance';
import { useDispatch } from 'react-redux';

const usePropertyList = () => {

  const dispatch = useDispatch();
  const token=localStorage.getItem("token");

  const getPropertyById = async (propertyId) => {
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.get(`/api/properties/${propertyId}`);
      dispatch(setSelectedProperty(response.data));
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch property details';
      dispatch(setError(errorMessage));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const bookProperty = async (propertyId, bookingData) => {
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.post(`/api/bookings/create`, {propertyId, bookingData}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to book property';
      dispatch(setError(errorMessage));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchProperties = async () => {
    try {
      dispatch(setLoading(true));
      
      const response = await axiosInstance.get(`/api/properties/`);
      console.log(response);

      if (!response.data) {
        throw new Error('No data received from server');
      }

      dispatch(setProperties(response.data));
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred while fetching properties';
      console.error('Error fetching properties:', errorMessage);
      dispatch(setError(errorMessage));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { 
    getPropertyById,
    bookProperty,
    fetchProperties
};
}

export default usePropertyList;