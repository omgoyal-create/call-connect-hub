import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedBackground from "@/components/AnimatedBackground";
import CallButton from "@/components/CallButton";
import CallDialog from "@/components/CallDialog";

const Index = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Title */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-4 text-white drop-shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            textShadow: "0 4px 30px rgba(0,0,0,0.2)",
          }}
        >
          Bot Call
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-white/90 mb-12 max-w-md drop-shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Experience the future of AI-powered voice communication
        </motion.p>

        {/* Call Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.5, 
            delay: 0.4,
            type: "spring",
            stiffness: 200,
          }}
        >
          <CallButton onClick={() => setIsDialogOpen(true)} />
        </motion.div>

        {/* Call to action text */}
        <motion.p
          className="mt-8 text-sm text-white/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Tap to start a call
        </motion.p>
      </div>

      {/* Call Dialog */}
      <CallDialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
      />
    </div>
  );
};

export default Index;
