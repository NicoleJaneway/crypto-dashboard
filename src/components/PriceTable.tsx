import { useContext, useState, useEffect } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

import { FiatContext } from "../helpers/FiatContext";
import useFetch from "../helpers/useFetch";

import TableHead from "./TableHeader";
import Row from "./Row";
import LoadTable from "./LoadTable";

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

interface cryptoData {
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
}

export default function PriceTable({
  cryptoList,
  setCryptoList,
}: {
  cryptoList: string[];
  setCryptoList: React.Dispatch<React.SetStateAction<string[]>>;
}): JSX.Element {
  const { get } = useFetch("https://api.coingecko.com/api/v3/");

  const { fiat } = useContext(FiatContext);

  const [market, setMarket] = useState([]);
  const [baseRows, setBaseRows] = useState([]);
  const [rows, setRows] = useState([]);
  const [TrackedCrypto, setTrackedCrypto] = useState([]);

  // GET marketData from API
  useEffect(() => {
    get(`coins/markets?vs_currency=${fiat}`)
      .then((data: Array<cryptoData>) => {
        setMarket(data);
      })
      .catch((error) => console.log("Could not load crypto", error));
  }, [fiat]);

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
  }, [market, fiat]);

  // Make rows for tracked crypto
  useEffect(() => {
    if (TrackedCrypto.length > 0) {
      let info = [];
      TrackedCrypto.forEach((id) => {
        let tracked = market.filter((obj) => obj.id === id)[0];
        info.push(tracked);
      });
      setRows(baseRows.concat(makeTable(info, listProperties)));
    } else {
      setRows(baseRows);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TrackedCrypto]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead />
          <TableBody>
            {market.length > 0 && rows.map((row) => <Row row={row} />)}
          </TableBody>
        </Table>
      </TableContainer>
      <LoadTable setTrackedCrypto={setTrackedCrypto} />
    </>
  );
}
