import { atom } from "jotai";

import { Coord } from "../coord/Coord";
import { Point } from "../coord/Point";

import { layerTreeAtom, updateLayerAction } from "./layerTreeState";

export const stageCoordAtom = atom<Coord>((get) => {
  const root = get(layerTreeAtom);
  return root.coord;
});

export const moveStageAction = atom(undefined, (get, set, position: Point) => {
  const root = get(layerTreeAtom);

  set(updateLayerAction, root.id, {
    coord: {
      ...root.coord,
      position,
    },
  });
});
