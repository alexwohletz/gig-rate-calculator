"use client";

import React, { useState } from 'react';

export default function Home() {
  const [desiredSalary, setDesiredSalary] = useState('');
  const [federalTaxRate, setFederalTaxRate] = useState('');
  const [healthcareCost, setHealthcareCost] = useState('');
  const [ptoDays, setPtoDays] = useState('');
  const [hourlyRate, setHourlyRate] = useState(null);

  const calculateHourlyRate = () => {
    const salary = parseFloat(desiredSalary);
    const taxRate = parseFloat(federalTaxRate) / 100;
    const healthcare = parseFloat(healthcareCost);
    const pto = parseFloat(ptoDays);

    if (isNaN(salary) || isNaN(taxRate) || isNaN(healthcare) || isNaN(pto)) {
      alert('Please enter valid numbers for all fields');
      return;
    }

    const workingDays = 260 - pto; // Assuming 52 weeks * 5 days = 260 working days per year
    const workingHours = workingDays * 8;

    const totalCost = salary / (1 - taxRate) + healthcare;
    const hourlyRate = totalCost / workingHours;

    setHourlyRate(Math.round(hourlyRate * 100) / 100);
  };

  return (
    <main className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">Gig-Work Hourly Rate Calculator</div>
            <p className="block mt-1 text-lg leading-tight font-medium text-black">Calculate your ideal hourly rate</p>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="desiredSalary">
                Desired Yearly Salary ($)
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="desiredSalary"
                type="number"
                value={desiredSalary}
                onChange={(e) => setDesiredSalary(e.target.value)}
                placeholder="e.g. 50000"
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="federalTaxRate">
                Federal Tax Rate (%)
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="federalTaxRate"
                type="number"
                value={federalTaxRate}
                onChange={(e) => setFederalTaxRate(e.target.value)}
                placeholder="e.g. 22"
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="healthcareCost">
                Yearly Healthcare Cost ($)
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="healthcareCost"
                type="number"
                value={healthcareCost}
                onChange={(e) => setHealthcareCost(e.target.value)}
                placeholder="e.g. 5000"
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ptoDays">
                Desired PTO Days per Year
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="ptoDays"
                type="number"
                value={ptoDays}
                onChange={(e) => setPtoDays(e.target.value)}
                placeholder="e.g. 15"
              />
            </div>
            <div className="mt-6">
              <button
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={calculateHourlyRate}
              >
                Calculate Hourly Rate
              </button>
            </div>
            {hourlyRate !== null && (
              <div className="mt-6">
                <p className="text-xl font-bold text-indigo-600">
                  Your ideal hourly rate: ${hourlyRate.toFixed(2)}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
