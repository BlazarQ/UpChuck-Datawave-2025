"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type DataPoint = {
  period: string;
  savings: number;
  expenses: number;
  income: number;
};

export default function Home() {
  const [income, setIncome] = useState(80000);
  const [expenses, setExpenses] = useState(45000);
  const [savings, setSavings] = useState(35000);
  const [goal, setGoal] = useState(10000000);
  const [months, setMonths] = useState(60); // default: 5 years
  const [viewMode, setViewMode] = useState<"months" | "years">("months");

  // Forecast data generator
  const data: DataPoint[] =
    viewMode === "months"
      ? Array.from({ length: months }, (_, i) => {
          return {
            period: `Month ${i + 1}`,
            income,
            expenses,
            savings: savings * (i + 1),
          };
        })
      : Array.from({ length: Math.floor(months / 12) }, (_, i) => {
          return {
            period: `Year ${i + 1}`,
            income: income * 12,
            expenses: expenses * 12,
            savings: savings * 12 * (i + 1),
          };
        });

  return (
    <main className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-72 bg-black border-r p-4 flex flex-col gap-4">
        <h2 className="text-lg font-bold">Financial Inputs</h2>

        {/* Inputs */}
        <div className="flex flex-col gap-3">
          <div>
            <label className="block text-sm">Monthly Income</label>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="w-full border px-2 py-1 rounded"
            />
          </div>
          <div>
            <label className="block text-sm">Monthly Expenses</label>
            <input
              type="number"
              value={expenses}
              onChange={(e) => setExpenses(Number(e.target.value))}
              className="w-full border px-2 py-1 rounded"
            />
          </div>
          <div>
            <label className="block text-sm">Monthly Savings</label>
            <input
              type="number"
              value={savings}
              onChange={(e) => setSavings(Number(e.target.value))}
              className="w-full border px-2 py-1 rounded"
            />
          </div>
          <div>
            <label className="block text-sm">Target Goal</label>
            <input
              type="number"
              value={goal}
              onChange={(e) => setGoal(Number(e.target.value))}
              className="w-full border px-2 py-1 rounded"
            />
          </div>
        </div>

        {/* Time range selector */}
        <div>
          <h3 className="text-sm font-semibold mb-2">Time Range</h3>
          <select
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="w-full border rounded px-2 py-1 mb-2"
          >
            <option value={12}>1 Year (12 months)</option>
            <option value={24}>2 Years (24 months)</option>
            <option value={36}>3 Years (36 months)</option>
            <option value={60}>5 Years (60 months)</option>
          </select>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("months")}
              className={`flex-1 px-2 py-1 rounded text-sm ${
                viewMode === "months"
                  ? "bg-blue-500 text-black"
                  : "bg-gray-200"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setViewMode("years")}
              className={`flex-1 px-2 py-1 rounded text-sm ${
                viewMode === "years" ? "bg-blue-500 text-black" : "bg-gray-200"
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* Quick profiles */}
        <div>
          <h3 className="text-sm font-semibold mb-2">Quick Start Profiles</h3>
          <button
            onClick={() => {
              setIncome(15000);
              setExpenses(5000);
              setSavings(10000);
              setGoal(30000);
            }}
            className="w-full mb-2 px-2 py-1 rounded bg-blue-100 text-sm"
          >
            Student saving for a phone
          </button>
          <button
            onClick={() => {
              setIncome(80000);
              setExpenses(45000);
              setSavings(35000);
              setGoal(10000000);
            }}
            className="w-full mb-2 px-2 py-1 rounded bg-green-100 text-sm"
          >
            Early retirement
          </button>
          <button
            onClick={() => {
              setIncome(60000);
              setExpenses(50000);
              setSavings(10000);
              setGoal(2000000);
            }}
            className="w-full mb-2 px-2 py-1 rounded bg-pink-100 text-sm"
          >
            Family budgeting
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <section className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-2">Financial Planning Dashboard</h1>

        <div className="bg-black p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Financial Forecast</h2>
          <p className="text-sm mb-4">
            {viewMode === "months"
              ? `${months}-month projection`
              : `${months / 12}-year projection`}{" "}
            based on your current financial inputs
          </p>

          <div className="w-full h-[400px]">
            <ResponsiveContainer>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="savings"
                  stroke="#82ca9d"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#ff7300"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="bg-black p-4 rounded shadow">
            <p className="text-sm">Monthly Income</p>
            <p className="text-lg font-bold">₱{income.toLocaleString()}</p>
          </div>
          <div className="bg-black p-4 rounded shadow">
            <p className="text-sm">Monthly Expenses</p>
            <p className="text-lg font-bold">₱{expenses.toLocaleString()}</p>
          </div>
          <div className="bg-black p-4 rounded shadow">
            <p className="text-sm">Monthly Savings</p>
            <p className="text-lg font-bold">₱{savings.toLocaleString()}</p>
          </div>
          <div className="bg-black p-4 rounded shadow">
            <p className="text-sm">Target Amount</p>
            <p className="text-lg font-bold">₱{goal.toLocaleString()}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
