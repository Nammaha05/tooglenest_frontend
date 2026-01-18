// // data provider for Dashboard page and Charts component
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getDashboardStats = async (token) => {
  const { data } = await axios.get(`${API_BASE}/dashboard/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

// export const getDashboardStats = () => {
//   return {
//     totalTime: "2.88",
//     avgTaskTime: "128.26",
//     totalTasks: "47",
//     totalProjects: "20.60",
//   };
// };

// export const getCompletionRate = () => {
//   return [
//     { name: "Completed", value: 55 },
//     { name: "Remaining", value: 45 },
//   ];
// };

// export const getTopProjects = () => {
//   return [
//     { name: "UI", value: 25.37 },
//     { name: "Backend", value: 23.79 },
//     { name: "Testing", value: 19.29 },
//     { name: "Research", value: 15.39 },
//     { name: "Deployment", value: 16.16 },
//   ];
// };

// export const getProjectsTaskData = () => {
//   return [
//     { name: "Project 1", Completed: 40, Assigned: 10 },
//     { name: "Project 2", Completed: 30, Assigned: 20 },
//     { name: "Project 3", Completed: 50, Assigned: 5 },
//     { name: "Project 4", Completed: 20, Assigned: 15 },
//     { name: "Project 5", Completed: 25, Assigned: 10 },
//   ];
// };

// export const getUploadedPurposeData = () => {
//   return [
//     { name: "Food", count: 40 },
//     { name: "Personal", count: 35 },
//     { name: "Project Resources", count: 20 },
//     { name: "Buyers", count: 15 },
//     { name: "Others", count: 10 },
//   ];
// };
