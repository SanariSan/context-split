import { TState } from "../human-needs.context.type";

export const foodCombinedSelector =
  ({
    pastaKg,
    saladKg,
  }: {
    pastaKg: TState["pastaKg"];
    saladKg: TState["saladKg"];
  }) =>
  () => {
    return pastaKg + saladKg;
  };

export type TFoodCombinedSelector = typeof foodCombinedSelector;
export type TFoodCombined = ReturnType<ReturnType<TFoodCombinedSelector>>;
