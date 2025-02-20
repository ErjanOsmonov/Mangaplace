import React, { useEffect } from "react";
import { Container, TextField, Button } from "@mui/material";
import { AdminContext } from "../contexts/AdminProvider";
import MySelect from "./MySelect";

const AddProduct = () => {
  const { createProduct } = React.useContext(AdminContext);
  const [product, setProduct] = React.useState({
    name: "",
    description: "",
    type: "",
    vipPrice: "",
    image: "",
    year: "",
  });
  
  const handleInput = (event) => {
    let object = {
      ...product,
      [event.target.name]: event.target.value,
    };

    setProduct(object);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    for (let key in product) {
      if (!product[key].trim) {
        alert("Fill all the fields");
        return;
      }
    }

    createProduct(product);

    setProduct({
      name: "",
      description: "",
      type: product.type,
      vipPrice: "",
      image: "",
      year: "",
    });
  };

  return (
    <Container maxWidth="xs">
      <div className="add-container">
        <div className="add-product_title">
          <h2>Create</h2>
        </div>
        <TextField
          sx={{ borderBottom: "1px solid rgb(176,176,176  )" }}
          InputLabelProps={{
            style: {
              color: "rgb(117,117,117)",
            },
          }}
          inputProps={{
            style: { color: "rgb(117,117,117)" },
          }}
          onChange={handleInput}
          name="name"
          fullWidth
          label="Name"
          variant="standard"
          value={product.name}
        />
        <TextField
          sx={{ borderBottom: "1px solid rgb(176,176,176  )" }}
          InputLabelProps={{
            style: { color: "rgb(117,117,117)" },
          }}
          inputProps={{
            style: { color: "rgb(117,117,117)" },
          }}
          onChange={handleInput}
          name="image"
          fullWidth
          label="Image"
          variant="standard"
          value={product.image}
        />
        <TextField
          sx={{ borderBottom: "1px solid rgb(176,176,176  )" }}
          InputLabelProps={{
            style: { color: "rgb(117,117,117)" },
          }}
          inputProps={{
            style: { color: "rgb(117,117,117)" },
          }}
          onChange={handleInput}
          name="description"
          fullWidth
          label="Desription"
          variant="standard"
          value={product.description}
        />
        <TextField
          sx={{ borderBottom: "1px solid rgb(176,176,176  )" }}
          InputLabelProps={{
            style: { color: "rgb(117,117,117)" },
          }}
          inputProps={{
            style: { color: "rgb(117,117,117)" },
          }}
          onChange={handleInput}
          name="year"
          fullWidth
          label="Year"
          variant="standard"
          value={product.year}
        />
        <TextField
          sx={{ borderBottom: "1px solid rgb(176,176,176  )" }}
          InputLabelProps={{
            style: { color: "rgb(117,117,117)" },
          }}
          inputProps={{
            style: { color: "rgb(117,117,117)" },
          }}
          onChange={handleInput}
          name="vipPrice"
          fullWidth
          label="Vip Price"
          variant="standard"
          type="number"
          min="1"
          value={product.vipPrice}
        />
        <MySelect handleInput={handleInput} sx={{input:{color: "white"}}}/>
        <Button
          onClick={handleSubmit}
          variant="outlined"
          color="primary"
          sx={{ mt: 2 }}
          fullWidth
        >
          Send
        </Button>
      </div>
    </Container>
  );
};

export default AddProduct;
