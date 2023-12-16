import { Coord } from "../coord/Coord";
import { Size } from "../coord/Size";

export type Layer = {
  readonly id: string;
  readonly coord: Coord;
  readonly size: Size;
  readonly children: Layer[];
  clip: boolean;
  color: string;
};

const DEFAULT_LAYER: Layer = {
  id: "root",
  coord: { position: { x: 0, y: 0 }, scale: 1, angle: 0 },
  size: { width: 100, height: 100 },
  children: [],
  clip: true,
  color: "powderblue",
};

export const createLayer = (layer: Partial<Layer>, id?: string): Layer => {
  const size = layer.size ?? DEFAULT_LAYER.size;
  const center = { x: size.width / 2, y: size.height / 2 };
  const coord = {
    ...DEFAULT_LAYER.coord,
    ...layer.coord,
    anchor: layer.coord?.anchor ?? center,
  };
  return {
    ...DEFAULT_LAYER,
    ...layer,
    coord,
    id: id || crypto.randomUUID(),
  };
};
