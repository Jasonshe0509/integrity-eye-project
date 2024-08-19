import React, { useState } from 'react';
import Sidebar from '../navigation/sidebar';
import { CheckIcon, ChevronUpIcon, UserIcon } from '@heroicons/react/24/outline';
import totalAwardPic from '../assets/totalAward.png';
import AwardedContractBarChart from './awarded_contract_barchart';
import RegionSectorMalaysiaMapChart from './region_sector_chart';

const ProcurementDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar */}
      <Sidebar onSidebarToggle={setIsSidebarOpen} />
      {/* Main Dashboard Content */}
      <div className={`p-6 bg-gray-100 min-h-screen w-full transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold font-lato">Procurement Transparency Dashboard</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 font-roboto">
          <div className="bg-white p-6 rounded shadow-md">
            <h3 className="text-lg font-semibold">Total Current Tenders</h3>
            <div className="flex items-baseline mt-4">
              <p className="text-2xl font-bold mr-20">85</p>
              <ChevronUpIcon className="h-3 w-3 text-orange-600 mr-2" />
              <p className="text-sm text-gray-600">+15 since last week</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-semibold">Total Awarded Contracts</h2>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">95</p>
              <img src={totalAwardPic} alt="totalAward" className="h-16 w-24 ml-4" />
            </div>
          </div>
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-semibold">Region with Most Contracts</h2>
            <p className="text-2xl font-bold  mt-4">45 in Selangor</p>
          </div>
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-semibold">Upcoming Tender Closure</h2>
            <div className="flex items-baseline mt-2">
              <CheckIcon className="h-4 w-4 text-black-600 mr-2" />
              <p className="text-xl font-bold">Project A - 1/1/2024</p>
            </div>
            <div className="flex items-baseline mt-2">
              <CheckIcon className="h-4 w-4 text-black-600 mr-2" />
              <p className="text-xl font-bold">Project B - 1/1/2024</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-5 font-roboto">
          <div className="bg-white p-6 rounded shadow-md mb-6">
            <h2 className="text-lg font-semibold">Awarded Contract</h2>
            <div className="h-64 w-full -mt-4">
              <AwardedContractBarChart />
            </div>
          </div>
          <div className="bg-white p-6 rounded shadow-md mb-6">
            <h2 className="text-lg font-semibold">Regions & Sectors</h2>
            <div className="h-64">
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-lg font-semibold">Current Tenders</h2>
          <div className="overflow-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-4 py-2">Tender ID</th>
                  <th className="px-4 py-2">Project Name</th>
                  <th className="px-4 py-2">Description</th>
                  <th className="px-4 py-2">Closing Date</th>
                  <th className="px-4 py-2">Eligibility Criteria</th>
                  <th className="px-4 py-2">Region</th>
                  <th className="px-4 py-2">Contracting Agency</th>
                  <th className="px-4 py-2">Contact Person</th>
                </tr>
              </thead>
              <tbody>
                {/* Example rows */}
                <tr>
                  <td className="border px-4 py-2">1</td>
                  <td className="border px-4 py-2">Project Alpha</td>
                  <td className="border px-4 py-2">Description of Project Alpha</td>
                  <td className="border px-4 py-2">01/01/2024</td>
                  <td className="border px-4 py-2">Criteria details</td>
                  <td className="border px-4 py-2">Region A</td>
                  <td className="border px-4 py-2">Agency X</td>
                  <td className="border px-4 py-2 flex items-center">
                    <UserIcon className="h-6 w-6 text-gray-600 mr-2" />
                    Lili Daniels
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">2</td>
                  <td className="border px-4 py-2">Project Beta</td>
                  <td className="border px-4 py-2">Description of Project Beta</td>
                  <td className="border px-4 py-2">02/01/2024</td>
                  <td className="border px-4 py-2">Criteria details</td>
                  <td className="border px-4 py-2">Region B</td>
                  <td className="border px-4 py-2">Agency Y</td>
                  <td className="border px-4 py-2 flex items-center">
                    <UserIcon className="h-6 w-6 text-gray-600 mr-2" />
                    Henrietta Whitney
                  </td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div >
  );
};

export default ProcurementDashboard;
