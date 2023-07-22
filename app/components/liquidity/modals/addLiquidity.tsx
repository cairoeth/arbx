import * as React from 'react'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useNetwork
} from 'wagmi'
import useDebounce from 'components/helpers/useDebounce'
import { contracts } from 'components/helpers/contracts'

export function AddLiquidityModal() {
  const [address, setAddress] = React.useState('')
  const { chain, chains } = useNetwork()
  const debouncedAddress = useDebounce(address)

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: contracts['controller']['address'][chain?.name as keyof typeof contracts['controller']['address']] as `0x${string}`,
    abi: contracts.controller.abi,
    functionName: 'addModule',
    args: [debouncedAddress],
    enabled: Boolean(debouncedAddress),
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
      <input type="checkbox" id="add-module-modal" className="modal-toggle" />
      <label htmlFor="add-module-modal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">Add Liquidity</h3>
          <p className="py-4">Add liquidity amount to a arbitrage beacon. You must approve your tokens and then call the beacon.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              write?.()
            }}
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Amount of USDC</span>
              </label>
              <label className="input-group">
                <input
                  id="address"
                  type="text"
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="0x0"
                  className="input input-bordered w-full"
                  value={address}
                  required
                />
              </label>
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
