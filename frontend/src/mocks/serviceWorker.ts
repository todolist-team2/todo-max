import { setupWorker } from "msw";
import { handlers } from "./handlers.js";

export default setupWorker(...handlers);
