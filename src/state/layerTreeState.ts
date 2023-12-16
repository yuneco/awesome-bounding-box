import { atom } from "jotai";

import { findLayerById, findLayerParentById } from "../layer/findLayerById";
import { Layer, createLayer } from "../layer/Layer";
import { sampleLayer } from "../layer/sampleLayer";

type LayerProps = Omit<Layer, "id">;

const version = atom(0);
const layerTreeBaseAtom = atom<Layer>(sampleLayer);

export const layerTreeAtom = atom((get) => {
  get(version);
  return get(layerTreeBaseAtom);
});

export const treeVersionAtom = atom((get) => get(version));

export const updateLayerAction = atom(
  undefined,
  (get, set, id: string, props: Partial<LayerProps>) => {
    const root = get(layerTreeBaseAtom);
    if (id === root.id) {
      const rootNew = { ...root, ...props };
      set(layerTreeBaseAtom, rootNew);
      set(version, get(version) + 1);
      return;
    }

    const parent = findLayerParentById(root, id);
    if (!parent) {
      return;
    }

    const childIndex = parent.children.findIndex((child) => child.id === id);
    if (childIndex === -1) {
      return;
    }

    parent.children.splice(childIndex, 1, {
      ...parent.children[childIndex],
      ...props,
    });
  }
);

export const addLayerAction = atom(
  undefined,
  (get, set, parentId: string | undefined, props: LayerProps) => {
    const root = get(layerTreeBaseAtom);
    const parent = parentId ? findLayerById(root, parentId) : root;
    if (!parent) {
      return;
    }

    parent.children.push({ ...createLayer(props), children: [] });
    set(version, get(version) + 1);

    console.log(root);
  }
);
