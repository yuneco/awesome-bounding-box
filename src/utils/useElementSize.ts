import { MutableRefObject, useEffect, useRef, useState } from "react";

import { Size } from "../coord/Size";

const useElementSize = (
  elementRef: MutableRefObject<HTMLElement | null>
): Size => {
  const [elementSize, setElementSize] = useState<Size>({ width: 0, height: 0 });
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setElementSize({ width, height });
    });

    resizeObserver.observe(element);
    resizeObserverRef.current = resizeObserver;

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
        resizeObserverRef.current = null;
      }
    };
  }, [elementRef]);

  return elementSize;
};

export default useElementSize;
