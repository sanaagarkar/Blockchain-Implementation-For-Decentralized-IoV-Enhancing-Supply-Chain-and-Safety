
const express = require("express");
import { ethers } from "ethers";
import ABI from "./abi/ABI.json"

const app = express();
app.use(express.json());


const contractAddress = "0xd2d55bb074EA02fDbceC62F469E4F7223D1C931C"; 
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, ABI, signer);


app.post("/updateVehicle", async (req, res) => {
    const { vin, speed, fuelLevel, location } = req.body;
    try {
        await contract.updateVehicleData(vin, speed, fuelLevel, location)
    
        res.send("Vehicle data updated on blockchain!");
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Failed to update data");
    }
});

app.get("/getVehicleData", async (req, res) => {
    const { vin } = req.params;
    try {
        const data = await contract.getVehicleData(vin);
        res.json(data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Failed to fetch data");
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));