module.exports = {
  root: true,
  extends: require.resolve("@scorenco/eslint-config"),
  parserOptions: {
    project: ["./tsconfig.eslint.json"],
    tsconfigRootDir: __dirname,
  },
};
