import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

const currentlyNotWorking = () => {
  const toast_red = {
    background: '#e50914',
    color: 'black',
    fontWeight: 'semi-bold',
    fontSize: '16px',
    padding: '15px',
    borderRadius: '9999px',
    maxWidth: '1000px',
  };

  toast(`Alexander Bakay currently working on this function`, {
    duration: 4000,
    style: toast_red,
  });

  return <Toaster position="bottom-center" />;
};

export default currentlyNotWorking;
