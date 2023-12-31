import { css } from "@kuma-ui/core";
import { useSetAtom } from "jotai";
import { PointerEvent, useEffect, useRef } from "react";

import { DPR } from "./coord/DPR";
import { useFullCanvas } from "./FullCanvas";
import { centerStageAction } from "./state/pointerActions/centerStageAction";
import { pointerActions } from "./state/pointerActions/defaultPointerActions";
import { useDrawStage } from "./useDrawStage";
import { createPointerThrottle } from "./utils/pointerThrottle";

const baseStyle = css`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

export const MainStage = () => {
  const stage = useFullCanvas();
  const throttle = useRef(createPointerThrottle(DPR));
  const onMove = useSetAtom(pointerActions.onMoveAction);
  const onDown = useSetAtom(pointerActions.onDownAction);
  const onUp = useSetAtom(pointerActions.onUpAction);

  const handleMove = (ev: PointerEvent<HTMLElement>) => {
    if (!throttle.current(ev)) return;
    onMove(ev);
  };

  const fitCenter = useSetAtom(centerStageAction);
  const stageW = stage.size.width;
  const stageH = stage.size.height;
  useEffect(
    () => fitCenter({ width: stageW, height: stageH }),
    [stageW, stageH, fitCenter]
  );

  useDrawStage(stage.ctx);

  return (
    <div
      className={baseStyle}
      onPointerMove={handleMove}
      onPointerDown={onDown}
      onPointerUp={onUp}
    >
      {stage.element}
    </div>
  );
};
