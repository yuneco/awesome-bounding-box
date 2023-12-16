import { createLayer } from "./Layer";

export const sampleLayer = createLayer(
  {
    coord: {
      position: { x: 0, y: 0 },
      scale: 1,
      angle: 0,
      anchor: { x: 0, y: 0 },
    },
    size: { width: 2000, height: 2000 },
    children: [
      createLayer(
        {
          coord: { position: { x: 50, y: 50 }, scale: 1, angle: 0 },
          size: { width: 50, height: 50 },
          children: [],
          color: "silver",
        },
        "layer-salmon"
      ),
      createLayer(
        {
          coord: {
            position: { x: 200, y: 100 },
            scale: 1.5,
            angle: 30,
          },
          size: { width: 100, height: 150 },
          children: [
            createLayer(
              {
                coord: { position: { x: 50, y: 50 }, scale: 1, angle: 30 },
                size: { width: 50, height: 50 },
                children: [],
                color: "silver",
              },
              "layer-4"
            ),
          ],
          color: "silver",
        },
        "layer-gold"
      ),
    ],
    color: "white",
  },
  "root"
);
