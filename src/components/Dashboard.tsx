import { useState, useEffect, useContext } from "react";

import FiatSelector from "./FiatSelector";
import PriceTable from "./PriceTable";
import CryptoSearch from "./CryptoSearch";

import useFetch from "../helpers/useFetch";
import { FiatContext } from "../helpers/FiatContext";

function createData(
  rank: number,
  id: string,
  name: string,
  symbol: string,
  price: number,
  percChange: number,
  marketCap: number,
  supply: number
) {
  return { rank, id, name, symbol, price, percChange, marketCap, supply };
}

export default function Dashboard() {
  const { get } = useFetch("https://api.coingecko.com/api/v3/");
  const { fiat } = useContext(FiatContext);
  const [market, setMarket] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    get(`coins/markets?vs_currency=${fiat}`)
      .then(
        (
          data: {
            id: string;
            symbol: string;
            name: string;
            image: string;
            current_price: number;
            market_cap: number;
            market_cap_rank: number;
            fully_diluted_valuation: number;
            total_volume: number;
            high_24h: number;
            low_24h: number;
            price_change_24h: number;
            price_change_percentage_24h: number;
            market_cap_change_24h: number;
            market_cap_change_percentage_24h: number;
            circulating_supply: number;
            total_supply: number;
            max_supply: number;
            ath: number;
            ath_change_percentage: number;
            ath_date: string;
            atl: number;
            atl_change_percentage: number;
            atl_date: string;
            roi: {
              times: number;
              currency: string;
              percentage: number;
            };
            last_updated: number;
          }[]
        ): void => {
          setMarket(data);
        }
      )
      .catch((error) => console.log("Could not load crypto", error));
  }, [fiat]);

  useEffect(() => {
    const makeTable = (input) => {
      let info = [];
      for (let rank = 0; rank < 5; rank++) {
        let row = createData(
          rank + 1,
          input[rank].id,
          input[rank].name,
          input[rank].symbol,
          input[rank].current_price,
          input[rank].price_change_percentage_24h,
          input[rank].market_cap,
          input[rank].circulating_supply
        );
        info.push(row);
      }
      return info;
    };

    if (market.length > 0) {
      setRows(makeTable(market));
      //   console.log(makeTable(market));
    }
  }, [market, fiat]);

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto auto",
        }}
      >
        <div></div>
        <div style={{ justifySelf: "end" }}>
          <CryptoSearch />
        </div>
        <div style={{ justifySelf: "end" }}>
          <FiatSelector />
        </div>
      </div>
      <PriceTable rows={rows} />
    </>
  );
}
