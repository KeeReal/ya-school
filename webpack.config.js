"use strict";


const path = require("path");


module.exports = {
    entry: "./src/index.js",
    target: "web",
    output: {
        filename: "bundle.js",
        publicPath: "/dist/",
        path: path.resolve(__dirname, "dist"),
        library: "MyForm"
    },
    module: {
        rules: [
            {
                include: path.join(__dirname, "src"),
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [ "es2015" ]
                    }
                }
            }
        ]
    }
};