import { Login, loginEvents } from "../pages/login/login.js";
import { Register, registerEvents } from "../pages/register/register.js";
import { Test, testEvents } from "../pages/test/test.js";
import { Results, resultsEvents } from "../pages/results/results.js";


export function Router(path = window.location.hash.replace("#", "") || window.location.pathname || "/") {

    const app = document.getElementById("app");

    switch (path) {

        case "/":
        case "/login":
            app.innerHTML = Login();
            loginEvents();
            break;

        case "/register":
            app.innerHTML = Register();
            registerEvents();
            break;

        case "/test":
            app.innerHTML = Test();
            testEvents();
            break;

        case "/results":
            app.innerHTML = Results();
            resultsEvents();
            break;

        default:
            app.innerHTML = "<h1>404 - Page not found</h1>";
            break;
    }
}

export function navigate(path) {

    const hashPath = path.startsWith("#") ? path : `#${path}`;
    window.location.hash = hashPath;
    Router(hashPath.replace("#", ""));

}