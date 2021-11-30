import logo from "../img/logo512.png";

import Typography from "@mui/material/Typography";
import Toggle from "../helpers/Toggle";

export default function Header(): JSX.Element {
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "3em auto auto",
          alignContent: "start",
        }}
      >
        <img
          src={logo}
          alt="crypto logo"
          style={{ height: "2em", margin: "0.67em", alignSelf: "start" }}
        />
        <Typography
          variant="h4"
          component="div"
          sx={{
            alignSelf: "start",
            marginTop: "0.2em",
            marginLeft: "0.2em",
            color: "text.primary",
          }}
        >
          Crypto Dashboard
        </Typography>
        <Toggle />
      </div>
      <hr />
    </>
  );
}
