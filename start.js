// start.js

import { execSync } from "child_process";
const port = process.env.PORT || 3000;  // Use PORT from environment or fallback to 3000

console.log(`Starting Remix on port ${port}`);
execSync(`remix-serve ./build/server/index.js --port ${port}`, { stdio: "inherit" });