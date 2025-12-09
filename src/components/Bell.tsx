import { motion } from "framer-motion";
import { Bell as BellIcon } from "lucide-react";

interface BellProps {
  ringing?: boolean;
  size?: number;
}

export const Bell = ({ ringing = false, size = 64 }: BellProps) => {
  return (
    <motion.div
      animate={ringing ? {
        rotate: [-15, 15, -15, 15, -10, 10, -5, 5, 0],
        scale: [1, 1.1, 1, 1.1, 1]
      } : {}}
      transition={{
        duration: 0.6,
        ease: "easeInOut"
      }}
      className="inline-block"
    >
      <BellIcon 
        size={size} 
        className="text-accent drop-shadow-lg"
        fill="hsl(var(--accent))"
      />
    </motion.div>
  );
};
