import { BoundingBoxKind } from "./BoundingBoxKind";

export type BoundingDrawOption = Partial<{
  kind: BoundingBoxKind;
  dragAction: "move" | "resize" | "rotate" | "none";
}>;
