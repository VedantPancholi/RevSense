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

const ChartPage = () => {
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <h1 className="text-2xl font-semibold col-span-2 text-center">
        Sales Charts
      </h1>

      {/* Bar Chart */}
      <div className="bg-white shadow-md p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Bar Chart</h2>
        <BarChart width={400} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#4F46E5" />
        </BarChart>
      </div>

      {/* Line Chart */}
      <div className="bg-white shadow-md p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Line Chart</h2>
        <LineChart width={400} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#E63946" />
        </LineChart>
      </div>

      {/* Pie Chart */}
      <div className="bg-white shadow-md p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Pie Chart</h2>
        <PieChart width={400} height={300}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#F4A261"
            label
          />
        </PieChart>
      </div>

      {/* Radar Chart */}
      <div className="bg-white shadow-md p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Radar Chart</h2>
        <RadarChart
          cx={200}
          cy={150}
          outerRadius={100}
          width={400}
          height={300}
          data={chartData}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="name" />
          <PolarRadiusAxis />
          <Radar
            name="Sales"
            dataKey="value"
            stroke="#2A9D8F"
            fill="#2A9D8F"
            fillOpacity={0.6}
          />
          <Legend />
        </RadarChart>
      </div>
    </div>
  );
};

export default ChartPage;
