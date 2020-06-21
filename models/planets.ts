//import { log, join, BufReader, parse, _ } from "../deps.ts";
import { log, join, BufReader, parse, _ } from "../deps.ts";

/*
Deno is using ES6 for ECMAScript module which are cached. The first time the planets.ts module is imported in api.ts file, 
it'll create the Array<Planet> objtect, and on subsequent imports of this module, it'll always use the same objtect.
*/

/*
interface Planet {
  [key: string]: string;
}
Since TypeScript 2.1 there's a shorthand to do this:
type Planet = Record<string, string>;
*/
type Planet = Record<string, string>;

let planets: Array<Planet>;

export function filterHabitablePlanets(planets: Array<Planet>) {
  return (planets as Array<Planet>).filter((planet) => {
    const planetaryRadius = Number(planet["koi_prad"]);
    const stellarMass = Number(planet["koi_smass"]);
    const stellarRadius = Number(planet["koi_srad"]);

    return planet["koi_disposition"] === "CONFIRMED" &&
      planetaryRadius > 0.5 && planetaryRadius < 1.5 &&
      stellarMass > 0.78 && stellarMass < 1.04 &&
      stellarRadius > 0.99 && stellarRadius < 1.01;
  });
}

async function loadPlanetsData() {
  const path = join("data", "kepler_exoplanets_nasa_archive.csv");
  const file = await Deno.open(path);
  const bufReader = new BufReader(file);
  const result = await parse(bufReader, {
    header: true,
    comment: "#",
  });
  Deno.close(file.rid);

  const planets = filterHabitablePlanets(result as Array<Planet>);

  return planets.map((planet) => {
    return _.pick(
      planet,
      [
        "koi_prad",
        "koi_smass",
        "koi_srad",
        "kepler_name",
        "koi_count",
        "koi_steff",
      ],
    );
  });
}

planets = await loadPlanetsData();
log.info(`${planets.length} habitable planets found! 🎉`);

export function getAllPlanets() {
  return planets;
}
