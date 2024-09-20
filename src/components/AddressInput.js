import React, { useState } from 'react';

function AddressInput({ onAddressChange }) {
  const [inputValue, setInputValue] = useState('');

  // Handle input change
  const handleChange = (e) => {
    setInputValue(e.target.value);
    onAddressChange(e.target.value); // Send the updated value to the parent component
  };

  return (
    <div className=' '>
      <input
        type="text"
        placeholder="Enter your address"
        value={inputValue}
        onChange={handleChange}
        className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition duration-300 mb-3'
      />
    </div>
  );
}

export default AddressInput;
