import React from "react";
import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Cell,
} from "recharts";

function CustomPieChart({ title, pieChartData }) {
  return (
    <>
      <div className="flex flex-col gap-6 justify-between font-semibold">
        <h5 className="text-xl text-left">{title}</h5>
        <div className="w-full relative">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                dataKey="value"
                data={pieChartData}
                fill="#8884d8"
                paddingAngle={2}
                nameKey="name"
                outerRadius={100}
                innerRadius={80}
                label={false}
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip wrapperStyle={{ zIndex: 50 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-center z-0 pointer-events-none">
            <p>Total Overview</p>
            <p>₹ {pieChartData.reduce((acc, item) => acc + item.value, 0)}</p>
          </div>
          <Legend />
        </div>
      </div>
    </>
  );
}

export default CustomPieChart;
