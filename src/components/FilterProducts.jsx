import { Button, Container, TextField } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClientContext } from "../contexts/ClientProvider";

const FilterProducts = () => {
  let search = new URLSearchParams(window.location.search);
  let navigate = useNavigate();
  const { getProducts } = useContext(ClientContext);

  // const [fromRate, setFromRate] = React.useState("");
  // const [toRate, setToRate] = React.useState("");

  const [value, setValue] = React.useState("");

  function filter(key, value) {
    search.set(key, value);
    const newPath = `${window.location.pathname}?${search.toString()}`;
    navigate(newPath);
    // setFromRate(search.get("rate_gte"));
    // setToRate(search.get("rate_lte"));
    setValue(search.get("q"));
    getProducts();
  }

  function reset() {
    navigate("/search");
    getProducts();
    // setFromRate("");
    // setToRate("");
    setValue("");
  }

  useEffect(() => {
    // setFromRate(search.get("rate_gte"));
    // setToRate(search.get("rate_lte"));
    setValue(search.get("q"));
  }, []);

  return (
    <Container maxWidth="md">
      <div className="filter-container">
        <span className="title-block">
          <p className="catalogue-title">Catalogue</p>
        </span>
        <div className="filter-products">
          {/* <div className="rate-filter">
            <TextField
              onChange={(event) => filter("rate_gte", event.target.value)}
              variant="standard"
              color="primary"
              sx={{
                background: "rgb(26, 26, 26)",
                borderRadius: "5px",
                mr: 1,
                pl: "1px",
                border: "1px solid rgb(59, 61, 69)",
                color: "rgb(117, 117, 117)",
              }}
              inputProps={{
                style: { color: "rgb(117,117,117)", padding: "5px" },
              }}
              InputLabelProps={{
                style: { color: "rgb(117,117,117)", padding: "3px" },
              }}
              label="От"
              className="rate-input"
              value={fromRate}
            />
            <TextField
              onChange={(event) => filter("rate_lte", event.target.value)}
              variant="standard"
              label="До"
              InputLabelProps={{
                style: { color: "rgb(117,117,117)", padding: "3px" },
              }}
              inputProps={{
                style: { color: "rgb(117,117,117)", padding: "5px" },
              }}
              sx={{
                background: "rgb(26,26,26)",
                borderRadius: "5px",
                border: "1px solid rgb(59, 61, 69)",
              }}
              className="rate-input"
              value={toRate}
            />
            <Button onClick={reset}>Reset</Button>
          </div> */}
          <div className="filter-search">
            <TextField
              onChange={(event) => filter("q", event.target.value)}
              variant="outlined"
              InputLabelProps={{
                style: { color: "rgb(117,117,117)" },
              }}
              inputProps={{
                style: { color: "rgb(117,117,117)" },
              }}
              sx={{
                background: "rgb(26,26,26)",
                border: "1px solid rgb(59, 61, 69)",
              }}
              label="Live search..."
              fullWidth
              value={value}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default FilterProducts;
