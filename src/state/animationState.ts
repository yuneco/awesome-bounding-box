import { atom } from "jotai";

const frameAtom = atom(0);
const rafIdAtom = atom(0);

export const frameNoAtom = atom((get) => get(frameAtom));

export const stopAnimationAtom = atom(undefined, (get, set) => {
  const radId = get(rafIdAtom);
  if (radId) {
    cancelAnimationFrame(radId);
    set(rafIdAtom, 0);
  }
});

export const startAnimationAtom = atom(undefined, (get, set) => {
  const radId = get(rafIdAtom);
  if (radId) {
    return;
  }

  const loop = () => {
    set(frameAtom, get(frameAtom) + 1);
    set(rafIdAtom, requestAnimationFrame(loop));
  };

  set(rafIdAtom, requestAnimationFrame(loop));
});
