import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

import TableHead from "./TableHeader";
import Row from "./Row";
import LoadTable from "../controller/LoadTableController";
import { rowData } from "../types";

export default function PriceTable({
  rows,
  setTrackedCrypto,
}: {
  rows: rowData[];
  setTrackedCrypto: React.Dispatch<React.SetStateAction<string[]>>;
}): JSX.Element {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead />
          <TableBody>
            {rows?.map((row) => (
              <Row row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <LoadTable setTrackedCrypto={setTrackedCrypto} />
    </>
  );
}
