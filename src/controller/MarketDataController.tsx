import { useContext, useState, useEffect } from "react";

import { FiatContext } from "../helpers/FiatContext";
import useFetch from "../helpers/useFetch";

import MarketDataModel from "../model/MarketDataModel";
import { cryptoData } from "../types";

export default function MarketDataController({
  cryptoList,
  setCryptoList,
}: {
  cryptoList: string[];
  setCryptoList: React.Dispatch<React.SetStateAction<string[]>>;
}): JSX.Element {
  const { get } = useFetch("https://api.coingecko.com/api/v3/");
  const { fiat } = useContext(FiatContext);

  const [market, setMarket] = useState<cryptoData[]>([]);

  useEffect(() => {
    get(`coins/markets?vs_currency=${fiat}`)
      .then((data: cryptoData[]) => {
        setMarket(data);
      })
      .catch((error) => console.log("Could not load crypto", error));
  }, [fiat]);

  return (
    <MarketDataModel
      market={market}
      cryptoList={cryptoList}
      setCryptoList={setCryptoList}
    />
  );
}
