import { Router } from "https://deno.land/x/oak@v5.0.0/mod.ts";

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

export default router;
