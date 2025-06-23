"use client";
import React, { useState } from "react";
import {
  FaBars,
  FaChartLine,
  FaUtensils,
  FaMoneyBillWave,
  FaHeadset,
  FaTruck,
  FaList,
  FaArrowLeft,
  FaHome,
  FaCalendarAlt,
} from "react-icons/fa";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleAnalysisClick = (path: string) => {
    try {
      setLoading(true);
      const fakeData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [
          {
            label: "Analysis Data",
            data: [10, 20, 30, 40, 50],
            backgroundColor: "rgba(54, 162, 235, 0.5)",
          },
        ],
      };
      router.push(
        `${path}?data=${encodeURIComponent(JSON.stringify(fakeData))}`
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleBack = () => {
    router.push("/dashboard");
  };

  const menuItems = [
    { name: "Home", path: "/", icon: FaHome },
    { name: "Dashboard", path: "/dashboard", icon: FaChartLine },
    {
      name: "Refund Analysis",
      path: "/refund-analysis",
      icon: FaMoneyBillWave,
    },
    {
      name: "Food & Product Quality",
      path: "/foodandproduct-quality",
      icon: FaUtensils,
    },
    {
      name: "Pricing Strategy",
      path: "/pricing-strategy",
      icon: FaMoneyBillWave,
    },
    { name: "Customer Service", path: "/customer-service", icon: FaHeadset },
    {
      name: "Delivery & Logistics",
      path: "/delivery-and-logistics",
      icon: FaTruck,
    },
    {
      name: "Automated Analysis",
      path: "/automated-analysis",
      icon: FaCalendarAlt,
    }
  ];

  const showBackButton = pathname !== "/" && pathname !== "/dashboard";

  return (
    <div className="flex">
      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarVisible && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed top-0 left-0 z-30 h-full bg-white/90 backdrop-blur-lg border-r border-orange-100 shadow-xl"
            style={{ width: "280px" }}
          >
            <div className="flex justify-between items-center p-6 border-b border-orange-100">
              <Link href="/" className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-orange-200">
                  RS
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  REVSENSE
                </h2>
              </Link>
              <button
                className="text-gray-600 hover:text-orange-500 text-2xl transition-colors hover:bg-orange-50 p-2 rounded-full"
                onClick={toggleSidebar}
              >
                &times;
              </button>
            </div>
            <ul className="mt-6 space-y-2 px-6">
              {menuItems.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    onClick={() => {
                      if (item.path === "/dashboard") {
                        router.push(item.path);
                      } else {
                        handleAnalysisClick(item.path);
                      }
                    }}
                    className="hover:bg-orange-50/80 transition-all flex items-center gap-3 w-full text-left p-3 rounded-xl group"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="animate-spin border-2 border-orange-500 border-t-transparent rounded-full h-6 w-6"></span>
                    ) : (
                      <>
                        <item.icon className="w-6 h-6 text-orange-500 group-hover:text-orange-600 transition-colors" />
                        <span className="text-gray-600 group-hover:text-orange-500 transition-colors text-lg font-medium">
                          {item.name}
                        </span>
                      </>
                    )}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navbar */}
      <div className="flex-1">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between bg-white/90 backdrop-blur-lg border-b border-orange-100 items-center gap-4 p-4 shadow-sm"
        >
          <div className="flex items-center gap-4">
            {showBackButton && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                onClick={handleBack}
                className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-x-1"
              >
                <FaArrowLeft className="w-5 h-5 text-orange-500" />
                <span className="text-gray-700 font-medium">Back</span>
              </motion.button>
            )}
            <button
              type="button"
              className="btn btn-text btn-circle text-gray-600 hover:text-orange-500 hover:bg-orange-50 focus:outline-none z-20 transition-colors p-3"
              aria-label="Toggle Sidebar"
              onClick={toggleSidebar}
            >
              <FaBars className="text-2xl" />
            </button>
          </div>
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-orange-200">
                RS
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                REVSENSE
              </h2>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative inline-flex">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 text-sm font-medium shadow-lg shadow-orange-200 hover:shadow-xl hover:shadow-orange-300">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox:
                        "w-12 h-12 rounded-full border-2 border-orange-500 shadow-lg shadow-orange-200",
                    },
                  }}
                />
              </SignedIn>
            </div>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="text-2xl text-gray-600 hover:text-orange-500 bg-white p-3 rounded-lg hover:bg-orange-50 transition-colors shadow-sm"
        >
          {isMenuOpen ? "Close Menu" : "Open Menu"}
        </button>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="bg-white/90 backdrop-blur-lg text-gray-600 rounded-lg mt-2 shadow-lg border border-orange-100"
            >
              <ul className="space-y-2 px-4 py-4">
                {menuItems.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <button
                      onClick={() => {
                        if (item.path === "/dashboard") {
                          router.push(item.path);
                        } else {
                          handleAnalysisClick(item.path);
                        }
                      }}
                      className="hover:bg-orange-50/80 transition-all flex items-center gap-3 w-full text-left p-3 rounded-xl group"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="animate-spin border-2 border-orange-500 border-t-transparent rounded-full h-6 w-6"></span>
                      ) : (
                        <>
                          <item.icon className="w-6 h-6 text-orange-500 group-hover:text-orange-600 transition-colors" />
                          <span className="text-gray-600 group-hover:text-orange-500 transition-colors text-lg font-medium">
                            {item.name}
                          </span>
                        </>
                      )}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Navbar;
