import React from "react";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer
} from "recharts";

const pieData1 = [
  { name: "Completed", value: 55 },
  { name: "Remaining", value: 45 },
];

const pieData2 = [
  { name: "UI", value: 25.37 },
  { name: "Backend", value: 23.79 },
  { name: "Testing", value: 19.29 },
  { name: "Research", value: 15.39 },
  { name: "Deployment", value: 16.16 },
];

const projectsData = [
  { name: "Project 1", Completed: 40, Assigned: 10 },
  { name: "Project 2", Completed: 30, Assigned: 20 },
  { name: "Project 3", Completed: 50, Assigned: 5 },
  { name: "Project 4", Completed: 20, Assigned: 15 },
  { name: "Project 5", Completed: 25, Assigned: 10 },
];

const purposeData = [
  { name: "Food", count: 40 },
  { name: "Personal", count: 35 },
  { name: "Project Resources", count: 20 },
  { name: "Buyers", count: 15 },
  { name: "Others", count: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EFF"];

export default function Charts() {
  return (
    <>
      {/* Pie Section */}
      <div style={{ display: "flex", gap: 20, marginBottom: 30 }}>
        <div style={{ background: "#fff", padding: 20, borderRadius: 8, flex: 1, boxShadow: "0 0 5px #ccc" }}>
          <h4>Project Completion Rate</h4>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData1} dataKey="value" innerRadius={70} outerRadius={95} startAngle={90} endAngle={-270}>
                <Cell fill="#00C49F" />
                <Cell fill="#ccc" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <p style={{ textAlign: "center", fontWeight: "bold", fontSize: 24 }}>55%</p>
          <p style={{ textAlign: "center", color: "#666" }}>92.88 Hour(s)</p>
        </div>

        <div style={{ background: "#fff", padding: 20, borderRadius: 8, flex: 1, boxShadow: "0 0 5px #ccc" }}>
          <h4>Top 5 Projects Based on Completed Tasks</h4>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData2} dataKey="value" outerRadius={100} label>
                {pieData2.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Section */}
      <div style={{ display: "flex", gap: 20 }}>
        <div style={{ background: "#fff", padding: 20, borderRadius: 8, flex: 1, boxShadow: "0 0 5px #ccc" }}>
          <h4>Completed vs. Assigned Tasks by Projects</h4>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={projectsData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Completed" fill="#00C49F" />
              <Bar dataKey="Assigned" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: "#fff", padding: 20, borderRadius: 8, flex: 1, boxShadow: "0 0 5px #ccc" }}>
          <h4>Uploaded Items by Purpose</h4>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={purposeData} layout="vertical">
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Bar dataKey="count" fill="#FFBB28" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
