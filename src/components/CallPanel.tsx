import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, ChevronDown, X } from "lucide-react";
import { Input } from "@/components/ui/input";

const countryCodes = [
  { code: "+1", country: "US", flag: "🇺🇸" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+91", country: "IN", flag: "🇮🇳" },
  { code: "+49", country: "DE", flag: "🇩🇪" },
  { code: "+33", country: "FR", flag: "🇫🇷" },
  { code: "+81", country: "JP", flag: "🇯🇵" },
  { code: "+86", country: "CN", flag: "🇨🇳" },
  { code: "+61", country: "AU", flag: "🇦🇺" },
  { code: "+55", country: "BR", flag: "🇧🇷" },
  { code: "+7", country: "RU", flag: "🇷🇺" },
];

interface CallPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onStartCall: (phoneNumber: string, countryCode: string) => void;
}

const CallPanel = ({ isOpen, onClose, onStartCall }: CallPanelProps) => {
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCall = () => {
    if (!phoneNumber) return;
    onStartCall(phoneNumber, selectedCountry.code);
    setPhoneNumber("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white/95 backdrop-blur-xl shadow-2xl z-40 flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">Make a Call</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 p-6 overflow-auto">
            {/* Country Code Selector */}
            <div className="mb-4">
              <label className="text-sm text-gray-500 mb-2 block">
                Select Country
              </label>
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-pink-300 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-2xl">{selectedCountry.flag}</span>
                    <span className="text-gray-800">{selectedCountry.country}</span>
                    <span className="text-gray-500">{selectedCountry.code}</span>
                  </span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-60 overflow-auto"
                    >
                      {countryCodes.map((country) => (
                        <button
                          key={country.code}
                          onClick={() => {
                            setSelectedCountry(country);
                            setIsDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-2xl">{country.flag}</span>
                          <span className="text-gray-800">{country.country}</span>
                          <span className="text-gray-500">{country.code}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Phone Number Input */}
            <div className="mb-6">
              <label className="text-sm text-gray-500 mb-2 block">
                Phone Number
              </label>
              <div className="flex gap-2">
                <div className="flex items-center px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 min-w-[80px] justify-center">
                  <span className="text-gray-800 font-medium">{selectedCountry.code}</span>
                </div>
                <Input
                  type="tel"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                  className="flex-1 bg-gray-50 border-gray-200 focus:border-pink-400 h-12 text-lg rounded-xl text-gray-800"
                />
              </div>
            </div>

            {/* Call Button */}
            <motion.button
              onClick={handleCall}
              disabled={!phoneNumber}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-semibold text-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-shadow"
            >
              <Phone className="w-5 h-5" />
              Start Bot Call
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CallPanel;
