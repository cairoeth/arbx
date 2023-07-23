
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