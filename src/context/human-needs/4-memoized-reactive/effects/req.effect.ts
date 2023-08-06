import { log } from "log";
import { TReactive } from "../human-needs.context.type";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const reqEffect =
  (reactive: TReactive) =>
  async ({ signal }: { signal: AbortSignal }) => {
    const {
      setters: { setWaterL },
    } = reactive.current;

    await fetch("https://example.com", { signal })
      .catch((e) => {
        if (e.name === "AbortError") log("req error: aborted");
        else log("req error:  other type, probably cors");
      })
      .then(() => sleep(2000));

    if (signal.aborted) {
      log("aborted any further state mutations");
      return;
    }

    log("Refilling water from req");
    setWaterL(10);
  };

export type TReqEffect = typeof reqEffect;
export type TReq = ReturnType<TReqEffect>;
