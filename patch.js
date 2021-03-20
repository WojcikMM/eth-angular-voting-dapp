const fs = require('fs')
const f = 'node_modules/@angular-devkit/build-angular/src/webpack/configs/browser.js'

fs.readFile(f, 'utf8', function(err, data) {
  if (err) {
    return console.log(err)
  }
  const result = data.replace(/node: false/g, 'node: {crypto: true, stream: true, fs: "empty"}');

  fs.writeFile(f, result, 'utf8', function(err) {
    if (err) return console.log(err)
  })
});
