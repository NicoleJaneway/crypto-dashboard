import Button from "@mui/material/Button";
import useFetch from "../helpers/useFetch";

export default function LoadTable({ setTrackedCrypto }): JSX.Element {
  const { get } = useFetch("/");

  const handleClick = () => {
    get("checked")
      .then((data) => {
        setTrackedCrypto(data);
      })
      .catch((error) => console.log("Could not load crypto", error));
  };

  return (
    <div
      style={{
        width: "100%",
        margin: "20px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Button variant="outlined" color="warning" onClick={handleClick}>
        Load Table
      </Button>
    </div>
  );
}
