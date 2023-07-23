
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

In order to deploy the contracts, set the relevant constants in the respective chain script, and run the following command(s):

```sh
forge script script/deploy/<GROUP>/<CHAIN>.s.sol:<CHAIN> -vvvv --fork-url <RPC> --broadcast --slow
```

<details>
<summary>Celo Alfajores (Testnet)</summary>
  ```sh
  forge script script/deploy/<GROUP>/<CHAIN>.s.sol:<CHAIN> -vvvv --fork-url <RPC> --broadcast --slow
  ```
</details>

<details>
  <summary>Celo (Mainnet)</summary>
    ```js
  function logSomething(something) {
    console.log('Something', something);
  }
  ```
</details>

<details>
  <summary>Gnosis Chain (Mainnet)</summary>
  ```sh
  forge script script/deploy/xdai/DeployXDai.s.sol:DeployXDai -vvvv --fork-url https://rpc.xdaichain.com --broadcast --slow
  ```
</details>

<details>
  <summary>Arbitrum (Mainnet)</summary>
  ```sh
  forge script script/deploy/arbitrum/DeployArbitrum.s.sol:DeployArbitrum -vvvv --fork-url https://arb1.arbitrum.io/rpc --broadcast --slow
  ```
</details>

<details>
  <summary>Arbitrum (Testnet)</summary>
  ```sh
  forge script script/deploy/arbitrum/DeployArbitrumTestnet.s.sol:DeployArbitrumTestnet -vvvv --fork-url https://rinkeby.arbitrum.io/rpc --broadcast --slow
  ```
</details>

<details>
  <summary>Optimism (Mainnet)</summary>
  ```sh
  forge script script/deploy/optimism/DeployOptimism.s.sol:DeployOptimism -vvvv --fork-url https://mainnet.optimism.io --broadcast --slow
  ```
</details>

<details>
  <summary>Optimism (Tesnet)</summary>
  ```sh
  forge script script/deploy/optimism/DeployOptimismTestnet.s.sol:DeployOptimismTestnet -vvvv --fork-url https://kovan.optimism.io --broadcast --slow
  ```
</details>

<details>
  <summary>Ethereum Goerli (Testnet)</summary>
  ```sh
  forge script script/deploy/ethereum/DeployEthereumTestnet.s.sol:DeployEthereumTestnet -vvvv --fork-url https://goerli.infura.io/v3/6b2d6b3c8c5a4a8e8f6b3c8c5a8e8f6b --broadcast --slow
  ```
</details>

<details>
  <summary>Ethereum Sepolia (Testnet)</summary>
  ```sh
  forge script script/deploy/ethereum/DeployEthereumTestnet.s.sol:DeployEthereumTestnet -vvvv --fork-url https://ropsten.infura.io/v3/6b2d6b3c8c5a4a8e8f6b3c8c5a8e8f6b --broadcast --slow
  ```
</details>

<details>
  <summary>Polygon (Testnet)</summary>
  ```sh
  forge script script/deploy/polygon/DeployPolygonTestnet.s.sol:DeployPolygonTestnet -vvvv --fork-url https://rpc-mumbai.maticvigil.com --broadcast --slow
  ```
</details>

<details>
  <summary>Polygon (Mainnet)</summary>
  ```sh
  forge script script/deploy/polygon/DeployPolygonMainnet.s.sol:DeployPolygonMainnet -vvvv --fork-url https://rpc-mainnet.maticvigil.com --broadcast --slow
  ```
</details>
