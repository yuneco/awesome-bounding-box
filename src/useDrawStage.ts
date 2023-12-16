import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

import { wrapCtx } from "./canvasUtils/wrapCtx";
import { drawLayer } from "./layer/drawLayer";
import {
  frameNoAtom,
  startAnimationAtom,
  stopAnimationAtom,
} from "./state/animationState";
import { drawOptionAtom } from "./state/drawOptionState";
import { layerTreeAtom } from "./state/layerTreeState";

const useAnimation = (on: boolean) => {
  const startAnim = useSetAtom(startAnimationAtom);
  const stopAnim = useSetAtom(stopAnimationAtom);
  useEffect(() => {
    on ? startAnim() : stopAnim();
    return () => stopAnim();
  }, [on, startAnim, stopAnim]);

  // make dependency on frameNoAtom to redraw when frameNo is updated.
  useAtomValue(frameNoAtom);
};

export const useDrawStage = (ctx?: CanvasRenderingContext2D) => {
  const root = useAtomValue(layerTreeAtom);
  const options = useAtomValue(drawOptionAtom);
  useAnimation(options.selectedId !== undefined);

  if (!ctx) return;

  wrapCtx(ctx, () => {
    ctx.resetTransform();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawLayer(ctx, root, options);
  });
};
