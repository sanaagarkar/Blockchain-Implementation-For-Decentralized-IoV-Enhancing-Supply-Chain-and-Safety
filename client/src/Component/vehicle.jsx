import { ethers } from "ethers";
import React, { useState } from 'react';
import vehicleapi from "../vehicleapi.json"


function Vehicle() {

  const [vin, setVin] = useState("");
  const [vehicleData, setVehicleData] = useState(null);
  const [error, setError] = useState("");

  const fetchVehicleData = async () => {
    setError(""); // Reset error
    try {
      const contractAddress = "0xd2d55bb074EA02fDbceC62F469E4F7223D1C931C";
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, vehicleapi, signer);

      const data = await contract.getVehicleData(vin);
      setVehicleData({
        vin: data[0],
        speed: data[1].toNumber(), // Convert BigNumber to number
        fuelLevel: data[2].toNumber(),
        location: data[3],
      });
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch vehicle data. Please ensure the VIN is correct and try again.");
    }
  };

  return (
    <div>
      <h2>Fetch Vehicle Data</h2>
      <label htmlFor="vinInput">VIN:</label>
      <input
        type="text"
        id="vinInput"
        value={vin}
        onChange={(e) => setVin(e.target.value)}
        placeholder="Enter VIN"
      />
      <button onClick={fetchVehicleData}>Get Vehicle Data</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {vehicleData && (
        <div>
          <h3>Vehicle Data</h3>
          <p><strong>VIN:</strong> {vehicleData.vin}</p>
          <p><strong>Speed:</strong> {vehicleData.speed} km/h</p>
          <p><strong>Fuel Level:</strong> {vehicleData.fuelLevel}%</p>
          <p><strong>Location:</strong> {vehicleData.location}</p>
        </div>
      )}
    </div>
  );
}

export default Vehicle

