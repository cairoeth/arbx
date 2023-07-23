import { Assets } from "components/dashboard/assets"
import { Chart as ChartJS, ArcElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline"
import { useContractRead, useContractReads, useAccount, erc20ABI, useNetwork } from 'wagmi'
import { contracts, stringToColour, hexToRgbA } from 'components/helpers/contracts'
import { ethers } from "ethers";

type Props = {
  data: any
  isError: boolean
  isLoading: boolean
}

ChartJS.register(ArcElement);

const pieOptions = {
  cutout: '90%',
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      enabled: false
    },
  },
};

function useAvailableAssets(wrappers: any, address: any) {
  var availableAssets: any = []
  var wrapperContracts: any = []
  var underlyingContracts: any = []
  const chunkSize = 3;
  var totalUSD = 0
  var APY = 7.7

  // for (var i = 0; i < wrappers?.length; ++i) {
  //   const wrapperIndividual: any = {
  //     address: wrappers[i],
  //     abi: contracts.wrapper.abi,
  //     functionName: 'wrapped',
  //   }

  //   wrapperContracts.push(wrapperIndividual)
  // }

  // const getAllUnderlying: any = useContractReads({
  //   contracts: wrapperContracts,
  //   onError(error) {
  //     console.log('Error', error)
  //   },
  // })

  // for (var i = 0; i < getAllUnderlying.data?.length; ++i) {
  //   const underlingIndividual_symbol: any = {
  //     address: getAllUnderlying.data[i],
  //     abi: erc20ABI,
  //     functionName: 'symbol',
  //   }

  //   const underlingIndividual_balanceOf: any = {
  //     address: getAllUnderlying.data[i],
  //     abi: erc20ABI,
  //     functionName: 'balanceOf',
  //     args: [address],
  //   }

  //   const underlingIndividual_decimals: any = {
  //     address: getAllUnderlying.data[i],
  //     abi: erc20ABI,
  //     functionName: 'decimals',
  //   }

  //   underlyingContracts.push(underlingIndividual_symbol, underlingIndividual_balanceOf, underlingIndividual_decimals)
  // }

  // const underlyingData: any = useContractReads({
  //   contracts: underlyingContracts,
  //   onError(error) {
  //     console.log('Error', error)
  //   },
  // })

  // for (let i = 0; i < underlyingData.data?.length; i += chunkSize) {
  //   const chunk: any = underlyingData.data.slice(i, i + chunkSize);

  //   if (chunk[0] == null) {
  //     continue
  //   }

  //   const balance: any = ethers.utils.formatUnits(chunk[1], chunk[2])

  //   if (balance > 0) {
  //     const amountUSD: any = balance * 1

  //     availableAssets.push({
  //       symbol: chunk[0],
  //       // address: tokens[i].address,
  //       image: "https://generative-placeholders.glitch.me/image?width=600&height=300&img=" + chunk[0],
  //       amount: balance,
  //       amountUSD: amountUSD.toFixed(2),
  //     })

  //     totalUSD += amountUSD
  //   } else {
  //     continue
  //   }
  // }

  return {
    assets: availableAssets,
    worth: String(totalUSD.toFixed(2)),
    APY: String(APY),
    yield: String(((APY / 100) * totalUSD).toFixed(2)),
  }
}

function useStakedAssets(wrappers: any, address: any) {
  var stakedAssets: any = []
  var wrapperContracts: any = []
  const chunkSize = 3;
  var totalUSD = 0
  var APY = 8.7

  for (var i = 0; i < wrappers?.length; ++i) {
    const wrapperIndividual_symbol: any = {
      address: wrappers[i],
      abi: erc20ABI,
      functionName: 'symbol',
    }

    const wrapperIndividual_balanceOf: any = {
      address: wrappers[i],
      abi: erc20ABI,
      functionName: 'balanceOf',
      args: [address],
    }

    const wrapperIndividual_decimals: any = {
      address: wrappers[i],
      abi: erc20ABI,
      functionName: 'decimals',
    }

    wrapperContracts.push(wrapperIndividual_symbol, wrapperIndividual_balanceOf, wrapperIndividual_decimals)
  }

  const wrappersData: any = useContractReads({
    contracts: wrapperContracts,
    onError(error) {
      console.log('Error', error)
    },
  })

  for (let i = 0; i < wrappersData.data?.length; i += chunkSize) {
    const chunk: any = wrappersData.data.slice(i, i + chunkSize);

    if (chunk[0] == null) {
      continue
    }

    const balance: any = ethers.utils.formatUnits(chunk[1], chunk[2])

    if (balance > 0) {
      const amountUSD: any = balance * 1

      stakedAssets.push({
        symbol: chunk[0],
        // address: tokens[i].address,
        image: "https://generative-placeholders.glitch.me/image?width=600&height=300&img=" + chunk[0],
        amount: balance,
        amountUSD: amountUSD.toFixed(2),
        color: hexToRgbA(stringToColour(chunk[0]))
      })

      totalUSD += amountUSD
    } else {
      continue
    }
  }

  return {
    assets: stakedAssets,
    worth: String(totalUSD.toFixed(2)),
    APY: String(APY),
    yield: String(((APY / 100) * totalUSD).toFixed(2)),
  }
}

