import {   getMatches } from '@/actions/chart'; 
import UserNavbar from '../_components/UserNavbar';
import MatchesList from '../_components/matchesList';
import Charts from '../_components/chartsList';

interface MatchesProps {
    id: string;
    name: string;
photos:{url:string}[]
}

const ChartPage = async () => {

    const data = await getMatches();
    const AllMatches: MatchesProps[] = []
     
 
if (data?.matches && data?.matches.length > 0) {
  const uniqueUserIds = new Set();

  data.matches.forEach((match:any) => {
    let otherUser;

    if (match.giverId === data.userId) {
      otherUser = match.receiver;
    } else if (match.receiverId === data.userId) {
      otherUser = match.giver;
    }

    if (otherUser && !uniqueUserIds.has(otherUser.id)) {
      uniqueUserIds.add(otherUser.id);
      AllMatches.push(otherUser);
    }
  }  );
}

  return (
    <div className=' relative w-full  min-h-screen'>
        <UserNavbar/>
        {/* <div className=' borde r glass border-black/20 rounded-3xl px-4 py-3  w-[90%] my-6 mx-auto'>
            <input className=' w-full  outline-none h-full ' type="text" placeholder='Search 3 matches' />
        </div> */}

        <div className='px-3 w-full mt-10 '>
          
{
  AllMatches.length !== 0 ?   <>
            <h1 className='mb-3'>New Matches</h1>
          <MatchesList AllMatches={AllMatches}/>
          </> : <div>
    <p className='text-center text-gray-500'>No Matches Found</p>
  </div>
}
            
                <Charts/>
            </div>

{/* <Try/> */}
      <div>
        <p className="logo3 ml-5 text-7xl max-md:text-6xl text-[100px]  flex flex-col font-bold my-10 text-[#8d8d8d82] block mb-10">Made</p>
      <p className=" ml-5 logo3 text-7xl max-md:text-6xl text-[100px]  flex flex-col font-bold my-10 text-[#8d8d8d82]">
         With Love ♡.</p>
      </div>
 </div>
  )
}

export default ChartPage

 