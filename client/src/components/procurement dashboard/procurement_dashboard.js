import React, { useState } from 'react';
import Sidebar from '../navigation/sidebar';
import AwardedContractBarChart from './awarded_contract_barchart';
import TotalAwardedContracts from './total_awarded_contracts';
import ContractsRegion from './region_with_most_contract';
import MinistryWithMostContracts from './ministry_with_most_contracts';
import TotalCurrentTenders from './total_current_tenders';
import CurrentTendersTable from './current_tender_table.js';
import { ArrowsPointingOutIcon, MegaphoneIcon } from '@heroicons/react/24/outline';
import { Link } from "react-router-dom";
import Heatmap from './heatmap.js';


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
          <button className=" font-bold font-lato ml-4 px-4 py-2 text-tblue bg-white border border-white rounded-lg shadow-md hover:text-blue-700 transition-all duration-200">
            Login
          </button>
        </div>
        <div className="grid grid-cols-1 gap-6 mb-5 font-roboto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className='flex items-center'>
              <MegaphoneIcon className='h-6 w-6 text-gray-600 mr-3' />
              <h3 className="text-lg font-semibold">Dashboard Remark</h3>
            </div>
            <ol className="ml-4 list-decimal text-md pl-9">
              <li>The data of the dashboard is came from four different sources: <b>MyProcurement, CIDB, JKR, and Eperolehan.</b></li>
              <li>The dataset for the 'Total Current Tenders' and 'Current Tenders' table is sourced from tender advertisement data.</li>
              <li>The other visualizations are based on the successful bidder dataset.</li>
            </ol>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 font-roboto">
          <TotalCurrentTenders />
          <TotalAwardedContracts />
          <ContractsRegion />
          <MinistryWithMostContracts />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-5 font-roboto">
          <AwardedContractBarChart />
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
            <Heatmap/>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Current Tenders</h2>
            <div className="flex items-center">
              <Link to='/current_tender_page'>
                <div className='flex items-center'>
                  <ArrowsPointingOutIcon className='h-6 w-6 text-gray-600 ml-3' />
                </div>
              </Link>
            </div>
          </div>
          <CurrentTendersTable />
        </div>
      </div>
    </div >
  );
};

export default ProcurementDashboard;
