
import React, { useEffect, useState, useContext } from 'react';
import { getDashboardStats } from '../services/dashboardservice.js';
import { AuthContext } from '../context/AuthContext';
import StatsCard from '../components/dashboard/StatsCard';
import Charts from '../components/dashboard/Charts';
import ActivityLog from '../components/dashboard/ActivityLog';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboardStats(user.token);
        setStats(data);
      } catch (error) {
        console.error('Dashboard data fetch failed', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  if (loading) return <p>Loading...</p>;
  if (!stats) return <p>No data found</p>;

  return (
    <DragDropContext onDragEnd={() => {}}>
    <div className="dashboard">
      <div className="stats-cards">
        <StatsCard title="Projects" count={stats.totalProjects} />
        <StatsCard title="Tasks" count={stats.totalTasks} />
      </div>

      <Charts tasksByStatus={stats.tasksByStatus} />

      <ActivityLog activities={stats.recentActivities} />
    </div>
    </DragDropContext>
  );
};
export default Dashboard;

// import React, { useState, useEffect } from "react";
// import StatsCard from "../components/dashboard/StatsCard";
// import Charts from "../components/dashboard/Charts";
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
// import {
//   getDashboardStats,
//   getCompletionRate,
//   getTopProjects,
//   getProjectsTaskData,
//   getUploadedPurposeData,
// } from "../services/dashboardservice";

// export default function Dashboard() {
//   const [stats, setStats] = useState({});
// const [completionData, setCompletionData] = useState([]);
// const [topProjects, setTopProjects] = useState([]);
// const [projectsTaskData, setProjectsTaskData] = useState([]);
// const [uploadedPurpose, setUploadedPurpose] = useState([]);

// useEffect(() => {
//   setStats(getDashboardStats());
//   setCompletionData(getCompletionRate());
//   setTopProjects(getTopProjects());
//   setProjectsTaskData(getProjectsTaskData());
//   setUploadedPurpose(getUploadedPurposeData());
// }, []);

//   return (
//     <DragDropContext onDragEnd={() => {}}>
//     <div style={{ fontFamily: "Arial, sans-serif", padding: 20, background: "#f5f7fa" }}>
//       <h2>Project Time Tracking Dashboard</h2>

//       <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, marginBottom: 30 }}>
//         <StatsCard title="Total Time (Hours)" value={stats.totalTime} subtitle="Total tracked hours" />
//         <StatsCard title="Average Task Time (Hours)" value={stats.avgTaskTime} subtitle="Average time per task" />
//         <StatsCard title="Total Tasks" value={stats.totalTasks} subtitle="Number of tasks" />
//         <StatsCard title="Total Projects" value={stats.totalProjects} subtitle="Active projects" />
//       </div>

//         <Charts
//             completionData={completionData}
//             topProjects={topProjects}
//             projectsTaskData={projectsTaskData}
//             uploadedPurpose={uploadedPurpose}
// />    </div>
//  </DragDropContext>
// );
// }
