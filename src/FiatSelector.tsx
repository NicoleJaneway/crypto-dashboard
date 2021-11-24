import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function FiatSelector() {

    // component="form"
    // sx={{
    //   '& > :not(style)': { m: 1, width: '25ch' },
    // }}
    // noValidate
    // autoComplete="off"
  

  return (
    <Box>
      <TextField
        id="fiat-selector"
        label="Enter fiat currency code"
        variant="outlined"
      />
    </Box>
  );
}
