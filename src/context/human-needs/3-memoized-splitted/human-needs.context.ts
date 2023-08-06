import { createContext } from "react";
import { TEat } from "./effects";

type TContext = {
  waterL: number;
  pastaKg: number;
  saladKg: number;
  eat: TEat;
};

export const HumanNeedsContextMemoizedSplitted = createContext({} as TContext);
