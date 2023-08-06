import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { TEat, eatEffect } from "./effects";
import { HumanNeedsContextMemoizedReactive } from "./human-needs.context";
import { TFoodCombined, foodCombinedSelector } from "./selectors";
import { TState } from "./human-needs.context.type";

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

  const reactive = useRef({
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
  });

  useEffect(() => {
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
  }, [pastaKg, saladKg, waterL, foodCombined]);

  // --- effects

  const eat: TEat = useCallback((...args) => eatEffect(reactive)(...args), []);
  // const walk: TEat = useCallback((...args) => walkEffect(reactive)(...args), []);
  // const etc: TEat = useCallback((...args) => etcEffect(reactive)(...args), []);

  return (
    <HumanNeedsContextMemoizedReactive.Provider
      value={{
        waterL,
        pastaKg,
        saladKg,
        eat,
      }}
    >
      {children}
    </HumanNeedsContextMemoizedReactive.Provider>
  );
};
