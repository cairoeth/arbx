
<h1 align="center">
  <br>
  ArbX
  <br>
</h1>

<h5 align="center">ArbX is the first cross-chain arbitrage protocol to optimize price rates across 52 decentralized exchanges across 20 EVM chains. By leveraging robust on-chain interoperability networks, ArbX provides a trustless, decentralized, and permissionless solution.</h5>

<p align="center">
  • <a href="#deployments">Deployments</a> •
</p>

![screenshot]()

## Deployments
<table>
<tr>
<th>Network</th>
<th>Beacon</th>
<th>Axelar Messenger</th>
<th>Chainlink Messenger</th>
<th>Hyperlane Messenger</th>
</tr>

</table>


### Deploy Contracts

<details>
  <summary>Celo Alfajores (Testnet)</summary>

  ```sh
  forge script script/deploy/celo/DeployCeloTestnet.s.sol:DeployCeloTestnet -vvvv --fork-url https://alfajores-forno.celo-testnet.org --broadcast --slow
  ```
</details>

<details>
  <summary>Celo (Mainnet)</summary>

  ```sh
  forge script script/deploy/celo/DeployCeloMainnet.s.sol:DeployCeloMainnet -vvvv --fork-url https://rpc.ankr.com/celo --broadcast --slow
  ```
</details>

<details>
  <summary>Gnosis Chain (Mainnet)</summary>

  ```sh
  forge script script/deploy/gnosis/DeployGnosisMainnet.s.sol:DeployGnosisMainnet -vvvv --fork-url https://rpc.gnosischain.com --broadcast --slow
  ```
</details>

<details>
  <summary>Linea (Testnet)</summary>

  ```sh
  forge script script/deploy/linea/DeployLineaTestnet.s.sol:DeployLineaTestnet -vvvv --fork-url https://rpc.goerli.linea.build --broadcast --slow
  ```
</details>

<details>
  <summary>Mantle (Testnet)</summary>

  ```sh
  forge script script/deploy/mantle/DeployMantleTestnet.s.sol:DeployMantleTestnet -vvvv --fork-url https://rpc.testnet.mantle.xyz --broadcast --legacy --slow
  ```
</details>

<details>
  <summary>Arbitrum (Mainnet)</summary>

  ```sh
  forge script script/deploy/arbitrum/DeployArbitrumMainnet.s.sol:DeployArbitrumMainnet -vvvv --fork-url https://arb1.croswap.com/rpc --broadcast --slow
  ```
</details>

<details>
  <summary>Arbitrum (Testnet)</summary>

  ```sh
  forge script script/deploy/arbitrum/DeployArbitrumTestnet.s.sol:DeployArbitrumTestnet -vvvv --fork-url https://rpc.goerli.arbitrum.gateway.fm --broadcast --slow
  ```
</details>

<details>
  <summary>Optimism (Mainnet)</summary>

  ```sh
  forge script script/deploy/optimism/DeployOptimismMainnet.s.sol:DeployOptimismMainnet -vvvv --fork-url https://rpc.ankr.com/optimism --broadcast --slow
  ```
</details>

<details>
  <summary>Ethereum Goerli (Testnet)</summary>

  ```sh
  forge script script/deploy/ethereum/DeployGoerliTestnet.s.sol:DeployGoerliTestnet -vvvv --fork-url https://rpc.ankr.com/eth_goerli --slow
  ```
</details>

<details>
  <summary>Polygon (Testnet)</summary>

  ```sh
  forge script script/deploy/polygon/DeployPolygonTestnet.s.sol:DeployPolygonTestnet -vvvv --fork-url https://rpc.ankr.com/polygon_mumbai --broadcast --slow
  ```
</details>

<details>
  <summary>Polygon (Mainnet)</summary>
  
  ```sh
  forge script script/deploy/polygon/DeployPolygonMainnet.s.sol:DeployPolygonMainnet -vvvv --fork-url https://poly-rpc.gateway.pokt.network --broadcast --slow
  ```
</details>

<details>
  <summary>Avalanche (Mainnet)</summary>

  ```sh
  forge script script/deploy/avalanche/DeployAvalancheMainnet.s.sol:DeployAvalancheMainnet -vvvv --fork-url https://rpc.ankr.com/avalanche --slow
  ```
</details>

<details>
  <summary>Avalanche (Testnet)</summary>

  ```sh
  forge script script/deploy/avalanche/DeployAvalancheTestnet.s.sol:DeployAvalancheTestnet -vvvv --fork-url https://rpc.ankr.com/avalanche_fuji --slow
  ```
</details>