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
      // Required path
      [
        "module-resolver",
        {
          alias: {
            "#api": "./src/api",
            "#assets": "./src/assets",
            "#components": "./src/components",
            "#hooks": "./src/hooks",
            "#mocks": "./src/mocks",
            "#navigation": "./src/navigation",
            "#services": "./src/services",
            "#tsyringe": "./src/tsyringe",
            "#utils": "./src/utils",
          },
        },
      ],
      // Required for reanimated
      "react-native-reanimated/plugin",
    ],
  };
};
