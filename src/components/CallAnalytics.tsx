import { motion } from "framer-motion";
import { Phone, CheckCircle, ThumbsUp, ThumbsDown, Clock } from "lucide-react";
import { CallData } from "./CallCard";

interface CallAnalyticsProps {
  calls: CallData[];
}

const CallAnalytics = ({ calls }: CallAnalyticsProps) => {
  const totalCalls = calls.length;
  const endedCalls = calls.filter(c => c.status === "ended").length;
  const activeCalls = calls.filter(c => c.status !== "ended").length;
  const positiveFeedback = calls.filter(c => c.feedback === "positive").length;
  const negativeFeedback = calls.filter(c => c.feedback === "negative").length;

  if (totalCalls === 0) return null;

  const stats = [
    { 
      label: "Initiated", 
      value: totalCalls, 
      icon: Phone, 
      bgColor: "bg-purple-100", 
      textColor: "text-purple-600",
      iconBg: "bg-purple-500"
    },
    { 
      label: "Active", 
      value: activeCalls, 
      icon: Clock, 
      bgColor: "bg-pink-100", 
      textColor: "text-pink-600",
      iconBg: "bg-pink-500"
    },
    { 
      label: "Completed", 
      value: endedCalls, 
      icon: CheckCircle, 
      bgColor: "bg-blue-100", 
      textColor: "text-blue-600",
      iconBg: "bg-blue-500"
    },
    { 
      label: "Positive", 
      value: positiveFeedback, 
      icon: ThumbsUp, 
      bgColor: "bg-emerald-100", 
      textColor: "text-emerald-600",
      iconBg: "bg-emerald-500"
    },
    { 
      label: "Negative", 
      value: negativeFeedback, 
      icon: ThumbsDown, 
      bgColor: "bg-gray-100", 
      textColor: "text-gray-600",
      iconBg: "bg-gray-500"
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-white/50"
    >
      <h3 className="text-gray-800 font-semibold mb-4 text-lg">Call Analytics</h3>
      <div className="flex flex-wrap gap-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl ${stat.bgColor}`}
          >
            <div className={`w-8 h-8 rounded-lg ${stat.iconBg} flex items-center justify-center`}>
              <stat.icon className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CallAnalytics;
