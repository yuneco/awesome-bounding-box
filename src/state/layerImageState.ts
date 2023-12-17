import { atom, getDefaultStore } from "jotai";

import { DPR } from "../coord/DPR";
import { flatTree } from "../layer/flatTree";

import { layerTreeAtom } from "./layerTreeState";

const version = atom(0);
const imagesBaseAtom = atom(new Map<string, HTMLImageElement>());

export const loadImageAction = atom(undefined, (get, set) => {
  const tree = get(layerTreeAtom);
  const layers = flatTree(tree).filter((layer) => layer !== tree);

  const images = get(imagesBaseAtom);
  layers.forEach((layer) => {
    if (images.has(layer.id)) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = `https://picsum.photos/seed/${layer.id}/${
      layer.size.width * DPR
    }/${layer.size.height * DPR}`;
    images.set(layer.id, img);
    img.onload = () => {
      set(version, get(version) + 1);
    };
  });
});

export const imagesAtom = atom((get) => {
  get(version);
  return get(imagesBaseAtom);
});

/**
 * find loaded image globally
 * @param id
 * @returns image element if loading or loaded
 */
export const findImage = (id: string) => {
  return getDefaultStore().get(imagesAtom).get(id);
};
