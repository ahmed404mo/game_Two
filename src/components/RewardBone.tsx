import { motion } from "framer-motion";

interface RewardBoneProps {
  size?: "small" | "medium" | "large";
  animated?: boolean;
}

export const RewardBone = ({ size = "medium", animated = false }: RewardBoneProps) => {
  const sizeClasses = {
    small: "w-12 h-8",
    medium: "w-20 h-14",
    large: "w-32 h-24",
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} relative`}
      initial={animated ? { scale: 0, rotate: -180 } : {}}
      animate={animated ? { scale: 1, rotate: 0 } : {}}
      transition={{ type: "spring", duration: 0.6, bounce: 0.5 }}
    >
      <svg viewBox="0 0 100 70" className="w-full h-full drop-shadow-lg">
        <defs>
          <linearGradient id="boneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(40, 25%, 88%)" />
            <stop offset="100%" stopColor="hsl(40, 20%, 75%)" />
          </linearGradient>
        </defs>
        
        {/* Bone body */}
        <rect x="25" y="28" width="50" height="14" rx="7" fill="url(#boneGradient)" />
        
        {/* Left end */}
        <circle cx="25" cy="20" r="12" fill="url(#boneGradient)" />
        <circle cx="25" cy="50" r="12" fill="url(#boneGradient)" />
        
        {/* Right end */}
        <circle cx="75" cy="20" r="12" fill="url(#boneGradient)" />
        <circle cx="75" cy="50" r="12" fill="url(#boneGradient)" />
        
        {/* Highlights */}
        <ellipse cx="30" cy="23" rx="6" ry="4" fill="rgba(255,255,255,0.4)" />
        <ellipse cx="70" cy="23" rx="6" ry="4" fill="rgba(255,255,255,0.4)" />
      </svg>
    </motion.div>
  );
};
