var fs = require('fs');

function shuffle(array) {
  for(var i = array.length - 1; i > 0; i--){
    var r = Math.floor(Math.random() * (i + 1));
    var tmp = array[i];
    array[i] = array[r];
    array[r] = tmp;
  }
}

function main(args) {
  if (args.length != 3) {
    console.log("Usage: node shuffle.js ${JSON_FILE_PATH}");
    return;
  }
  var filePath = args[2];
  try {
    var json = JSON.parse(fs.readFileSync(filePath));
    shuffle(json);
    fs.writeFileSync(`${filePath}.shuffle`, JSON.stringify(json, null, '  '));
  } catch (e) {
    console.log(`"${filePath}" is not Array.`);
    return;
  }
}

main(process.argv);
