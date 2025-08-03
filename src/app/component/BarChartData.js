import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function BarChartData({ headingTitle, transition }) {
  console.log(transition);
  return (
    <>
      <div className="flex flex-col gap-12 justify-between font-semibold w-full">
        <h5 className="text-xl text-left">{headingTitle}</h5>
        <div className="w-full">
          <ResponsiveContainer width="100%" height={180}>
            <BarChart
              width={500}
              height={180}
              data={transition}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              barSize={20}
            >
              <XAxis
                dataKey="name"
                scale="point"
                padding={{ left: 10, right: 10 }}
              />
              <YAxis />
              <Tooltip
                formatter={(value, name) => [
                  value,
                  name.charAt(0).toUpperCase() + name.slice(1),
                ]}
              />
              <Legend
                formatter={(value) =>
                  value.charAt(0).toUpperCase() + value.slice(1)
                }
              />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar
                dataKey="amount"
                fill="#6b7280"
                background={{ fill: "#eee" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
