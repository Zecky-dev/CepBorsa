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
          "@i18n": './src/i18n',
          "@i18n/*": './src/i18n/*',
          "@services": './src/services',
          "@services/*": './src/services/*',
          "@assets": './src/assets',
          "@assets/*": './src/assets/*',
        },
      },
    ],
    'react-native-reanimated/plugin',
    ['module:react-native-dotenv']
  ],
};
