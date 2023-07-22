import { ArrowTrendingUpIcon, ArrowUpTrayIcon, TrophyIcon, ChevronDownIcon, ChevronRightIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/outline"
import Image from 'next/image'
import { useContractRead, useContractReads, useNetwork } from 'wagmi'
import { contracts } from 'components/helpers/contracts'
import { useState, useEffect } from "react";

type Props = {
  data: any
  isError: boolean
  isLoading: boolean
}

const tokens = [
  {
    name: 'usdc',
    image: 'https://icons.llamao.fi/icons/pegged/usd-coin.jpg',
    chains: [
      {
        name: 'arbitrum',
        userLiquidity: 100,
        totalLiquidity: 100,
        volume: 14041,
        apy: 1.22,
      },
      {
        name: 'polygon',
        userLiquidity: 0,
        totalLiquidity: 0,
        volume: 0,
        apy: 7.22,
      }
    ],
    userLiquidity: 100,
    totalLiquidity: 100,
    volume: 14041,
    apy: 4.55
  }
]

const columns = ['Token', 'Chain', 'Your Liquidity', 'Total Liquidity', 'Volume 24h', 'APY']

const Row: React.FC<{ token: any }> = ({ token }) => {
  // Controls whether child rows are displayed as well as the rotated state of the collapse icon
  const [hidden, setHidden] = useState(true);

  return (
    <>
      <tr key={token.name} onClick={(e) => {
        setHidden(!hidden);
      }}>
        {/* Token */}
        <td className="py-5 pr-6 sm:table-cell">
          <div className="flex">
            <div className="avatar mask mask-squircle w-6 h-6 rounded-full">
              <Image width={600} height={600} src={token.image} alt={"Icon of " + token.name} />
            </div>
            <span className="text-gray-900 pl-1">{token.name.toUpperCase()}</span>
          </div>
          <div className="mt-1 text-xs leading-5 text-gray-500">
            {token.chains?.length} Chain
            {token.chains?.length > 1 ?
              's' :
              null
            }
          </div>
        </td>
        {/* Chain */}
        <td className="py-5 pr-6 sm:table-cell">
          <div className="text-sm leading-6 text-gray-900">
            <div className="isolate flex -space-x-2 overflow-hidden mt-1">
              {token.chains.map((chain) => (
                <div className="avatar mask mask-squircle w-6 h-6 rounded-full">
                  <Image width={600} height={600} src={"https://icons.llamao.fi/icons/chains/rsz_" + chain.name + '.jpg'} alt={"Icon of " + chain.name} />
                </div>
              ))}
            </div>
          </div>
        </td>
        {/* Your Liquidity */}
        <td className="py-5 pr-6 sm:table-cell">
          <div className="flex gap-x-6">
            <div className="flex-auto">
              <div className="flex items-start gap-x-3">
                <div className="text-sm font-medium leading-6 text-gray-900">{token.userLiquidity} {token.name.toUpperCase()}</div>
              </div>
              <div className="mt-1 text-xs leading-5 text-gray-500">$100.00 USD</div>
            </div>
          </div>
        </td>
        {/* Total Liquidity */}
        <td className="py-5 pr-6 sm:table-cell">
          <div className="flex gap-x-6">
            <div className="flex-auto">
              <div className="flex items-start gap-x-3">
                <div className="text-sm font-medium leading-6 text-gray-900">{token.totalLiquidity} {token.name.toUpperCase()}</div>
              </div>
              <div className="mt-1 text-xs leading-5 text-gray-500">$100.00 USD</div>
            </div>
          </div>
        </td>
        {/* Volume 24h */}
        <td className="py-5 pr-6 sm:table-cell">
          <div className="flex gap-x-6">
            <div className="flex-auto">
              <div className="flex items-start gap-x-3">
                <div className="text-sm font-medium leading-6 text-gray-900">${token.volume}</div>
              </div>
            </div>
          </div>
        </td>
        {/* APY */}
        <td className="py-5 pr-6 sm:table-cell">
          <div className="flex gap-x-6">
            <div className="flex-auto">
              <div className="flex items-start gap-x-3">
                <div className="text-sm font-medium leading-6 text-gray-900">{token.apy}%</div>
              </div>
            </div>
          </div>
        </td>
        {/* Icon */}
        <td className="py-5 pr-6 sm:table-cell">
          <div className="flex gap-x-6">
            <div className="flex-auto">
              <div className="flex items-start gap-x-3">
                {hidden ? <ChevronRightIcon className="w-6 h-6" /> : <ChevronDownIcon className="w-6 h-6" />}
              </div>
            </div>
          </div>
        </td>
      </tr>

      {
        hidden ?
          <></>
          :
          <>
            {token.chains.map((chain) => (
              <tr key={chain.name}>
                {/* Empty Space */}
                <td></td>
                {/* Chain */}
                <td className="py-5 pr-6 sm:table-cell">
                  <div className="flex">
                    <div className="avatar mask mask-squircle w-6 h-6 rounded-full">
                      <Image width={600} height={600} src={"https://icons.llamao.fi/icons/chains/rsz_" + chain.name + '.jpg'} alt={"Icon of " + chain.name} />
                    </div>
                    <span className="text-gray-900 pl-1">{chain.name[0].toUpperCase() + chain.name.slice(1)}</span>
                  </div>
                </td>
                {/* Your Liquidity */}
                <td className="py-5 pr-6 sm:table-cell">
                  <div className="flex gap-x-6">
                    <div className="flex-auto">
                      <div className="flex items-start gap-x-3">
                        <div className="text-sm font-medium leading-6 text-gray-900">{chain.userLiquidity} {token.name.toUpperCase()}</div>
                      </div>
                      <div className="mt-1 text-xs leading-5 text-gray-500">$100.00 USD</div>
                    </div>
                  </div>
                </td>
                {/* Total Liquidity */}
                <td className="py-5 pr-6 sm:table-cell">
                  <div className="flex gap-x-6">
                    <div className="flex-auto">
                      <div className="flex items-start gap-x-3">
                        <div className="text-sm font-medium leading-6 text-gray-900">{chain.totalLiquidity} {token.name.toUpperCase()}</div>
                      </div>
                      <div className="mt-1 text-xs leading-5 text-gray-500">$100.00 USD</div>
                    </div>
                  </div>
                </td>
                {/* Volume 24h */}
                <td className="py-5 pr-6 sm:table-cell">
                  <div className="flex gap-x-6">
                    <div className="flex-auto">
                      <div className="flex items-start gap-x-3">
                        <div className="text-sm font-medium leading-6 text-gray-900">${chain.volume}</div>
                      </div>
                    </div>
                  </div>
                </td>
                {/* APY */}
                <td className="py-5 pr-6 sm:table-cell">
                  <div className="flex gap-x-6">
                    <div className="flex-auto">
                      <div className="flex items-start gap-x-3">
                        <div className="text-sm font-medium leading-6 text-gray-900">{chain.apy}%</div>
                      </div>
                    </div>
                  </div>
                </td>
                {/* Buttons */}
                <td className="py-5 pr-6 sm:table-cell">
                  <div className="flex gap-x-6">
                    <div className="flex-auto">
                      <div className="flex items-start gap-x-3">
                        <label className="btn btn-circle btn-sm btn-secondary btn-outline ml-4 align-middle">
                          <PlusIcon className="w-6 h-6" />
                        </label>

                        <label className="btn btn-circle btn-sm btn-secondary btn-outline ml-4 align-middle">
                          <MinusIcon className="w-6 h-6" />
                        </label>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </>
      }
    </>
  )
}

export function Liquidity() {
  var moduleContracts: any = []
  var modules: any = []
  const chunkSize = 2
  const [hydrated, setHydrated] = useState(false);
  const { chain, chains } = useNetwork()

  const allModulesCall: Props = useContractRead({
    address: contracts['controller']['address'][chain?.name as keyof typeof contracts['controller']['address']] as `0x${string}`,
    abi: contracts.controller.abi,
    functionName: 'allModules',
  })

  for (var i = 0; i < allModulesCall.data?.length; ++i) {
    const moduleIndividual_name: any = {
      address: allModulesCall.data[i],
      abi: contracts.module.abi,
      functionName: 'name',
    }

    const moduleIndividual_image: any = {
      address: allModulesCall.data[i],
      abi: contracts.module.abi,
      functionName: 'image',
    }

    moduleContracts.push(moduleIndividual_name, moduleIndividual_image)
  }

  const wrappersData: any = useContractReads({
    contracts: moduleContracts,
    onError(error) {
      console.log('Error', error)
    },
  })

  for (let i = 0; i < wrappersData.data?.length; i += chunkSize) {
    const chunk: any = wrappersData.data.slice(i, i + chunkSize);

    if (chunk[0] == null) {
      continue
    }

    modules.push({
      name: chunk[0],
      image: chunk[1],
      apy: '7.69',
      apyPerformance: '+4.79',
      address: allModulesCall.data[i / chunkSize]
    })
  }

  useEffect(() => {
    // This forces a rerender, so the date is rendered
    // the second time but not the first
    setHydrated(true);
  }, []);
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }

  return (
    <>
      <div className='w-full grid-cols-3 gap-4 overflow-y-hidden overflow-x-scroll px-10 pb-4 xl:grid xl:overflow-x-auto xl:px-4 svelte-1n6ue57'>
        <div className="col-span-1">
          <div className="h-fullgrid grid-cols-2 gap-1 md:grid-cols-1 w-full md:gap-4">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">
                  <ArrowUpTrayIcon className="w-6 h-6" />
                  Your Total Liquidity
                </h2>
                <div className="stat-value">$0.00</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="h-fullgrid grid-cols-2 gap-1 md:grid-cols-1 w-full md:gap-4">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">
                  <ArrowTrendingUpIcon className="w-6 h-6" />
                  Your Liquidity Fee Earnings
                </h2>
                <div className="stat-value">$0.00</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="h-fullgrid grid-cols-2 gap-1 md:grid-cols-1 w-full md:gap-4">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">
                  <TrophyIcon className="w-6 h-6" />
                  Your Total Farming Rewards&nbsp;
                  <button className="btn btn-sm btn-primary btn-outline align-middle">
                    <div className="inline-flex items-center">
                      Claim
                    </div>
                  </button>
                </h2>

                <div className="stat-value">$0.00</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl mb-10">
        <div className="card-body">
          <div className="overflow-x-auto max-h-min">
            <div className="mt-6 overflow-hidden border-t border-gray-100">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                <table className="table w-full text-left">
                  <thead>
                    <tr>
                      {columns.map((column) =>
                        <th>{column}</th>
                      )}
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {tokens.map((token) => (
                      <Row token={token} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
