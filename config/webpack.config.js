const path = require("path");

const buildPath = path.join(__dirname, "..", "build");
const srcPath = path.join(__dirname, "..", "src");

module.exports = {
  entry: {
    index: path.join(srcPath, "index.ts"),
  },
  output: {
    filename: "[name].js",
    path: buildPath,
    library: "ControllerInput",
    libraryTarget: "umd",
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
