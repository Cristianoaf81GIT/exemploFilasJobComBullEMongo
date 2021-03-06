//https://betterprogramming.pub/message-queue-using-bull-redis-and-mongodb-in-node-js-d7dedaa426ea
import express from 'express';
import { connectToMongo } from './mongoose';
import hitApi from './jobs/hitApi.redisJob';

const app = express();
connectToMongo();
// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world');
});
app.use(hitApi); // apply middleware with bull job producer/worker
app.get('/api-1', (req, res) => {
  res.send('you hit api-1');
});
app.get('/api-2', (req, res) => {
  res.send('you hit api-2');
});

app.listen(3000, () => console.log('server listening on port 3000!'));