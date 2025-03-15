import { useState } from 'react'

import VehicleForm from './Component/UploadVehicle'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Vehicle from './Component/vehicle'

import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
function App() {
  

  return (
    <>
      <Router>
        <div style={{ display: "flex", gap: "10px", margin: "20px" }}>
          {/* Navigation buttons */}
          
          <Link to="/getVehicleData">
            <button>Get Vehicle Data</button>
          </Link>
          <Link to="/updateVehicle">
            <button>Update Vehicle</button>
          </Link>
        </div>
        
        {/* Routes */}
        <Routes>
          <Route path="/updateVehicle" element={<VehicleForm />} />
          <Route path="/getVehicleData" element={<Vehicle />} />
        </Routes>
      </Router>
    </>
  );
}

export default App
