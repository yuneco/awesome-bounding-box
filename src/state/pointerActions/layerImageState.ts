import { atom, getDefaultStore } from "jotai";

import { flatTree } from "../../layer/flatTree";
import { layerTreeAtom } from "../layerTreeState";

const version = atom(0);
const imagesBaseAtom = atom(new Map<string, HTMLImageElement>());

export const loadImageAction = atom(undefined, (get, set) => {
  const tree = get(layerTreeAtom);
  const ids = flatTree(tree).map((layer) => layer.id);

  const images = get(imagesBaseAtom);
  ids.forEach((id) => {
    if (images.has(id)) return;
    const img = new Image();
    img.src = `https://picsum.photos/seed/${id}/600/600`;
    images.set(id, img);
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
