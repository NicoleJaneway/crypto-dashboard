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

export default function CryptoSearch({ cryptos }): JSX.Element {
  const [checkedCrypto, setCheckedCrypto] = useState([]);
  const { post, del } = useFetch("http://localhost:8080/");

  const handleSelection = (event, values) => {
    let ids = values.map((value) => value.id);
    setCheckedCrypto(values.map((value) => value.id));
    let diff = ids.filter((x) => !checkedCrypto.includes(x));
    console.log("1: ", diff);
    if (checkedCrypto.filter((x) => !ids.includes(x)).length > 0) {
      checkedCrypto
        .filter((x) => !ids.includes(x))
        .forEach((element) => diff.push(element));
      console.log("2: ", diff);
    }
    if (values.length > 0 && values.length > checkedCrypto.length) {
      let postCoin = diff[0];
      post("checked", {
        coin: postCoin,
      });
      console.log("POST ", diff);
    } else {
      let len = 0;
      diff.forEach((el) => (len += 1));
      console.log("length ", len);
      if (diff.length === 1) {
        let delCoin = diff[0];
        del("checked", {
          coin: delCoin,
        });
        console.log("DELETE ", diff);
      } else if (diff.length > 1) {
        del("checked/clear", {});
        console.log("DELETE EVERYTHING");
      }
    }
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "75ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Autocomplete
          multiple
          disableCloseOnSelect
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
