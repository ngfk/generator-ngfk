// https://poi.js.org/#/home

module.exports = (options, req) => ({
    entry: 'src/index.tsx',
    presets: [require('@ngfk/poi-preset-react-typescript')()]
});
