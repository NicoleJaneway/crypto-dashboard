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
  name: string,
  price: number,
  percChange: number,
  marketCap: number,
  supply: number
) {
  return { rank, name, price, percChange, marketCap, supply };
}

export default function PriceTable() {
  const [cryptos, setCryptos] = useState([]);
  const { get, loading } = useFetch("https://api.coingecko.com/api/v3/");
  const { fiat } = useContext(FiatContext);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    get(`coins/markets?vs_currency=${fiat}`)
      .then((data: string[]) => {
        console.log(data);
        setCryptos(data);
      })
      .catch((error) => console.log("Could not load crypto", error));
  }, []);

  useEffect(() => {
    console.log(fiat);
  }, [fiat]);

  useEffect(() => {
    if (cryptos.length > 0) {
      setRows([
        createData(
          1,
          cryptos[0].id,
          cryptos[0].current_price,
          cryptos[0].price_change_percentage_24h,
          cryptos[0].market_cap,
          cryptos[0].circulating_supply
        ),
      ]);
    }
  }, [cryptos]);

  return (
    <TableContainer component={Paper}>
      {loading && <Loader />}
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>Name</TableCell>
            <Tooltip
              title="Price of the cryptocurrency against the specified fiat currency"
              placement="top-start"
            >
              <TableCell align="right">Price</TableCell>
            </Tooltip>
            <Tooltip
              title="Percent change of the price within 24 hours"
              placement="top-start"
            >
              <TableCell align="right">Percent Change</TableCell>
            </Tooltip>
            <TableCell align="right">Market Capitalization</TableCell>
            <TableCell align="right">Supply</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{row.rank}</TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.percChange}</TableCell>
              <TableCell align="right">{row.marketCap}</TableCell>
              <TableCell align="right">{row.supply}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
