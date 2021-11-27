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

const listProperties = [
  "market_cap_rank",
  "id",
  "name",
  "symbol",
  "current_price",
  "price_change_percentage_24h",
  "market_cap",
  "circulating_supply",
];

const makeBaseTable = (input, listProperties) => {
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

export default function PriceTable({ cryptoList, setCryptoList }) {
  const { get } = useFetch("https://api.coingecko.com/api/v3/");

  const { fiat } = useContext(FiatContext);

  const [market, setMarket] = useState([]);
  const [rows, setRows] = useState([]);
  const [TrackedCrypto, setTrackedCrypto] = useState([]);

  // GET marketData from API
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

  // Create data to send to CryptoSearch
  useEffect(() => {
    const makeList = (input) => {
      let info = input.filter((obj) => obj.market_cap_rank > 5);
      let filtered = [];
      const listProperties = ["id", "name", "symbol"];

      info.forEach((obj) => {
        let newObj = {};
        listProperties.forEach((prop) => {
          newObj[prop] = obj[prop];
        });
        filtered.push(newObj);
      });

      return filtered;
    };

    // @ts-ignore
    if (market.length > 0 && cryptoList.length === 0) {
      setCryptoList(makeList(market));
    }
  }, [market]);

  // Make rows for base table
  useEffect(() => {
    if (market.length > 0) {
      let info = market.filter((obj) => obj.market_cap_rank < 6);
      setRows(makeBaseTable(info, listProperties));
    }
  }, [market, fiat]);

  // Make rows for tracked crypto
  useEffect(() => {
    if (TrackedCrypto.length > 0) {
      let info = [];
      console.log("TrackedCrypto:", TrackedCrypto);
      TrackedCrypto.forEach((id) => {
        let tracked = market.filter((obj) => obj.id === id)[0];
        info.push(tracked);
      });
      console.log({ info });
      console.log("Rows:", rows.concat(makeBaseTable(info, listProperties)));
      // @ts-ignore
      setRows(rows.concat(makeBaseTable(info, listProperties)));
    }
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
