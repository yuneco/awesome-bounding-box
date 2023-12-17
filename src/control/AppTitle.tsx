import { k } from "@kuma-ui/core";
import { useAtomValue } from "jotai";

import { drawPartyAtom } from "../state/drawOptionState";

export const AppTitle = () => {
  const isParty = useAtomValue(drawPartyAtom);

  const party = isParty ? "🎉🎉🎉" : "";

  return (
    <k.div
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <k.h1 m={0} p={0} fontSize={24} color="#444">
        {party} Awesome Bounding Box {party}
      </k.h1>
    </k.div>
  );
};
