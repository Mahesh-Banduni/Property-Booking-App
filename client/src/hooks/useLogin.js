import React from 'react';
import { useState } from 'react';
import axiosInstance from '../utils/AxiosInstance';
import { useNavigate } from 'react-router-dom'; // Added missing import

const useLogin = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = [];
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.push('Please enter a valid email address');
    }

    // Password validation
    if (formData.password.trim().length < 8) {
      errors.push('Password must be at least 8 characters long');
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });
    
    // Validate form
    const errors = validateForm();
    if (errors.length > 0) {
      setStatus({
        type: 'error',
        message: errors.join('. ')
      });
      setLoading(false);
      return;
    }

    try {
      console.log(`${import.meta.env.VITE_API_BASEURL}`);
      
      const response = await axiosInstance.post('/api/auth/login', formData); // Changed userData to formData
      if (response?.status=== 200) {
        localStorage.setItem(
          "token",
          JSON.stringify(response?.data?.response)
        );
        
        setStatus({
          type: 'success',
          message: response.data.message || 'Login successful!'
        });
        
        // Reset form
        setFormData({
          email: '',
          password: ''
        });
        
        navigate("/properties");
      } 
    } catch (error) {
      setStatus({
        type: 'error', // Changed from success to error
        message: error?.response?.data?.message || 'Login failed. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    loading,
    status // Added status to return object
  };
};

export default useLogin;