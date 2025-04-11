"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

interface BackButtonProps {
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ className = "" }) => {
  const router = useRouter();

  const handleBack = () => {
    router.push("/dashboard");
  };

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      onClick={handleBack}
      className={`fixed top-4 left-4 z-50 flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-x-1 ${className}`}
    >
      <FaArrowLeft className="w-5 h-5 text-orange-500" />
      <span className="text-gray-700 font-medium">Back to Dashboard</span>
    </motion.button>
  );
};

export default BackButton;
