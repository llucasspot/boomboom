module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
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
            "#assets": "./src/assets",
            "#components": "./src/components",
            "#modules": "./src/modules",
          },
        },
      ],
      // Required for reanimated
      "react-native-reanimated/plugin",
    ],
  };
};
