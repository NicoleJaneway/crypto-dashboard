import { useState, useEffect } from "react";
import useFetch from "../helpers/useFetch";

import { cryptoListData } from "../types";
import CryptoSearch from "../view/CryptoSearch";

export default function TrackedCryptoController({
  cryptoList,
}: {
  cryptoList: cryptoListData[];
}): JSX.Element {
  const [checkedCrypto, setCheckedCrypto] = useState<string[]>([]);
  const [display, setDisplay] = useState<
    { name: string; symbol: string; id: string }[]
  >([]);
  const { get, post, del } = useFetch("http://localhost:80/");

  useEffect(() => {
    get("checked")
      .then((data: string[]) => {
        setCheckedCrypto(data);
        console.log(data);
        const input = [];
        data.forEach((crypto: string) => {
          const obj: { name: string } = { name: crypto };
          input.push(obj);
        });
        setDisplay(input);
      })
      .catch((error) => console.log("Could not load crypto", error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelection = (event: object, values: any) => {
    let ids = values.map((value) => value.name);
    setDisplay(
      values.map((value) => ({
        name: value.name,
        symbol: value.symbol,
        id: value.id,
      }))
    );
    setCheckedCrypto(values.map((value) => value.name));
    let diff = ids.filter((x) => !checkedCrypto.includes(x));
    if (checkedCrypto.filter((x) => !ids.includes(x)).length > 0) {
      checkedCrypto
        .filter((x) => !ids.includes(x))
        .forEach((element) => diff.push(element));
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
    <CryptoSearch
      cryptoList={cryptoList}
      handleSelection={handleSelection}
      display={display}
    />
  );
}
