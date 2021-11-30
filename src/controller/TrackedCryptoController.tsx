import { useState } from "react";
import useFetch from "../helpers/useFetch";

import { cryptoListData } from "../types";
import CryptoSearch from "../view/CryptoSearch";

export default function TrackedCryptoController({
  cryptoList,
}: {
  cryptoList: cryptoListData[];
}): JSX.Element {
  const [checkedCrypto, setCheckedCrypto] = useState<string[]>([]);
  const { post, del } = useFetch("/");

  const handleSelection = (event: object, values: any) => {
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
    <CryptoSearch cryptoList={cryptoList} handleSelection={handleSelection} />
  );
}
