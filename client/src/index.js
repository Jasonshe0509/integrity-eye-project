import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ProcurementDashboard from './components/procurement dashboard/procurement_dashboard';
import reportWebVitals from './reportWebVitals';
import CurrentTenderPage from './components/procurement dashboard/current_tender_page';

const router = createBrowserRouter([
  {
    path:"/",
    element: <ProcurementDashboard />
  },
  {
    path:"/current_tender_page",
    element: <CurrentTenderPage/>
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
