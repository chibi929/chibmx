import * as express from 'express';
import * as bodyParser from 'body-parser';

import { RootRouter } from './root-router';
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT");
  next();
});

app.use(bodyParser.json());
app.use('/', RootRouter.getRouter());

app.listen(process.env.PORT || 3000, () => {
  console.log('Example app listening on port 3000!');
});
