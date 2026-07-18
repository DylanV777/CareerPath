import { Router } from "./router/router.js";

window.addEventListener("hashchange", () => {
    Router();
});

Router();
