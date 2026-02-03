import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedBackground from "@/components/AnimatedBackground";
import CallButton from "@/components/CallButton";
import CallPanel from "@/components/CallPanel";
import CallCard, { CallData, CallStatus, CallFeedback } from "@/components/CallCard";
import CallAnalytics from "@/components/CallAnalytics";

const Index = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [calls, setCalls] = useState<CallData[]>([]);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const simulateCallProgression = useCallback((callId: string) => {
    // Calling -> Ringing after 1.5s
    setTimeout(() => {
      setCalls(prev => prev.map(c => 
        c.id === callId && c.status === "calling" 
          ? { ...c, status: "ringing" as CallStatus } 
          : c
      ));
    }, 1500);

    // Ringing -> Connected after 4s
    setTimeout(() => {
      setCalls(prev => prev.map(c => 
        c.id === callId && c.status === "ringing" 
          ? { ...c, status: "connected" as CallStatus } 
          : c
      ));
    }, 4000);

    // Connected -> Ended after 12s
    setTimeout(() => {
      setCalls(prev => prev.map(c => 
        c.id === callId && c.status === "connected" 
          ? { ...c, status: "ended" as CallStatus, duration: 8 } 
          : c
      ));
    }, 12000);
  }, []);

  const handleStartCall = (phoneNumber: string, countryCode: string) => {
    const newCall: CallData = {
      id: generateId(),
      phoneNumber,
      countryCode,
      status: "calling",
      feedback: null,
      startTime: new Date(),
    };
    
    setCalls(prev => [...prev, newCall]);
    simulateCallProgression(newCall.id);
  };

  const handleEndCall = (callId: string) => {
    setCalls(prev => prev.map(c => 
      c.id === callId 
        ? { ...c, status: "ended" as CallStatus } 
        : c
    ));
  };

  const handleFeedback = (callId: string, feedback: CallFeedback) => {
    setCalls(prev => prev.map(c => 
      c.id === callId 
        ? { ...c, feedback } 
        : c
    ));
  };

  const activeCalls = calls.filter(c => c.status !== "ended");
  const recentEndedCalls = calls.filter(c => c.status === "ended").slice(-3);

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pb-48">
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
          className="text-lg md:text-xl text-white/90 mb-12 max-w-md text-center drop-shadow-md"
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
          <CallButton onClick={() => setIsPanelOpen(true)} />
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

      {/* Bottom Section - Call Cards & Analytics */}
      <div className="fixed bottom-0 left-0 right-0 z-30 p-4 space-y-4">
        {/* Analytics */}
        {calls.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <CallAnalytics calls={calls} />
          </div>
        )}

        {/* Active Call Cards */}
        <AnimatePresence>
          {(activeCalls.length > 0 || recentEndedCalls.length > 0) && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4 overflow-x-auto pb-2 max-w-full"
            >
              {activeCalls.map(call => (
                <CallCard
                  key={call.id}
                  call={call}
                  onEndCall={handleEndCall}
                  onFeedback={handleFeedback}
                />
              ))}
              {recentEndedCalls.map(call => (
                <CallCard
                  key={call.id}
                  call={call}
                  onEndCall={handleEndCall}
                  onFeedback={handleFeedback}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right Side Panel */}
      <CallPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        onStartCall={handleStartCall}
      />

      {/* Overlay when panel is open */}
      <AnimatePresence>
        {isPanelOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsPanelOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
