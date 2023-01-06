import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./selectDropDown.scss";

const SelectDropDown = ({ option, setOption, list }) => {
  const handleChange = (event) => {
    setOption(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 220, backgroundColor: "#3B3B3B", outline: "none" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Seasons</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={option}
          label="Seasons"
          onChange={handleChange}
        >
          {list.map((item, index) => {
            return (
              <MenuItem value={item._id} key={index}>
                {item.title}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectDropDown;
