module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // Required for tsyringe
      "babel-plugin-transform-typescript-metadata",
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      // Required for svg
      [
        "babel-plugin-inline-import",
        {
          extensions: [".svg"],
        },
      ],
    ],
  };
};
