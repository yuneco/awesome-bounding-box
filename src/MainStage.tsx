import { css } from "@kuma-ui/core";
import { PointerEvent } from "react";

import { dom2canvasPoint } from "./coord/CanvasCoord";
import { Point } from "./coord/Point";
import { useFullCanvas } from "./FullCanvas";

const baseStyle = css`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const drawCircle = (ctx: CanvasRenderingContext2D, pos: Point) => {
  ctx.beginPath();
  ctx.arc(pos.x, pos.y, 10, 0, 2 * Math.PI);
  ctx.fill();
};

export const MainStage = () => {
  const stage = useFullCanvas();

  const onDown = (ev: PointerEvent<HTMLDivElement>) => {
    console.log(ev.clientX, ev.clientY);
    const ctx = stage.ctx;
    if (!ctx) return;
    const canvasP = dom2canvasPoint({
      x: ev.nativeEvent.offsetX,
      y: ev.nativeEvent.offsetY,
    });
    drawCircle(ctx, canvasP);
  };

  return (
    <div className={baseStyle} onPointerDown={onDown}>
      {stage.element}
    </div>
  );
};
