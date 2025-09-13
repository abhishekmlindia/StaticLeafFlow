import React from "react";
import { Card, Progress, Avatar, Tooltip } from "antd";
import { User, Search, BarChart2, Database, MessageSquare } from "feather-icons-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  ChartTooltip,
  Legend,
  ArcElement
);

function Dashboard() {
  // Chart data
  const lineData = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
    datasets: [
      {
        label: "Series 1",
        data: [100, 200, 150, 250, 300, 200, 220, 270],
        borderColor: "#4090ff",
        backgroundColor: "rgba(64,144,255,0.2)",
        fill: true,
      },
    ],
  };

  const doughnutData = {
    labels: ["Used", "Remaining"],
    datasets: [
      {
        data: [35, 65],
        backgroundColor: ["#4090ff", "#e5e7eb"],
      },
    ],
  };

  const barData = {
    labels: ["KB", "Search", "Chat", "Agents"],
    datasets: [
      {
        data: [11, 1450, 14032, 3],
        backgroundColor: ["#0ea5e9", "#ef4444", "#22c55e", "#f59e0b"],
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 pt-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <Tooltip title="Notifications">
            <MessageSquare className="w-6 h-6 text-gray-600" />
          </Tooltip>
          <Avatar size={40} icon={<User />} />
          <div>
            <p className="font-semibold">John Doe Junior</p>
            <span className="text-xs text-gray-500">Administrator</span>
          </div>
        </div>
      </div>

      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        <Card className="shadow rounded-2xl">
          <h3 className="text-sm font-semibold mb-2">Statistics</h3>
          <Line data={lineData} />
        </Card>

        <Card className="shadow rounded-2xl flex justify-center items-center">
          <Doughnut data={doughnutData} />
        </Card>

        <Card className="shadow rounded-2xl lg:col-span-2">
          <h3 className="text-sm font-semibold mb-2">Tokens Overview</h3>
          <Bar data={barData} />
        </Card>
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <Card className="shadow rounded-2xl">
          <h3 className="text-sm font-semibold mb-2">Top Trending Search</h3>
          <Line data={lineData} />
        </Card>

        <Card className="shadow rounded-2xl">
          <h3 className="text-sm font-semibold mb-2">Server Usage</h3>
          <Line data={lineData} />
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="shadow rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <Avatar size={60} src="https://i.pravatar.cc/100" />
            <div>
              <h3 className="text-lg font-bold">John Doe</h3>
              <p className="text-sm text-gray-500">Administrator</p>
            </div>
          </div>
          <h4 className="font-semibold mb-2">Tasks</h4>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <input type="checkbox" className="w-5 h-5 accent-teal-500" />
              <span>Curabitur ac sem at nibh egestas.</span>
            </li>
            <li className="flex items-center gap-2">
              <input type="checkbox" className="w-5 h-5 accent-teal-500" />
              <span>Lorem ipsum dolor sit amet.</span>
            </li>
          </ul>
        </Card>

        <Card className="shadow rounded-2xl">
          <h4 className="font-semibold mb-2">My Stats</h4>
          <p className="text-lg font-bold">488 Search</p>
          <Progress percent={45} status="active" className="mb-2" />
          <p className="text-lg font-bold">12 Knowledgebase</p>
          <p className="text-lg font-bold">89 Pending Tasks</p>
        </Card>

        <Card className="shadow rounded-2xl">
          <h4 className="font-semibold mb-2">Documents Status</h4>
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left">#</th>
                <th className="text-left">Document</th>
                <th>Status</th>
                <th>Progress</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Responsive HTML5 Template</td>
                <td className="text-green-500">Success</td>
                <td><Progress percent={100} size="small" /></td>
              </tr>
              <tr>
                <td>2</td>
                <td>Responsive Drupal 7 Theme</td>
                <td className="text-yellow-500">Warning</td>
                <td><Progress percent={60} size="small" /></td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
