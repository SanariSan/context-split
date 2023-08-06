import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { HumanNeedsContextMemoizedSplitted } from "./human-needs.context";
import { eatEffect } from "./effects";
import { drinkSideEffect } from "./side-effects";

export const HumanNeedsProviderMemoizedSplitted = ({
  children,
}: {
  children: ReactNode;
}) => {
  const mountedRef = useRef(false);

  const [pastaKg, setPastaKg] = useState(5);
  const [saladKg, setSaladKg] = useState(5);
  const [waterL, setWaterL] = useState(5);

  const drinkSplitted = useCallback(
    () => drinkSideEffect(setWaterL, mountedRef.current)(),
    []
  );
  useEffect(drinkSplitted, [drinkSplitted, saladKg, pastaKg]);

  const eat = useCallback(
    (foodType: "salad" | "pasta") =>
      eatEffect(setSaladKg, setPastaKg)(foodType),
    []
  );

  useEffect(() => {
    mountedRef.current = true;
    return () => void (mountedRef.current = false);
  }, []);

  return (
    <HumanNeedsContextMemoizedSplitted.Provider
      value={{
        waterL,
        pastaKg,
        saladKg,
        eat,
      }}
    >
      {children}
    </HumanNeedsContextMemoizedSplitted.Provider>
  );
};
