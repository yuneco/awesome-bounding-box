import { useAtomValue, useSetAtom } from "jotai";

import { moveStageAction, stageCoordAtom } from "../state/stageCoordState";

import { Slider } from "./Slider";

export const CoordControls = () => {
  const stageCoord = useAtomValue(stageCoordAtom);
  const moveStage = useSetAtom(moveStageAction);

  const moveX = (x: number) => moveStage({ x, y: stageCoord.position.y });
  const moveY = (y: number) => moveStage({ x: stageCoord.position.x, y });

  return (
    <div>
      <Slider
        label="x"
        min={-200}
        max={200}
        value={stageCoord.position.x}
        onChange={moveX}
      />
      <Slider
        label="y"
        min={-200}
        max={200}
        value={stageCoord.position.y}
        onChange={moveY}
      />
    </div>
  );
};
