const webfont = require('webfont').default;
const rimraf = require('rimraf');
const path = require('path');
const fs = require('fs');

const fontsOutputPath = path.join(__dirname, 'src/assets/fonts/iconfont');
const scssOutputPath = path.join(__dirname, 'src/utils/scss/variables');
const scssOutputFilePath = path.join(scssOutputPath, 'icons.scss');

webfont({
  files: './src/assets/icons/**/*.svg',
  fontName: 'iconfont',
  fontStyle: 'normal',
  fontWeight: '400'
})
  .then(result => {
    console.log('Removing iconfont directory...');
    rimraf.sync(fontsOutputPath);

    console.log('Creating fonts...');
    const variables = generateVariables(result.svg);
    const icons = variables.map(icon => `\t${icon.name}: "${icon.unicode}"`);
    const iconsScss = `$icons: (\n${icons.join(',\n')}\n)`;

    fs.mkdirSync(fontsOutputPath, { recursive: true });
    fs.writeFileSync(path.join(fontsOutputPath, 'iconfont.ttf'), result.ttf);
    fs.writeFileSync(path.join(fontsOutputPath, 'iconfont.eot'), result.eot);
    fs.writeFileSync(path.join(fontsOutputPath, 'iconfont.woff'), result.woff);
    fs.writeFileSync(path.join(fontsOutputPath, 'iconfont.woff2'), result.woff2);

    console.log('Removing icons.scss file...');
    rimraf.sync(scssOutputFilePath);

    console.log('Creating new icons.scss file...');
    if (!fs.existsSync(scssOutputPath)) {
      fs.mkdirSync(scssOutputPath);
    }

    fs.writeFileSync(scssOutputFilePath, iconsScss);

    console.log('Done.');
  })
  .catch(error => {
    console.log('An error occured:', error);
  });

function generateVariables(svgContent) {
  const variables = [];
  let regex = /glyph-name="(.*?)"\s+unicode="(.*?)"/g;
  let match = regex.exec(svgContent);

  while (match) {
    variables.push({
      name: match[1],
      unicode: match[2].replace('&#x', '\\').replace(';', '')
    });
    match = regex.exec(svgContent);
  }

  return variables;
}
