import React from "react";
import "./App.css";

import FiatSelector from "./FiatSelector";
import PriceTable from "./PriceTable";
import CryptoSearch from "./CryptoSearch";

function App() {
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
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
      <PriceTable />
    </>
  );
}

export default App;
