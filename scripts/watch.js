import esbuild from "esbuild";

async function watch() {
    const context = await esbuild.context({
        entryPoints: ["src/common/main.ts"],
        bundle: true,
        platform: "node",
        target: "es2022",
        outfile: "dist/main.js",
        logLevel: "info",
    });

    await context.watch();
    console.log("Watching main file...");
}

watch();
