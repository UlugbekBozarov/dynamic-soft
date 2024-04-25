import { TableFooter } from "@mui/material";

import TablePagingRow from "../paging/TablePagingRow";

const Footer = ({ dataLength, colSpan }: any) => {
  return (
    <TableFooter>
      <TablePagingRow dataLength={dataLength} colSpan={colSpan} />
    </TableFooter>
  );
};

export default Footer;
