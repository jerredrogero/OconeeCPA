const CleanCSS = require('clean-css');
const configServer = require("./server");
const isProduction = configServer.isProduction;

module.exports = {
    // All .css files will be recognised as a language. Minification will happen in production only
    outputFileExtension: "css",
    compile: (inputContent) => {
        return () => {
            if (isProduction) {
                const minified = new CleanCSS({
                    level: 2 // More aggressive optimization
                }).minify(inputContent).styles;
                return minified;
            }
            return inputContent;
        };
    },
};
