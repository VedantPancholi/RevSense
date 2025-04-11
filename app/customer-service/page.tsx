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
  FaExclamationTriangle,
} from "react-icons/fa";
import Navbar from "../component/Navbar";
import BackButton from "../component/BackButton";

const COLORS = ["#22C55E", "#4ADE80", "#86EFAC", "#BBF7D0", "#DCFCE7"];

interface CategoryData {
  categories: {
    [key: string]: number;
  };
}

interface ChartData {
  likelihoodData: Array<{ name: string; value: number }>;
  sentimentData: Array<{ name: string; value: number }>;
  serviceData: Array<{ name: string; positive: number; negative: number }>;
  complaintsData: Array<{ name: string; value: number }>;
  stats: {
    responseTime: string;
    resolutionRate: string;
    customerSatisfaction: string;
    supportTickets: string;
  };
}

const API_URL = '/api/data';

const CustomerServicePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<CategoryData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const jsonData = await response.json();
        
        if (jsonData.error) {
          throw new Error(jsonData.error);
        }

        // Ensure the data has the expected structure
        if (!jsonData.categories) {
          throw new Error('Invalid data format: missing categories');
        }

        console.log('Fetched data:', jsonData); // Debug log
        setData(jsonData);
      } catch (err) {
        console.error('Error fetching data:', err);
        if (err instanceof Error) {
          if (err.message.includes('Failed to fetch')) {
            setError('Unable to connect to the server. Please try again later.');
          } else {
            setError(err.message);
          }
        } else {
          setError('Failed to fetch data from the server');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Process data for charts
  const processChartData = (): ChartData => {
    if (!data) return {
      likelihoodData: [],
      sentimentData: [],
      serviceData: [],
      complaintsData: [],
      stats: {
        responseTime: "0m",
        resolutionRate: "0%",
        customerSatisfaction: "0/5",
        supportTickets: "0"
      }
    };

    const categories = data.categories;

    // Likelihood to Recommend Breakdown
    const likelihoodData = [
      { name: "Highly Likely", value: categories["Highly Likely"] || 0 },
      { name: "Neutral", value: categories["Neutral"] || 0 },
      { name: "Unlikely", value: categories["Unlikely"] || 0 },
    ];

    // Sentiment Distribution
    const positiveSentiment = (categories["Consistently Great Service"] || 0) + (categories["Trust in Brand"] || 0);
    const negativeSentiment = (categories["Frequent Service Issues"] || 0) + (categories["Lost Trust in Company"] || 0);
    const totalSentiment = positiveSentiment + negativeSentiment;

    const sentimentData = [
      { name: "Positive", value: positiveSentiment },
      { name: "Negative", value: negativeSentiment },
    ];

    // Service Excellence vs. Service Issues
    const serviceData = [
      { 
        name: "Support Quality", 
        positive: categories["Fast & Responsive Support"] || 0,
        negative: categories["Poor Customer Support"] || 0
      },
      { 
        name: "Representative Quality", 
        positive: categories["Knowledgeable Representatives"] || 0,
        negative: categories["Unhelpful Representatives"] || 0
      },
      { 
        name: "Issue Resolution", 
        positive: categories["Personalized Assistance"] || 0,
        negative: categories["Repeated Complaints Ignored"] || 0
      },
    ];

    // Common Customer Complaints
    const complaintsData = [
      { name: "Good Service but Expensive", value: categories["Good Service but Expensive"] || 0 },
      { name: "Cheap Pricing but Low Quality", value: categories["Cheap Pricing but Low Quality"] || 0 },
      { name: "Some Good, Some Bad Orders", value: categories["Some Good, Some Bad Orders"] || 0 },
      { name: "Inconsistent Service Quality", value: categories["Inconsistent Service Quality"] || 0 },
    ];

    // Calculate statistics
    const totalTickets = Object.values(categories).reduce((sum, val) => sum + val, 0);
    const resolvedTickets = (categories["Fast & Responsive Support"] || 0) + 
                          (categories["Knowledgeable Representatives"] || 0) +
                          (categories["Personalized Assistance"] || 0);
    const satisfactionScore = totalSentiment > 0 ? ((positiveSentiment / totalSentiment) * 5).toFixed(1) : "0.0";

    return {
      likelihoodData,
      sentimentData,
      serviceData,
      complaintsData,
      stats: {
        responseTime: "2.5m",
        resolutionRate: `${((resolvedTickets / totalTickets) * 100).toFixed(1)}%`,
        customerSatisfaction: `${satisfactionScore}/5`,
        supportTickets: totalTickets.toString()
      }
    };
  };

  const chartData = processChartData();

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="text-gray-900 font-medium mb-2 text-base">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <span className="text-gray-600">{entry.name}:</span>
              <span className={`font-semibold ${
                entry.name === "Positive" ? "text-green-600" : 
                entry.name === "Negative" ? "text-red-600" : 
                "text-blue-600"
              }`}>
                {entry.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <Navbar />
      <BackButton />
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
              Customer Service Analysis
            </h1>
          </div>
          <p className="text-xl text-gray-600">
            Monitor and improve your customer service performance
          </p>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Response Time", value: chartData.stats.responseTime, change: "-0.5m" },
            { label: "Resolution Rate", value: chartData.stats.resolutionRate, change: "+3%" },
            { label: "Customer Satisfaction", value: chartData.stats.customerSatisfaction, change: "+0.2" },
            { label: "Support Tickets", value: chartData.stats.supportTickets, change: "-12" },
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
          {/* Likelihood to Recommend Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-md p-6 rounded-xl"
          >
            <div className="flex items-center space-x-3 mb-4">
              <FaChartBar className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Likelihood to Recommend Breakdown
              </h2>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData.likelihoodData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: '#4B5563', fontSize: 12 }}
                    tickLine={{ stroke: '#4B5563' }}
                  />
                  <YAxis 
                    tick={{ fill: '#4B5563', fontSize: 12 }}
                    tickLine={{ stroke: '#4B5563' }}
                  />
                  <Tooltip 
                    content={<CustomTooltip />}
                    cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="value" 
                    fill="#3B82F6" 
                    radius={[4, 4, 0, 0]}
                    name="Count"
                  />
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
                    data={chartData.sentimentData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    labelLine={{ stroke: '#4B5563', strokeWidth: 1 }}
                  >
                    {chartData.sentimentData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index === 0 ? "#22C55E" : "#EF4444"}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    content={<CustomTooltip />}
                    cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    formatter={(value) => <span className="text-gray-700">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Service Excellence vs. Service Issues */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white shadow-md p-6 rounded-xl"
          >
            <div className="flex items-center space-x-3 mb-4">
              <FaChartBar className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Service Excellence vs. Service Issues
              </h2>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData.serviceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: '#4B5563', fontSize: 12 }}
                    tickLine={{ stroke: '#4B5563' }}
                  />
                  <YAxis 
                    tick={{ fill: '#4B5563', fontSize: 12 }}
                    tickLine={{ stroke: '#4B5563' }}
                  />
                  <Tooltip 
                    content={<CustomTooltip />}
                    cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    formatter={(value) => <span className="text-gray-700">{value}</span>}
                  />
                  <Bar 
                    dataKey="positive" 
                    name="Positive" 
                    stackId="a" 
                    fill="#22C55E"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="negative" 
                    name="Negative" 
                    stackId="a" 
                    fill="#EF4444"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Common Customer Complaints */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white shadow-md p-6 rounded-xl"
          >
            <div className="flex items-center space-x-3 mb-4">
              <FaExclamationTriangle className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Common Customer Complaints
              </h2>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData.complaintsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: '#4B5563', fontSize: 12 }}
                    tickLine={{ stroke: '#4B5563' }}
                  />
                  <YAxis 
                    tick={{ fill: '#4B5563', fontSize: 12 }}
                    tickLine={{ stroke: '#4B5563' }}
                  />
                  <Tooltip 
                    content={<CustomTooltip />}
                    cursor={{ fill: 'rgba(239, 68, 68, 0.1)' }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="value" 
                    fill="#EF4444" 
                    radius={[4, 4, 0, 0]}
                    name="Count"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default CustomerServicePage;
