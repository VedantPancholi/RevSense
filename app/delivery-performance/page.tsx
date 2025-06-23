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
  FaTruck,
  FaChartLine,
  FaChartBar,
  FaChartPie,
  FaMapMarkedAlt,
} from "react-icons/fa";

const COLORS = ["#8B5CF6", "#A78BFA", "#C4B5FD", "#DDD6FE", "#EDE9FE"];

const DeliveryPerformancePage = () => {
  const searchParams = useSearchParams();
  const [chartData, setChartData] = useState([]);

  // Sample data for demonstration
  const lateDeliveriesData = [
    { date: "Jan", minor: 15, major: 5, lost: 2 },
    { date: "Feb", minor: 12, major: 4, lost: 1 },
    { date: "Mar", minor: 18, major: 6, lost: 3 },
    { date: "Apr", minor: 10, major: 3, lost: 1 },
    { date: "May", minor: 14, major: 4, lost: 2 },
    { date: "Jun", minor: 16, major: 5, lost: 2 },
  ];

  const riderData = [
    { name: "Courteous & Polite", value: 60 },
    { name: "Helpful & Accommodating", value: 40 },
    { name: "Rude & Unprofessional", value: 15 },
    { name: "Ignored Special Instructions", value: 10 },
  ];

  const orderHandlingData = [
    { name: "Package Delivered Safely", value: 75 },
    { name: "No Damage to Food/Items", value: 65 },
    { name: "Rough Handling (Spilled or Leaked)", value: 20 },
    { name: "Package Arrived Damaged", value: 15 },
  ];

  const deliveryIssuesData = [
    { name: "Inaccurate GPS Tracking", value: 35 },
    { name: "Order Stuck in Processing", value: 25 },
    { name: "Wrong Address", value: 20 },
    { name: "Traffic Delays", value: 15 },
    { name: "Weather Issues", value: 5 },
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
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center text-white">
              <FaTruck className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Delivery Performance & Efficiency
            </h1>
          </div>
          <p className="text-xl text-gray-600">
            Monitor delivery operations and optimize logistics efficiency
          </p>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "On-Time Delivery", value: "92%", change: "+2%" },
            { label: "Average Delivery Time", value: "28min", change: "-3min" },
            { label: "Delivery Success Rate", value: "98%", change: "+1%" },
            { label: "Customer Satisfaction", value: "4.5/5", change: "+0.2" },
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
          {/* Late Deliveries Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-md p-6 rounded-xl"
          >
            <div className="flex items-center space-x-3 mb-4">
              <FaChartLine className="w-6 h-6 text-purple-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Late Deliveries Trend
              </h2>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lateDeliveriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="minor"
                    stroke="#8B5CF6"
                    name="Minor Delays"
                  />
                  <Line
                    type="monotone"
                    dataKey="major"
                    stroke="#A78BFA"
                    name="Major Delays"
                  />
                  <Line
                    type="monotone"
                    dataKey="lost"
                    stroke="#C4B5FD"
                    name="Lost Orders"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Rider Professionalism */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white shadow-md p-6 rounded-xl"
          >
            <div className="flex items-center space-x-3 mb-4">
              <FaChartBar className="w-6 h-6 text-purple-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Rider Professionalism
              </h2>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={riderData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Order Handling */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white shadow-md p-6 rounded-xl"
          >
            <div className="flex items-center space-x-3 mb-4">
              <FaChartPie className="w-6 h-6 text-purple-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Order Handling
              </h2>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orderHandlingData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {orderHandlingData.map((entry, index) => (
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

          {/* Delivery Issues */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white shadow-md p-6 rounded-xl"
          >
            <div className="flex items-center space-x-3 mb-4">
              <FaMapMarkedAlt className="w-6 h-6 text-purple-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Delivery Issues
              </h2>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deliveryIssuesData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {deliveryIssuesData.map((entry, index) => (
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
        </div>
      </main>
    </div>
  );
};

export default DeliveryPerformancePage; 