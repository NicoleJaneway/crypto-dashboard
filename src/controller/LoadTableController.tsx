import { useEffect } from "react";
import useFetch from "../helpers/useFetch";

export default function LoadTable({ setTrackedCrypto }): JSX.Element {
  const { get } = useFetch("/");

  useEffect(() => {
    get("checked")
      .then((data) => {
        setTrackedCrypto(data);
      })
      .catch((error) => console.log("Could not load crypto", error));
  });

  return null;
}
