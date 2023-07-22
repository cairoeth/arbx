import { Square3Stack3DIcon, ChevronDownIcon } from "@heroicons/react/24/outline"
import { Popover } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import { AddModuleModal } from 'components/liquidity/modals/addModule'
import { useContractRead, useContractReads, useNetwork } from 'wagmi'
import { contracts } from 'components/helpers/contracts'
import { useState, useEffect } from "react";

type Props = {
  data: any
  isError: boolean
  isLoading: boolean
}

export function Liquidity() {
  var moduleContracts: any = []
  var modules: any = []
  const chunkSize = 2
  const [hydrated, setHydrated] = useState(false);
  const [columnAmount, setColumnAmount] = useState(0);
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
    if (modules.length > 3) {
      setColumnAmount(3);
    } else {
      setColumnAmount(modules.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filters = [
    {
      id: 'token',
      name: 'Token',
      options: [
        { value: 'ETH', label: 'ETH' },
        { value: 'USDC-ETH UniV2', label: 'USDC-ETH UniV2' },
        { value: 'stETH', label: 'stETH' },
      ],
    },
    {
      id: 'ltv',
      name: 'LTV',
      options: [
        { value: 'Min - 100k', label: 'Min - 100k' },
        { value: '100k - 1m ', label: '100k - 1m' },
        { value: '1m - Max', label: "1m - Max" },
      ],
    },
    {
      id: 'apy',
      name: 'APY',
      options: [
        { value: 'Min - 4%', label: 'Min - 4%' },
        { value: '4% - 8%', label: '4% - 8%' },
        { value: '8% - Max', label: '8% - Max' },
      ],
    },
  ]

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
        <div className="col-span-2">
          <div className="h-fullgrid grid-cols-2 gap-1 md:grid-cols-1 w-full md:gap-4">
          {/* <Total /> */}
          </div>
        </div>
        <div className="col-span-1">
          <div className="h-full grid grid-cols-2 gap-1 md:grid-cols-1 w-full md:gap-4">
            {/* <FeeEarning data={ActionsData} /> */}
          </div>
        </div>
      </div>
    </>
  )
}
