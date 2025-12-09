import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import "../styles/dog.css";

interface DogProps {
  emotion?: "happy" | "neutral" | "excited";
  size?: "small" | "medium" | "large";
  className?: string;
}

export const Dog = ({ emotion = "neutral", size = "medium", className }: DogProps) => {
  const sizeClasses = {
    small: "w-24 h-24",
    medium: "w-40 h-40",
    large: "w-64 h-64",
  };

  const isHappy = emotion === "happy" || emotion === "excited";
  const isExcited = emotion === "excited";

  return (
    <motion.div
      className={cn("dog-container", sizeClasses[size], className)}
      animate={isExcited ? {
        y: [0, -15, 0],
        rotate: [0, -5, 5, -5, 0]
      } : {}}
      transition={{
        duration: 0.6,
        repeat: isExcited ? Infinity : 0,
        repeatDelay: 0.3
      }}
    >
      <div className="dog-body">
        {/* Head */}
        <div className="dog-head">
          {/* Ears */}
          <motion.div 
            className="dog-ear dog-ear-left"
            animate={isExcited ? { rotate: [-15, -25, -15] } : {}}
            transition={{ duration: 0.4, repeat: isExcited ? Infinity : 0 }}
          />
          <motion.div 
            className="dog-ear dog-ear-right"
            animate={isExcited ? { rotate: [15, 25, 15] } : {}}
            transition={{ duration: 0.4, repeat: isExcited ? Infinity : 0 }}
          />
          
          {/* Face */}
          <div className="dog-face">
            {/* Eyes */}
            <div className={cn("dog-eye dog-eye-left", isHappy && "dog-eye-happy")}>
              <div className="dog-pupil" />
              <div className="dog-shine" />
            </div>
            <div className={cn("dog-eye dog-eye-right", isHappy && "dog-eye-happy")}>
              <div className="dog-pupil" />
              <div className="dog-shine" />
            </div>
            
            {/* Nose */}
            <div className="dog-nose" />
            
            {/* Mouth */}
            <div className={cn("dog-mouth", isHappy && "dog-mouth-happy")} />
            
            {/* Tongue (when happy) */}
            {isHappy && (
              <motion.div 
                className="dog-tongue"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </div>
          
          {/* Spots */}
          <div className="dog-spot dog-spot-1" />
          <div className="dog-spot dog-spot-2" />
        </div>
        
        {/* Collar */}
        <div className="dog-collar">
          <div className="dog-tag" />
        </div>
      </div>
    </motion.div>
  );
};
