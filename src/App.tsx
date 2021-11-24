import React from "react";

import FiatSelector from "./components/FiatSelector";
import PriceTable from "./components/PriceTable";
import CryptoSearch from "./components/CryptoSearch";

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
