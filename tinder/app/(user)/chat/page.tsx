import { getAllChats, getMatches } from '@/actions/chart'; 
import UserNavbar from '../_components/UserNavbar';
import MatchesList from '../_components/matchesList';
import Charts from '../_components/chartsList';

interface MatchesProps {
    id: string;
    name: string;
    image: string;
}

const ChartPage = async () => {

    const data = await getMatches();
    const chats = await getAllChats()
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
        <div className=' border border-black/20 rounded-3xl px-4 py-3  w-[90%] my-6 mx-auto'>
            <input className=' w-full  outline-none h-full ' type="text" placeholder='Search 3 matches' />
        </div>

        <div className='px-3 w-full'>
            <h1 className='mb-3'>New Matches</h1>

           <MatchesList AllMatches={AllMatches}/>

            <p className='my-3 mt-7'>Messges</p>
                <Charts   chats={chats.chats} userId={chats.userId} />
            </div>

{/* <Try/> */}

    </div>
  )
}

export default ChartPage

 