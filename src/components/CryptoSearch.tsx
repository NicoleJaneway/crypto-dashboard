import { useState, useEffect } from "react";
import useFetch from "../helpers/useFetch";

import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CryptoSearch({ cryptos }) {
  const { get } = useFetch("http://localhost:8080/");
  const { post, del } = useFetch("http://localhost:8080/");
  const [checkedCrypto, setCheckedCrypto] = useState([]);

  const handleSelection = (event, values) => {
    let ids = values.map((value) => value.id);
    setCheckedCrypto(values.map((value) => value.id));
    console.log({ ids });
    let diff = ids.filter((x) => !checkedCrypto.includes(x));
    console.log("1: ", diff);
    if (checkedCrypto.filter((x) => !ids.includes(x)).length > 0) {
      checkedCrypto
        .filter((x) => !ids.includes(x))
        .forEach((element) => diff.push(element));
      console.log("2: ", diff);
    }
    if (values.length > 0 && values.length > checkedCrypto.length) {
      post("checked", {
        coin: diff,
      });
      console.log("POST ", diff);
    } else {
      let len = 0;
      diff.forEach((el) => (len += 1));
      console.log("length ", len);
      if (diff.length === 1) {
        console.log("DELETE ", diff);
      } else if (diff.length > 1) {
        console.log("DELETE EVERYTHING");
      }
    }
  };

  useEffect(() => {
    console.log("outside function: ", checkedCrypto);
  }, [checkedCrypto]);

  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "35ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Autocomplete
          multiple
          id="search-crypto"
          options={cryptos || []}
          onChange={handleSelection}
          getOptionLabel={(option) => option.name}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.name + " (" + option.symbol.toUpperCase() + ")"}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select cryptocurrencies to track"
              placeholder=""
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
        />
      </Box>
    </>
  );
}
