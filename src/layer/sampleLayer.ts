import { createLayer } from "./Layer";

export const sampleLayer = createLayer(
  {
    coord: {
      position: { x: 0, y: 0 },
      scale: 1,
      angle: 0,
      anchor: { x: 200, y: 150 },
    },
    size: { width: 400, height: 300 },
    children: [
      createLayer(
        {
          coord: { position: { x: 50, y: 50 }, scale: 1, angle: 0 },
          size: { width: 50, height: 50 },
          children: [],
          color: "salmon",
        },
        "salmon"
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
                coord: { position: { x: 50, y: 50 }, scale: 2, angle: 0 },
                size: { width: 50, height: 50 },
                children: [],
                color: "purple",
              },
              "purple"
            ),
          ],
          color: "gold",
        },
        "gold"
      ),
    ],
    color: "powderblue",
  },
  "root"
);
