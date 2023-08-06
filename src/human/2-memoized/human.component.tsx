import { Box } from "@mui/material";
import { HumanNeedsContextMemoized } from "context/human-needs/2-memoized";
import type { FC } from "react";
import { useContext, useEffect, useState } from "react";

type THumanComponent = {
  [key: string]: unknown;
};

const statesOfTheDay: ["night", "morning", "evening"] = [
  "night",
  "morning",
  "evening",
];

export const HumanComponentMemoized: FC<THumanComponent> = () => {
  const { saladKg, pastaKg, waterL, eat } = useContext(
    HumanNeedsContextMemoized
  );
  const [stateOfTheDayIdx, setStateOfTheDayIdx] = useState(0);
  const stateOfTheDay = statesOfTheDay[stateOfTheDayIdx];

  const rotateTime = () => {
    setStateOfTheDayIdx((stateOfTheDayIdx) =>
      stateOfTheDayIdx === statesOfTheDay.length - 1 ? 0 : stateOfTheDayIdx + 1
    );
  };

  useEffect(() => {
    if (stateOfTheDay === "morning") {
      eat("salad");
    } else if (stateOfTheDay === "evening") {
      eat("pasta");
    } else {
      // ... sleep ...
    }
  }, [stateOfTheDay, eat]);

  return (
    <Box>
      MEMO
      <br />
      {stateOfTheDay} | salad: {saladKg} | pasta: {pastaKg} | water: {waterL}
      <br />
      <button onClick={rotateTime}>rotate time of the day</button>
    </Box>
  );
};
