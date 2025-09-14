import { useState } from "react";
import { Card, Progress, Avatar, Tooltip, Input, DatePicker, Button  } from "antd";
import {
  User,
  Search,
  BarChart2,
  Database,
  MessageSquare,
  DownloadCloud,
  Headphones,
  MessageCircle,
  Edit,
} from "feather-icons-react";
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
   Filler,
  ArcElement,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import TokenUse from "../../assets/img/tokenUse.png";
import TrendingSearch from "../../assets/img/TrendingSearch.png";
import Serveruseges from "../../assets/img/serveruseges.png";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  ChartTooltip,
  Legend,
   Filler,
  ArcElement
);

function Dashboard() {

  const [tasks, setTasks] = useState([
    { id: 1, name: "Curabitur ac sem at nibh egestas.", date: "2025-09-15", done: true },
    { id: 2, name: "Lorem ipsum dolor sit amet.", date: "2025-09-16", done: false },
      { id: 3, name: "Lorem ipsum dolor sit amet.", date: "2025-09-16", done: false },
        { id: 4, name: "Lorem ipsum dolor sit amet.", date: "2025-09-16", done: false },
           { id: 5, name: "Lorem ipsum dolor sit amet.", date: "2025-09-16", done: false },
      { id: 6, name: "Lorem ipsum dolor sit amet.", date: "2025-09-16", done: false },
        { id: 7, name: "Lorem ipsum dolor sit amet.", date: "2025-09-16", done: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [newDate, setNewDate] = useState(null);

  const addTask = () => {
    if (!newTask || !newDate) return;
    setTasks([
      ...tasks,
      { id: Date.now(), name: newTask, date: newDate.format("YYYY-MM-DD"), done: false },
    ]);
    setNewTask("");
    setNewDate(null);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };
  // Chart data
  const lineData = {
    labels: ["Tokens", "Round", "Thumb Up", "PV", "Speed"],
    datasets: [
      {
        label: "",
        data: [200, 200, 210, 250, 150],
        borderColor: "#0084ff",
        backgroundColor: "rgba(64,144,255,0.2)",
        fill: false,
      },
    ],
  };
const serveruseges = {
   labels: [
    "1","2","3","4","5","6","7","8","9","10",
    "11","12","13","14","15","16","17","18","19","20"
  ],
  datasets: [
    {
      label: "Server Usage",
      data: [
        100, 350, 80, 420, 150, 90, 400, 120, 370, 60,
        300, 140, 410, 100, 380, 70, 420, 110, 360, 130
      ],
      borderColor: "#0084ff",
      backgroundColor: "rgba(0,132,255,0.2)",
      fill: true,
      tension: 0,     // 0 = sharp ECG-like zigzag, 0.3 = smoother
      pointRadius: 0, // hides dots for a clean ECG look
      borderWidth: 2,
    },
  ],
};

  const doughnutData = {
    labels: ["Used", "Remaining"],
  datasets: [
    {
      label: "Usage",
      data: [35, 65],
      backgroundColor: ["#4090ff", "#e5e7eb"],
      borderWidth: 0,
      hoverOffset: 4,
    },
  ],
  };
const options = {
  cutout: "50%", // makes a thin ring
  plugins: {
    tooltip: {
      enabled: true,
    },
    legend: {
      display: false,
    },
  },
  animation: {
    animateRotate: true,
    animateScale: true,
  },
};
  const barData = {
    labels: ["KB", "Search", "Chat", "Agents"],
    datasets: [
      {
        data: [11310, 16450, 14032, 14561],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 pt-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 mt-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
        {/* Statistics - 40% (5/12) */}
        <Card className="shadow dark:bg-gray-800  rounded-2xl lg:col-span-5 dark:border-none">
          <h3 className="text-xl font-semibold mb-2 dark:text-white">
            Statistics
          </h3>
          <Line data={lineData} />
        </Card>

        {/* Token Used - 20% (2/12) */}
        <Card className="shadow dark:bg-gray-800 rounded-2xl lg:col-span-3 dark:border-none">
          <h3 className="text-xl font-semibold mb-2 dark:text-white">
            Token Used
          </h3>
       <div className="w-full relative flex items-center justify-center mt-11">
       <img src={TokenUse} className="w-[180px]"/>
    </div>
        </Card>

        {/* Tokens Overview - 40% (5/12) */}
        <div className="lg:col-span-4">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <div className="p-5 bg-white shadow rounded-2xl dark:bg-gray-800 w-full">
              <div className="bg-amber-200 dark:bg-amber-700 rounded-full w-12 h-12 p-1 flex items-center justify-center mb-2">
                <DownloadCloud className="text-amber-700 dark:text-amber-200" />
              </div>
              <div>
                <div className="text-base text-gray-400 dark:text-gray-300">
                  Knowladge Base
                </div>
                <div className="flex items-center pt-1">
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    11
                  </div>
                </div>
              </div>
            </div>
            <div className="p-5 bg-white shadow rounded-2xl dark:bg-gray-800 w-full">
              <div className="bg-violet-200 dark:bg-violet-700 rounded-full w-12 h-12 p-1 flex items-center justify-center mb-2">
                <Search className="text-violet-700 dark:text-violet-200" />
              </div>
              <div>
                <div className="text-base text-gray-400 dark:text-gray-300">
                  Search
                </div>
                <div className="flex items-center pt-1">
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    4345
                  </div>
                </div>
              </div>
            </div>
            <div className="p-5 bg-white shadow rounded-2xl dark:bg-gray-800 w-full">
              <div className="bg-red-200 dark:bg-red-700 rounded-full w-12 h-12 p-1 flex items-center justify-center mb-2">
                <MessageCircle className="text-red-700 dark:text-red-200" />
              </div>
              <div>
                <div className="text-base text-gray-400 dark:text-gray-300">
                  Chats
                </div>
                <div className="flex items-center pt-1">
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    114
                  </div>
                </div>
              </div>
            </div>
            <div className="p-5 bg-white shadow rounded-2xl dark:bg-gray-800 w-full">
              <div className="bg-green-200 dark:bg-green-700 rounded-full w-12 h-12 p-1 flex items-center justify-center mb-2">
                <Headphones className="text-green-700 dark:text-green-200" />
              </div>
              <div>
                <div className="text-base text-gray-400 dark:text-gray-300">
                  Agetns
                </div>
                <div className="flex items-center pt-1">
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    111
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


{/* Middle Section */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
  <Card className="shadow dark:bg-gray-800 rounded-2xl dark:border-none">
    <h3 className="text-xl font-semibold mb-2 dark:text-white">
      Top Trending Search
    </h3>
    <p className="text-sm mb-5">Users search or chat with these keywords at most</p>
    <div className="w-full h-80">
         <img src={TrendingSearch} className="w-full"/>
    </div>
  </Card>

  <Card className="shadow dark:bg-gray-800 rounded-2xl dark:border-none">
    <h3 className="text-xl font-semibold mb-2 dark:text-white">
     Server Usages
    </h3>
       <p className="text-sm mb-5">Live server usage</p>
    <img src={Serveruseges} className="w-full"/>
  </Card>
</div>



      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
       <div className="shadow bg-white rounded-2xl p-0 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 bg-[#0084ff] p-5">
        <Avatar size={90} src="https://i.pravatar.cc/100" />
        <div>
          <h3 className="text-lg font-bold text-white">John Doe</h3>
          <p className="text-sm text-gray-200">Administrator</p>
        </div>
        <a
          href="#"
          className="ms-auto text-white/60 hover:text-white flex text-xs items-center"
        >
          <Edit className="me-2" /> Edit
        </a>
      </div>

      {/* Task List */}
      <div className="p-5 pt-2">
        <h4 className="font-semibold mb-2">Tasks</h4>
        <ul className="space-y-8">
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center gap-1">
              <input
                type="checkbox"
                className="w-5 h-5 accent-teal-500"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
              />
              <span
                className={`flex-1 ${
                  task.done ? "line-through text-gray-400" : ""
                }`}
              >
                {task.name}{" "}
                <span className="text-xs text-gray-500">({task.date})</span>
              </span>
            </li>
          ))}
        </ul>

        {/* Add Task */}
        <div className="mt-4 flex gap-2 items-center">
          <Input
            placeholder="Task name"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <DatePicker value={newDate} onChange={(d) => setNewDate(d)} />
          <Button type="primary" onClick={addTask}>
            Add
          </Button>
        </div>
      </div>
    </div>
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
                <td>
                  <Progress percent={100} size="small" />
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Responsive Drupal 7 Theme</td>
                <td className="text-yellow-500">Warning</td>
                <td>
                  <Progress percent={60} size="small" />
                </td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
