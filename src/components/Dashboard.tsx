import { useState, useEffect, useContext } from "react";

import FiatSelector from "./FiatSelector";
import PriceTable from "./PriceTable";
import CryptoSearch from "./CryptoSearch";


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
  const [cryptoList, setCryptoList] = useState([]);

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
          <CryptoSearch cryptos={cryptoList} />
        </div>
        <div style={{ justifySelf: "end" }}>
          <FiatSelector />
        </div>
      </div>
      <PriceTable cryptoList={cryptoList} setCryptoList={setCryptoList} />
    </>
  );
}
