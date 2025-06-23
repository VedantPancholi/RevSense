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
  FaDollarSign,
  FaChartBar,
  FaChartPie,
  FaExclamationTriangle,
  FaArrowLeft,
  FaBars,
} from "react-icons/fa";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

const COLORS = ["#22C55E", "#4ADE80", "#86EFAC", "#BBF7D0", "#DCFCE7"];

interface CategoryData {
  categories: {
    [key: string]: number;
  };
}

interface ChartData {
  hiddenChargesData: Array<{ name: string; value: number }>;
  discountData: Array<{ name: string; value: number }>;
  pricingComplaintsData: Array<{ name: string; value: number }>;
  stats: {
    discountUsageRate: string;
    profitImpactRate: string;
    customerRetentionRate: string;
    averageOrderValue: string;
    averageOrderValueChange: string;
  };
}

const API_URL = '/api/data';

const PricingStrategyPage = () => {
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
      hiddenChargesData: [],
      discountData: [],
      pricingComplaintsData: [],
      stats: {
        discountUsageRate: "0.0",
        profitImpactRate: "0.0",
        customerRetentionRate: "0.0",
        averageOrderValue: "0.00",
        averageOrderValueChange: "0.00"
      }
    };

    const categories = data.categories;

    const hiddenChargesData = [
      { name: "Extra Taxes & Fees", value: categories["Extra Taxes & Fees"] || 0 },
      { name: "Unexpected Delivery Charges", value: categories["Unexpected Delivery Charges"] || 0 },
    ];

    const discountData = [
      { name: "Valid & Applied Successfully", value: categories["Valid & Applied Successfully"] || 0 },
      { name: "Expired or Invalid Codes", value: categories["Expired or Invalid Codes"] || 0 },
    ];

    const pricingComplaintsData = [
      { name: "Fair Pricing", value: categories["Fair Pricing"] || 0 },
      { name: "Overpriced for Quality", value: categories["Overpriced for Quality"] || 0 },
      { name: "Better Alternatives Exist", value: categories["Better Alternatives Exist"] || 0 },
    ];

    // Calculate statistics
    const totalDiscounts = categories["Valid & Applied Successfully"] || 0;
    const totalComplaints = (categories["Fair Pricing"] || 0) + 
                          (categories["Overpriced for Quality"] || 0) +
                          (categories["Better Alternatives Exist"] || 0);
    const totalHiddenCharges = (categories["Extra Taxes & Fees"] || 0) + 
                             (categories["Unexpected Delivery Charges"] || 0);

    // Calculate average order value
    const currentAverageOrderValue = categories["Average Order Value"] || 0;
    const previousAverageOrderValue = categories["Previous Average Order Value"] || 0;
    const averageOrderValueChange = (currentAverageOrderValue - previousAverageOrderValue).toFixed(2);

    const discountUsageRate = ((totalDiscounts / (totalDiscounts + (categories["Expired or Invalid Codes"] || 0))) * 100).toFixed(1);
    const profitImpactRate = ((totalHiddenCharges / (totalHiddenCharges + totalDiscounts)) * 100).toFixed(1);
    const customerRetentionRate = (100 - ((totalComplaints / (totalDiscounts + totalHiddenCharges + totalComplaints)) * 100)).toFixed(1);

    return {
      hiddenChargesData,
      discountData,
      pricingComplaintsData,
      stats: {
        discountUsageRate,
        profitImpactRate,
        customerRetentionRate,
        averageOrderValue: currentAverageOrderValue.toFixed(2),
        averageOrderValueChange
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
          <p className="text-green-600 font-semibold">
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
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
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
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-full px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link
                href="/dashboard"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <FaArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </Link>
            </div>
            <div className="flex items-center justify-center flex-1">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg">
                  IP
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  REVSENSE
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900">
                <FaBars className="w-6 h-6" />
              </button>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white">
              <FaDollarSign className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Pricing & Discounts Strategy
            </h1>
          </div>
          <p className="text-xl text-gray-600">
            Analyze pricing effectiveness and optimize discount strategies
          </p>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { 
              label: "Average Order Value", 
              value: `$${chartData.stats.averageOrderValue}`,
              change: `${Number(chartData.stats.averageOrderValueChange) >= 0 ? '+' : ''}$${chartData.stats.averageOrderValueChange}`
            },
            { 
              label: "Discount Usage", 
              value: `${chartData.stats.discountUsageRate}%`,
              change: `${((chartData.discountData[0].value / (chartData.discountData[0].value + chartData.discountData[1].value)) * 100).toFixed(1)}%`
            },
            { 
              label: "Profit Impact", 
              value: `${chartData.stats.profitImpactRate}%`,
              change: `+${chartData.stats.profitImpactRate}%`
            },
            { 
              label: "Customer Retention", 
              value: `${chartData.stats.customerRetentionRate}%`,
              change: "-2.4%"
            },
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
                <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Hidden Charges Frequency */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-md p-6 rounded-xl"
          >
            <div className="flex items-center space-x-3 mb-4">
              <FaChartBar className="w-6 h-6 text-green-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Hidden Charges Frequency
              </h2>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData.hiddenChargesData}>
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
                    cursor={{ fill: 'rgba(34, 197, 94, 0.1)' }}
                  />
                  <Legend 
                    wrapperStyle={{
                      paddingTop: "20px"
                    }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="#22C55E"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Discount Code Success */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white shadow-md p-6 rounded-xl"
          >
            <div className="flex items-center space-x-3 mb-4">
              <FaChartPie className="w-6 h-6 text-green-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Discount Code Success
              </h2>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData.discountData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {chartData.discountData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index === 0 ? "#22C55E" : "#EF4444"}
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

          {/* Pricing Complaints */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white shadow-md p-6 rounded-xl"
          >
            <div className="flex items-center space-x-3 mb-4">
              <FaExclamationTriangle className="w-6 h-6 text-green-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Pricing Complaints
              </h2>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData.pricingComplaintsData}>
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
                    cursor={{ fill: 'rgba(239, 68, 68, 0.1)' }}
                  />
                  <Legend 
                    wrapperStyle={{
                      paddingTop: "20px"
                    }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="#EF4444"
                    radius={[4, 4, 0, 0]}
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

export default PricingStrategyPage;
