import { Box } from "@mui/material";
import { HumanNeedsContextRaw } from "context/human-needs/1-raw";
import { log } from "log";
import type { FC } from "react";
import { useContext, useEffect, useRef, useState } from "react";

type THumanComponent = {
  [key: string]: unknown;
};

const statesOfTheDay: ["night", "morning", "evening"] = [
  "night",
  "morning",
  "evening",
];

export const HumanComponentRaw: FC<THumanComponent> = () => {
  const eatCounter = useRef(0);
  const { saladKg, pastaKg, waterL, eat } = useContext(HumanNeedsContextRaw);
  const [stateOfTheDayIdx, setStateOfTheDayIdx] = useState(0);
  const stateOfTheDay = statesOfTheDay[stateOfTheDayIdx];

  const rotateTime = () => {
    setStateOfTheDayIdx((stateOfTheDayIdx) =>
      stateOfTheDayIdx === statesOfTheDay.length - 1 ? 0 : stateOfTheDayIdx + 1
    );
  };

  useEffect(() => {
    if (eatCounter.current >= 20) {
      log("we are dead");
      return;
    }

    if (stateOfTheDay === "morning") {
      eat("salad");
    } else if (stateOfTheDay === "evening") {
      eat("pasta");
    } else {
      // ... sleep ...
    }

    eatCounter.current += 1;
  }, [stateOfTheDay, eat]);

  return (
    <Box>
      RAW
      <br />
      {stateOfTheDay} | salad: {saladKg} | pasta: {pastaKg} | water: {waterL}
      <br />
      <button onClick={rotateTime}>rotate time of the day</button>
    </Box>
  );
};
