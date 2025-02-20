import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function MySelect({ handleInput, iden, change, prod }) {
  const [age, setAge] = React.useState("");
  React.useEffect(() => {
    iden === "edit" ? setAge(prod) : console.log("E");
  }, [prod]);

  const handleChange = (event) => {
    setAge(event.target.value);
    if (iden === "edit") {
      change(event);
      console.log(prod.type);
    } else {
      handleInput(event);
    }
  };

  return (
    <Box sx={{ minWidth: 120, mt: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          name="type"
          label="Type"
          onChange={handleChange}
          sx={{
            border: "1px solid rgb(176,176,176)",
            color: "rgb(117,117,117)",
          }}
          InputLabelProps={{ color: "rgb(117,117,117)" }}
        >
          <MenuItem value={"manga"}>Manga</MenuItem>
          <MenuItem value={"manhwa"}>Manhwa</MenuItem>
          <MenuItem value={"manhua"}>Manhua</MenuItem>
          <MenuItem value={"rumanga"}>Rumanga</MenuItem>
          <MenuItem value={"westComic"}>West Comics</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
