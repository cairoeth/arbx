import { useState, useEffect } from "react";

// Fetch price of a token from CryptoCompare
export const usePrice = async (symbol: string) => {
    const [result, setResult] = useState<number>();

    useEffect(() => {
        const api = async () => {
            const data = await fetch('https://min-api.cryptocompare.com/data/price?fsym=' + symbol + '&tsyms=USD&api_key={' + process.env.CRYPTOCOMPARE + '}', {
                method: "GET"
            });
            const jsonData = await data.json();
            setResult(jsonData.USD);
        };

        api();
    }, [symbol]);

    return result
}
