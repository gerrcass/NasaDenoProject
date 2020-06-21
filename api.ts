import { Router, Application } from "https://deno.land/x/oak@v5.0.0/mod.ts";
import * as planets from "./models/planets.ts";
import * as launches from "./models/launches.ts";

const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = `
  _ __   __ _ ___  __ _ 
  | '_ \ / _. / __|/ _. |
  | | | | (_| \__ \ (_| |
  |_| |_|\__,_|___/\__,_|
  MISSION CONTROL API...
  `;
});

router.get("/planets", (ctx) => {
  //ctx.throw(501, "Sorry planets aren't available!"); //Oak only show general message when errors in the 500 range
  ctx.response.body = planets.getAllPlanets();
});
router.get("/launches", (ctx) => {
  ctx.response.body = launches.getAll();
});
router.get("/launches/:id", (ctx) => {
  if (ctx.params?.id) { // (ctx.params?.id) === (ctx.params && ctx.params.id)
    const launchesList = launches.getOne(Number(ctx.params.id));
    if (launchesList) {
      ctx.response.body = launchesList;
    } else {
      ctx.throw(400, "Launch with that ID doesn't exist!");
    }
  }
});

router.post("/launches", async (ctx) => {
  const body = await ctx.request.body();
  launches.addOne(body.value);

  ctx.response.body = { success: true };
  ctx.response.status = 201;
});

export default router;
