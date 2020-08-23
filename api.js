import express from 'express';
import morgan from 'morgan';
import { DatabaseHandler } from './db.js';

const app = express();
const port = 3030;

const DBHandler = new DatabaseHandler();

app.use(morgan('dev'));

app
  .route('/listing/:listingId')
  .get((req, res) => {
    DBHandler.readListing(req.params.listingId).then((listing) => {
      if (listing != null) {
        res.json({ status: 'OK', statusCode: 200, data: listing });
      } else res.json({ status: 'NOT FOUND', statusCode: 404 });
    });
  })
  .patch((req, res) => {
    req;
  });

app.get('/listing/', (req, res) => {
  res.send('A listing');
});
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3030, () => {
  console.log(`Listening on http://localhost:${port}`);
});
