module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          tests: ['./tests/'],
          '@components': './src/components',
          '@screens': './src/screens',
          '@assets': './src/assets',
          '@utils': './src/utils',
          '@hooks': './src/hooks',
          '@app-types': './src/types',
          '@constants': './src/constants',
          '@navigation': './src/navigation',
          '@data': './src/data',
          '@schema': './src/schema',
          '@services': './src/services',
          '@store': './src/store',
        },
      },
    ],
  ],
};
