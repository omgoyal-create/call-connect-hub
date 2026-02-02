import { motion } from "framer-motion";
import { Phone, PhoneCall, PhoneOff, Mic } from "lucide-react";

interface CallingAnimationProps {
  state: "calling" | "ringing" | "connected" | "ended";
  phoneNumber: string;
  onEnd: () => void;
}

const CallingAnimation = ({ state, phoneNumber, onEnd }: CallingAnimationProps) => {
  const getStateContent = () => {
    switch (state) {
      case "calling":
        return {
          icon: Phone,
          title: "Calling...",
          subtitle: "Connecting to network",
          bgColor: "bg-pink-100",
          iconColor: "text-pink-500",
          animation: "pulse",
        };
      case "ringing":
        return {
          icon: PhoneCall,
          title: "Ringing",
          subtitle: "Waiting for answer",
          bgColor: "bg-pink-100",
          iconColor: "text-pink-500",
          animation: "ring",
        };
      case "connected":
        return {
          icon: Mic,
          title: "Connected",
          subtitle: "Bot is speaking",
          bgColor: "bg-emerald-100",
          iconColor: "text-emerald-500",
          animation: "wave",
        };
      case "ended":
        return {
          icon: PhoneOff,
          title: "Call Ended",
          subtitle: "Thank you for using Bot Call",
          bgColor: "bg-gray-100",
          iconColor: "text-gray-500",
          animation: "none",
        };
    }
  };

  const content = getStateContent();
  const IconComponent = content.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-8 flex flex-col items-center justify-center min-h-[400px] bg-white"
    >
      {/* Phone icon with animation */}
      <div className="relative mb-8">
        {/* Ripple effects for ringing */}
        {state === "ringing" && (
          <>
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border-2 border-pink-400"
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeOut",
                }}
              />
            ))}
          </>
        )}

        {/* Sound wave effect for connected */}
        {state === "connected" && (
          <div className="absolute -right-16 top-1/2 -translate-y-1/2 flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                className="w-1 bg-emerald-400 rounded-full"
                animate={{
                  height: [10, 30 + Math.random() * 20, 10],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )}

        {/* Main icon container */}
        <motion.div
          className={`w-24 h-24 rounded-full flex items-center justify-center ${content.bgColor}`}
          animate={
            content.animation === "ring"
              ? { rotate: [-5, 5, -5] }
              : content.animation === "pulse"
              ? { scale: [1, 1.1, 1] }
              : {}
          }
          transition={{
            duration: content.animation === "ring" ? 0.3 : 1,
            repeat: state !== "ended" ? Infinity : 0,
            ease: "easeInOut",
          }}
        >
          <IconComponent className={`w-10 h-10 ${content.iconColor}`} />
        </motion.div>
      </div>

      {/* Status text */}
      <motion.h3
        className={`text-2xl font-bold mb-2 ${content.iconColor}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {content.title}
      </motion.h3>

      <motion.p
        className="text-gray-500 mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {content.subtitle}
      </motion.p>

      <motion.p
        className="text-gray-800 font-mono text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {phoneNumber}
      </motion.p>

      {/* Call duration for connected state */}
      {state === "connected" && (
        <motion.div
          className="mt-6 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm text-gray-500">In progress</span>
        </motion.div>
      )}

      {/* Talking animation bars */}
      {state === "connected" && (
        <div className="flex items-center gap-1 mt-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1.5 bg-gradient-to-t from-pink-500 to-orange-400 rounded-full"
              animate={{
                height: [8, 20 + Math.random() * 25, 8],
              }}
              transition={{
                duration: 0.4 + Math.random() * 0.3,
                repeat: Infinity,
                delay: i * 0.05,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* End call button */}
      {state !== "ended" && (
        <motion.button
          onClick={onEnd}
          className="mt-8 px-6 py-3 bg-red-500 text-white rounded-full font-medium flex items-center gap-2 hover:bg-red-600 transition-colors shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <PhoneOff className="w-4 h-4" />
          End Call
        </motion.button>
      )}
    </motion.div>
  );
};

export default CallingAnimation;
