import { Button } from "@kuma-ui/core";
import { FC } from "react";

type Props = JSX.IntrinsicElements["button"];

export const BaseButton: FC<Props> = ({ children, ...props }) => {
  return (
    <Button
      {...props}
      bg="#034586"
      color="white"
      fontWeight={700}
      border="none"
      borderRadius={6}
      cursor="pointer"
    >
      {children}
    </Button>
  );
};
