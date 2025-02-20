import React, { useContext } from "react";
import { Container, Grid } from "@mui/material";
import CardProduct from "./CardProduct";
import { ClientContext } from "../contexts/ClientProvider";
import { Link } from "react-router-dom";
import ProductPagination from "./ProductPagination";

const Catalogue = () => {
  const { getProducts, products } = useContext(ClientContext);
  React.useEffect(() => {
    getProducts();
  }, []);

  if (!products) {
    return <h2>Loading</h2>;
  }
  return (
    <Container maxWidth="md">
      <div className="container-my">
        <div className="catalogue-products">
          <Grid container spacing={4}>
            {products.map((item) => (
              <Grid key={item.id} item xs={6} sm={4} md={3}>
                <Link to={`/${item.type}/${item.id}`}>
                  <CardProduct item={item} />
                </Link>
              </Grid>
            ))}
          </Grid>
        </div>
        <div className="pagination-container">
          <ProductPagination />
        </div>
      </div>
    </Container>
  );
};

export default Catalogue;
