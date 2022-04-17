require("@nomiclabs/hardhat-waffle");

// config here
module.exports = {
  solidity: "0.8.4",
  paths: {
    // path defined for compiled smart contracts
    artifacts: "./src/artifacts",
  },
  networks: {
    hardhat: {
      // default chainId for MetaMask
      chainId: 1337
    }
  }
};
