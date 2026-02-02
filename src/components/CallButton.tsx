import { motion } from "framer-motion";
import { Phone } from "lucide-react";

interface CallButtonProps {
  onClick: () => void;
}

const CallButton = ({ onClick }: CallButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      className="relative group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full bg-primary/30 blur-xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Pulsing rings */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border-2 border-primary/40"
          initial={{ scale: 1, opacity: 0 }}
          animate={{
            scale: [1, 1.8],
            opacity: [0.6, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Main button */}
      <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary via-primary to-accent flex items-center justify-center glow-primary group-hover:shadow-[0_0_50px_hsl(var(--glow-primary)/0.6)] transition-shadow duration-300">
        <Phone className="w-10 h-10 text-primary-foreground" />
      </div>

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </motion.button>
  );
};

export default CallButton;
