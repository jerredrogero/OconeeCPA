const esbuild = require("esbuild");
const fs = require("node:fs");
const server = require("../config/server");
const isProduction = server.isProduction;

module.exports = {
    // All .js files will be recognised as a language. The contents of these files will be processed as per the compile method
    outputFileExtension: "js",
    init: async function () {
        // Create the /assets/js directory on first build (prevents an error from directory not existing)
        fs.mkdir("public/assets/js", { recursive: true }, (err) => {
            if (err) throw err;
        });
    },
    compile: async (content, inputPath) => {
        // If the file isn't from the assets directory, ignore it. It's probably a config file.
        if (!inputPath.includes("./src/assets/")) {
            return;
        }

        if (isProduction) {
            // For production, create both a modern and legacy bundle
            const filename = inputPath.split('/').pop().replace('.js', '');
            
            // Modern bundle (ES2020)
            const modernResult = await esbuild.build({
                entryPoints: [inputPath],
                outfile: `public/assets/js/${filename}.modern.js`,
                write: false,
                bundle: true,
                minify: true,
                target: "es2020",
            });
            
            // Legacy bundle (ES2015 for older browsers)
            const legacyResult = await esbuild.build({
                entryPoints: [inputPath],
                outfile: `public/assets/js/${filename}.legacy.js`,
                write: false,
                bundle: true,
                minify: true,
                target: "es2015",
            });
            
            return async () => {
                // Write modern files
                modernResult.outputFiles.forEach((file) => {
                    fs.writeFile(file.path, file.text, function (err) {
                        if (err) throw err;
                    });
                });
                
                // Write legacy files
                legacyResult.outputFiles.forEach((file) => {
                    fs.writeFile(file.path, file.text, function (err) {
                        if (err) throw err;
                    });
                });

                return undefined;
            };
        } else {
            // For development, just use a simple bundle
            const result = await esbuild.build({
                entryPoints: [inputPath],
                outdir: "public/assets/js",
                write: false,
                bundle: true,
                minify: false,
                sourcemap: true,
                target: "esnext",
            });

            return async () => {
                // Iterate over built files from ESBuild process
                result.outputFiles.forEach((file) => {
                    // Write the ESBuild files to this new directory
                    fs.writeFile(file.path, file.text, function (err) {
                        if (err) throw err;
                    });
                });

                return undefined;
            };
        }
    },
};
