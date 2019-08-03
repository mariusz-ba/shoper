const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const paths = {
  bundleEntry: path.join(__dirname, 'src/main.js'),
  bundleOutputPath: path.join(__dirname, '../assets/base'),
  bundleOutputFilename: 'main.js',
  htmlTemplateEntry: path.join(__dirname, 'src/templates', 'index.html'),
  htmlTemplateOutput: path.join(__dirname, '../assets/base', 'index.html'),
  cssFilename: 'main.css',
  assetsFonts: path.relative(__dirname, 'fonts'),
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
        fontsLoaderRule()
      ]
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      },
      extensions: ['.js', '.vue', '.json']
    },
    plugins: getPlugins(env)
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

function getPlugins(env) {
  const vueLoaderPlugin = new VueLoaderPlugin();
  const miniCssExtractPlugin = new MiniCssExtractPlugin({
    filename: paths.cssFilename
  });
  const htmlWebpackPlugin = new HtmlWebpackPlugin({
    filename: paths.htmlTemplateOutput,
    template: paths.htmlTemplateEntry
  });

  return env === 'prod'
    ? [vueLoaderPlugin, miniCssExtractPlugin, htmlWebpackPlugin]
    : [vueLoaderPlugin, htmlWebpackPlugin];
}

module.exports = createWebpackConfig;
