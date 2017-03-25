const { FuseBox, SVGPlugin, CSSPlugin, BabelPlugin, CSSResourcePlugin, UglifyJSPlugin } = require("fuse-box");


// Create FuseBox Instance
let fuse = new FuseBox({
    homeDir: "app/",
    sourcemaps: true,
    outFile: "./public/bundle.js",
    watch: false,
    plugins: [
        SVGPlugin(),
        CSSPlugin(),
        BabelPlugin(),
        CSSResourcePlugin(),
        UglifyJSPlugin()
    ]
});

fuse.bundle(">app.js");
