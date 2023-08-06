import { log } from "log";
import { TReactive } from "../human-needs.context.type";
// import { drinkEffect } from "./drink.effect";

export const eatEffect =
  (reactive: TReactive) => (foodType: "salad" | "pasta") => {
    const {
      setters: { setSaladKg, setPastaKg, setWaterL },
      state: { pastaKg, saladKg, waterL },
      selectors: { foodCombined },
    } = reactive.current;

    log(`Food combined: ${foodCombined}`);

    switch (foodType) {
      case "salad": {
        if (saladKg <= 0) {
          log("No salad left");
          return;
        }

        log("eating 1kg of salad");
        setSaladKg((saladKg) => saladKg - 1);
        break;
      }
      case "pasta": {
        if (pastaKg <= 0) {
          log("No pasta left");
          return;
        }

        log("eating 1kg of pasta");
        setPastaKg((pastaKg) => pastaKg - 1);
        break;
      }
      default: {
        // ...
      }
    }

    log("Don't forget to drink!");

    // now can even check water state from snapshot
    if (waterL <= 0) {
      log("no more water left");
      return;
    }

    // or even get fresh snapshot in case water amount changed in bg
    const {
      state: { waterL: waterLCurr },
    } = reactive.current;

    if (waterLCurr <= 0) {
      log("no more water left");
      return;
    }

    log("Drinking inline...");

    // finally mutate the state
    setWaterL((waterL) => waterL - 1);

    // or even better - split all the logic in separate effect and call in hierarchy
    // drinkEffect(reactive)();
  };

type TEatEffect = typeof eatEffect;
export type TEat = ReturnType<TEatEffect>;
