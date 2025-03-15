const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


module.exports = buildModule("TwitterModule", (m) => {

  const tokenContact = m.contract("vehicle",[]);

  return { tokenContact };
});
