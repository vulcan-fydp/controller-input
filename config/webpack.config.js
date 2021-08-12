const path = require("path");

const buildPath = path.join(__dirname, "..", "build");
const srcPath = path.join(__dirname, "..", "src");

module.exports = {
  entry: {
    index: path.join(srcPath, "index.ts"),
    visualize: path.join(srcPath, "visualize", "index.ts"),
  },
  output: {
    filename: "[name].js",
    path: buildPath,
    library: {
      name: "ControllerInput",
    },
    globalObject: "this",
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        type: "asset/source",
      },
    ],
  },
  resolve: {
    extensions: [".mjs", ".tsx", ".ts", ".js"],
    alias: {
      // Keep up to date with tsconfig.json
      "@src": srcPath,
    },
  },
  plugins: [],
};
