import { HumanNeedsProviderMemoizedReactive } from "context/human-needs/4-memoized-reactive";
import type { FC } from "react";
import { HumanComponentMemoizedReactive } from "./human.component";

type THumanComponent = {
  [key: string]: unknown;
};

export const HumanContainerMemoizedReactive: FC<THumanComponent> = () => {
  return (
    <HumanNeedsProviderMemoizedReactive>
      <HumanComponentMemoizedReactive />
    </HumanNeedsProviderMemoizedReactive>
  );
};
