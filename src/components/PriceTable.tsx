import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";

function createData(
  name: string,
  price: number,
  marketCap: number,
  dayVol: number,
  fearFactor: number
) {
  return { name, price, marketCap, dayVol, fearFactor };
}

const rows = [
  createData("Bitcoin", 159, 6.0, 24, 4.0),
  createData("Ethereumh", 237, 9.0, 37, 4.3),
  createData("Tether", 262, 16.0, 24, 6.0),
  createData("XRP", 305, 3.7, 67, 4.3),
  createData("Bitcoin Cash", 356, 16.0, 49, 3.9),
];

export default function PriceTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <Tooltip
              title="Price of the cryptocurrency against the specified fiat currency"
              placement="top-start"
            >
              <TableCell align="right">Price</TableCell>
            </Tooltip>
            <TableCell align="right">Market Capitalization</TableCell>
            <TableCell align="right">24 Hr Volume</TableCell>
            <TableCell align="right">Fear Factor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.marketCap}</TableCell>
              <TableCell align="right">{row.dayVol}</TableCell>
              <TableCell align="right">{row.fearFactor}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
