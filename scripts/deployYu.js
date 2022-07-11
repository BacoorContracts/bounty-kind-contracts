const hre = require('hardhat')
const { writeNetworkEnv, readNetworkEnv } = require('../network/env')
const { addressPage, isTomoChain } = require('../utils')

readNetworkEnv(hre.network)

function writeEnv(address) {
  writeNetworkEnv('YU', address, hre.network)
  readNetworkEnv(hre.network)
}

async function argsInit() {
  return [
    'Yu Token',
    'YU',
  ]
}

// npx hardhat run ./scripts/utils/deployToken.js
async function main() {
  const token = await (await hre.ethers.getContractFactory(
    'contracts/MyERC20.sol:MyERC20'
  )).deploy(...(await argsInit()))

  writeEnv(token.address)
  console.log(`Address: ${addressPage(hre.network, token.address)}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})