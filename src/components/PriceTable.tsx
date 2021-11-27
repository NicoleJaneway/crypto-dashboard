import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";

import { FiatContext } from "../helpers/FiatContext";
import { useContext } from "react";

export default function PriceTable({ rows }) {
  const { fiat } = useContext(FiatContext);

  return (
    <TableContainer component={Paper}>
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
