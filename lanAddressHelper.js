const address = require('address');
const fs = require('fs');

try {
  fs.writeFileSync('./src/.lanAddress.js', `export const lanAddress = '${address.ip()}';`);
} catch (error) {
  console.log(error.message);
}
