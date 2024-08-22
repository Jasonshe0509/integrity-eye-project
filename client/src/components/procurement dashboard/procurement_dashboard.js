import React, { useState } from 'react';
import Sidebar from '../navigation/sidebar';
import { CheckIcon, ChevronUpIcon, UserIcon } from '@heroicons/react/24/outline';
import totalAwardPic from '../assets/totalAward.png';
import AwardedContractBarChart from './awarded_contract_barchart';
import RegionSectorMalaysiaMapChart from './region_sector_chart';
import malaysiaMap from '../assets/malaysia_map.png';

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
          <div className="bg-white p-6 rounded-lg	 shadow-md">
            <h3 className="text-lg font-semibold">Total Current Tenders</h3>
            <div className="flex items-baseline mt-4">
              <p className="text-2xl font-bold mr-20">85</p>
              <ChevronUpIcon className="h-3 w-3 text-orange-600 mr-2" />
              <p className="text-sm text-gray-600">+15 since last week</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Total Awarded Contracts</h2>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">95</p>
              <img src={totalAwardPic} alt="totalAward" className="h-16 w-24 ml-4" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Region with Most Contracts</h2>
            <p className="text-2xl font-bold  mt-4">45 in Selangor</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
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
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Awarded Contract</h2>
              <div className="ml-4 flex items-center space-x-2">
                <label htmlFor="minRange" className="text-sm font-medium text-gray-700">
                  Range:
                </label>
                <input
                  type="number"
                  id="minRange"
                  name="minRange"
                  min="1"
                  max="40"
                  defaultValue="1"
                  className="w-16 border border-gray-300 rounded-md px-2"
                />
                <label htmlFor="maxRange" className="text-sm font-medium text-gray-700">
                  -
                </label>
                <input
                  type="number"
                  id="maxRange"
                  name="maxRange"
                  min="1"
                  max="20"
                  defaultValue="20"
                  className="w-16 border border-gray-300 rounded-md px-2"
                />
              </div>
            </div>
            <div className="h-64 w-full mt-4">
              <AwardedContractBarChart />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Regions & Sectors</h2>
              <div className="ml-4">
                <label htmlFor="sectorDropdown" className="sr-only">
                  Sector
                </label>
                <select
                  id="sectorDropdown"
                  name="sectorDropdown"
                  className="block w-full p-2 border border-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="sector1">Sector 1</option>
                  <option value="sector2">Sector 2</option>
                  <option value="sector3">Sector 3</option>
                </select>
              </div>
            </div>
            <div className="h-64 mt-4">
              <img src={malaysiaMap} alt="Malaysia Map" />
            </div>
          </div>

        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Current Tenders</h2>
            <div className="flex items-center">
              <div className="flex items-center mr-4">
                <input
                  type="text"
                  placeholder="Search..."
                  className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring"
                />
              </div>
              <div className="flex items-center mr-4">
                <label className="mr-2 text-sm">Region</label>
                <select className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring">
                  <option value="">All</option>
                  <option value="Johor">Johor</option>
                  <option value="Selangor">Selangor</option>
                  <option value="Penang">Penang</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div className="flex items-center">
                <label className="mr-2 text-sm">Contracting Agency</label>
                <select className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring">
                  <option value="">All</option>
                  <option value="Ministry of Housing and Local Government">Ministry of Housing and Local Government</option>
                  <option value="Johor State Public Works Department">Johor State Public Works Department</option>
                  {/* Add more options as needed */}
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-4 py-2">Tender ID</th>
                  <th className="px-4 py-2">Project Name</th>
                  <th className="px-4 py-2">Closing Date</th>
                  <th className="px-4 py-2">Eligibility Criteria</th>
                  <th className="px-4 py-2">Region</th>
                  <th className="px-4 py-2">Contracting Agency</th>
                  <th className="px-4 py-2">Contact Person</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">KPM/02/2014/01/0420</td>
                  <td className="border px-4 py-2">TENDER TO SUPPLY AND SEND CONSUMABLE REAGENTS AND LABORATORY EQUIPMENT TO HOSPITAL</td>
                  <td className="border px-4 py-2">13/12/2013</td>
                  <td className="border px-4 py-2">Gred G6</td>
                  <td className="border px-4 py-2">Johor</td>
                  <td className="border px-4 py-2">MINISTRY OF HOUSING AND LOCAL GOVERNMENT</td>
                  <td className="border px-4 py-2">
                    <div className="flex items-center">
                      <UserIcon className="h-6 w-6 text-gray-600 mr-2" />
                      <span>Lili Daniels</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">KPM/02/2014/01/0383</td>
                  <td className="border px-4 py-2">PROPOSED CONSTRUCTION OF WISMA BINTARA FOR THE TRANSFER PROJECT OF 1 RRD TO KTD ULU TIRAM JOHOR</td>
                  <td className="border px-4 py-2">5/5/2017</td>
                  <td className="border px-4 py-2">Gred G7</td>
                  <td className="border px-4 py-2">Johor</td>
                  <td className="border px-4 py-2">JOHOR STATE PUBLIC WORKS DEPARTMENT</td>
                  <td className="border px-4 py-2">
                    <div className=" flex items-center">
                      <UserIcon className="h-6 w-6 text-gray-600 mr-2" />
                      Henrietta Whitney
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div >
  );
};

export default ProcurementDashboard;
