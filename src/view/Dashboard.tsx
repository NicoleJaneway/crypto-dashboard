import { useState } from "react";

import FiatSelector from "./FiatSelector";
import TrackedCryptoController from "../controller/TrackedCryptoController";
import MarketDataController from "../controller/MarketDataController";

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
          <TrackedCryptoController cryptoList={cryptoList} />
        </div>
        <div style={{ justifySelf: "end" }}>
          <FiatSelector />
        </div>
      </div>
      <MarketDataController
        cryptoList={cryptoList}
        setCryptoList={setCryptoList}
      />
    </>
  );
}
