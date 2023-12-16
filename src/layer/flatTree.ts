import { Layer } from "./Layer";

export const flatTree = (tree: Layer): Layer[] => {
  const layers: Layer[] = [tree];
  for (const child of tree.children) {
    layers.push(...flatTree(child));
  }
  return layers;
};
