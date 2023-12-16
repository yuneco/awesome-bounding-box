import { Layer } from "./Layer";

export const findLayerById = (root: Layer, id: string): Layer | undefined => {
  if (root.id === id) return root;
  for (const child of root.children) {
    const layer = findLayerById(child, id);
    if (layer) return layer;
  }
};

export const findLayerPathById = (
  root: Layer,
  id: string
): Layer[] | undefined => {
  if (root.id === id) return [root];
  for (const child of root.children) {
    const path = findLayerPathById(child, id);
    if (path) return [root, ...path];
  }
  return undefined;
};

export const findLayerParentById = (
  root: Layer,
  id: string
): Layer | undefined => {
  const path = findLayerPathById(root, id);
  if (path) {
    return path[path.length - 2];
  }
};
