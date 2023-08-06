import { log } from "log";
import { TReactive } from "../human-needs.context.type";

export const drinkEffect = (reactive: TReactive) => () => {
  const {
    setters: { setWaterL },
    state: { waterL },
  } = reactive.current;

  if (waterL <= 0) {
    log("no more water left");
    return;
  }

  log("Drinking from effect...");

  setWaterL((waterL) => waterL - 1);
};

export type TDrinkEffect = typeof drinkEffect;
export type TDrink = ReturnType<TDrinkEffect>;
