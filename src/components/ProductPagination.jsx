import { Pagination, Stack } from "@mui/material";
import React, { useContext } from "react";
import { ClientContext } from "../contexts/ClientProvider";

const ProductPagination = () => {
  const { totalProductsCount, postsPerPage, currentPage, setCurrentPage } =
    useContext(ClientContext);
  const pagesCount = Math.ceil(totalProductsCount / postsPerPage);
  return (
    <Stack spacing={2}>
      <Pagination
        count={pagesCount}
        page={currentPage}
        size="large"
        sx={{ backgroundColor: "rgb(209,221,221)", borderRadius: "15px", margin: "15px" }}
        onChange={(_, newPage) => {
          setCurrentPage(newPage);
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        }}
      />
    </Stack>
  );
};

export default ProductPagination;
