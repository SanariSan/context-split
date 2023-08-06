import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { HumanNeedsContextMemoized } from "./human-needs.context";
import { log } from "log";

export const HumanNeedsProviderMemoized = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [pastaKg, setPastaKg] = useState(5);
  const [saladKg, setSaladKg] = useState(5);
  const [waterL, setWaterL] = useState(5);

  const mountedRef = useRef(false);

  const drink = useCallback(() => {
    log("Drinking as a side effect...");
    setWaterL((waterL) => waterL - 1);
  }, []);

  useEffect(() => {
    if (!mountedRef.current) return;
    drink();
  }, [drink, saladKg, pastaKg]);

  const eat = useCallback((foodType: "salad" | "pasta") => {
    switch (foodType) {
      case "salad": {
        log("eating 1kg of salad");
        setSaladKg((saladKg) => saladKg - 1);
        break;
      }
      case "pasta": {
        log("eating 1kg of pasta");
        setPastaKg((pastaKg) => pastaKg - 1);
        break;
      }
      default: {
        // ...
      }
    }

    log("Don't forget to drink!");
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    return () => void (mountedRef.current = false);
  }, []);

  return (
    <HumanNeedsContextMemoized.Provider
      value={{
        waterL,
        pastaKg,
        saladKg,
        eat,
      }}
    >
      {children}
    </HumanNeedsContextMemoized.Provider>
  );
};
