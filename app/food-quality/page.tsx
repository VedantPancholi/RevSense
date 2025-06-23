"use client";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  FaUtensils,
  FaChartLine,
  FaChartBar,
  FaChartPie,
  FaExclamationTriangle,
} from "react-icons/fa";

const COLORS = ["#F97316", "#FB923C", "#FED7AA", "#FFEDD5", "#FFF7ED"];

const FoodQualityPage = () => {
  const searchParams = useSearchParams();
  const [chartData, setChartData] = useState([]);

  // Sample data for demonstration
  const freshnessData = [
    { name: "Fresh & Hot on Arrival", value: 60 },
    { name: "Well-Preserved Temperature", value: 25 },
    { name: "Slightly Cold but Edible", value: 10 },
    { name: "Completely Cold & Unappetizing", value: 3 },
    { name: "Spoiled or Rotten", value: 2 },
  ];

  const hygieneData = [
    { name: "Hair, Plastic, or Other Contaminants", value: 15 },
    { name: "Bugs, Insects, or Mold Found", value: 10 },
    { name: "Dirty or Unsanitary Packaging", value: 20 },
    { name: "Poor Sanitation in Kitchen", value: 25 },
    { name: "Undercooked or Raw", value: 15 },
    { name: "Overcooked or Burnt", value: 10 },
    { name: "Odd Taste or Foul Smell", value: 5 },
  ];

  const incorrectOrdersData = [
    { name: "Completely Incorrect Order", value: 8 },
    { name: "Partially Wrong Items", value: 15 },
    { name: "Missing Entire Dish", value: 12 },
    { name: "Missing Side Items", value: 25 },
  ];

  const qualityTrendData = [
    { date: "Jan", quality: 4.2, complaints: 15 },
    { date: "Feb", quality: 4.3, complaints: 12 },
    { date: "Mar", quality: 4.1, complaints: 18 },
    { date: "Apr", quality: 4.4, complaints: 10 },
    { date: "May", quality: 4.5, complaints: 8 },
    { date: "Jun", quality: 4.6, complaints: 6 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <main className="container mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white">
              <FaUtensils className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Food & Product Quality
            </h1>
          </div>
          <p className="text-xl text-gray-600">
            Monitor food quality metrics and product standards
          </p>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Quality Score", value: "4.5/5", change: "+0.2" },
            { label: "Freshness Rate", value: "95%", change: "+3%" },
            { label: "Hygiene Score", value: "4.8/5", change: "+0.3" },
            { label: "Order Accuracy", value: "98%", change: "+2%" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-gray-500 text-sm font-medium">
                {stat.label}
              </h3>
              <div className="flex items-end justify-between mt-2">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <span className="text-sm text-green-500">{stat.change}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Food Freshness */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-md p-6 rounded-xl"
          >
            <div className="flex items-center space-x-3 mb-4">
              <FaChartPie className="w-6 h-6 text-orange-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Food Freshness
              </h2>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={freshnessData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {freshnessData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Hygiene Complaints */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white shadow-md p-6 rounded-xl"
          >
            <div className="flex items-center space-x-3 mb-4">
              <FaChartBar className="w-6 h-6 text-orange-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Hygiene Complaints
              </h2>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hygieneData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#F97316" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Incorrect Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white shadow-md p-6 rounded-xl"
          >
            <div className="flex items-center space-x-3 mb-4">
              <FaExclamationTriangle className="w-6 h-6 text-orange-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Incorrect Orders
              </h2>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={incorrectOrdersData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {incorrectOrdersData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Quality Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white shadow-md p-6 rounded-xl"
          >
            <div className="flex items-center space-x-3 mb-4">
              <FaChartLine className="w-6 h-6 text-orange-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Quality Trend
              </h2>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={qualityTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="quality"
                    stroke="#F97316"
                    name="Quality Score"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="complaints"
                    stroke="#FB923C"
                    name="Complaints"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default FoodQualityPage; 