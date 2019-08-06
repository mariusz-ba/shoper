const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const paths = {
  bundleEntry: path.join(__dirname, 'src/main.js'),
  bundleOutputPath: path.join(__dirname, '../assets/base'),
  bundleOutputFilename: 'main.js',
  cssFilename: 'main.css',
  assetsFonts: path.relative(__dirname, 'fonts'),
  assetsImages: path.relative(__dirname, 'images') 
}

function createWebpackConfig(environment) {
  const env = environment.dev ? 'dev' : 'prod';

  return {
    mode: getMode(env),
    devtool: getDevtool(env),
    entry: paths.bundleEntry,
    output: {
      path: paths.bundleOutputPath,
      filename: paths.bundleOutputFilename,
      publicPath: '/assets/base/'
    },
    module: {
      rules:[
        vueLoaderRule(),
        babelLoaderRule(),
        styleLoaderRule(env),
        fontsLoaderRule(),
        imagesLoaderRule()
      ]
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      },
      extensions: ['.js', '.vue', '.json']
    },
    plugins: getPlugins()
  };
};

function getMode(env) {
  return env === 'prod' ? 'production' : 'development';
}

function getDevtool(env) {
  return env === 'dev' ? 'inline-source-map' : '';
}

function vueLoaderRule() {
  return {
    test: /\.vue$/,
    loader: 'vue-loader'
  };
}

function babelLoaderRule() {
  return {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader'
  };
}

function styleLoaderRule(env) {
  return {
    test: /\.s?[ac]ss/,
    use: [
      env === 'dev' ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
      'css-loader',
      'sass-loader'
    ]
  };
}

function fontsLoaderRule() {
  return {
    test: /\.(ttf|eot|woff2?)/,
    use: [
      {
        loader: 'file-loader',
        options: {
          outputPath: paths.assetsFonts,
          name: '[name].[ext]'
        }
      }
    ]
  };
}

function imagesLoaderRule() {
  return {
    test: /\.(jpe?g|png|gif|svg)$/,
    loader: 'file-loader',
    options: {
      outputPath: paths.assetsImages,
      name: '[name].[hash].[ext]'
    }
  };
}

function getPlugins() {
  const vueLoaderPlugin = new VueLoaderPlugin();
  const miniCssExtractPlugin = new MiniCssExtractPlugin({
    filename: paths.cssFilename
  });

  return [vueLoaderPlugin, miniCssExtractPlugin];
}

module.exports = createWebpackConfig;
