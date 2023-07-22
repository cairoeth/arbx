import { BoltIcon } from "@heroicons/react/24/outline"
import Image from 'next/image'
import Link from 'next/link'
import { useAccount, useNetwork } from 'wagmi'

interface Map {
  [key: string]: string | undefined
}

const statuses: Map = {
  Profit: 'text-green-700 bg-green-50 ring-green-600/20',
  InProgress: 'text-gray-600 bg-gray-50 ring-gray-500/10',
  Loss: 'text-red-700 bg-red-50 ring-red-600/10',
}

const trades = [
  {
    id: 1,
    href: 'https://ccip.chain.link/msg/0x0038111cc90c2a52ebf261c52ce9420eb433499f3de3bc3c27fe38ff321a94ea',
    gross: '$194.10 USD',
    raw: '194.10',
    status: 'Profit',
    tokens: ['dai', 'eth'],
    chains: ['arbitrum', 'polygon'],
    channel: 'chainlink',
    arbitraguer: '0x741cB6A6a8dC16363666462769D8dEc996311466',
    date: '2023-03-22',
  }
]

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export function Trades() {
  const { chain } = useNetwork()
  const { address } = useAccount()
  const wrapperContracts: any = []
  var modules: any = []

  // const controllerContract: any = {
  //   address: contracts['controller']['address'][chain?.name as keyof typeof contracts['controller']['address']] as `0x${string}`,
  //   abi: contracts.controller.abi,
  // }

  // const controllerData: any = useContractReads({
  //   contracts: [
  //     {
  //       ...controllerContract,
  //       functionName: 'allWrappers',
  //     },
  //     {
  //       ...controllerContract,
  //       functionName: 'allModules',
  //     },
  //   ],
  //   onError(error) {
  //     console.log('Error', error)
  //   },
  // })

  // if (controllerData.data != null) {
  //   const length = controllerData.data[0].length

  //   for (let i = 0; i < length; i++) {
  //     const wrapperContract: any = {
  //       address: controllerData.data[0][i],
  //       abi: contracts.wrapper.abi,
  //     }

  //     // loop over modules
  //     for (let j = 0; j < length; j++) {
  //       const moduleContract: any = {
  //         address: controllerData.data[1][j],
  //         abi: contracts.module.abi,
  //       }

  //       const wrapperContractRestaked = {
  //         ...wrapperContract,
  //         functionName: 'restakedAmount',
  //         args: [address, controllerData.data[1][j]]
  //       }

  //       const wrapperContractSymbol = {
  //         ...wrapperContract,
  //         functionName: 'symbol',
  //       }

  //       const moduleContractName = {
  //         ...moduleContract,
  //         functionName: 'name',
  //       }

  //       const moduleContractImage = {
  //         ...moduleContract,
  //         functionName: 'image',
  //       }

  //       wrapperContracts.push(wrapperContractRestaked, wrapperContractSymbol, moduleContractName, moduleContractImage)
  //     }
  //   }
  // }

  // const wrappersData: any = useContractReads({
  //   contracts: wrapperContracts,
  //   onError(error) {
  //     console.log('Error', error)
  //   },
  // })

  // for (let i = 0; i < wrappersData?.data?.length; i += 4) {
  //   const chunk: any = wrappersData?.data?.slice(i, i + 4);
  //   const restakedAmount: any = ethers.utils.formatUnits(chunk[0], 18)

  //   if (restakedAmount > 0) {
  //     modules.push({
  //       image: chunk[3],
  //       name: chunk[2],
  //       restakedAmount: restakedAmount,
  //       symbol: chunk[1],
  //       address: controllerData?.data[1][i / 4],
  //       underlying: controllerData?.data[0][i / 4],
  //       underlying_symbol: chunk[1].substring(2)
  //     })
  //   } else {
  //     continue
  //   }
  // }

  return (
    <div className="card bg-base-100 shadow-xl mb-10">
      <div className="card-body">
        <div className="card-title flex items-center justify-between">
          <div className="relative inline-block text-left">
            <div className="inline-flex mr-4">
              <h2 className="card-title">
                <BoltIcon className="w-6 h-6" />
                Latest Trades
              </h2>
            </div>
          </div>

          <div className="hidden sm:flex sm:items-baseline sm:space-x-8">
            <div className="relative inline-block text-left">
              <div className="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                <Link className="btn btn-sm btn-primary btn-outline ml-4 align-middle" href='/arbitrage'>
                  Create Trade
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto max-h-min">
          <div className="mt-6 overflow-hidden border-t border-gray-100">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
              <table className="table w-full text-left">
                <thead>
                  <tr>
                    <th>Chains</th>
                    <th>Tokens</th>
                    <th>Gross</th>
                    <th>Arbitrageur</th>
                    <th>Channel</th>
                  </tr>
                </thead>
                <tbody>
                  {trades.map((trade) => (
                    <tr key={trade.id}>
                      {/* Chains */}
                      <td className="py-5 pr-6 sm:table-cell">
                        <div className="text-sm leading-6 text-gray-900">
                          <div className="isolate flex -space-x-2 overflow-hidden mt-1">
                            {trade.chains.map((chain) => (
                              <div key={chain} className="avatar mask mask-squircle w-6 h-6 rounded-full">
                                {/* TODO: Improve below to not use double plus sign */}
                                <Image width={600} height={600} src={"https://icons.llamao.fi/icons/chains/rsz_" + chain + '.jpg'} alt={"Image of " + chain} />
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="mt-1 text-xs leading-5 text-gray-500">
                          {trade.chains?.length} Chain
                          {trade.chains?.length > 1 ?
                            's' :
                            null
                          }
                        </div>
                      </td>
                      {/* Tokens */}
                      <td className="py-5 pr-6 sm:table-cell">
                        <div className="text-sm leading-6 text-gray-900">
                          <div className="isolate flex -space-x-2 overflow-hidden mt-1">
                            {trade.tokens.map((token) => (
                              <div key={token} className="avatar mask mask-squircle w-6 h-6 rounded-full">
                                <Image width={600} height={600} src={"https://icons.llamao.fi/icons/liquidations/" + token + '.png'} alt={"Icon of " + token} />
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="mt-1 text-xs leading-5 text-gray-500">
                          {trade.tokens?.length} Tokens
                        </div>
                      </td>
                      {/* Gross */}
                      <td className="py-5 pr-6 sm:table-cell">
                        <div className="flex gap-x-6">
                          <div className="flex-auto">
                            <div className="flex items-start gap-x-3">
                              <div className="text-sm font-medium leading-6 text-gray-900">{trade.gross}</div>
                              <div
                                className={classNames(
                                  statuses[trade.status],
                                  'rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset'
                                )}
                              >
                                {trade.status}
                              </div>
                            </div>
                            <div className="mt-1 text-xs leading-5 text-gray-500">{trade.raw} {trade.tokens[0].toUpperCase()}</div>
                          </div>
                        </div>
                      </td>
                      {/* Arbitrageur */}
                      <td className="py-5 pr-6 sm:table-cell">
                        <Link href={'https://goerli.etherscan.io/address/' + trade.arbitraguer} target="_blank">
                          <div className="flex">
                            <div className="avatar mask mask-squircle w-6 h-6 rounded-full">
                              <Image width={600} height={600} src={"https://generative-placeholders.glitch.me/image?width=600&height=300&img=" + trade.arbitraguer} alt={"Icon of " + trade.arbitraguer} />
                            </div>
                            <span className="pl-1 text-gray-900">{trade.arbitraguer.substring(0, 24) + '...'}</span>
                          </div>
                          <div className="mt-1 text-xs leading-5 text-gray-500">
                            {trade.date}
                          </div>
                        </Link>
                      </td>
                      {/* Channel */}
                      <td className="py-5 pr-6 sm:table-cell">
                        <div className="flex">
                          <div className="avatar mask mask-squircle w-6 h-6 rounded-full">
                            <Image width={600} height={600} src={"https://icons.llamao.fi/icons/protocols/" + trade.channel + '.jpg'} alt={"Icon of " + trade.channel} />
                          </div>
                          <span className="text-gray-900">{trade.channel[0].toUpperCase() + trade.channel.slice(1)}</span>
                        </div>
                        <div className="mt-1 text-xs leading-5 text-gray-500">
                          <a
                            href={trade.href}
                            className="text-sm font-medium leading-6 text-indigo-600 hover:text-indigo-500"
                            target="_blank"
                            rel="noreferrer"
                          >
                            View<span className="hidden sm:inline"> transaction</span>
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
