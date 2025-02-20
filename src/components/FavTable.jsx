import * as React from "react";
import { ClientContext } from "../contexts/ClientProvider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import Bin from "../images/bin (1).png";

const FavTable = () => {
  const { getFavorite, favorite, deleteFavorite } =
    React.useContext(ClientContext);
  React.useEffect(() => {
    getFavorite();
  }, []);

  if (!favorite) {
    return <h2>У вас нет избранных</h2>;
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Image</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Type</TableCell>
            <TableCell align="center">Genres</TableCell>
            <TableCell align="center">Year</TableCell>
            <TableCell align="center">Rate</TableCell>
            <TableCell align="center">#</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {favorite.products.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                <img width="120px" src={row.product.image} alt="im" />
              </TableCell>
              <TableCell align="center">{row.product.name}</TableCell>
              <TableCell align="center">{row.product.type}</TableCell>
              <TableCell align="center">
                {row.product.genres &&
                  row.product.genres.length &&
                  row.product.genres.map((item) => {
                    return `${item}, `;
                  })}
              </TableCell>
              <TableCell align="center">{row.product.year}</TableCell>
              <TableCell align="center">{`${row.product.rate.map(
                (item) => `${item.rateAvg} / ${item.rateAmount}`
              )}`}</TableCell>
              <TableCell align="center">
                <Button
                  onClick={() => {
                    deleteFavorite(row.product.id);
                  }}
                >
                  <img width="30px" src={Bin} alt="df" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FavTable;
