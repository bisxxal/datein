import React from 'react'
import TinderCardsCom from '@/components/tinderCard';
import Navbar from '@/components/navbar';
 
const MatchPage = () => {
  
  return (
    <div className='w-full h-full overflow-hidden flex flex-col items-center justify-center'>
      <Navbar  />
      <TinderCardsCom   />
    </div>
  );
};


export default MatchPage