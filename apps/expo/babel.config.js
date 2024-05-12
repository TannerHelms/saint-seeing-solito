module.exports = function (api) {
  api.cache(true)
  return {
    presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
    plugins: [
      "@babel/plugin-proposal-export-namespace-from",
      'react-native-reanimated/plugin',
      'nativewind/babel',
      'module:react-native-dotenv',
      [
        'module-resolver',
        {
          root: ['.'],
          alias: { '@': './src' },
          extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
        },
      ],
    ],
  }
}