export function Portfolio() {
  var pieValues = []
  var pieColors = []

  const { address, isConnecting, isDisconnected } = useAccount()
  const { chain, chains } = useNetwork()

  const allWrappersCall: Props = useContractRead({
    address: contracts['beacon']['address'][chain?.name as keyof typeof contracts['beacon']['address']] as `0x${string}`,
    abi: contracts.beacon.abi,
    functionName: 'supportedTokens',
  })

  const availableAssets: any = useAvailableAssets(allWrappersCall.data, address)
  const stakedAssets: any = useStakedAssets(allWrappersCall.data, address)

  const totalWorth: any = (parseFloat(availableAssets.worth) + parseFloat(stakedAssets.worth)).toFixed(2)
  let availablePercentrage: any = ((parseFloat(availableAssets.worth) / totalWorth) * 100).toFixed(2)
  let stakedPercentage: any = ((parseFloat(stakedAssets.worth) / totalWorth) * 100).toFixed(2)

  for (var i = 0; i < stakedAssets.assets.length; ++i) {
    // Calculate the token percentage of the total worth
    const assetPercentage: any = ((parseFloat(stakedAssets.assets[i].amountUSD) / totalWorth) * 100).toFixed(2)

    // Add the token percentage to the doughnut chart
    pieValues.push(assetPercentage)

    // Add the token color to the doughnut chart
    pieColors.push(stakedAssets.assets[i].color)

    // Assign the percentage to the asset.
    stakedAssets.assets[i].percentage = assetPercentage
  }

  for (var i = 0; i < availableAssets.assets.length; ++i) {
    // Calculate the token percentage of the total worth
    const assetPercentage: any = ((parseFloat(availableAssets.assets[i].amountUSD) / totalWorth) * 100).toFixed(2)

    // Assign the percentage to the asset.
    availableAssets.assets[i].percentage = assetPercentage
  }

  // Add unstaked percentage
  pieValues.push(availablePercentrage.toString())
  // Add unstaked color
  pieColors.push('rgba(189, 195, 199, 1)')

  if (isNaN(availablePercentrage as number) || isNaN(stakedPercentage as number)) {
    availablePercentrage = 0
    stakedPercentage = 0

    pieValues.push('100')
    pieColors.push('rgba(189, 195, 199, 0.25)')
  }

  const pieData = {
    datasets: [
      {
        data: pieValues,
        backgroundColor: pieColors,
        borderWidth: 0,
      },
    ],
  };

  const fontUrl = 'https://fonts.cdnfonts.com/s/15051/Segoe%20UI.woff'
  const segoeUI = new FontFace('Segoe UI', `url(${fontUrl})`);
  var piePlugins: any = []

  segoeUI.load().then((font: FontFace) => {
    // This is required
    document.fonts.add(font);

    const plugin = {
      id: 'textinside',
      beforeDraw: function (chart: any) {
        var width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
        ctx.restore();

        var text1 = "Total assets"
        var text2 = "$" + totalWorth
        var text3 = "APY " + ((parseFloat(availableAssets.APY) + parseFloat(stakedAssets.APY)) / 2).toString() + "%"
        var textY = height / 1.75;
        ctx.textAlign = 'left';

        ///////////// TEXT 1 /////////////
        ctx.font = (height / 300).toFixed(2) + `rem '${font.family}'`;
        ctx.fillText(text1, Math.round((width - ctx.measureText(text1).width) / 2), textY - (0.4 * textY));

        ///////////// TEXT 2 /////////////
        ctx.font = "bold " + (height / 100).toFixed(2) + `rem '${font.family}'`;
        ctx.fillText(text2, Math.round((width - ctx.measureText(text2).width) / 2), textY - 3);

        ///////////// TEXT 3 /////////////
        ctx.font = (height / 300).toFixed(2) + `rem '${font.family}'`;
        ctx.fillText(text3, Math.round((width - ctx.measureText(text3).width) / 2), textY + (0.25 * textY));

        ctx.save();
      }
    }

    piePlugins.push(plugin)
  });

  return (
    <div className="card bg-base-100 shadow-xl mb-10 mt-6">
      <div className="card-body">
        <h2 className="card-title">
          <ClipboardDocumentCheckIcon className="w-6 h-6" />
          Your Portfolio
        </h2>
        <div className="overflow-x-auto max-h-min pb-8">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-2 max-h-[90%] place-self-center">
              <Doughnut options={pieOptions} data={pieData} plugins={piePlugins} />
            </div>
            <div>
              <Assets title='Added liquidity' percentage={stakedPercentage} worth={stakedAssets.worth} APY={stakedAssets.APY} _yield={stakedAssets.yield} assets={stakedAssets.assets} />
            </div>
            <div>
              <Assets title='Available liquidity' percentage={availablePercentrage} worth={availableAssets.worth} APY={availableAssets.APY} _yield={availableAssets.yield} assets={availableAssets.assets} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
