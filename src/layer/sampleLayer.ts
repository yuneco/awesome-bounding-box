import { createLayer } from "./Layer";

export const sampleLayer = createLayer(
  {
    type: "stage",
    coord: {
      position: { x: 0, y: 0 },
      scale: 1,
      angle: 0,
    },
    size: { width: 1000, height: 800 },
    children: [
      createLayer(
        {
          coord: { position: { x: 50, y: 50 }, scale: 1, angle: -10 },
          size: { width: 250, height: 150 },
          children: [],
          color: "silver",
        },
        "layer2"
      ),
      createLayer(
        {
          coord: {
            position: { x: 300, y: 150 },
            scale: 1,
            angle: 30,
          },
          size: { width: 200, height: 150 },
          children: [
            createLayer(
              {
                coord: { position: { x: 50, y: 50 }, scale: 1, angle: 30 },
                size: { width: 50, height: 50 },
                children: [],
                color: "silver",
              },
              "layer4"
            ),
          ],
          color: "silver",
        },
        "layer3"
      ),
    ],
    color: "white",
  },
  "root"
);
