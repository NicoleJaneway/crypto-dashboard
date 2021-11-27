import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Tooltip from "@mui/material/Tooltip";

export default function TableHeader() {
  return (
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
  );
}
