import express from 'express';
import router from './routes/route.js';

const app = express();
const port = 3000;

app.use(router);

app.listen(port,()=>{
  console.log('server run on port',port);
});
