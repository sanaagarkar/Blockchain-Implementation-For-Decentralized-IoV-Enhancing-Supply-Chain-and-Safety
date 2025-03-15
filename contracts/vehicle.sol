// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract vehicle {
    struct Vehicle {
        string vin;
        uint speed;
        uint fuelLevel;
        string location;
    }

    mapping(string => Vehicle) public vehicles;

    function updateVehicleData(
        string memory _vin, uint _speed, uint _fuelLevel, string memory _location
    ) public {
        vehicles[_vin] = Vehicle(_vin, _speed, _fuelLevel, _location);
    }

    function getVehicleData(string memory _vin) public view returns (
        string memory, uint, uint, string memory
    ) {
        Vehicle memory v = vehicles[_vin];
        return (v.vin, v.speed, v.fuelLevel, v.location);
    }
}