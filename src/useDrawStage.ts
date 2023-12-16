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
import { layerTreeAtom, treeVersionAtom } from "./state/layerTreeState";
import {
  imagesAtom,
  loadImageAction,
} from "./state/pointerActions/layerImageState";

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

const useLayerImage = () => {
  const version = useAtomValue(treeVersionAtom);
  const loadImage = useSetAtom(loadImageAction);
  useEffect(loadImage, [version, loadImage]);
  useEffect(loadImage, []);

  const images = useAtomValue(imagesAtom);
  return images;
};

export const useDrawStage = (ctx?: CanvasRenderingContext2D) => {
  const root = useAtomValue(layerTreeAtom);
  const options = useAtomValue(drawOptionAtom);
  useAnimation(options.selectedId !== undefined);
  useLayerImage();

  if (!ctx) return;

  const draw = () => {
    wrapCtx(ctx, () => {
      ctx.resetTransform();
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      drawLayer(ctx, root, options);
    });
  };

  draw();
};
