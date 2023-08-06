import { createContext } from "react";

type TContext = {
  waterL: number;
  pastaKg: number;
  saladKg: number;
  eat: (foodType: "pasta" | "salad") => void;
};

export const HumanNeedsContextRaw = createContext({} as TContext);
