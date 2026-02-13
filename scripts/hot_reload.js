import fs from "fs";
import path from "node:path";

const MANIFEST = "../manifest.json";
export function updateManifest() {
    const manifestPath = path.resolve(MANIFEST);

    if (!fs.existsSync(manifestPath)) return;

    try {
        const data = fs.readFileSync(manifestPath, "utf-8");

        fs.writeFileSync(manifestPath, data);

        console.log("Manifest changed! Hot reloading...");
    } catch (err) {
        console.error("There was a error applying changes to manifest.json");
    }
}
