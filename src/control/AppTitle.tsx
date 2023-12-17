import { k } from "@kuma-ui/core";
import { useAtomValue } from "jotai";

import { drawPartyAtom } from "../state/drawOptionState";

export const AppTitle = () => {
  const isParty = useAtomValue(drawPartyAtom);

  const party = isParty ? "🎉🎉🎉" : "";

  return (
    <k.div
      position="relative"
      display="grid"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <k.h1 m={0} p={0} fontSize={24} color="#444">
        {party} Awesome Bounding Box {party}
      </k.h1>
      <k.div display="flex" gap={8} justifyContent="center">
        <k.a href="https://github.com/yuneco/awesome-bounding-box">GitHub</k.a>
        <k.a href="https://twitter.com/yuneco">X</k.a>
      </k.div>
    </k.div>
  );
};
