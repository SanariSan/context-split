import { HumanNeedsProviderRaw } from "context/human-needs/1-raw";
import type { FC } from "react";
import { HumanComponentRaw } from "./human.component";

type THumanComponent = {
  [key: string]: unknown;
};

export const HumanContainerRaw: FC<THumanComponent> = () => {
  return (
    <HumanNeedsProviderRaw>
      <HumanComponentRaw />
    </HumanNeedsProviderRaw>
  );
};
