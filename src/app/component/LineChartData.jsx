import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function LineChartData({ headingTitle, transition }) {
  return (
    <>
      <div className="flex flex-col gap-12 justify-between font-semibold w-full">
        <h5 className="text-xl text-left">{headingTitle}</h5>
        <div className="w-full">
          <ResponsiveContainer width="100%" height={180}>
            <LineChart
              width={500}
              height={180}
              data={transition}
              syncId="anyId"
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value) => [`₹${value}`, "Amount"]}
                labelFormatter={(label, props) => {
                  const data = props?.[0]?.payload;
                  return `${data.name} | ${data.date}`;
                }}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#8884d8"
                strokeWidth={2}
                fill="#8884d8"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}

export default LineChartData;
