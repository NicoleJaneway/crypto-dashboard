import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

export default function NewRows({ newRows, fiat }) {
  return (
    <>
      {newRows.map((row) => (
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
    </>
  );
}
