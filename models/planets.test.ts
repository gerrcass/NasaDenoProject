import { assertEquals } from "../test_deps.ts";

import { filterHabitablePlanets } from "./planets.ts";

const HABITABLE_PLANET = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1",
  koi_srad: "1",
  koi_smass: "1",
};
const NOT_CONFIRMED = {
  koi_disposition: "FALSE POSITIVE",
  koi_prad: "1", //just for clarity (it is never evaluated because the function uses short circuit operator, &&)
  koi_srad: "1", //just for clarity (it is never evaluated because the function uses short circuit operator, &&)
  koi_smass: "1", //just for clarity (it is never evaluated because the function uses short circuit operator, &&)
};
const TOO_LARGE_PLANETARY_RADIUS = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1.5",
  koi_srad: "1", //just for clarity (it is never evaluated because the function uses short circuit operator, &&)
  koi_smass: "1", //just for clarity (it is never evaluated because the function uses short circuit operator, &&)
};
const TOO_SMALL_PLANETARY_RADIUS = {
  koi_disposition: "CONFIRMED",
  koi_prad: "0.5",
  koi_srad: "1", //just for clarity (it is never evaluated because the function uses short circuit operator, &&)
  koi_smass: "1", //just for clarity (it is never evaluated because the function uses short circuit operator, &&)
};
const TOO_LARGE_SOLAR_RADIUS = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1",
  koi_srad: "1.01",
  koi_smass: "1", //just for clarity (it is never evaluated because the function uses short circuit operator, &&)
};
const TOO_SMALL_SOLAR_RADIUS = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1",
  koi_srad: "0.99",
  koi_smass: "1", //just for clarity (it is never evaluated because the function uses short circuit operator, &&)
};
const TOO_LARGE_SOLAR_MASS = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1",
  koi_srad: "1",
  koi_smass: "1.04",
};
const TOO_SMALL_SOLAR_MASS = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1",
  koi_srad: "1",
  koi_smass: "0.78",
};
Deno.test("filter only habitable planets", () => {
  const filtered = filterHabitablePlanets([
    NOT_CONFIRMED,
    TOO_LARGE_PLANETARY_RADIUS,
    TOO_SMALL_PLANETARY_RADIUS,
    TOO_LARGE_SOLAR_RADIUS,
    TOO_SMALL_SOLAR_RADIUS,
    TOO_LARGE_SOLAR_MASS,
    TOO_SMALL_SOLAR_MASS,
    HABITABLE_PLANET, //only this one will pass
  ]);
  assertEquals(filtered, [HABITABLE_PLANET]);
});
