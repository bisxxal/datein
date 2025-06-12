"use client";
import React, { useEffect, useState } from "react";
import SwiperComponent from "./ui/swiper";
import { MdOutlineRefresh, MdOutlineInterests, MdKeyboardDoubleArrowDown, MdKeyboardDoubleArrowUp } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSwipe from "./ui/animatedSwipe";
import KeywordButton from "./ui/keywordButton";
import { likeUser } from "@/actions/user.action";
import { AllPublicUsers } from '@/actions/public';
import { useQuery } from '@tanstack/react-query';
import LoadingCom from "./ui/loading";
import { FcLike } from "react-icons/fc";
import { shuffleArray } from "@/util/algoLogic"; 
import LookingFor from "./ui/lookingFor";
import PopUp from "./popUpCard";
 
const TinderCardsCom = () => { 
  const { isLoading, data } = useQuery({
    queryKey: ['fetchUsers'],
    queryFn: async ()=>await AllPublicUsers(),
    staleTime: 60000,
  });

  const person = data?.shuffled || [];
  const user = data?.user;

  // console.log("all users",person?.length)
  // console.log("user like is ", user?.likesGiven?.length);
  const [shuffledPerson, setShuffledPerson] = useState<any[]>([]);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [matchMessage, setMatchMessage] = useState<string | null>(null);
  const [displayed, setDisplayed] = useState(false);
const [showPing, setShowPing] = useState(false);

  const current = index >= 0 && index < shuffledPerson.length ? shuffledPerson[index] : null;

  // On data load, set shuffled array
  useEffect(() => {
    if (person.length > 0) {
      const shuffled = shuffleArray(person);
      setShuffledPerson(shuffled);
      setIndex(shuffled.length - 1);
    }
  }, [person]);

  const handleSwipe = async (dir: "left" | "right") => {
    if (!current || index < 0) return;
    setDirection(dir);
    if( dir === "left") {
      setShowPing(true);
    }

    if (dir === "left") {
      const res = await likeUser(current.id);
      setShowPing(false);
      if (res?.status === "matched") {
        setMatchMessage(`🎉 It's a match with ${current.name}!`);
        setTimeout(() => {
          setMatchMessage(null);
          setIndex((prev) => prev - 1);
          setDirection(null);
        }, 2500);
        return;
      }
    }

    setTimeout(() => {
      setIndex((prev) => prev - 1);
      setDirection(null);
    }, 300);
  };

  const handleBack = () => {
    if (index < shuffledPerson.length - 1) {
      setDirection(null);
      setIndex((prev) => prev + 1);
    }
  };
  
  const getExitX = () => {
    if (direction === "left") return -700;
    if (direction === "right") return 700;
    return 0;
  };
 
  useEffect(() => { 
    if (  index < 0 && person.length > 0) {
      const timeout = setTimeout(() => {
        console.log("Reshuffling cards...");
        const reshuffled = shuffleArray(person);
        setShuffledPerson(reshuffled);
        setIndex(reshuffled.length - 1);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [index, person ]);
  
  return (
    <div className="flex flex-col relative items-center mt-7 max-md:mt-2 space-y-6 w-full">
     
     <div className=" w-[370px] absolute rounded-xl top-4 bg-[#00000042] h-[80vh] max-md:w-[90%]"></div> 

      {isLoading && <LoadingCom boxes={1} width='w-[500px] !rounded-3xl h-[80vh] max-md:w-[99%]' margin=' !rounded-xl' />}

      <AnimatePresence mode="wait">
        {current && !isLoading ? (
          <>
            <motion.div
                key={current.id}
                initial={{ x: 0, opacity: 1 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{
                  x: getExitX(),
                  opacity: 0,
                  scale: 0.95,
                  transition: { duration: 0.3 },
                }}
                className="relative max-md:w-[95%] w-[400px] rounded-3xl shadow-xl h-[80vh]"
              >
             
              <div className="w-full relative h-full bg-white shadow-xl rounded-3xl overflow-hidden flex flex-col justify-between">
                <SwiperComponent photo={current} />
                
               {showPing && <div className=" w-[200px] h-[200px] absolute top-[35%] 70 left-[24%]  rounded-full center  z-10">
                  <FcLike className="animate-ping duration-700 pulse " size={150}/>
                </div>}

                <AnimatePresence>
                  {matchMessage && (
                   <LookingFor text={matchMessage as string} />
                      )}  
                </AnimatePresence>

                <div className="absolute z-[10] bottom-0 w-[95%] left-2.5 text-white py-2">

                  <div className="  glass   shadow-xl rounded-3xl px-5 py-2 text-2xl max-md:text-lg font-bold">
                    <p>{current?.name} { current?.age && <span>, {current?.age}</span>}</p>
                    <p className="text-base max-md:text-sm flex items-center gap-3 my-2 font-normal">
                      <MdOutlineInterests size={22}/> Interests
                    </p>
                    <KeywordButton current={current} user={user} />
                  </div>

                  <div className="flex w-full justify-between max-md:mt-2 mt-4">
                    <button onClick={() => handleSwipe("right")} className="p-2 glass   cursor-pointer rounded-full hover:bg-[#ffffff1a] transition">
                      <RxCross2 size={30} />
                    </button>
                    <button onClick={handleBack} disabled={index >= shuffledPerson.length - 1} className="px-2 glass py-1 cursor-pointer bg-[#c2c2c240] rounded-full hover:bg-[#ffffff1a] transition">
                      <MdOutlineRefresh size={30} />
                    </button>
                    <button onClick={() => handleSwipe("left")} className="px-3  py-1 bg-[#c2c2c240] glass text-2xl cursor-pointer rounded-full hover:bg-[#ffffff1a] transition">
                      ♡
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            <AnimatePresence>
              {displayed && (
                <PopUp
                  key="details-panel"
                  current={current}
                  displayed={displayed}
                  setDisplayed={setDisplayed}
                  user={user}
                />
              )}
            </AnimatePresence>
          </>
        ) : ( !isLoading && !current &&
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center  max-md:w-[95%] w-[400px] h-[80vh] text-gray-500 text-lg font-medium"
          >
            {/* <p>Shuffling new cards... 🌀</p> */}
            <LookingFor text={'Looking for '} />
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setDisplayed(!displayed)}
        hidden={!current || displayed}
        className={`${displayed ? 'hidden' : 'fixed'} top-[87vh] w-14 h-14 z-[30] left-1/2 text-3xl`}
      >
        <AnimatedSwipe text={<MdKeyboardDoubleArrowUp size={23} />} />
      </button>

    </div>
  );
};

export default TinderCardsCom;
 