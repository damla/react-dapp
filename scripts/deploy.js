const hre = require('hardhat')

async function main() {
  // We get the contract to deploy
  // ABI
  const Greeter = await hre.ethers.getContractFactory('Greeter')
  const greeter = await Greeter.deploy('Hello, Hardhat!')

  const Token = await hre.ethers.getContractFactory('Token')
  const token = await Token.deploy()

  await greeter.deployed()
  await token.deployed()

  console.log('Greeter deployed to:', greeter.address)
  console.log('Token deployed to:', token.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
