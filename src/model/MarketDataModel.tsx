import { useState, useEffect } from "react";

import PriceTable from "../view/PriceTable";
import { cryptoData, rowData } from "../types";

const listProperties: string[] = [
  "market_cap_rank",
  "id",
  "name",
  "symbol",
  "current_price",
  "price_change_percentage_24h",
  "market_cap",
  "circulating_supply",
];

const makeTable = (input, listProperties) => {
  let filtered = [];

  input.forEach((obj) => {
    let newObj = {};
    listProperties.forEach((prop) => {
      newObj[prop] = obj[prop];
    });
    filtered.push(newObj);
  });

  return filtered;
};

export default function MarketDataModel({
  market,
  cryptoList,
  setCryptoList,
}: {
  market: cryptoData[];
  cryptoList: string[];
  setCryptoList: React.Dispatch<React.SetStateAction<string[]>>;
}): JSX.Element {
  const [baseRows, setBaseRows] = useState<rowData[]>([]);
  const [rows, setRows] = useState<rowData[]>([]);
  const [TrackedCrypto, setTrackedCrypto] = useState<string[]>([]);

  // Create data to send to CryptoSearch
  useEffect(() => {
    if (market.length > 0 && cryptoList.length === 0) {
      let info = market.filter((obj) => obj.market_cap_rank > 5);
      setCryptoList(makeTable(info, ["id", "name", "symbol"]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [market]);

  // Make rows for base table
  useEffect(() => {
    if (market.length > 0) {
      let info = market.filter((obj) => obj.market_cap_rank < 6);
      setBaseRows(makeTable(info, listProperties));
      setRows(makeTable(info, listProperties));
    }
  }, [market]);

  // Make rows for tracked crypto
  useEffect(() => {
    if (market.length > 0 && TrackedCrypto.length > 0) {
      let info = [];
      TrackedCrypto.forEach((name) => {
        let tracked = market.filter((obj) => obj.name === name)[0];
        info.push(tracked);
      });
      setRows(baseRows.concat(makeTable(info, listProperties)));
    } else {
      setRows(baseRows);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TrackedCrypto]);

  return <PriceTable rows={rows} setTrackedCrypto={setTrackedCrypto} />;
}
