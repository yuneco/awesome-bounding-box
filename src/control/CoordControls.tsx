import { k } from "@kuma-ui/core";
import { atom, useAtom, useSetAtom } from "jotai";

import { findLayerById } from "../layer/findLayerById";
import { createLayer } from "../layer/Layer";
import { drawPartyAtom } from "../state/drawOptionState";
import { addLayerAction, layerTreeAtom } from "../state/layerTreeState";
import { pointerStateAtom } from "../state/pointerState";
import { captureCanvas } from "../utils/captureCanvas";
import { randomBetween } from "../utils/randomBetween";

import { BaseButton } from "./Button";

const extractSelectedLayerAction = atom(undefined, (get, set) => {
  const pointer = get(pointerStateAtom);
  if (pointer.selectedLayer === undefined) return;
  const root = get(layerTreeAtom);
  return findLayerById(root, pointer.selectedLayer);
});

const addNewLayerAction = atom(undefined, (get, set) => {
  const parent = set(extractSelectedLayerAction);
  const maxW = parent?.size.width ?? 300;
  const maxH = parent?.size.height ?? 300;
  const maxX = parent ? parent.size.width * 0.7 : 400;
  const maxY = parent ? parent.size.height * 0.7 : 300;

  const size = {
    width: randomBetween(100, maxW),
    height: randomBetween(100, maxH),
  };

  const position = {
    x: randomBetween(0, maxX),
    y: randomBetween(0, maxY),
  };

  set(
    addLayerAction,
    parent?.id,
    createLayer({
      size,
      coord: {
        position,
        scale: 1,
        angle: randomBetween(-30, 30),
      },
      color: "silver",
    })
  );
});

export const CoordControls = () => {
  const addLayer = useSetAtom(addNewLayerAction);
  const [party, setParty] = useAtom(drawPartyAtom);

  return (
    <k.div display="flex" gap={8} p={8}>
      <BaseButton onClick={addLayer}>Add Layer</BaseButton>
      <BaseButton onClick={captureCanvas}>Download Canvas</BaseButton>
      <k.label cursor="pointer">
        <k.input
          type="checkbox"
          checked={party}
          onChange={(ev) => setParty(ev.currentTarget.checked)}
        />
        PARTY MODE
      </k.label>
    </k.div>
  );
};
