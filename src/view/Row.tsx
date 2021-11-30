import { useContext } from "react";

import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

import { FiatContext } from "../helpers/FiatContext";

export default function Row({ row }): JSX.Element {
  const { fiat } = useContext(FiatContext);

  return (
    <>
      <TableRow
        key={row.id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell align="left">{row.market_cap_rank}</TableCell>
        <TableCell component="th" scope="row">
          {row.name + " (" + row.symbol.toUpperCase() + ")"}
        </TableCell>
        <TableCell align="right">
          {Intl.NumberFormat("en-US", {
            style: "currency",
            currency: fiat,
          }).format(row.current_price)}
        </TableCell>
        <TableCell align="right">
          {row.price_change_percentage_24h.toFixed(3)}
        </TableCell>
        <TableCell align="right">
          {Intl.NumberFormat("en-US", {
            style: "currency",
            currency: fiat,
            maximumFractionDigits: 0,
          }).format(row.market_cap)}
        </TableCell>
        <TableCell align="right">
          {row.circulating_supply.toLocaleString(undefined, {
            minimumFractionDigits: 3,
            maximumFractionDigits: 3,
          })}
        </TableCell>
      </TableRow>
    </>
  );
}
