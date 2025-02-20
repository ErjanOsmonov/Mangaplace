import { Button, Container, Input, TextField } from "@mui/material";
import React from "react";
import { AdminContext } from "../contexts/AdminProvider";
import MySelect from "./MySelect";

const EditProduct = ({ editProduct, setEditProduct, getAdminProducts }) => {
  const [product, setProduct] = React.useState(editProduct);
  const { saveEditedProduct } = React.useContext(AdminContext);

  const handleChange = (event) => {
    let object = {
      ...product,
      [event.target.name]: event.target.value,
    };
    setProduct(object);
  };

  const handleClick = (event) => {
    saveEditedProduct(product);
    setEditProduct(null);
  };

  const [genres, setGenres] = React.useState(product.genres);

  React.useEffect(() => {
    setProduct({ ...product, genres });
  }, [genres]);

  const handleGenreSubmit = (event) => {
    event.preventDefault();
    let genre = document.getElementById("input-genre").value;
    setGenres([...genres, genre]);
    setProduct({
      ...product,
      genres: genres,
    });
    document.getElementById("input-genre").value = "";
  };

  const deleteGenre = (genre) => {
    let newGenres = [...genres];
    let result = newGenres.filter((item) => {
      return item !== genre;
    });
    setGenres(result);
    setProduct({ ...product, genres: genres });
  };

  React.useEffect(() => {
    getAdminProducts();
  }, [genres]);

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <Container maxWidth="md">
      <TextField
        name="image"
        label="Image"
        fullWidth
        sx={{ mt: 2 }}
        value={product.image}
        onChange={handleChange}
      ></TextField>
      <TextField
        name="name"
        label="Name"
        fullWidth
        sx={{ mt: 2 }}
        value={product.name}
        onChange={handleChange}
      ></TextField>
      <MySelect iden="edit" change={handleChange} prod={product.type} />
      <TextField
        name="description"
        label="Description"
        fullWidth
        sx={{ mt: 2 }}
        value={product.description}
        onChange={handleChange}
      ></TextField>
      <TextField
        name="year"
        label="Year"
        type="number"
        fullWidth
        sx={{ mt: 2 }}
        value={product.year}
        onChange={handleChange}
      ></TextField>
      <TextField
        name="vipPrice"
        label="Vip Chapter Price"
        type="number"
        min="1"
        fullWidth
        sx={{ mt: 2 }}
        value={product.vipPrice}
        onChange={handleChange}
      ></TextField>
      <div>
        <div className="genres-box">
          {genres ? (
            genres.map((item) => (
              <div key={item} className="genre-item">
                <p>{item}</p>
                <button
                  onClick={() => {
                    deleteGenre(item);
                  }}
                >
                  &#10006;
                </button>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <form onSubmit={handleGenreSubmit}>
          <input
            id="input-genre"
            type="text"
            placeholder="Press Enter to add"
          />
        </form>
      </div>
      <Button
        onClick={handleClick}
        color="primary"
        sx={{ mt: 2, padding: 1 }}
        fullWidth
        variant="outlined"
      >
        Save
      </Button>
    </Container>
  );
};

export default EditProduct;
