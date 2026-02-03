import { motion } from "framer-motion";
import { Phone, PhoneCall, Mic, PhoneOff, ThumbsUp, ThumbsDown } from "lucide-react";

export type CallStatus = "calling" | "ringing" | "connected" | "ended";
export type CallFeedback = "positive" | "negative" | null;

export interface CallData {
  id: string;
  phoneNumber: string;
  countryCode: string;
  status: CallStatus;
  feedback: CallFeedback;
  startTime: Date;
  duration?: number;
}

interface CallCardProps {
  call: CallData;
  onEndCall: (id: string) => void;
  onFeedback: (id: string, feedback: CallFeedback) => void;
}

const CallCard = ({ call, onEndCall, onFeedback }: CallCardProps) => {
  const getStatusConfig = () => {
    switch (call.status) {
      case "calling":
        return {
          icon: Phone,
          label: "Calling...",
          bgColor: "bg-pink-100",
          textColor: "text-pink-600",
          borderColor: "border-pink-200",
        };
      case "ringing":
        return {
          icon: PhoneCall,
          label: "Ringing",
          bgColor: "bg-pink-100",
          textColor: "text-pink-600",
          borderColor: "border-pink-200",
        };
      case "connected":
        return {
          icon: Mic,
          label: "Connected",
          bgColor: "bg-emerald-100",
          textColor: "text-emerald-600",
          borderColor: "border-emerald-200",
        };
      case "ended":
        return {
          icon: PhoneOff,
          label: "Ended",
          bgColor: "bg-gray-100",
          textColor: "text-gray-600",
          borderColor: "border-gray-200",
        };
    }
  };

  const config = getStatusConfig();
  const IconComponent = config.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className={`bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border ${config.borderColor} min-w-[280px]`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-full ${config.bgColor} flex items-center justify-center`}>
          <IconComponent className={`w-5 h-5 ${config.textColor}`} />
        </div>
        <div className="flex-1">
          <p className="font-mono text-gray-800 font-medium">
            {call.countryCode} {call.phoneNumber}
          </p>
          <p className={`text-sm ${config.textColor} font-medium`}>{config.label}</p>
        </div>
      </div>

      {/* Sound wave animation for connected */}
      {call.status === "connected" && (
        <div className="flex items-center gap-0.5 mb-3">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-gradient-to-t from-pink-500 to-orange-400 rounded-full"
              animate={{
                height: [4, 12 + Math.random() * 12, 4],
              }}
              transition={{
                duration: 0.4 + Math.random() * 0.3,
                repeat: Infinity,
                delay: i * 0.03,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2">
        {call.status !== "ended" ? (
          <motion.button
            onClick={() => onEndCall(call.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 py-2 px-4 bg-red-500 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-red-600 transition-colors"
          >
            <PhoneOff className="w-4 h-4" />
            End Call
          </motion.button>
        ) : call.feedback === null ? (
          <>
            <motion.button
              onClick={() => onFeedback(call.id, "positive")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 py-2 px-4 bg-emerald-500 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-emerald-600 transition-colors"
            >
              <ThumbsUp className="w-4 h-4" />
              Positive
            </motion.button>
            <motion.button
              onClick={() => onFeedback(call.id, "negative")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 py-2 px-4 bg-gray-500 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-600 transition-colors"
            >
              <ThumbsDown className="w-4 h-4" />
              Negative
            </motion.button>
          </>
        ) : (
          <div className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${
            call.feedback === "positive" 
              ? "bg-emerald-100 text-emerald-700" 
              : "bg-gray-100 text-gray-700"
          }`}>
            {call.feedback === "positive" ? (
              <><ThumbsUp className="w-4 h-4" /> Positive Feedback</>
            ) : (
              <><ThumbsDown className="w-4 h-4" /> Negative Feedback</>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CallCard;
