"use client";
import React, { useEffect, useState } from "react";
import SwiperComponent from "./ui/swiper";
import {  MdOutlineInterests } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSwipe from "./ui/animatedSwipe";
import KeywordButton from "./ui/keywordButton";
import { likeUser } from "@/actions/user.action"; 
import { useQuery } from '@tanstack/react-query';
import LoadingCom from "./ui/loading";
import { shuffleArray } from "@/util/algoLogic";
import LookingFor from "./ui/lookingFor";
import dynamic from 'next/dynamic'; 
import { useSocket } from "@/hooks/useSocket";
import { ArrowUp, Heart, Loader, BadgeCheck,RotateCw, X } from "lucide-react"; 
import { AllPublicUserActions } from "@/actions/match";

const PopUp = dynamic(() => import('./popUpCard'), {
  loading: () => <div className="text-white">  <Loader className='text-lg mt-5 animate-spin ' /> </div>,
  ssr: false,
});
const TinderCardsCom = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { isLoading, data } = useQuery({
    queryKey: ['fetchUsers', currentPage],
    queryFn: async () => await AllPublicUserActions(currentPage),
    staleTime: Infinity, 
  });

  const person = data?.shuffled || [];
  const user = data?.user;
  const [isPaginating, setIsPaginating] = useState(false);
  const { onlineUser }: { onlineUser: string[] } = useSocket({ userId: user?.id });
  const [shuffledPerson, setShuffledPerson] = useState<any[]>([]);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [matchMessage, setMatchMessage] = useState<string | null>(null);
  const [displayed, setDisplayed] = useState(false);
  const [showPing, setShowPing] = useState(false);

  const current = index >= 0 && index < shuffledPerson.length ? shuffledPerson[index] : null;

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

    if (dir === "left") {
      setShowPing(true);
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

  const totalPages = Math.ceil((data?.total || 0) / 10);  // Adjusted to 10 for pagination

  useEffect(() => {
    const shouldPaginate = index < 0 && person.length > 0 && currentPage < totalPages;
    const shouldReshuffle = index < 0 && person.length > 0 && currentPage >= totalPages;

    if (shouldPaginate && !isPaginating) {
      setIsPaginating(true);
      setCurrentPage((prev) => prev + 1);
    }

    if (shouldReshuffle && !isPaginating) {
      setIsPaginating(true);
      // const timeout = setTimeout(() => {
        // const reshuffled = shuffleArray(person);
        // setShuffledPerson(reshuffled);
        // setIndex(reshuffled.length - 1);
        // setIsPaginating(false);
      // }, 500);
      // return () => clearTimeout(timeout);
      setCurrentPage(1);
    }

    // Reset pagination guard once new data arrives
    if (index >= 0 && isPaginating) {
      setIsPaginating(false);
    }
  }, [index, person, currentPage, totalPages, isPaginating]);

  console.log("Total pages are " , totalPages)
  return (
    <div className="flex flex-col mt-[100px] relative items-center    space-y-6 w-full">

      {!isLoading && <div className=" w-[380px] bottombaranimation absolute rounded-3xl top-4 bg-[#0000001f] h-[80vh] max-md:w-[90%]"></div>}

      {isLoading && <LoadingCom boxes={1} width='w-[450px] appear !rounded-3xl h-[80vh] max-md:w-[99%]' margin=' !rounded-xl' />}

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
              className="relative  overflow-hidden max-md:w-[95%] w-[450px] rounded-3xl shadow-xl h-[80vh]"
            >

              <div className="w-full relative h-full bg-white shadow-xl rounded-3xl overflow-hidden flex flex-col justify-between">
                <SwiperComponent photo={current} />

                {showPing && <div className=" w-[200px] h-[200px] absolute top-[35%] 70 left-[24%]  rounded-full center  z-10">
                  <Heart fill="red" className="animate-ping duration-700 pulse " color="red" size={150} />
                </div>}

                <AnimatePresence>
                  {matchMessage && (
                    <LookingFor text={matchMessage} />
                  )}
                </AnimatePresence>

                <div className="absolute z-[10] bottom-0 w-[95%] left-2.5 text-white py-2">

                  <div className="  glasscard  relative shadow-xl  px-4 py-2 text-2xl max-md:text-lg font-bold">
                    <button
                      onClick={() => setDisplayed(!displayed)}
                      className={` glasscard absolute   w-10 h-10 z-[30] right-[2%] center text-3xl`}>
                      <AnimatedSwipe text={<ArrowUp size={22} />} />
                    </button>

                    <p className=" !justify-start center">{current?.name} {current?.verified === true && <span className="mx-1 text-green-500"><BadgeCheck /></span>} {current?.profile.age && <span>, {current?.profile.age}</span>}</p>
                    {
                      onlineUser && user.id && onlineUser.includes(current?.id) && (
                        <span className='text-xs text-green-500'>Online</span>
                      )
                    }
                  {current?.profile?.keywords.length !== 0  ? (<p className="text-base max-md:text-sm flex items-center gap-3 mt-2 font-normal">
                      <MdOutlineInterests size={22} /> Interests
                    </p>) :
                      current.profile.lookingFor && <div className=" !text-sm flex center font-medium !justify-start gap-2"  >
                          <p>Looking for : </p>
                          <h1  >{current.profile.lookingFor} </h1>
                        </div>
                    }
                    <KeywordButton current={current} user={user} />
                  </div>

                  <div className="flex w-full  justify-between max-md:mt-2 mt-4">
                    <button onClick={() => handleSwipe("right")} className="p-2 glasscard   cursor-pointer rounded-full hover:bg-[#ffffff1a] transition">
                      <X size={30} />
                    </button>
                    <button onClick={handleBack} disabled={index >= shuffledPerson.length - 1} className="px-2 glasscard disabled:opacity-[0.6] disabled:cursor-not-allowed py-1 cursor-pointer bg-[#c2c2c240] rounded-full hover:bg-[#ffffff1a] transition">
                      <RotateCw size={30} />
                    </button>
                    <button onClick={() => handleSwipe("left")} className={`   ${showPing ? '  text-red-500 ' : ' text-white '} py-1 px-2 bg-[#c2c2c240] glasscard text-2xl cursor-pointer rounded-full hover:bg-[#ffffff1a] transition `}>
                         <Heart size={30} />
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
        ) : ( 
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center relative  max-md:w-[95%] w-[400px] h-[80vh] text-gray-500 text-lg font-medium"
          >
            <LookingFor text={'Looking for '} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TinderCardsCom;