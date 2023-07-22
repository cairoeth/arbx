import { useState } from "react";
import { PlusCircleIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useNetwork
} from 'wagmi'
import useDebounce from 'components/helpers/useDebounce'
import { contracts } from 'components/helpers/contracts'

export function AddLiquidityModal({ tokenInput, chainInput, imageInput }: { tokenInput: string, chainInput: string, imageInput: string }) {
  const [input, setInput] = useState('')
  const [apy, setAPY] = useState('14.44')
  const { chain, chains } = useNetwork()
  const debouncedInput = useDebounce(input)

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: contracts['controller']['address'][chain?.name as keyof typeof contracts['controller']['address']] as `0x${string}`,
    abi: contracts.controller.abi,
    functionName: 'addModule',
    args: [debouncedInput],
    enabled: Boolean(debouncedInput),
  })
  const { data, error, isError, write } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  if (isSuccess) {
    window.location.reload();
  }

  return (
    <>
      <input type="checkbox" id="add-liquidity-modal" className="modal-toggle" />
      <label htmlFor="add-liquidity-modal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">Add {tokenInput.toUpperCase()}</h3>
          <p className="py-4">Add {tokenInput.toUpperCase()} to the arbitrage beacon on {chainInput[0].toUpperCase() + chainInput.slice(1)}. You must approve your tokens before calling the beacon.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              write?.()
            }}
          >
            <div className="form-control">
              <div>
                <div className="flex justify-between">
                  <label htmlFor="input" className="block text-sm font-medium leading-6 text-gray-900">
                    Input
                  </label>
                  <span className="text-sm leading-6 text-gray-500" id="input-max">
                    Max: 10,000
                  </span>
                </div>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <input
                    id="input"
                    type="number"
                    onChange={(e) => setInput(e.target.value)}
                    className="input input-bordered w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder='0'
                    value={input}
                    required
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <div className="avatar mask mask-squircle w-6 h-6 rounded-full">
                      <Image width={600} height={600} src={imageInput} alt={"Icon of " + tokenInput} />
                    </div>
                  </div>
                </div>
              </div>

              <div className='mt-5'>
                <label htmlFor="input" className="block text-sm font-medium leading-6 text-gray-900">
                  APY
                </label>
                <div className='input mt-2 input-bordered w-full rounded-md border-0 flex items-center text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm'>
                  {apy}%
                </div>
              </div>
            </div>

            <button disabled={!write || isLoading} className="mt-6 btn btn-block space-x-2">
              <div className="inline-flex items-center">
                {isLoading ? 'Adding...' :
                  <>
                    <PlusCircleIcon className="w-6 h-6 mr-2" />
                    Add
                  </>
                }
              </div>
            </button>

            {isSuccess && (
              <div>
                Successfully provided liquidity!
                <div>
                  <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
                </div>
              </div>
            )}
            {(isPrepareError || isError) && (
              <div>Error: {(prepareError || error)?.message}</div>
            )}
          </form>
        </label>
      </label>
    </>
  )
}
