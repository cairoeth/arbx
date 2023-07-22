import { useState } from "react";
import { MinusCircleIcon } from '@heroicons/react/24/outline'
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useNetwork
} from 'wagmi'
import useDebounce from 'components/helpers/useDebounce'
import { contracts } from 'components/helpers/contracts'

export function RemoveLiquidityModal({ chainInput }: { chainInput: string }) {
  const [percentage, setPercentage] = useState(50);
  const [amount, setAmount] = useState(0)
  const { chain, chains } = useNetwork()
  const debouncedAmount = useDebounce(amount)

  const changePercentage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(1);
    setPercentage(parseInt(event.target.value));
  };

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: contracts['controller']['address'][chain?.name as keyof typeof contracts['controller']['address']] as `0x${string}`,
    abi: contracts.controller.abi,
    functionName: 'addModule',
    args: [debouncedAmount],
    enabled: Boolean(debouncedAmount),
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
      <input type="checkbox" id="remove-liquidity-modal" className="modal-toggle" />
      <label htmlFor="remove-liquidity-modal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">Remove Liquidity</h3>
          <p className="py-4">Select the amount of liquidity you wish to remove from {chainInput[0].toUpperCase() + chainInput.slice(1)}:</p>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              write?.()
            }}
          >
            <div className="form-control">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-10">
                <div className="col-span-8">
                  <div className="mt-2">
                    <input type="range" min="1" max="100" className="range" step="1" value={percentage} onChange={changePercentage} required />
                    <div className="w-full flex justify-between text-xs px-2">
                      <span>0%</span>
                      <span>25%</span>
                      <span>50%</span>
                      <span>75%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>

                <div className="col-span-2">
                  <div className="mt-2 relative">
                    <input
                      type="number"
                      name="percentage"
                      id="percentage"
                      min="1"
                      max="100"
                      className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none block w-full rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      aria-describedby="percentage-icon"
                      value={percentage}
                      onChange={changePercentage}
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <span className="text-gray-500 sm:text-sm" id="percentage-icon">
                        %
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button disabled={!write || isLoading} className="mt-6 btn btn-block space-x-2">
              <div className="inline-flex items-center">
                {isLoading ? 'Removing...' :
                  <>
                    <MinusCircleIcon className="w-6 h-6 mr-2" />
                    Remove
                  </>
                }
              </div>
            </button>

            {isSuccess && (
              <div>
                Successfully removed liquidity!
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
      </label >
    </>
  )
}
