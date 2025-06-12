import { motion } from "framer-motion";
const LookingFor = ({text}:{text:string}) => {
  return (
     <motion.div
        key="match-message"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="fixed center  top-[30vh] max-md:left-[30vw] max-md:top-[40vh] left-[40%] transform -translate-x-1/2 z-50  text-white text-xs  px-6 py-3  "
    >
        <div className=" h-[200px] blur-[2px] w-[200px] absolute left-0 top-0 rounded-full !duration-700  center backdrop-blur-[10px] bg-pink-600/30 animate-ping  ">
        </div>
        <div className=" h-[140px] blur-[2px] w-[140px] absolute  top-8  left-8 rounded-full !duration-700  center backdrop-blur-[10px] delay-[1.5s] bg-pink-600/50 animate-ping  ">
        </div>
        <div className=" h-[80px] w-[80px] absolute  top-15 left-15 rounded-full !duration-700  center backdrop-blur-[10px] bg-pink-600/40   ">
          {text}
        </div>
        {/* <h1 className="absolute whitespace-nowarp top-20 w-fit left-20">
        </h1> */}
</motion.div>
  )
}

export default LookingFor