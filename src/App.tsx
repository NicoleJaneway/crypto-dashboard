import React from "react";

import logo from "./img/logo512.png";

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
        <div style={{ display: "grid", gridTemplateColumns: "3em auto" }}>
          <img
            src={logo}
            alt="crypto logo"
            style={{ height: "2em", margin: "0.67em", alignSelf: "start" }}
          />
          <h1
            style={{
              alignSelf: "start",
              marginTop: "0.2em",
              marginLeft: "0.2em",
            }}
          >
            Crypto Dashboard
          </h1>
        </div>
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
