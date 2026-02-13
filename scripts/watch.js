import esbuild from "esbuild";

async function watch() {
    const context = await esbuild.context({
        entryPoints: ["src/common/main.ts"],
        bundle: true,
        platform: "node",
        target: "es2022",
        outfile: "dist/main.js",
        logLevel: "info",
        // plugins: [postBuildHotReload],
    });

    // const postBuildHotReload = {
    //     name: "post-build-run",
    //     setup(build) {
    //         build.onEnd(updateManifest);
    //     },
    // };

    await context.watch();
    console.log("Watching main file...");
}

watch();
