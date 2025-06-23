"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaChartLine,
  FaChartBar,
  FaChartPie,
  FaFilter,
} from "react-icons/fa";
import { format, subDays, subMonths, subYears } from "date-fns";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { FaArrowRight } from "react-icons/fa";
import Navbar from "../component/Navbar";

// Sample data - Replace with API data later
const sampleTimeSeriesData = [
  { date: "2024-03-15", value: 400 },
  { date: "2024-03-16", value: 300 },
  { date: "2024-03-17", value: 600 },
  { date: "2024-03-18", value: 800 },
  { date: "2024-03-19", value: 500 },
  { date: "2024-03-20", value: 700 },
];

const sampleDistributionData = [
  { category: "Category A", value: 400 },
  { category: "Category B", value: 300 },
  { category: "Category C", value: 200 },
  { category: "Category D", value: 100 },
];

const sampleCategoryData = [
  { name: "Type 1", value: 35 },
  { name: "Type 2", value: 25 },
  { name: "Type 3", value: 20 },
  { name: "Type 4", value: 15 },
  { name: "Type 5", value: 5 },
];

// Update colors to match website theme
const COLORS = ["#F97316", "#FB923C", "#FED7AA", "#FFEDD5", "#FFF7ED"];

interface DateRange {
  startDate: Date;
  endDate: Date;
}

interface PredefinedPeriod {
  label: string;
  startDate: Date;
  endDate: Date;
}

// API Integration
const fetchAnalysisData = async (startDate: Date, endDate: Date) => {
  try {
    const response = await fetch(
      `/api/analysis?start=${startDate.toISOString()}&end=${endDate.toISOString()}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return {
      timeSeries: data.timeSeries || sampleTimeSeriesData,
      distribution: data.distribution || sampleDistributionData,
      categories: data.categories || sampleCategoryData,
    };
  } catch (error) {
    console.error("Error fetching analysis data:", error);
    // Return sample data if API fails
    return {
      timeSeries: sampleTimeSeriesData,
      distribution: sampleDistributionData,
      categories: sampleCategoryData,
    };
  }
};

const AutomatedAnalysisPage: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const [formattedDates, setFormattedDates] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState({
    timeSeries: sampleTimeSeriesData,
    distribution: sampleDistributionData,
    categories: sampleCategoryData,
  });

  // Effect for API Integration
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchAnalysisData(
          dateRange.startDate,
          dateRange.endDate
        );
        setAnalysisData(data);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [dateRange]);

  const predefinedPeriods: PredefinedPeriod[] = [
    {
      label: "Last 6 Days",
      startDate: subDays(new Date(), 6),
      endDate: new Date(),
    },
    {
      label: "Last Month",
      startDate: subMonths(new Date(), 1),
      endDate: new Date(),
    },
    {
      label: "Last 12 Months",
      startDate: subMonths(new Date(), 12),
      endDate: new Date(),
    },
    {
      label: "Last 5 Years",
      startDate: subYears(new Date(), 5),
      endDate: new Date(),
    },
  ];

  const handleDateChange = (start: Date, end: Date) => {
    setDateRange({ startDate: start, endDate: end });
    const formattedStart = format(start, "yyyy-MM-dd HH:mm:ss");
    const formattedEnd = format(end, "yyyy-MM-dd HH:mm:ss");
    setFormattedDates(`Start: ${formattedStart}\nEnd: ${formattedEnd}`);
  };

  const handlePeriodSelect = (period: PredefinedPeriod) => {
    setSelectedPeriod(period.label);
    handleDateChange(period.startDate, period.endDate);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white shadow-lg">
              <FaCalendarAlt className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
              Automated Date Analysis
            </h1>
          </div>
          <p className="text-xl text-gray-600">
            Analyze data across custom date ranges with automated filtering
          </p>
        </motion.div>

        {/* Date Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-orange-100/20 hover:shadow-xl transition-all duration-300"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FaCalendarAlt className="w-5 h-5 text-orange-500 mr-2" />
              Select Date Range
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="datetime-local"
                  value={format(dateRange.startDate, "yyyy-MM-dd'T'HH:mm")}
                  onChange={(e) =>
                    handleDateChange(
                      new Date(e.target.value),
                      dateRange.endDate
                    )
                  }
                  className="text-black w-full px-4 py-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="datetime-local"
                  value={format(dateRange.endDate, "yyyy-MM-dd'T'HH:mm")}
                  onChange={(e) =>
                    handleDateChange(
                      dateRange.startDate,
                      new Date(e.target.value)
                    )
                  }
                  className="text-black w-full px-4 py-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-orange-100/20 hover:shadow-xl transition-all duration-300"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FaFilter className="w-5 h-5 text-orange-500 mr-2" />
              Predefined Periods
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {predefinedPeriods.map((period) => (
                <button
                  key={period.label}
                  onClick={() => handlePeriodSelect(period)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    selectedPeriod === period.label
                      ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-orange-50 border border-orange-100"
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Formatted Dates Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-orange-100/20 mb-12 hover:shadow-xl transition-all duration-300"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <FaCalendarAlt className="w-5 h-5 text-orange-500 mr-2" />
            Selected Date Range
          </h2>
          <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto border border-gray-200">
            <code className="text-sm text-black font-medium">
              {formattedDates}
            </code>
          </pre>
        </motion.div>

        {/* Analysis Results */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-orange-100/20 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white">
                <FaChartLine className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Time Series Analysis
              </h2>
            </div>
            <div className="h-64">
              {isLoading ? (
                <div className="h-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analysisData.timeSeries}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#FED7AA" />
                    <XAxis dataKey="date" stroke="#F97316" />
                    <YAxis stroke="#F97316" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        border: "1px solid #FED7AA",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#F97316"
                      strokeWidth={2}
                      dot={{ fill: "#F97316", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-orange-100/20 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white">
                <FaChartBar className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Distribution Analysis
              </h2>
            </div>
            <div className="h-64">
              {isLoading ? (
                <div className="h-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analysisData.distribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#FED7AA" />
                    <XAxis dataKey="category" stroke="#F97316" />
                    <YAxis stroke="#F97316" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        border: "1px solid #FED7AA",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="value" fill="#F97316" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-orange-100/20 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white">
                <FaChartPie className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Category Analysis
              </h2>
            </div>
            <div className="h-64">
              {isLoading ? (
                <div className="h-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analysisData.categories}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {analysisData.categories.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        border: "1px solid #FED7AA",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AutomatedAnalysisPage;
