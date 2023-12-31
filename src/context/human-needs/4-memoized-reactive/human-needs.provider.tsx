import { ReactNode, useCallback, useMemo, useRef, useState } from "react";
import { TEat, TReq, eatEffect, reqEffect } from "./effects";
import { HumanNeedsContextMemoizedReactive } from "./human-needs.context";
import { TReactive, TState } from "./human-needs.context.type";
import { TFoodCombined, foodCombinedSelector } from "./selectors";

export const HumanNeedsProviderMemoizedReactive = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [pastaKg, setPastaKg] = useState<TState["pastaKg"]>(5);
  const [saladKg, setSaladKg] = useState<TState["saladKg"]>(5);
  const [waterL, setWaterL] = useState<TState["waterL"]>(5);

  // --- selectors

  const foodCombined: TFoodCombined = useMemo(
    () => foodCombinedSelector({ pastaKg, saladKg })(),
    [pastaKg, saladKg]
  );

  // --- reactive setup

  const reactive = useRef({}) as TReactive;
  reactive.current = {
    state: {
      pastaKg,
      saladKg,
      waterL,
    },
    selectors: {
      foodCombined,
    },
    setters: {
      setPastaKg,
      setSaladKg,
      setWaterL,
    },
  };

  // --- effects

  const eat: TEat = useCallback((...args) => eatEffect(reactive)(...args), []);
  const req: TReq = useCallback((...args) => reqEffect(reactive)(...args), []);
  // const etc: TEat = useCallback((...args) => etcEffect(reactive)(...args), []);

  return (
    <HumanNeedsContextMemoizedReactive.Provider
      value={{
        waterL,
        pastaKg,
        saladKg,
        req,
        eat,
      }}
    >
      {children}
    </HumanNeedsContextMemoizedReactive.Provider>
  );
};
