import { log } from "log";

export const eatEffect =
  (
    setSaladKg: (value: React.SetStateAction<number>) => void,
    setPastaKg: (value: React.SetStateAction<number>) => void
  ) =>
  (foodType: "salad" | "pasta") => {
    switch (foodType) {
      case "salad": {
        log("eating 1kg of salad");
        setSaladKg((saladKg) => saladKg - 1);
        break;
      }
      case "pasta": {
        log("eating 1kg of pasta");
        setPastaKg((pastaKg) => pastaKg - 1);
        break;
      }
      default: {
        // ...
      }
    }

    log("Don't forget to drink!");
  };

type TEatEffect = typeof eatEffect;
export type TEat = ReturnType<TEatEffect>;
