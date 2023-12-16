import { atom } from "jotai";

import { DrawOption } from "../layer/DrawOption";

import { pointerStateAtom } from "./pointerState";

export const drawOptionAtom = atom((get): DrawOption => {
  const pointer = get(pointerStateAtom);
  return {
    focusId: pointer.focusLayer,
    selectedId: pointer.selectedLayer,
  };
});
