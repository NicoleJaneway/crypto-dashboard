import { useState, useEffect, useContext } from "react";

import FiatSelector from "./FiatSelector";
import PriceTable from "./PriceTable";
import CryptoSearch from "./CryptoSearch";

export default function Dashboard(): JSX.Element {
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
