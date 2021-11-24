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
  marketCap: number,
  dayVol: number,
  supply: number
) {
  return { rank, name, price, marketCap, dayVol, supply };
}

const rows = [
  createData(1, "Bitcoin", 159, 6.0, 24, 4.0),
  createData(2, "Ethereumh", 237, 9.0, 37, 4.3),
  createData(3, "Tether", 262, 16.0, 24, 6.0),
  createData(4, "XRP", 305, 3.7, 67, 4.3),
  createData(5, "Bitcoin Cash", 356, 16.0, 49, 3.9),
];

export default function PriceTable() {
  const [cryptos, setCryptos] = useState([]);
  const { get, loading } = useFetch("https://demo.firebaseio.com/");
  const { fiat, setFiat } = useContext(FiatContext);

  useEffect(() => {
    // get("crypto.json")
    //   .then((data) => {
    //     setCryptos(data);
    //   })
    //   .catch((error) => console.log("Could not load crypto", error));
  }, []);

  useEffect(() => {
    console.log(fiat);
  }, [fiat]);

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
            <TableCell align="right">Market Capitalization</TableCell>
            <TableCell align="right">24 Hr Volume</TableCell>
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
              <TableCell align="right">{row.marketCap}</TableCell>
              <TableCell align="right">{row.dayVol}</TableCell>
              <TableCell align="right">{row.supply}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
