module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@components': './src/components',
          '@components/*': './src/components/*',
          "@context": "./src/context",
          "@context/*": "./src/context/*",
          "@screens": "./src/screens",
          "@screens/*": "./src/screens/*",
          '@utils': './src/utils',
          '@utils/*': './src/utils/*',
          "@types": './src/types',
          "@types/*": './src/types/*',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
