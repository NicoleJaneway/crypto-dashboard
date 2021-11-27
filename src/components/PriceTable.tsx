import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";

import { useState, useEffect, useContext } from "react";
import useFetch from "../helpers/useFetch";
import Loader from "../helpers/Loader";
import { FiatContext } from "../helpers/FiatContext";

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

export default function PriceTable() {
  const [cryptos, setCryptos] = useState([]);
  const [marketData, setMarketData] = useState([]);
  const { get, loading } = useFetch("https://api.coingecko.com/api/v3/");
  const { post } = useFetch("http://localhost:8080/");
  const { fiat } = useContext(FiatContext);
  const [rows, setRows] = useState([]);

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
          setCryptos(data);
        }
      )
      .catch((error) => console.log("Could not load crypto", error));
  }, [fiat]);

  useEffect(() => {
    if (cryptos.length > 0) {
      const makeMarketData = (data) => {
        let info = [];
        info = data.filter((obj) => obj.market_cap_rank > 5);
        return info;
      };
      setMarketData(makeMarketData(cryptos));
    }
  }, [cryptos]);

  useEffect(() => {
    if (marketData.length > 0) {
      post("marketdata", {
        body: marketData,
      }).catch((error) => console.log(error));
    }
  }, [marketData]);

  useEffect(() => {
    const makeTable = (input) => {
      let info = [];
      for (let rank = 0; rank < 5; rank++) {
        let row = createData(
          rank + 1,
          input[rank].id,
          input[rank].name,
          input[rank].symbol,
          input[rank].current_price,
          input[rank].price_change_percentage_24h,
          input[rank].market_cap,
          input[rank].circulating_supply
        );
        info.push(row);
      }
      return info;
    };

    if (cryptos.length > 0) {
      setRows(makeTable(cryptos));
    }
  }, [cryptos, fiat]);

  return (
    <TableContainer component={Paper}>
      {loading && <Loader />}
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <Tooltip
              title="Rank based on market capitalization"
              placement="top-start"
            >
              <TableCell>Rank</TableCell>
            </Tooltip>
            <Tooltip title="Identifier" placement="top-start">
              <TableCell>Name</TableCell>
            </Tooltip>
            <Tooltip
              title="Price against specified fiat currency"
              placement="top-end"
            >
              <TableCell align="right">Price</TableCell>
            </Tooltip>
            <Tooltip title="Percent change within 24 hours" placement="top-end">
              <TableCell align="right">Percent Change</TableCell>
            </Tooltip>
            <Tooltip title="Total value" placement="top-end">
              <TableCell align="right">Market Capitalization</TableCell>
            </Tooltip>
            <Tooltip
              title="Count currently circulating in the market"
              placement="top-end"
            >
              <TableCell align="right">Supply</TableCell>
            </Tooltip>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{row.rank}</TableCell>
              <TableCell component="th" scope="row">
                {row.name + " (" + row.symbol.toUpperCase() + ")"}
              </TableCell>
              <TableCell align="right">
                {Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: fiat,
                }).format(row.price)}
              </TableCell>
              <TableCell align="right">{row.percChange.toFixed(3)}</TableCell>
              <TableCell align="right">
                {Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: fiat,
                  maximumFractionDigits: 0,
                }).format(row.marketCap)}
              </TableCell>
              <TableCell align="right">
                {row.supply.toLocaleString(undefined, {
                  minimumFractionDigits: 3,
                  maximumFractionDigits: 3,
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
