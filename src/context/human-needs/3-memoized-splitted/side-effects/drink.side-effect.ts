import { log } from "log";

export const drinkSideEffect =
  (
    setWaterL: (value: React.SetStateAction<number>) => void,
    isMounted: boolean
  ) =>
  () => {
    if (!isMounted) return;
    log("Drinking as a side effect...");
    setWaterL((waterL) => waterL - 1);
  };
