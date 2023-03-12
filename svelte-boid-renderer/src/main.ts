import "./app.css";
import App from "./BoidRenderer.svelte";

const app = new App({
  target: document.getElementById("app"),
});

export default app;
