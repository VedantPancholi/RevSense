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
  Line,
  LineChart,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import {
  FaExclamationTriangle,
  FaChartBar,
  FaChartPie,
  FaChartLine,
} from "react-icons/fa";

const COLORS = [
  "#2E3192",  // Deep Blue
  "#1ABC9C",  // Turquoise
  "#E74C3C",  // Red
  "#F39C12",  // Orange
  "#9B59B6",  // Purple
  "#3498DB",  // Light Blue
  "#2ECC71",  // Green
  "#E67E22",  // Dark Orange
  "#16A085",  // Dark Turquoise
  "#8E44AD"   // Dark Purple
];

interface CategoryData {
  categories: {
    [key: string]: number;
  };
}

const API_URL = '/api/data';

const RefundAnalysisPage = () => {
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

        if (!jsonData.categories) {
          throw new Error('Invalid data format: missing categories');
        }

        console.log('Fetched data:', jsonData);
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
  const processChartData = () => {
    if (!data) return {
      approvalData: [],
      reasonsData: [],
      timelineData: [],
      stats: {
        totalRefunds: 0,
        approvalRate: 0,
        avgProcessingTime: 0,
        resolutionRate: 0
      }
    };

    const categories = data.categories;
    console.log('Processing categories:', categories);

    // Refund Approval vs. Denial data
    const approvalData = [
      { 
        name: "Approved Due to Major Delay",
        value: categories["Approved Due to Major Delay"] || 0
      },
      { 
        name: "Approved Due to Quality Issues",
        value: categories["Approved Due to Quality Issues"] || 0
      },
      { 
        name: "Denied Due to Policy",
        value: categories["Denied Due to Policy"] || 0
      }
    ];

    // Reasons for Refund Requests data
    const reasonsData = [
      { 
        name: "Wrong Item Delivered",
        value: categories["Wrong Item Delivered"] || 0
      },
      { 
        name: "Missing Items Compensation",
        value: categories["Missing Items Compensation"] || 0
      },
      { 
        name: "Bad Food Refunds",
        value: categories["Bad Food Refunds"] || 0
      }
    ];

    // Refund Processing Time Trends data
    const timelineData = [
      { 
        name: "Quickly Resolved",
        value: categories["Quickly Resolved"] || 0
      },
      { 
        name: "Delayed Resolution",
        value: categories["Delayed Resolution"] || 0
      },
      { 
        name: "Unresolved Issue",
        value: categories["Unresolved Issue"] || 0
      }
    ];

    // Calculate statistics
    const totalRefunds = categories["Total Refunds"] || 0;
    const approvedRefunds = (categories["Approved Due to Major Delay"] || 0) + 
                          (categories["Approved Due to Quality Issues"] || 0);
    const approvalRate = totalRefunds > 0 ? ((approvedRefunds / totalRefunds) * 100).toFixed(1) : "0.0";
    const resolvedIssues = (categories["Quickly Resolved"] || 0) + 
                          (categories["Delayed Resolution"] || 0);
    const resolutionRate = totalRefunds > 0 ? ((resolvedIssues / totalRefunds) * 100).toFixed(1) : "0.0";

    return {
      approvalData,
      reasonsData,
      timelineData,
      stats: {
        totalRefunds,
        approvalRate: Number(approvalRate),
        avgProcessingTime: 24, // Default to 24 hours as it's not directly available in data
        resolutionRate: Number(resolutionRate)
      }
    };
  };

  const chartData = processChartData();

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="text-gray-900 font-medium mb-1">{label}</p>
          <p className="text-red-600 font-semibold">
            Count: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
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
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center text-white">
              <FaExclamationTriangle className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
              Refund Analysis
            </h1>
          </div>
          <p className="text-xl text-gray-600">
            Track and analyze refund patterns to improve customer satisfaction
          </p>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Refund Approval vs. Denial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-md p-6 rounded-xl border border-amber-100"
          >
            <div className="flex items-center space-x-3 mb-4">
              <FaChartBar className="w-6 h-6 text-amber-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Refund Approval vs. Denial
              </h2>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData.approvalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: '#4B5563' }}
                    tickLine={{ stroke: '#4B5563' }}
                  />
                  <YAxis 
                    tick={{ fill: '#4B5563' }}
                    tickLine={{ stroke: '#4B5563' }}
                  />
                  <Tooltip 
                    content={<CustomTooltip />}
                    cursor={{ fill: 'rgba(245, 158, 11, 0.1)' }}
                  />
                  <Legend 
                    wrapperStyle={{
                      paddingTop: "20px"
                    }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="#F59E0B"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Reasons for Refund Requests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white shadow-md p-6 rounded-xl border border-amber-100"
          >
            <div className="flex items-center space-x-3 mb-4">
              <FaChartPie className="w-6 h-6 text-amber-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Reasons for Refund Requests
              </h2>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData.reasonsData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {chartData.reasonsData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={[
                          "#F59E0B",  // Amber-500
                          "#D97706",  // Amber-600
                          "#B45309",  // Amber-700
                        ][index % 3]}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    content={<CustomTooltip />}
                    cursor={false}
                  />
                  <Legend 
                    wrapperStyle={{
                      paddingTop: "20px"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Refund Processing Time Trends */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white shadow-md p-6 rounded-xl border border-amber-100"
          >
            <div className="flex items-center space-x-3 mb-4">
              <FaChartLine className="w-6 h-6 text-amber-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Refund Processing Time Trends
              </h2>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData.timelineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: '#4B5563' }}
                    tickLine={{ stroke: '#4B5563' }}
                  />
                  <YAxis 
                    tick={{ fill: '#4B5563' }}
                    tickLine={{ stroke: '#4B5563' }}
                  />
                  <Tooltip 
                    content={<CustomTooltip />}
                    cursor={{ stroke: 'rgba(245, 158, 11, 0.1)' }}
                  />
                  <Legend 
                    wrapperStyle={{
                      paddingTop: "20px"
                    }}
                  />
                  <Line 
                    type="monotone"
                    dataKey="value"
                    stroke="#F59E0B"
                    strokeWidth={2}
                    dot={{ fill: '#F59E0B', strokeWidth: 2 }}
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

export default RefundAnalysisPage;
