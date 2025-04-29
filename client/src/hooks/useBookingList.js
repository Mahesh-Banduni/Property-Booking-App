import { setBookings, setError, setLoading } from '../store/bookingSlice';
import axiosInstance from '../utils/AxiosInstance';
import { useDispatch } from 'react-redux';

const useBookingList = () => {

  const dispatch = useDispatch();

  const fetchBookings = async () => {
    try {
      dispatch(setLoading(true));
      
      const response = await axiosInstance.get(`/api/bookings/`);

      if (!response.data) {
        throw new Error('No data received from server');
      }

      dispatch(setBookings(response.data));
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred while fetching bookings';
      console.error('Error fetching bookings:', errorMessage);
      dispatch(setError(errorMessage));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { 
    fetchBookings
};
}

export default useBookingList;