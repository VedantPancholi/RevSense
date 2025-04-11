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
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import {
  FaHeadset,
  FaChartBar,
  FaChartPie,
  FaChartLine,
  FaExclamationTriangle,
} from "react-icons/fa";

const COLORS = ["#22C55E", "#4ADE80", "#86EFAC", "#BBF7D0", "#DCFCE7"];

const CustomerSatisfactionPage = () => {
  // Sample data for demonstration
  const likelihoodData = [
    { name: "Highly Likely", value: 463 },
    { name: "Neutral", value: 85 },
    { name: "Unlikely", value: 578 },
  ];

  const sentimentData = [
    { name: "Positive", value: 20 },
    { name: "Negative", value: 9 },
    { name: "Neutral", value: 1 },
  ];

  const serviceExcellenceData = [
    { name: "Fast & Responsive", value: 34 },
    { name: "Courteous & Polite", value: 7 },
    { name: "Helpful & Accommodating", value: 2 },
  ];

  const serviceIssuesData = [
    { name: "Poor Support", value: 333 },
    { name: "Repeated Complaints", value: 33 },
    { name: "Negative Interaction", value: 54 },
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
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white">
              <FaHeadset className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Customer Satisfaction & Retention
            </h1>
          </div>
          <p className="text-xl text-gray-600">
            Analyze customer satisfaction metrics and retention patterns
          </p>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Overall Satisfaction", value: "85%", change: "+5%" },
            { label: "Retention Rate", value: "78%", change: "+3%" },
            { label: "NPS Score", value: "8.2", change: "+0.5" },
            { label: "Customer Loyalty", value: "72%", change: "+4%" },
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
          {/* Likelihood to Recommend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-md p-6 rounded-xl"
          >
            <div className="flex items-center space-x-3 mb-4">
              <FaChartBar className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Likelihood to Recommend
              </h2>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={likelihoodData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Sentiment Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white shadow-md p-6 rounded-xl"
          >
            <div className="flex items-center space-x-3 mb-4">
              <FaChartPie className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Sentiment Distribution
              </h2>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sentimentData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {sentimentData.map((entry, index) => (
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

          {/* Service Excellence */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white shadow-md p-6 rounded-xl"
          >
            <div className="flex items-center space-x-3 mb-4">
              <FaChartLine className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Service Excellence
              </h2>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={serviceExcellenceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Service Issues */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white shadow-md p-6 rounded-xl"
          >
            <div className="flex items-center space-x-3 mb-4">
              <FaExclamationTriangle className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Service Issues
              </h2>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={serviceIssuesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#EF4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default CustomerSatisfactionPage; 