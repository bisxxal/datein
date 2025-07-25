import { motion } from "framer-motion";

const AnimatedSwipe = ({ text }: any) => {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 1.2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
    >
      {text}
    </motion.div>
  )
}

export default AnimatedSwipe