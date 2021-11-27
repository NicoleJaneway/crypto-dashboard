import FiatSelector from "./FiatSelector";
import PriceTable from "./PriceTable";
import CryptoSearch from "./CryptoSearch";

import useFetch from "../helpers/useFetch";


export default function Dashboard() {
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
      <PriceTable />
    </>
  );
}
