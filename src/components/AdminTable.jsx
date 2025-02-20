import * as React from "react";
import { AdminContext } from "../contexts/AdminProvider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import EditProduct from "./EditProduct";
import Bin from "../images/bin (1).png";
import Edit from "../images/editing (1).png";

export default function AdminTable() {
  const {
    getAdminProducts,
    adminProducts,
    deleteAdminProduct,
    saveEditedProduct,
  } = React.useContext(AdminContext);

  React.useEffect(() => {
    getAdminProducts();
  }, []);

  const [editProduct, setEditProduct] = React.useState(null);

  if (!adminProducts) {
    return <h2>Loading...</h2>;
  }

  if (editProduct) {
    return (
      <EditProduct
        editProduct={editProduct}
        setEditProduct={setEditProduct}
        getAdminProducts={getAdminProducts}
      />
    );
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
            <TableCell align="center">Vip Chapter Price</TableCell>
            <TableCell align="center">#</TableCell>
            <TableCell align="center">#</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {adminProducts.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                <img width="120px" src={row.image} alt="im" />
              </TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.type}</TableCell>
              <TableCell align="center">
                {row.genres.map((item) => {
                  return `${item}, `;
                })}
              </TableCell>
              <TableCell align="center">{row.year}</TableCell>
              <TableCell align="center">{row.vipPrice} KGS</TableCell>
              <TableCell align="center">
                <Button
                  onClick={() => {
                    setEditProduct(row);
                  }}
                >
                  <img width="30px" src={Edit} alt="dfs" />
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button
                  onClick={() => {
                    deleteAdminProduct(row.id);
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
}
