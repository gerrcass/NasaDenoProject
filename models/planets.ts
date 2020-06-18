import { join } from "https://deno.land/std/path/mod.ts";
import { BufReader } from "https://deno.land/std/io/bufio.ts";
import { parse } from "https://deno.land/std/encoding/csv.ts";
async function loadPlanetsData() {
  const path = join("data", "kepler_exoplanets_nasa_archive.csv");
  const file = await Deno.open(path);
  const bufReader = new BufReader(file);
  const result = await parse(bufReader, {
    header: true,
    comment: "#",
  });
  Deno.close(file.rid);
  return result;
}

const planets = await loadPlanetsData();
console.log(planets);
