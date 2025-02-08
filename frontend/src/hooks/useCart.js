import { useState } from 'react';

const useCart = () => {
  const [cart, setCart] = useState([]);

  const addToCart = async (item) => {
    try {
      const token = localStorage.getItem('user');
      const response = await fetch('http://localhost:8000/user/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(item)
      });
      const data = await response.json();
      setCart(data.cart);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return {
    cart,
    addToCart
  };
};

export default useCart;