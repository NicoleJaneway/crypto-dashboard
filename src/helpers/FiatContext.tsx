import { useState, createContext } from "react";

interface IFiatContext {
  fiat: string;
  setFiat: (fiat: string) => void;
}

const defaultFiat = {
  fiat: "USD",
  setFiat: (fiat: string) => {},
};

export const FiatContext = createContext<IFiatContext>(defaultFiat);

export function FiatProvider(props) {
  const [fiat, setFiat] = useState(defaultFiat.fiat);

  return (
    <FiatContext.Provider value={{ fiat, setFiat }}>
      {props.children}
    </FiatContext.Provider>
  );
}
