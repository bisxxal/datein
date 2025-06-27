
import TinderCardsCom from '@/components/matchCard';
import UserNavbar from '@/components/Navbar';
const MatchPage = () => {

  return (
    <div className='w-full !h-screen  relative  overflow-hidden flex flex-col items-center '>
      <UserNavbar />
      <TinderCardsCom />
    </div>
  );
};


export default MatchPage