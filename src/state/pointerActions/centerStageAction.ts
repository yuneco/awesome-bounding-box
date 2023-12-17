import { atom } from "jotai";

import { Size, scaleSize } from "../../coord/Size";
import { layerTreeAtom, updateLayerAction } from "../layerTreeState";

/**
 * move root layer to center of screen.
 * @param stageSize stage size. (= canvas size)
 */
export const centerStageAction = atom(
  undefined,
  (get, set, stageSize: Size) => {
    if (stageSize.width < 1 || stageSize.height < 1) return;

    const tree = get(layerTreeAtom);

    const currentSize = scaleSize(tree.size, tree.coord.scale);

    const position = {
      x: (stageSize.width - currentSize.width) / 2,
      y: (stageSize.height - currentSize.height) / 2,
    };

    set(updateLayerAction, tree.id, {
      coord: {
        ...tree.coord,
        position,
      },
    });
  }
);
