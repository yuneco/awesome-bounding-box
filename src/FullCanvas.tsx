import { css } from "@kuma-ui/core";
import { useEffect, useRef } from "react";

import { DPR } from "./coord/DPR";
import { Size } from "./coord/Size";
import useElementSize from "./utils/useElementSize";

const baseStyle = css`
  width: 400px;
  height: 300px;
  position: absolute;
  top: 0;
  left: 0;
  //  outline: 1px solid #000;
`;

const setCanavasSize = (canvas: HTMLCanvasElement, size: Size) => {
  canvas.width = size.width * DPR;
  canvas.height = size.height * DPR;
};

export const useFullCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasSize = useElementSize(canvasRef);

  const canvas = canvasRef.current;
  const ctx = canvas?.getContext("2d") ?? undefined;

  useEffect(() => {
    if (!canvas) return;
    setCanavasSize(canvas, canvasSize);
  }, [canvas, canvasSize]);

  const element = <canvas ref={canvasRef} className={baseStyle}></canvas>;
  return { element, ctx, size: canvasSize };
};
