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
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
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
import Navbar from "../component/Navbar";
import BackButton from "../component/BackButton";

interface ChartDataItem {
  name: string;
  value: number;
  type?: string;
}

interface ChartData {
  lateDeliveries: ChartDataItem[];
  riderProfessionalism: ChartDataItem[];
  orderHandling: ChartDataItem[];
  deliveryIssues: ChartDataItem[];
  stats: {
    deliveryTime: { value: string; change: string };
    onTimeRate: { value: string; change: string };
    deliveryCost: { value: string; change: string };
    routeEfficiency: { value: string; change: string };
  };
}

const API_URL = '/api/delivery';

const DeliveryLogisticsPage = () => {
  const searchParams = useSearchParams();
  const [chartData, setChartData] = useState<ChartData>({
    lateDeliveries: [],
    riderProfessionalism: [],
    orderHandling: [],
    deliveryIssues: [],
    stats: {
      deliveryTime: { value: "0m", change: "0m" },
      onTimeRate: { value: "0%", change: "0%" },
      deliveryCost: { value: "$0.00", change: "$0.00" },
      routeEfficiency: { value: "0%", change: "0%" }
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL, {
          headers: {
            'Accept': 'application/json',
          },
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const jsonData = await response.json();
        
        if (jsonData.error) {
          throw new Error(jsonData.error);
        }

        // Calculate statistics from API data
        const totalDeliveries = Object.values(jsonData.categories || {}).reduce((sum: number, val: any) => sum + (typeof val === 'number' ? val : 0), 0);
        const lateDeliveries = (jsonData.categories?.["Late by 10-30 Minutes"] || 0) + 
                             (jsonData.categories?.["Late by Over an Hour"] || 0);
        const onTimeDeliveries = totalDeliveries - lateDeliveries;
        
        // Calculate delivery time (assuming average of 30 minutes for on-time and 45 minutes for late)
        const avgDeliveryTime = totalDeliveries > 0 
          ? Math.round((onTimeDeliveries * 30 + lateDeliveries * 45) / totalDeliveries)
          : 0;
        
        // Calculate on-time rate
        const onTimeRate = totalDeliveries > 0 
          ? Math.round((onTimeDeliveries / totalDeliveries) * 100)
          : 0;
        
        // Calculate delivery cost (base $4 + $0.5 for each late delivery)
        const baseCost = 4;
        const lateDeliveryCost = lateDeliveries * 0.5;
        const avgDeliveryCost = totalDeliveries > 0 
          ? (baseCost + lateDeliveryCost / totalDeliveries).toFixed(2)
          : "0.00";
        
        // Calculate route efficiency (inverse of late delivery rate)
        const routeEfficiency = 100 - onTimeRate;

        // Process the data for different charts
        const lateDeliveriesData = [
          { 
            name: "Late by 10-30 Minutes",
            value: jsonData.categories?.["Late by 10-30 Minutes"] || 0
          },
          { 
            name: "Late by Over an Hour",
            value: jsonData.categories?.["Late by Over an Hour"] || 0
          },
          { 
            name: "Lost or Delayed Order in System",
            value: jsonData.categories?.["Lost or Delayed Order in System"] || 0
          }
        ];

        const riderProfessionalismData = [
          { 
            name: "Courteous & Polite",
            value: jsonData.categories?.["Courteous & Polite"] || 0,
            type: "Positive"
          },
          { 
            name: "Helpful & Accommodating",
            value: jsonData.categories?.["Helpful & Accommodating"] || 0,
            type: "Positive"
          },
          { 
            name: "Rude & Unprofessional",
            value: jsonData.categories?.["Rude & Unprofessional"] || 0,
            type: "Negative"
          },
          { 
            name: "Ignored Special Instructions",
            value: jsonData.categories?.["Ignored Special Instructions"] || 0,
            type: "Negative"
          }
        ];

        const orderHandlingData = [
          { 
            name: "Package Delivered Safely",
            value: jsonData.categories?.["Package Delivered Safely"] || 0,
            type: "Good"
          },
          { 
            name: "No Damage to Food/Items",
            value: jsonData.categories?.["No Damage to Food/Items"] || 0,
            type: "Good"
          },
          { 
            name: "Rough Handling (Spilled or Leaked)",
            value: jsonData.categories?.["Rough Handling (Spilled or Leaked)"] || 0,
            type: "Bad"
          },
          { 
            name: "Package Arrived Damaged",
            value: jsonData.categories?.["Package Arrived Damaged"] || 0,
            type: "Bad"
          }
        ];

        const deliveryIssuesData = [
          { 
            name: "Inaccurate GPS Tracking",
            value: jsonData.categories?.["Inaccurate GPS Tracking"] || 0
          },
          { 
            name: "Order Stuck in Processing",
            value: jsonData.categories?.["Order Stuck in Processing"] || 0
          }
        ];

        setChartData({
          lateDeliveries: lateDeliveriesData,
          riderProfessionalism: riderProfessionalismData,
          orderHandling: orderHandlingData,
          deliveryIssues: deliveryIssuesData,
          stats: {
            deliveryTime: { 
              value: `${avgDeliveryTime}m`,
              change: `${avgDeliveryTime - 31}m` // Assuming previous average was 31m
            },
            onTimeRate: { 
              value: `${onTimeRate}%`,
              change: `${onTimeRate - 93}%` // Assuming previous rate was 93%
            },
            deliveryCost: { 
              value: `$${avgDeliveryCost}`,
              change: `$${(parseFloat(avgDeliveryCost) - 4.50).toFixed(2)}` // Assuming previous cost was $4.50
            },
            routeEfficiency: { 
              value: `${routeEfficiency}%`,
              change: `${routeEfficiency - 89}%` // Assuming previous efficiency was 89%
            }
          }
        });
      } catch (err) {
        console.error('Error fetching data:', err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to fetch data from the server');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* <BackButton /> */}
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
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">
              Delivery & Logistics Analysis
            </h1>
          </div>
          <p className="text-xl text-gray-600">
            Monitor delivery operations and optimize logistics efficiency
          </p>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Delivery Time", value: chartData.stats.deliveryTime.value, change: chartData.stats.deliveryTime.change },
            { label: "On-Time Rate", value: chartData.stats.onTimeRate.value, change: chartData.stats.onTimeRate.change },
            { label: "Delivery Cost", value: chartData.stats.deliveryCost.value, change: chartData.stats.deliveryCost.change },
            { label: "Route Efficiency", value: chartData.stats.routeEfficiency.value, change: chartData.stats.routeEfficiency.change },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-purple-100"
            >
              <h3 className="text-gray-500 text-sm font-medium">
                {stat.label}
              </h3>
              <div className="flex items-end justify-between mt-2">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <span className="text-sm text-purple-500">{stat.change}</span>
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
            className="bg-white shadow-md p-6 rounded-xl border border-purple-100"
          >
            <div className="flex items-center space-x-3 mb-4">
              <FaChartLine className="w-6 h-6 text-purple-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Late Deliveries Trend
              </h2>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData.lateDeliveries}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                  <XAxis dataKey="name" tick={false} height={0} />
                  <YAxis tick={{ fill: '#666', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e2e8f0',
                      borderRadius: '0.5rem',
                      padding: '0.5rem',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    labelStyle={{ color: '#1f2937', fontWeight: 'bold' }}
                  />
                  <Legend 
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                    wrapperStyle={{
                      fontSize: "12px",
                      paddingLeft: "20px"
                    }}
                  />
                  <Line type="monotone" dataKey="value" stroke="#8B5CF6" strokeWidth={2} dot={{ fill: '#8B5CF6', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Rider Professionalism */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white shadow-md p-6 rounded-xl border border-purple-100"
          >
            <div className="flex items-center space-x-3 mb-4">
              <FaChartBar className="w-6 h-6 text-purple-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Rider Professionalism
              </h2>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData.riderProfessionalism}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                  <XAxis dataKey="name" tick={false} height={0} />
                  <YAxis tick={{ fill: '#666', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e2e8f0',
                      borderRadius: '0.5rem',
                      padding: '0.5rem',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    labelStyle={{ color: '#1f2937', fontWeight: 'bold' }}
                  />
                  <Legend 
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                    wrapperStyle={{
                      fontSize: "12px",
                      paddingLeft: "20px"
                    }}
                  />
                  <Bar dataKey="value" fill="#8B5CF6" radius={[4, 4, 0, 0]}>
                    {chartData.riderProfessionalism.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.type === "Positive" ? "#8B5CF6" : "#C084FC"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Order Handling */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white shadow-md p-6 rounded-xl border border-purple-100"
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
                    data={chartData.orderHandling}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    labelLine={false}
                  >
                    {chartData.orderHandling.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.type === "Good" ? "#8B5CF6" : "#C084FC"} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e2e8f0',
                      borderRadius: '0.5rem',
                      padding: '0.5rem',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    labelStyle={{ color: '#1f2937', fontWeight: 'bold' }}
                  />
                  <Legend 
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                    wrapperStyle={{
                      fontSize: "12px",
                      paddingLeft: "20px"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Delivery Issues */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white shadow-md p-6 rounded-xl border border-purple-100"
          >
            <div className="flex items-center space-x-3 mb-4">
              <FaMapMarkedAlt className="w-6 h-6 text-purple-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Delivery Issues
              </h2>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={chartData.deliveryIssues}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  barSize={40}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                  <XAxis dataKey="name" tick={false} height={0} />
                  <YAxis tick={{ fill: '#666', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e2e8f0',
                      borderRadius: '0.5rem',
                      padding: '0.5rem',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    labelStyle={{ color: '#1f2937', fontWeight: 'bold' }}
                  />
                  <Legend 
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                    wrapperStyle={{
                      fontSize: "12px",
                      paddingLeft: "20px"
                    }}
                  />
                  <Bar 
                    dataKey="value"
                    fill="#8B5CF6"
                    radius={[4, 4, 0, 0]}
                  >
                    {chartData.deliveryIssues.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#8B5CF6" : "#C084FC"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default DeliveryLogisticsPage;
