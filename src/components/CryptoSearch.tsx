import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { useState, useEffect } from "react";
import useFetch from "../helpers/useFetch";
import Loader from "../helpers/Loader";

export default function CryptoSearch() {
  const { get, loading } = useFetch("https://api.coingecko.com/api/v3/");
  const [cryptos, setCryptos] = useState([]);
  const [searchedCrypto, setSearchedCrypto] = useState("");

  const searchData = [];

  const handleChange = (event) => {
    setSearchedCrypto(event.target.value);
  };

  useEffect(() => {
    get("coins/list")
      .then((data: string[]) => {
        setCryptos(data);
      })
      .catch((error) => console.log("Could not load crypto", error));
  }, []);

  useEffect(() => {
    console.log(searchedCrypto);
  }, [searchedCrypto]);

  useEffect(() => {
    if (cryptos.length > 0) {
      // searchData.push(
      // cryptos.forEach(console.log(obj));
      // )
    }
  }, [cryptos]);

  return (
    <>
      {loading && <Loader />}
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="fiat-selector"
          label="Select crypto"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          value={searchedCrypto}
          onChange={handleChange}
        />
      </Box>
    </>
  );
}
function obj(obj: any): (value: any, index: number, array: any[]) => void {
  throw new Error("Function not implemented.");
}
