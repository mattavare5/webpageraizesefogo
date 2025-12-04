import { register } from "node:module";
import { pathToFileURL } from "node:url";

register("ts-node/esm", pathToFileURL("./"));

// Now import and run the server
import("./src/server.ts").catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
