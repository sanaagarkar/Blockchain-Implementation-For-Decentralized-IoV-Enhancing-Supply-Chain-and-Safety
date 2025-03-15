import React, { useState } from 'react';
import vehicleapi from "../vehicleapi.json";
import { ethers } from "ethers";

function VehicleForm() {
  const [vin, setVin] = useState("");
  const [fuel, setFuel] = useState("");
  const [speed, setSpeed] = useState("");
  const [location, setLocation] = useState("");

  const Upload = async (event) => {
    event.preventDefault(); // Prevents page from reloading
    try {
      // Request account access if needed
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      } else {
        console.error("MetaMask is not installed.");
        return;
      }
  
      const contractAddress = "0xd2d55bb074EA02fDbceC62F469E4F7223D1C931C";
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, vehicleapi, signer);
  
      const tx = await contract.updateVehicleData(vin, fuel, speed, location);
      await tx.wait();
      console.log("Vehicle data updated on blockchain!");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  

  return (
    <form className="voter-form" onSubmit={Upload}>
      <label htmlFor="vin" className="label2">VIN:</label>
      <input
        type="text"
        className="innerBoxVote"
        id="vin"
        value={vin}
        onChange={(e) => setVin(e.target.value)}
      />
      <label htmlFor="fuel" className="label2">Fuel:</label>
      <input
        type="number"
        className="innerBoxVote"
        id="fuel"
        value={fuel}
        onChange={(e) => setFuel(e.target.value)}
      />
      <label htmlFor="speed" className="label2">Speed:</label>
      <input
        type="number"
        className="innerBoxVote"
        id="speed"
        value={speed}
        onChange={(e) => setSpeed(e.target.value)}
      />
      <label htmlFor="location" className="label2">Location:</label>
      <input
        type="text"
        className="innerBoxVote"
        id="location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button className="regBtn" type="submit">Submit</button>
    </form>
  );
}

export default VehicleForm;
