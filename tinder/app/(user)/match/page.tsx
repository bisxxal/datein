import React from 'react'
import TinderCardsCom from '@/components/tinderCard';
import UserNavbar from '../_components/UserNavbar';
 
const MatchPage = () => {
  
  return (
    <div className='w-full !h-screen overflow-hidden flex flex-col items-center justify-'>
      {/* <Navbar  /> */}
        <UserNavbar/>
      <TinderCardsCom   />
    </div>
  );
};


export default MatchPage