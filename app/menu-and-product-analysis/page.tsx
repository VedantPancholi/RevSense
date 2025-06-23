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
} from "recharts";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  FaUtensils,
  FaChartLine,
  FaChartBar,
  FaChartPie,
  FaStar,
} from "react-icons/fa";

const MenuProductAnalysisPage = () => {
  const searchParams = useSearchParams();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const dataParam = searchParams.get("data");
    if (dataParam) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(dataParam));
        setChartData(
          parsedData.labels.map((label: string, index: number) => ({
            name: label,
            value: parsedData.datasets[0].data[index],
          }))
        );
      } catch (error) {
        console.error("Error parsing chart data:", error);
      }
    }
  }, [searchParams]);

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
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center text-white">
              <FaUtensils className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Menu & Product Analysis
            </h1>
          </div>
          <p className="text-xl text-gray-600">
            Analyze menu performance and product popularity
          </p>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Top Rated Item", value: "4.9/5", change: "+0.2" },
            { label: "Menu Diversity", value: "85%", change: "+5%" },
            { label: "New Items", value: "12", change: "+3" },
            { label: "Customer Favorites", value: "8", change: "+2" },
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
          {/* Product Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-md p-6 rounded-xl"
          >
            <div className="flex items-center space-x-3 mb-4">
              <FaChartLine className="w-6 h-6 text-red-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Product Performance
              </h2>
            </div>
            <LineChart width={500} height={300} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#EF4444" />
            </LineChart>
          </motion.div>

          {/* Category Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white shadow-md p-6 rounded-xl"
          >
            <div className="flex items-center space-x-3 mb-4">
              <FaChartBar className="w-6 h-6 text-red-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Category Distribution
              </h2>
            </div>
            <BarChart width={500} height={300} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#EF4444" />
            </BarChart>
          </motion.div>

          {/* Menu Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white shadow-md p-6 rounded-xl"
          >
            <div className="flex items-center space-x-3 mb-4">
              <FaChartPie className="w-6 h-6 text-red-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Menu Categories
              </h2>
            </div>
            <PieChart width={500} height={300}>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#EF4444"
                label
              />
            </PieChart>
          </motion.div>

          {/* Product Ratings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white shadow-md p-6 rounded-xl"
          >
            <div className="flex items-center space-x-3 mb-4">
              <FaStar className="w-6 h-6 text-red-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Product Ratings
              </h2>
            </div>
            <RadarChart
              cx={250}
              cy={150}
              outerRadius={100}
              width={500}
              height={300}
              data={chartData}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis />
              <Radar
                name="Rating"
                dataKey="value"
                stroke="#EF4444"
                fill="#EF4444"
                fillOpacity={0.6}
              />
              <Legend />
            </RadarChart>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default MenuProductAnalysisPage;
