import { atom } from "jotai";

import { DrawOption } from "../layer/DrawOption";

import { pointerStateAtom } from "./pointerState";

/** enable party mode */
export const drawPartyAtom = atom(false);

export const drawOptionAtom = atom((get): DrawOption => {
  const pointer = get(pointerStateAtom);
  const party = get(drawPartyAtom);

  return {
    focusId: pointer.focusLayer,
    selectedId: pointer.selectedLayer,
    boundingOptions: {
      dragAction: pointer.dragAction,
      kind: party ? "party" : "normal",
    },
  };
});
