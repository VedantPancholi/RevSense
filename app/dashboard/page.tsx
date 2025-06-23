"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  FaChartBar,
  FaChartLine,
  FaChartPie,
  FaUtensils,
  FaTruck,
  FaHeadset,
  FaDollarSign,
  FaExclamationTriangle,
  FaSearch,
  FaBell,
  FaUser,
  FaArrowUp,
  FaArrowDown,
  FaStar,
  FaComments,
  FaTasks,
  FaChartArea,
  FaBusinessTime,
  FaUsers,
  FaCheckCircle,
  FaShoppingCart,
  FaMobile,
  FaSprayCan,
  FaBox,
} from "react-icons/fa";

interface InsightCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  link: string;
  keyMetrics: string[];
  trend?: {
    value: string;
    direction: "up" | "down";
  };
}

const DashboardPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [topComplaints, setTopComplaints] = useState<Array<{
    category: string;
    count: number;
    percentage: string;
  }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopComplaints = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/complaints/categories');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API Response:', data);

        if (!Array.isArray(data)) {
          throw new Error('Invalid data format: expected an array');
        }

        // Sort by count and take top 4
        const sortedCategories = [...data].sort((a, b) => b.count - a.count).slice(0, 4);
        
        // Calculate total for percentages
        const totalComplaints = sortedCategories.reduce((sum, cat) => sum + cat.count, 0);
        
        // Format the data
        const formattedCategories = sortedCategories.map(cat => ({
          category: cat.category,
          count: cat.count,
          percentage: `${Math.round((cat.count / totalComplaints) * 100)}%`
        }));

        console.log('Formatted Categories:', formattedCategories);
        setTopComplaints(formattedCategories);
      } catch (error) {
        console.error('Error fetching complaint categories:', error);
        setError(error instanceof Error ? error.message : 'Failed to load complaint categories');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopComplaints();
  }, []);

  // Helper function to get appropriate icon for category
  const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: any } = {
      'Food Quality': FaUtensils,
      'Delivery': FaTruck,
      'Order': FaExclamationTriangle,
      'Payment': FaDollarSign,
      'Service': FaHeadset,
      'App Issues': FaMobile,
      'Hygiene': FaSprayCan,
      'Packaging': FaBox
    };

    // Return the mapped icon or a default icon
    return iconMap[category.split(' ')[0]] || FaExclamationTriangle;
  };

  const insightCards: InsightCard[] = [
    {
      id: "refund-analysis",
      title: "Refund Analysis",
      description:
        "Track and analyze refund patterns to identify potential issues and improve customer satisfaction.",
      icon: <FaExclamationTriangle className="w-6 h-6" />,
      color: "from-yellow-500 to-yellow-600",
      link: "/refund-analysis",
      keyMetrics: [
        "Refund Rate",
        "Average Refund Amount",
        "Common Reasons",
        "Trend Analysis",
      ],
    },
    {
      id: "food-quality",
      title: "Food & Product Quality",
      description:
        "Monitor product quality metrics and customer feedback to maintain high standards.",
      icon: <FaUtensils className="w-6 h-6" />,
      color: "from-orange-500 to-orange-600",
      link: "/foodandproduct-quality",
      keyMetrics: [
        "Quality Score",
        "Consistency Rate",
        "Customer Ratings",
        "Quality Issues",
      ],
    },
    {
      id: "pricing-strategy",
      title: "Pricing Strategy",
      description:
        "Analyze pricing effectiveness and optimize your discount strategies for better profitability.",
      icon: <FaDollarSign className="w-6 h-6" />,
      color: "from-green-500 to-green-600",
      link: "/pricing-strategy",
      keyMetrics: [
        "Average Order Value",
        "Discount Usage",
        "Profit Margin",
        "Customer Retention",
      ],
    },
    {
      id: "customer-service",
      title: "Customer Service",
      description:
        "Track customer service performance and identify areas for improvement.",
      icon: <FaHeadset className="w-6 h-6" />,
      color: "from-blue-500 to-blue-600",
      link: "/customer-service",
      keyMetrics: [
        "Response Time",
        "Resolution Rate",
        "Customer Satisfaction",
        "Support Tickets",
      ],
    },
    {
      id: "delivery-logistics",
      title: "Delivery & Logistics",
      description:
        "Optimize delivery operations and improve logistics efficiency.",
      icon: <FaTruck className="w-6 h-6" />,
      color: "from-purple-500 to-purple-600",
      link: "/delivery-and-logistics",
      keyMetrics: [
        "Delivery Time",
        "On-Time Rate",
        "Delivery Cost",
        "Route Efficiency",
      ],
    },
    {
      id: "automated-analysis",
      title: "Automated Date Analysis",
      description:
        "Analyze data across custom date ranges with automated filtering and visualization.",
      icon: <FaChartArea className="w-6 h-6" />,
      color: "from-indigo-500 to-indigo-600",
      link: "/automated-analysis",
      keyMetrics: [
        "Custom Date Range",
        "Predefined Periods",
        "Time-based Trends",
        "Automated Reports",
      ],
      trend: {
        value: "New",
        direction: "up",
      },
    },
    {
      id: "business-insights",
      title: "Business Insights",
      description:
        "Deep analysis of business metrics, customer feedback, and actionable insights.",
      icon: <FaBusinessTime className="w-6 h-6" />,
      color: "from-indigo-500 to-indigo-600",
      link: "/business-insights",
      keyMetrics: [
        "Customer Trust Impact",
        "Financial Risk",
        "Issue Frequency",
        "Root Causes",
      ],
      trend: {
        value: "New",
        direction: "up",
      },
    },
  ];

  const handleCardClick = (card: InsightCard) => {
    const fakeData = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [{ label: card.title, data: [65, 59, 80, 81, 56, 55] }],
    };
    window.location.href = `${card.link}?data=${encodeURIComponent(
      JSON.stringify(fakeData)
    )}`;
  };

  const filteredCards = insightCards.filter((card) =>
    card.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <nav className="bg-transparent top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-gray-900">
                REVSENSE
              </h1>
              <div
                className={`relative transition-all duration-500 ${
                  isSearchFocused ? "w-96" : "w-64"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-2xl blur-xl"></div>
                <div className="relative bg-white/30 backdrop-blur-md rounded-2xl border border-orange-100/50 shadow-lg">
                  <input
                    type="text"
                    placeholder="Search insights..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className="w-full px-4 py-3 pl-12 pr-4 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 rounded-2xl transition-all duration-300"
                  />
                  <FaSearch className="absolute left-4 top-4 text-orange-500/70" />
                  {searchQuery && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-3 text-orange-500/70 hover:text-orange-600 transition-colors p-1 hover:bg-orange-50 rounded-full"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </motion.button>
                  )}
                </div>
                {/* {isSearchFocused && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-orange-100/50 p-3"
                  >
                    <div className="text-sm text-orange-500/70 px-2 py-1 font-medium">
                      Popular Searches:
                    </div>
                    <div className="space-y-1">
                      {[
                        "Refund Analysis",
                        "Food Quality",
                        "Pricing",
                        "Customer Service",
                      ].map((term) => (
                        <motion.button
                          key={term}
                          whileHover={{ x: 5 }}
                          onClick={() => setSearchQuery(term)}
                          className="w-full text-left px-2 py-2 text-sm text-gray-700 hover:bg-orange-50/50 rounded-lg transition-colors flex items-center gap-2"
                        >
                          <FaSearch className="w-3 h-3 text-orange-500/50" />
                          {term}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 sm:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Top Customer Complaints Dashboard
              </h1>
              <p className="text-xl text-gray-600 mt-2">
                Monitor and track most reported customer issues
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {isLoading ? (
            // Loading state
            Array(4).fill(0).map((_, index) => (
              <motion.div
                key={`skeleton-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-2 bg-gray-200 rounded w-full"></div>
                </div>
              </motion.div>
            ))
          ) : (
            // Data display
            topComplaints.map((complaint, index) => {
              const IconComponent = getCategoryIcon(complaint.category);
              return (
                <motion.div
                  key={`complaint-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-500 text-sm font-medium truncate">
                      {complaint.category}
                    </h3>
                    <IconComponent className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  </div>
                  <div className="flex items-end justify-between">
                    <p className="text-2xl font-bold text-gray-900">
                      {complaint.count.toLocaleString()}
                    </p>
                    <span className="text-sm text-gray-500 flex items-center">
                      {complaint.percentage} of total
                    </span>
                  </div>
                  <div className="mt-4 h-1 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: complaint.percentage }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      className="h-full bg-gradient-to-r from-orange-500 to-orange-600"
                    />
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

        <div className="flex items-center space-x-4 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              selectedCategory === null
                ? "bg-orange-500 text-white"
                : "bg-white text-gray-700 hover:bg-orange-50"
            }`}
          >
            All Categories
          </button>
          {insightCards.map((card) => (
            <button
              key={card.id}
              onClick={() => setSelectedCategory(card.id)}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                selectedCategory === card.id
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-700 hover:bg-orange-50"
              }`}
            >
              {card.title}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredCards
              .filter(
                (card) => !selectedCategory || card.id === selectedCategory
              )
              .map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  onClick={() => handleCardClick(card)}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 rounded-lg bg-gradient-to-r ${card.color} flex items-center justify-center text-white`}
                      >
                        {card.icon}
                      </div>
                      {card.trend && (
                        <span
                          className={`text-sm flex items-center ${
                            card.trend.direction === "up"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {card.trend.direction === "up" ? (
                            <FaArrowUp className="w-4 h-4 mr-1" />
                          ) : (
                            <FaArrowDown className="w-4 h-4 mr-1" />
                          )}
                          {card.trend.value}
                        </span>
                      )}
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      {card.title}
                    </h2>
                    <p className="text-gray-600 mb-4">{card.description}</p>
                    <div className="space-y-2">
                      {card.keyMetrics.map((metric, idx) => (
                        <div
                          key={idx}
                          className="flex items-center text-sm text-gray-500"
                        >
                          <span className="w-2 h-2 bg-gray-300 rounded-full mr-2"></span>
                          {metric}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center text-orange-500 hover:text-orange-600">
                      <span className="text-sm font-medium">View Analysis</span>
                      <FaArrowUp className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-8 text-white"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Transform Your Customer Reviews?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center">
              Get started with REVSENSE today and turn customer feedback
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default DashboardPage;
