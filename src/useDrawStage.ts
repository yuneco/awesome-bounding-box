import { useAtomValue } from "jotai";

import { drawLayer } from "./layer/drawLayer";
import { drawOptionAtom } from "./state/drawOptionState";
import { layerTreeAtom } from "./state/layerTreeState";
import { wrapCtx } from "./utils/wrapCtx";

export const useDrawStage = (ctx?: CanvasRenderingContext2D) => {
  const root = useAtomValue(layerTreeAtom);
  const options = useAtomValue(drawOptionAtom);

  if (!ctx) return;

  wrapCtx(ctx, () => {
    ctx.resetTransform();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawLayer(ctx, root, options);
  });
};
