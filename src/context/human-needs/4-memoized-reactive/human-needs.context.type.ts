import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { TEat } from "./effects";

export type TState = {
  pastaKg: number;
  saladKg: number;
  waterL: number;
};

export type TSelectors = {
  foodCombined: number;
};

export type TSetters = {
  setPastaKg: Dispatch<SetStateAction<number>>;
  setSaladKg: Dispatch<SetStateAction<number>>;
  setWaterL: Dispatch<SetStateAction<number>>;
};

export type TReactive = MutableRefObject<{
  state: TState;
  selectors: TSelectors;
  setters: TSetters;
}>;

export type TContext = {
  pastaKg: TState["pastaKg"];
  saladKg: TState["saladKg"];
  waterL: TState["waterL"];
  eat: TEat;
};
