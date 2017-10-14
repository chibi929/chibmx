import * as watson from 'watson-developer-cloud';
import * as fs from 'fs';

function main(args: string[]) {
  if (args.length !== 4) {
    console.log("Usage: node vr.js ${API_KEY} ${CLASSIFIRE_ID}");
    return;
  }
  const apiKey = args[2];
  const classifierId = args[3];

  const vr = new watson.VisualRecognitionV3({
    api_key: apiKey,
    version: 'v3',
    version_date: '2016-05-20'
  });

  const params = {
    images_file: fs.createReadStream('./res/chibikinoko.png'),
    classifier_ids: [classifierId],
    threshold: 0.5
  };

  vr.classify(params, function(err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log(JSON.stringify(res, null, 2));
    }
  });
}

main(process.argv);
