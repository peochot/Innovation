const { FuseBox, SVGPlugin, CSSPlugin, BabelPlugin, CSSResourcePlugin } = require("fuse-box");


// Create FuseBox Instance
let fuse = new FuseBox({
    homeDir: "app/",
    sourcemaps: true,
    outFile: "./public/bundle.js",
    plugins: [
        SVGPlugin(),
        CSSPlugin(),
        BabelPlugin(),
        CSSResourcePlugin()
    ]
});

fuse.devServer(">app.js", {
    port: 3333,
    httpServer: false,
});
