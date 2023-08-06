import { Box } from "@mui/material";
import { LogsComponent } from "Logs";
import { HumanContainerRaw } from "human/1-raw";
import { HumanContainerMemoized } from "human/2-memoized";
import { HumanContainerMemoizedSplitted } from "human/3-memoized-splitted";
import { HumanContainerMemoizedReactive } from "human/4-memoized-reactive";
import { clearLogs } from "log";
import { useState } from "react";
import s from "./app.module.scss";

const examples = [
  <HumanContainerRaw />,
  <HumanContainerMemoized />,
  <HumanContainerMemoizedSplitted />,
  <HumanContainerMemoizedReactive />,
];

const App = () => {
  const [selectedExampleIdx, setSelectedExampleIdx] = useState(0);
  const selectedExample = examples[selectedExampleIdx];

  const rotateExample = () => {
    setSelectedExampleIdx((state) =>
      state === examples.length - 1 ? 0 : state + 1
    );

    clearLogs();
  };

  return (
    <div className={s.App}>
      <button onClick={rotateExample} style={{ width: "100px" }}>
        rotate example
      </button>
      <Box className={s.wrap}>{selectedExample}</Box>
      <LogsComponent />
    </div>
  );
};

export { App };
