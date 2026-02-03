import { CatmullRomCurve3, Vector3 } from "three";

export const flightCurve = new CatmullRomCurve3(
  [
    new Vector3(8, -6, -20),
    new Vector3(-15, -2, -20),
    new Vector3(10, -15, -30),
  ],
  false,
  "catmullrom",
  0.6
);
