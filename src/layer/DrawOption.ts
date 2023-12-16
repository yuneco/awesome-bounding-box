import { BoundingDrawOption } from "./boundingBox/boundingDrawOption";

export type DrawOption = Partial<{
  focusId: string;
  selectedId: string;
  boundingOptions: BoundingDrawOption;
}>;
